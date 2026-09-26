"""Publishes alert triggers to the alerts.notifications Kafka topic."""
import logging

from aiokafka import AIOKafkaProducer

from app.models.alert_trigger import RuleTrigger
from shared.kafka.producer import publish

logger = logging.getLogger(__name__)

ALERTS_TOPIC = "alerts.notifications"


class AlertPublisher:
    def __init__(self, producer: AIOKafkaProducer) -> None:
        self.producer = producer

    async def publish_trigger(self, trigger: RuleTrigger, fingerprint: str) -> None:
        """Publish a rule trigger to the alerts.notifications topic."""
        payload = {
            "event_type": "ALERT_CREATED",
            "vehicle_id": trigger.vehicle_id,
            "depot_id": trigger.depot_id,
            "rule_name": trigger.rule_name,
            "severity": trigger.severity,
            "evidence": trigger.evidence,
            "recommendation": trigger.recommendation,
            "fingerprint": fingerprint,
            "trigger_ts": trigger.trigger_ts.isoformat(),
        }
        await publish(self.producer, ALERTS_TOPIC, payload, key=trigger.vehicle_id)
        logger.info(
            "Alert trigger published",
            extra={
                "vehicle_id": trigger.vehicle_id,
                "rule": trigger.rule_name,
                "severity": trigger.severity,
                "fingerprint": fingerprint[:16],
            },
        )
