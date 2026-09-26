"""Publishes events to alerts.notifications topic for WebSocket push."""
import logging

from aiokafka import AIOKafkaProducer
from shared.kafka.producer import publish

logger = logging.getLogger(__name__)
NOTIFICATIONS_TOPIC = "alerts.notifications"


class AlertNotifier:
    def __init__(self, producer: AIOKafkaProducer) -> None:
        self.producer = producer

    async def publish_created(self, alert_id: str, alert_data: dict) -> None:
        """Notify dashboard consumers that a new alert was created."""
        payload = {
            "event_type": "ALERT_CREATED",
            "alert_id": alert_id,
            "vehicle_id": alert_data.get("vehicle_id"),
            "depot_id": alert_data.get("depot_id"),
            "rule_name": alert_data.get("rule_name"),
            "severity": alert_data.get("severity"),
            "status": "OPEN",
            "parts_status": "PENDING",
        }
        await publish(self.producer, NOTIFICATIONS_TOPIC, payload, key=alert_id)

    async def publish_updated(self, alert_id: str, status: str, parts_status: str) -> None:
        """Notify dashboard consumers that an alert was updated."""
        payload = {
            "event_type": "ALERT_UPDATED",
            "alert_id": alert_id,
            "status": status,
            "parts_status": parts_status,
        }
        await publish(self.producer, NOTIFICATIONS_TOPIC, payload, key=alert_id)
