"""
Parts retry job — processes due items from the Redis retry queue.
"""
import logging
import redis.asyncio as aioredis
import httpx

logger = logging.getLogger(__name__)


class PartsRetryJob:
    def __init__(self, redis: aioredis.Redis, parts_api_base_url: str) -> None:
        self.redis = redis
        self.parts_api_base_url = parts_api_base_url
        self.retry_queue_key = "retry:parts_requests"
        self.max_attempts = 5

    async def run(self) -> None:
        """Dequeue due retry items and re-check parts availability."""
        import time
        now = time.time()
        items = await self.redis.zrangebyscore(self.retry_queue_key, 0, now)
        if not items:
            return

        await self.redis.zremrangebyscore(self.retry_queue_key, 0, now)
        logger.info("Parts retry job: %d items due", len(items))

        for item in items:
            parts = item.rsplit(":", 1)
            if len(parts) != 2:
                continue

            alert_id, attempt_str = parts
            attempt = int(attempt_str)

            try:
                async with httpx.AsyncClient(timeout=10.0) as client:
                    resp = await client.get(
                        f"{self.parts_api_base_url}/parts/available",
                        params={"codes": "P001,P002,P003"},
                    )

                if resp.status_code == 200:
                    # TODO: update alert parts_status in DB to AVAILABLE
                    logger.info("Parts retry succeeded for alert %s", alert_id)
                elif attempt >= self.max_attempts:
                    # TODO: update alert parts_status in DB to UNAVAILABLE
                    logger.error("Max retries (%d) reached for alert %s", self.max_attempts, alert_id)
                else:
                    # Re-enqueue with backoff
                    delay = 5 * (2 ** attempt)
                    next_retry = time.time() + delay
                    await self.redis.zadd(
                        self.retry_queue_key,
                        {f"{alert_id}:{attempt + 1}": next_retry},
                    )
                    logger.info("Re-enqueued alert %s for retry %d", alert_id, attempt + 1)

            except Exception as exc:
                logger.error("Parts retry error for alert %s: %s", alert_id, exc)
