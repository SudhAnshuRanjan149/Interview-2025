"""
Shared async Kafka consumer base class.
Provides offset-commit-after-processing semantics and error skipping.
"""
import json
import logging
from collections.abc import AsyncGenerator
from typing import Any

from aiokafka import AIOKafkaConsumer, ConsumerRecord

logger = logging.getLogger(__name__)


class BaseKafkaConsumer:
    """
    Base async Kafka consumer.

    Subclass and implement `handle_message(msg)` to process records.
    Commits offsets only after successful processing.
    On exception: logs the error, skips the message, and commits to avoid
    infinite re-processing loops.
    """

    def __init__(
        self,
        topics: list[str],
        bootstrap_servers: str,
        group_id: str,
        auto_offset_reset: str = "earliest",
    ) -> None:
        self.topics = topics
        self.bootstrap_servers = bootstrap_servers
        self.group_id = group_id
        self.auto_offset_reset = auto_offset_reset
        self._consumer: AIOKafkaConsumer | None = None
        self._running = False

    async def start(self) -> None:
        self._consumer = AIOKafkaConsumer(
            *self.topics,
            bootstrap_servers=self.bootstrap_servers,
            group_id=self.group_id,
            auto_offset_reset=self.auto_offset_reset,
            enable_auto_commit=False,  # manual commit for at-least-once semantics
            value_deserializer=self._deserialize,
        )
        await self._consumer.start()
        self._running = True
        logger.info(
            "Kafka consumer started",
            extra={"topics": self.topics, "group": self.group_id},
        )

    async def stop(self) -> None:
        self._running = False
        if self._consumer:
            await self._consumer.stop()
            logger.info("Kafka consumer stopped")

    async def run(self) -> None:
        """Main consumer loop. Call after start()."""
        if not self._consumer:
            raise RuntimeError("Consumer not started. Call start() first.")

        async for msg in self._consumer:
            try:
                await self.handle_message(msg)
                await self._consumer.commit()
            except Exception as exc:
                logger.error(
                    "Error processing Kafka message — skipping",
                    extra={
                        "topic": msg.topic,
                        "partition": msg.partition,
                        "offset": msg.offset,
                        "error": str(exc),
                    },
                    exc_info=True,
                )
                # Commit offset even on error to avoid infinite loop
                await self._consumer.commit()

    async def handle_message(self, msg: ConsumerRecord) -> None:
        """Override in subclass to process a message."""
        raise NotImplementedError

    @staticmethod
    def _deserialize(raw: bytes) -> Any:
        try:
            return json.loads(raw.decode("utf-8"))
        except Exception:
            return raw
