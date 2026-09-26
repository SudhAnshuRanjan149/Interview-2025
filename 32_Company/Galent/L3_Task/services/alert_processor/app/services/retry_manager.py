"""
Redis-backed retry manager using a sorted set.
Score = next_retry_at (unix timestamp).
"""
import logging
import time

import redis.asyncio as aioredis

logger = logging.getLogger(__name__)

RETRY_QUEUE_KEY = "retry:parts_requests"
MAX_ATTEMPTS = 5
BACKOFF_BASE = 5  # seconds


class RetryManager:
    def __init__(self, redis: aioredis.Redis) -> None:
        self.redis = redis

    async def enqueue(self, alert_id: str, attempt: int) -> None:
        """Add an alert to the retry queue. Score = when to next retry."""
        delay = BACKOFF_BASE * (2 ** (attempt - 1))  # 5, 10, 20, 40, 80
        next_retry = time.time() + delay
        member = f"{alert_id}:{attempt}"
        await self.redis.zadd(RETRY_QUEUE_KEY, {member: next_retry})
        logger.info(
            "Enqueued parts retry",
            extra={"alert_id": alert_id, "attempt": attempt, "delay_s": delay},
        )

    async def dequeue_due(self) -> list[tuple[str, int]]:
        """Return items whose retry time has passed. Removes them from the queue."""
        now = time.time()
        items = await self.redis.zrangebyscore(RETRY_QUEUE_KEY, 0, now)
        if items:
            await self.redis.zremrangebyscore(RETRY_QUEUE_KEY, 0, now)

        results = []
        for item in items:
            parts = item.rsplit(":", 1)
            if len(parts) == 2:
                alert_id, attempt_str = parts
                results.append((alert_id, int(attempt_str)))
        return results

    @property
    def max_attempts(self) -> int:
        return MAX_ATTEMPTS
