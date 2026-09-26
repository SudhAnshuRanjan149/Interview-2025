"""
Alert handler — orchestrates the alert lifecycle:
1. Persist alert to DB
2. Call spare-parts API
3. Update parts status / enqueue retry
4. Notify dashboard via Kafka
"""
import logging

from app.repository.alert_repo import AlertRepo
from app.services.notifier import AlertNotifier
from app.services.parts_client import PartsClient
from app.services.retry_manager import RetryManager
from shared.db.session import AsyncSessionFactory
from shared.models.enums import PartsStatus

logger = logging.getLogger(__name__)

# Parts required for each rule type
_PARTS_MAP = {
    "overheating": ["P007", "P008"],       # thermostat, water pump
    "repeated_fault_code": ["P001", "P002"],  # generic filters
    "overdue_service": ["P001", "P002", "P003"],
}


class AlertHandler:
    def __init__(
        self,
        parts_client: PartsClient,
        retry_manager: RetryManager,
        notifier: AlertNotifier,
    ) -> None:
        self.parts_client = parts_client
        self.retry_manager = retry_manager
        self.notifier = notifier

    async def handle(self, trigger: dict) -> None:
        """
        Full alert processing pipeline:
        DB insert → parts check → retry enqueue → WS notification.
        """
        async with AsyncSessionFactory() as session:
            async with session.begin():
                repo = AlertRepo(session)

                # 1. Persist alert to DB
                alert_id = await repo.create(trigger)

                # 2. Call spare-parts API
                part_codes = _PARTS_MAP.get(trigger.get("rule_name", ""), ["P001"])
                parts_result = await self.parts_client.check_availability(part_codes)

                if parts_result.success:
                    await repo.update_parts_status(
                        alert_id, PartsStatus.AVAILABLE, parts_result.data
                    )
                    logger.info(
                        "Parts available for alert",
                        extra={"alert_id": alert_id},
                    )
                else:
                    # Enqueue for automatic retry
                    await self.retry_manager.enqueue(alert_id, attempt=1)
                    logger.warning(
                        "Parts unavailable — alert PENDING. Enqueued retry.",
                        extra={"alert_id": alert_id, "error": parts_result.error},
                    )

        # 3. Notify dashboard (outside transaction)
        parts_status = PartsStatus.AVAILABLE.value if parts_result.success else PartsStatus.PENDING.value
        await self.notifier.publish_created(alert_id, {**trigger, "parts_status": parts_status})

    async def retry_parts_check(self, alert_id: str, attempt: int) -> None:
        """Re-check parts availability for a PENDING alert."""
        async with AsyncSessionFactory() as session:
            async with session.begin():
                repo = AlertRepo(session)

                # Re-attempt parts check
                parts_result = await self.parts_client.check_availability(["P001", "P002", "P003"])

                if parts_result.success:
                    await repo.update_parts_status(alert_id, PartsStatus.AVAILABLE, parts_result.data)
                    await self.notifier.publish_updated(alert_id, "OPEN", PartsStatus.AVAILABLE.value)
                    logger.info("Retry succeeded — parts now available", extra={"alert_id": alert_id})
                elif attempt >= self.retry_manager.max_attempts:
                    await repo.update_parts_status(alert_id, PartsStatus.UNAVAILABLE)
                    logger.error("Max retries reached — parts UNAVAILABLE", extra={"alert_id": alert_id})
                else:
                    # Re-enqueue with incremented attempt count
                    await self.retry_manager.enqueue(alert_id, attempt + 1)
                    logger.info(
                        "Parts retry %d failed — re-enqueuing", attempt,
                        extra={"alert_id": alert_id},
                    )
