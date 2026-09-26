"""
Fleet health REST endpoints.
GET /fleet/health — overall summary
GET /fleet/summary — depot-filtered summary
"""
import json
import logging
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, Query

from app.core.auth import get_current_user
from app.repository.alert_repo import FleetRepo
from shared.db.session import get_db
from shared.redis_client.client import get_redis

router = APIRouter()
logger = logging.getLogger(__name__)

CACHE_KEY = "cache:fleet:health"
DEPOT_CACHE_KEY = "cache:fleet:depot:{depot_id}"
CACHE_TTL = 10  # seconds


@router.get("/fleet/health", summary="Overall fleet health summary")
async def get_fleet_health(
    _: dict = Depends(get_current_user),
    session=Depends(get_db),
    redis=Depends(get_redis),
) -> dict:
    """Returns fleet-wide health summary with Redis caching (TTL 10s)."""
    # Try cache first
    cached = await redis.get(CACHE_KEY)
    if cached:
        return json.loads(cached)

    repo = FleetRepo(session)
    counts = await repo.get_fleet_counts()
    high_risk = await repo.get_high_risk_vehicles()

    result = {
        **counts,
        "high_risk_vehicles": high_risk,
        "last_updated": datetime.now(tz=timezone.utc).isoformat(),
    }

    await redis.set(CACHE_KEY, json.dumps(result), ex=CACHE_TTL)
    return result


@router.get("/fleet/summary", summary="Depot-filtered fleet summary")
async def get_fleet_summary(
    depot_id: str = Query(..., description="Depot ID to filter by"),
    _: dict = Depends(get_current_user),
    session=Depends(get_db),
    redis=Depends(get_redis),
) -> dict:
    """Returns fleet summary filtered by depot, cached per depot."""
    cache_key = DEPOT_CACHE_KEY.format(depot_id=depot_id)
    cached = await redis.get(cache_key)
    if cached:
        return json.loads(cached)

    from sqlalchemy import and_, func, select
    from app.models.alert import MaintenanceAlert
    from shared.models.enums import AlertStatus, Severity

    open_q = (
        select(func.count())
        .select_from(MaintenanceAlert)
        .where(and_(
            MaintenanceAlert.depot_id == depot_id,
            MaintenanceAlert.status == AlertStatus.OPEN,
        ))
    )
    open_count = (await session.execute(open_q)).scalar() or 0

    critical_q = (
        select(func.count())
        .select_from(MaintenanceAlert)
        .where(and_(
            MaintenanceAlert.depot_id == depot_id,
            MaintenanceAlert.status == AlertStatus.OPEN,
            MaintenanceAlert.severity.in_([Severity.HIGH, Severity.CRITICAL]),
        ))
    )
    critical_count = (await session.execute(critical_q)).scalar() or 0

    result = {
        "depot_id": depot_id,
        "open_alerts": open_count,
        "critical_alerts": critical_count,
        "last_updated": datetime.now(tz=timezone.utc).isoformat(),
    }
    await redis.set(cache_key, json.dumps(result), ex=CACHE_TTL)
    return result
