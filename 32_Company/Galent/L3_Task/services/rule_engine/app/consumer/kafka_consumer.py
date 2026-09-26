"""
Rule Engine Kafka consumer.
Consumes from `telemetry.raw` and `service.records`.
For each message:
  1. Deserialize and route to correct handler
  2. Update vehicle window
  3. Evaluate all rules
  4. For each trigger: check fingerprint idempotency → publish to alerts.notifications
  5. Commit Kafka offset only after safe processing
"""
import logging

from aiokafka import ConsumerRecord

from app.engine.fingerprint import Fingerprinter
from app.engine.rule_evaluator import RuleEvaluator
from app.engine.window_manager import WindowManager
from app.services.idempotency import IdempotencyService
from app.services.publisher import AlertPublisher
from shared.kafka.consumer import BaseKafkaConsumer

logger = logging.getLogger(__name__)

TELEMETRY_TOPIC = "telemetry.raw"
SERVICE_RECORDS_TOPIC = "service.records"


class RuleEngineConsumer(BaseKafkaConsumer):
    def __init__(
        self,
        bootstrap_servers: str,
        group_id: str,
        window_manager: WindowManager,
        rule_evaluator: RuleEvaluator,
        fingerprinter: Fingerprinter,
        idempotency: IdempotencyService,
        alert_publisher: AlertPublisher,
    ) -> None:
        super().__init__(
            topics=[TELEMETRY_TOPIC, SERVICE_RECORDS_TOPIC],
            bootstrap_servers=bootstrap_servers,
            group_id=group_id,
        )
        self.window_manager = window_manager
        self.rule_evaluator = rule_evaluator
        self.fingerprinter = fingerprinter
        self.idempotency = idempotency
        self.alert_publisher = alert_publisher

    async def handle_message(self, msg: ConsumerRecord) -> None:
        event = msg.value
        if not isinstance(event, dict):
            logger.warning("Received non-dict message on topic %s", msg.topic)
            return

        if msg.topic == TELEMETRY_TOPIC:
            await self._handle_telemetry(event)
        elif msg.topic == SERVICE_RECORDS_TOPIC:
            await self._handle_service_record(event)

    async def _handle_telemetry(self, event: dict) -> None:
        vehicle_id = event.get("vehicle_id")
        if not vehicle_id:
            logger.warning("Telemetry event missing vehicle_id — skipping")
            return

        # 1. Update vehicle window
        window = self.window_manager.update(vehicle_id, event)

        # 2. Evaluate all rules
        triggers = self.rule_evaluator.evaluate_all(window)

        # 3. For each trigger: idempotency check → publish
        for trigger in triggers:
            fingerprint = self.fingerprinter.compute(trigger)

            if await self.idempotency.is_seen(fingerprint):
                logger.debug(
                    "Duplicate trigger suppressed",
                    extra={"vehicle_id": vehicle_id, "rule": trigger.rule_name, "fp": fingerprint[:16]},
                )
                continue

            # Mark BEFORE publishing — prevents re-publish if crash between mark and publish
            await self.idempotency.mark_seen(fingerprint)
            await self.alert_publisher.publish_trigger(trigger, fingerprint)

    async def _handle_service_record(self, record: dict) -> None:
        vehicle_id = record.get("vehicle_id")
        if not vehicle_id:
            return
        self.window_manager.update_from_service_record(vehicle_id, record)
        logger.debug("Service record applied to window", extra={"vehicle_id": vehicle_id})
