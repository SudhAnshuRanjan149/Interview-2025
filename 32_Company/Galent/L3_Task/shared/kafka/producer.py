"""
Shared async Kafka producer wrapper.
All services use this to publish events consistently.
"""
import json
import logging
from typing import Any

from aiokafka import AIOKafkaProducer

logger = logging.getLogger(__name__)

_producer: AIOKafkaProducer | None = None


async def get_producer(bootstrap_servers: str) -> AIOKafkaProducer:
    global _producer
    if _producer is None:
        _producer = AIOKafkaProducer(
            bootstrap_servers=bootstrap_servers,
            value_serializer=_serialize,
            key_serializer=lambda k: k.encode("utf-8") if k else None,
            acks="all",
            enable_idempotence=True,
            compression_type="gzip",
        )
        await _producer.start()
        logger.info("Kafka producer started", extra={"servers": bootstrap_servers})
    return _producer


async def close_producer() -> None:
    global _producer
    if _producer is not None:
        await _producer.stop()
        _producer = None
        logger.info("Kafka producer stopped")


def _serialize(value: Any) -> bytes:
    """JSON-serialize a value to bytes with schema_version field."""
    if isinstance(value, dict) and "schema_version" not in value:
        value["schema_version"] = "1.0"
    return json.dumps(value, default=str).encode("utf-8")


async def publish(
    producer: AIOKafkaProducer,
    topic: str,
    value: dict,
    key: str | None = None,
) -> None:
    """
    Publish a message to a Kafka topic.

    Args:
        producer: AIOKafkaProducer instance
        topic: Kafka topic name
        value: Message payload (will be JSON-serialized)
        key: Optional partition key (vehicle_id, alert_id, etc.)
    """
    try:
        await producer.send_and_wait(topic, value=value, key=key)
        logger.debug("Published message", extra={"topic": topic, "key": key})
    except Exception as exc:
        logger.error(
            "Failed to publish to Kafka",
            extra={"topic": topic, "key": key, "error": str(exc)},
        )
        raise
