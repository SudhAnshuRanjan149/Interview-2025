"""
Redis-backed idempotency service for alert fingerprints.
Prevents the same alert trigger from being published to Kafka more than once.
"""
import logging

import redis.asyncio as aioredis

logger = logging.getLogger(__name__)

KEY_PREFIX = "alert:fingerprint:"
TTL_SECONDS = 30 * 24 * 3600  # 30 days


class IdempotencyService:
    def __init__(self, redis: aioredis.Redis) -> None:
        self.redis = redis

    async def is_seen(self, fingerprint: str) -> bool:
        """Return True if this fingerprint has already been processed."""
        key = f"{KEY_PREFIX}{fingerprint}"
        return bool(await self.redis.exists(key))

    async def mark_seen(self, fingerprint: str) -> None:
        """Record fingerprint as seen (SETNX — no-op if already exists)."""
        key = f"{KEY_PREFIX}{fingerprint}"
        await self.redis.set(key, 1, ex=TTL_SECONDS, nx=True)
        logger.debug("Fingerprint marked as seen: %s", fingerprint[:16])
