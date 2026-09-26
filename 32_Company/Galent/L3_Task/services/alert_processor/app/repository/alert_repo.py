"""
Alert repository — DB CRUD for maintenance_alerts.
"""
import logging
import uuid
from typing import Optional

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.alert import MaintenanceAlert
from shared.models.enums import AlertStatus, PartsStatus, Severity

logger = logging.getLogger(__name__)


class AlertRepo:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, trigger: dict) -> str:
        """
        Insert a new alert from a trigger payload.
        On fingerprint UniqueViolation (duplicate), returns the existing alert_id.
        Returns the alert UUID as string.
        """
        fingerprint = trigger["fingerprint"]

        # Check if already exists (fast path)
        existing = await self._get_by_fingerprint(fingerprint)
        if existing:
            logger.info("Alert already exists (DB guard)", extra={"fingerprint": fingerprint[:16]})
            return str(existing.id)

        alert = MaintenanceAlert(
            vehicle_id=trigger["vehicle_id"],
            depot_id=trigger.get("depot_id"),
            rule_name=trigger["rule_name"],
            severity=Severity(trigger["severity"]),
            status=AlertStatus.OPEN,
            parts_status=PartsStatus.PENDING,
            evidence=trigger.get("evidence", []),
            recommendation=trigger.get("recommendation", ""),
            fingerprint=fingerprint,
        )

        try:
            self.session.add(alert)
            await self.session.flush()
            alert_id = str(alert.id)
            logger.info(
                "Alert created",
                extra={"alert_id": alert_id, "vehicle_id": trigger["vehicle_id"], "rule": trigger["rule_name"]},
            )
            return alert_id
        except IntegrityError:
            await self.session.rollback()
            existing = await self._get_by_fingerprint(fingerprint)
            if existing:
                logger.info("Caught duplicate alert (IntegrityError)", extra={"fingerprint": fingerprint[:16]})
                return str(existing.id)
            raise

    async def update_parts_status(
        self,
        alert_id: str,
        parts_status: PartsStatus,
        parts_data: Optional[dict] = None,
    ) -> None:
        result = await self.session.execute(
            select(MaintenanceAlert).where(MaintenanceAlert.id == uuid.UUID(alert_id))
        )
        alert = result.scalar_one_or_none()
        if alert:
            alert.parts_status = parts_status
            if parts_data is not None:
                alert.parts_data = parts_data
            await self.session.flush()

    async def _get_by_fingerprint(self, fingerprint: str) -> Optional[MaintenanceAlert]:
        result = await self.session.execute(
            select(MaintenanceAlert).where(MaintenanceAlert.fingerprint == fingerprint)
        )
        return result.scalar_one_or_none()
