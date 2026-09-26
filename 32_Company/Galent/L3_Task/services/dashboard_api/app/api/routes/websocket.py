"""
WebSocket endpoint for live dashboard updates.
WS /ws/live-updates — authenticated, depot-filterable, heartbeat-enabled.
"""
import asyncio
import json
import logging
from datetime import datetime, timezone

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.core.config import settings
from app.services.ws_manager import ws_manager

router = APIRouter()
logger = logging.getLogger(__name__)

DEV_TOKEN = "dev-dashboard-token"


@router.websocket("/ws/live-updates")
async def websocket_live_updates(websocket: WebSocket) -> None:
    """
    WebSocket endpoint for real-time fleet health updates.
    Clients send:  {"type": "SUBSCRIBE", "filter": {"depot_id": "D01"}}
                   {"type": "PONG"}
    Server sends:  ALERT_CREATED, ALERT_UPDATED, FLEET_HEALTH_CHANGED, PING
    """
    # Basic token auth via query param (Bearer in query for WS compatibility)
    token = websocket.query_params.get("token", "")
    if settings.app_env == "development" and token != DEV_TOKEN and token != "":
        pass  # Allow unauthenticated in dev for easy testing
    elif settings.app_env != "development":
        try:
            from jose import jwt
            jwt.decode(token, settings.jwt_secret, algorithms=["HS256"])
        except Exception:
            await websocket.close(code=4001)
            return

    await ws_manager.connect(websocket)

    # Start heartbeat task
    async def heartbeat():
        while True:
            await asyncio.sleep(settings.ws_heartbeat_interval_seconds)
            try:
                await websocket.send_json({
                    "type": "PING",
                    "ts": datetime.now(tz=timezone.utc).isoformat(),
                })
            except Exception:
                break

    hb_task = asyncio.create_task(heartbeat())

    try:
        while True:
            raw = await websocket.receive_text()
            try:
                msg = json.loads(raw)
                msg_type = msg.get("type")

                if msg_type == "SUBSCRIBE":
                    depot_filter = msg.get("filter", {}).get("depot_id")
                    ws_manager.set_filter(websocket, depot_filter)
                    await websocket.send_json({
                        "type": "SUBSCRIBED",
                        "filter": {"depot_id": depot_filter},
                    })
                elif msg_type == "PONG":
                    pass  # heartbeat acknowledged
                else:
                    logger.debug("Unknown WS message type: %s", msg_type)
            except json.JSONDecodeError:
                logger.warning("Invalid JSON received on WebSocket")

    except WebSocketDisconnect:
        pass
    finally:
        hb_task.cancel()
        ws_manager.disconnect(websocket)
        logger.info("WebSocket client disconnected")
