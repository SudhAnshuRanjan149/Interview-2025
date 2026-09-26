"""
Alert Processor Kafka consumer.
Consumes from `alerts.notifications` topic (triggers published by Rule Engine).
"""
import logging

from aiokafka import ConsumerRecord

from app.consumer.handler import AlertHandler
from shared.kafka.consumer import BaseKafkaConsumer

logger = logging.getLogger(__name__)

TOPIC = "alerts.notifications"


class AlertProcessorConsumer(BaseKafkaConsumer):
    def __init__(
        self,
        bootstrap_servers: str,
        group_id: str,
        handler: AlertHandler,
    ) -> None:
        super().__init__(
            topics=[TOPIC],
            bootstrap_servers=bootstrap_servers,
            group_id=group_id,
        )
        self.handler = handler

    async def handle_message(self, msg: ConsumerRecord) -> None:
        trigger = msg.value
        if not isinstance(trigger, dict):
            logger.warning("Non-dict message received on %s — skipping", TOPIC)
            return

        # Only process ALERT_CREATED events (not ALERT_UPDATED which we publish ourselves)
        if trigger.get("event_type") != "ALERT_CREATED":
            return

        vehicle_id = trigger.get("vehicle_id", "unknown")
        rule_name = trigger.get("rule_name", "unknown")

        logger.info(
            "Processing alert trigger",
            extra={"vehicle_id": vehicle_id, "rule": rule_name},
        )
        await self.handler.handle(trigger)
