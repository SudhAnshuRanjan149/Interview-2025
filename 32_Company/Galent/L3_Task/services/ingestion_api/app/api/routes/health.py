"""Health check endpoint."""
import logging

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.core.config import settings
from shared.kafka.producer import get_producer
from shared.redis_client.client import get_redis_pool

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get("/health", summary="Service health check")
async def health_check() -> JSONResponse:
    """
    Returns connectivity status for Kafka and Redis.
    """
    checks: dict = {"kafka": "unknown", "redis": "unknown"}

    # Redis check
    try:
        redis = get_redis_pool(settings.redis_url)
        await redis.ping()
        checks["redis"] = "ok"
    except Exception as exc:
        checks["redis"] = f"error: {exc}"

    # Kafka check (basic — producer exists)
    try:
        await get_producer(settings.kafka_bootstrap_servers)
        checks["kafka"] = "ok"
    except Exception as exc:
        checks["kafka"] = f"error: {exc}"

    healthy = all(v == "ok" for v in checks.values())
    return JSONResponse(
        content={"status": "healthy" if healthy else "degraded", "checks": checks},
        status_code=200 if healthy else 503,
    )
