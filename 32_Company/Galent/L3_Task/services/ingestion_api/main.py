"""
Ingestion API — FastAPI application entrypoint.
Accepts streaming telemetry from vehicle agents, validates, deduplicates,
and publishes to Kafka `telemetry.raw` topic.
"""
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import health, telemetry
from app.core.config import settings
from app.core.logging import setup_logging
from shared.kafka.producer import close_producer, get_producer
from shared.redis_client.client import close_redis_pool, get_redis_pool

setup_logging()
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown lifecycle management."""
    logger.info("Ingestion API starting up…")
    # Warm up connections
    get_redis_pool(settings.redis_url)
    await get_producer(settings.kafka_bootstrap_servers)
    logger.info("Ingestion API ready")
    yield
    logger.info("Ingestion API shutting down…")
    await close_producer()
    await close_redis_pool()


app = FastAPI(
    title="Fleet Maintenance — Ingestion API",
    description="Accepts telemetry events from vehicle agents.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["Health"])
app.include_router(telemetry.router, prefix="/telemetry", tags=["Telemetry"])
