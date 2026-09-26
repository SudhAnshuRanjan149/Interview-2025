"""
Shared async Redis client with connection pool.
All services share the same connection configuration.
"""
import logging
import os
from typing import Optional

import redis.asyncio as aioredis

logger = logging.getLogger(__name__)

REDIS_URL = os.environ.get("REDIS_URL", "redis://redis:6379/0")

_pool: Optional[aioredis.Redis] = None


def get_redis_pool(url: str = REDIS_URL) -> aioredis.Redis:
    """
    Return a shared async Redis connection pool.
    Creates the pool on first call; reuses thereafter.
    """
    global _pool
    if _pool is None:
        _pool = aioredis.from_url(
            url,
            encoding="utf-8",
            decode_responses=True,
            max_connections=20,
        )
        logger.info("Redis connection pool created", extra={"url": url})
    return _pool


async def close_redis_pool() -> None:
    global _pool
    if _pool is not None:
        await _pool.aclose()
        _pool = None
        logger.info("Redis connection pool closed")


async def get_redis() -> aioredis.Redis:
    """FastAPI dependency: returns the shared Redis client."""
    return get_redis_pool()
