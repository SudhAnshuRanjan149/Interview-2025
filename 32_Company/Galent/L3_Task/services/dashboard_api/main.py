"""
Dashboard API — FastAPI main entrypoint.
REST + WebSocket API serving all dashboard data.
Also consumes from alerts.notifications to push live updates via WebSocket.
"""
import asyncio
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import alerts, fleet, vehicles, websocket
from app.core.config import settings
from app.services.ws_manager import ws_manager
from shared.db.session import engine
from shared.kafka.consumer import BaseKafkaConsumer
from shared.kafka.producer import close_producer
from shared.redis_client.client import close_redis_pool, get_redis_pool

logging.basicConfig(
    level=getattr(logging, settings.log_level.upper(), logging.INFO),
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
)
logger = logging.getLogger("dashboard_api")


class NotificationsConsumer(BaseKafkaConsumer):
    """Consumes alerts.notifications and broadcasts to WebSocket clients."""

    async def handle_message(self, msg) -> None:
        event = msg.value
        if not isinstance(event, dict):
            return

        event_type = event.get("event_type", "")
        payload = {k: v for k, v in event.items() if k != "schema_version"}

        await ws_manager.broadcast({
            "type": event_type,
            "payload": payload,
            "ts": event.get("trigger_ts", ""),
        })

        # Invalidate fleet health cache on new alert
        if event_type == "ALERT_CREATED":
            try:
                redis = get_redis_pool(settings.redis_url)
                await redis.delete("cache:fleet:health")
            except Exception:
                pass


_consumer: NotificationsConsumer | None = None
_consumer_task: asyncio.Task | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _consumer, _consumer_task

    logger.info("Dashboard API starting up…")
    get_redis_pool(settings.redis_url)

    # Start Kafka → WebSocket bridge consumer
    _consumer = NotificationsConsumer(
        topics=["alerts.notifications"],
        bootstrap_servers=settings.kafka_bootstrap_servers,
        group_id=settings.kafka_consumer_group_id,
    )
    await _consumer.start()
    _consumer_task = asyncio.create_task(_consumer.run())
    logger.info("Dashboard API ready. WS bridge active.")

    yield

    logger.info("Dashboard API shutting down…")
    if _consumer_task:
        _consumer_task.cancel()
    if _consumer:
        await _consumer.stop()
    await close_producer()
    await close_redis_pool()
    await engine.dispose()


app = FastAPI(
    title="Fleet Maintenance — Dashboard API",
    description="REST + WebSocket API for fleet health dashboard.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fleet.router, tags=["Fleet"])
app.include_router(alerts.router, tags=["Alerts"])
app.include_router(vehicles.router, tags=["Vehicles"])
app.include_router(websocket.router, tags=["WebSocket"])


@app.get("/health")
async def health():
    return {"status": "ok", "ws_connections": ws_manager.connection_count}
