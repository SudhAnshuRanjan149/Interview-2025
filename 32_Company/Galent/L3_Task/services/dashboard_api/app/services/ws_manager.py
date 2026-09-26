"""WebSocket connection manager for live dashboard updates."""
import asyncio
import logging
from datetime import datetime, timezone
from typing import Optional

from fastapi import WebSocket
from fastapi.websockets import WebSocketDisconnect

logger = logging.getLogger(__name__)


class WebSocketManager:
    """
    Manages active WebSocket connections.
    Supports per-connection depot filters for targeted broadcasts.
    """

    def __init__(self) -> None:
        # Map: WebSocket → optional depot_id filter
        self._connections: dict[WebSocket, Optional[str]] = {}

    async def connect(self, ws: WebSocket) -> None:
        await ws.accept()
        self._connections[ws] = None  # no filter by default
        logger.info("WebSocket connected. Total: %d", len(self._connections))

    def disconnect(self, ws: WebSocket) -> None:
        self._connections.pop(ws, None)
        logger.info("WebSocket disconnected. Total: %d", len(self._connections))

    def set_filter(self, ws: WebSocket, depot_id: Optional[str]) -> None:
        if ws in self._connections:
            self._connections[ws] = depot_id

    async def broadcast(self, message: dict) -> None:
        """Broadcast to all connected clients, respecting depot filters."""
        dead: list[WebSocket] = []
        depot_id = message.get("payload", {}).get("depot_id")

        for ws, ws_filter in list(self._connections.items()):
            # Apply filter: skip if client filtered to different depot
            if ws_filter and depot_id and ws_filter != depot_id:
                continue
            try:
                await ws.send_json(message)
            except (WebSocketDisconnect, RuntimeError):
                dead.append(ws)
            except Exception as exc:
                logger.warning("WS send error: %s", exc)
                dead.append(ws)

        for ws in dead:
            self.disconnect(ws)

    async def send_ping(self) -> None:
        """Send heartbeat PING to all connections."""
        ping = {"type": "PING", "ts": datetime.now(tz=timezone.utc).isoformat()}
        await self.broadcast(ping)

    @property
    def connection_count(self) -> int:
        return len(self._connections)


# Singleton instance shared across routes
ws_manager = WebSocketManager()
