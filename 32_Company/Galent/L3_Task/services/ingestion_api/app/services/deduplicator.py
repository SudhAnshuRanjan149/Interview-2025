"""
Redis-backed deduplication for telemetry events.
Uses SHA256 hash of event fields as dedup key.
"""
import hashlib
import logging

import redis.asyncio as aioredis

from app.models.telemetry import TelemetryEvent

logger = logging.getLogger(__name__)

KEY_PREFIX = "dedup:telemetry:"
TTL_SECONDS = 86400  # 24 hours


class Deduplicator:
    def __init__(self, redis: aioredis.Redis) -> None:
        self.redis = redis

    async def is_duplicate(self, event: TelemetryEvent) -> bool:
        """Return True if this exact event was already seen."""
        key = self._make_key(event)
        exists = await self.redis.exists(key)
        return bool(exists)

    async def mark_seen(self, event: TelemetryEvent) -> None:
        """Record this event so future duplicates are detected."""
        key = self._make_key(event)
        await self.redis.set(key, 1, ex=TTL_SECONDS)

    def _make_key(self, event: TelemetryEvent) -> str:
        return f"{KEY_PREFIX}{event.vehicle_id}:{self._hash(event)}"

    @staticmethod
    def _hash(event: TelemetryEvent) -> str:
        payload = (
            f"{event.vehicle_id}|{event.timestamp.isoformat()}|"
            f"{event.engine_temp_c}|{event.battery_voltage}|"
            f"{event.odometer_km}|{sorted(event.dtc_codes)}"
        )
        return hashlib.sha256(payload.encode()).hexdigest()[:16]
