"""Redis deduplication for service records."""
import logging
import redis.asyncio as aioredis
from app.parser.csv_parser import ServiceRecord

logger = logging.getLogger(__name__)
KEY_PREFIX = "dedup:service:"
TTL_SECONDS = 365 * 24 * 3600  # 365 days


class ServiceRecordDeduplicator:
    def __init__(self, redis: aioredis.Redis) -> None:
        self.redis = redis

    async def is_duplicate(self, record: ServiceRecord) -> bool:
        key = self._make_key(record)
        return bool(await self.redis.exists(key))

    async def mark_seen(self, record: ServiceRecord) -> None:
        key = self._make_key(record)
        await self.redis.set(key, 1, ex=TTL_SECONDS)

    @staticmethod
    def _make_key(record: ServiceRecord) -> str:
        return f"{KEY_PREFIX}{record.vehicle_id}:{record.service_date}:{record.service_type}"
