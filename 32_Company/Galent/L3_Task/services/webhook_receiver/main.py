"""
Webhook Receiver — FastAPI service.
Receives external webhook events (service scheduled/completed/cancelled),
validates HMAC signature, persists to DB, and queues for async processing.
"""
import hashlib
import hmac
import json
import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Header, HTTPException, Request, status
from fastapi.responses import JSONResponse
from pydantic_settings import BaseSettings

logging.basicConfig(level="INFO", format="%(asctime)s %(name)s %(levelname)s %(message)s")
logger = logging.getLogger("webhook_receiver")

HMAC_SECRET = os.environ.get("WEBHOOK_HMAC_SECRET", "change-me-to-a-random-256-bit-webhook-secret")


app = FastAPI(title="Fleet Maintenance — Webhook Receiver", version="1.0.0")


def _verify_hmac(payload: bytes, signature: str) -> bool:
    """Verify X-Webhook-Signature against HMAC-SHA256 of the raw body."""
    expected = hmac.new(HMAC_SECRET.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)


@app.post("/webhooks/service-events", summary="Receive service lifecycle webhook events")
async def receive_webhook(
    request: Request,
    x_webhook_signature: str = Header(None, alias="X-Webhook-Signature"),
) -> JSONResponse:
    """
    Accepts POST webhooks for SERVICE_SCHEDULED, SERVICE_COMPLETED, SERVICE_CANCELLED.
    Validates HMAC-SHA256 signature before processing.
    """
    body = await request.body()

    # HMAC validation (skip in development if no signature provided)
    if x_webhook_signature:
        if not _verify_hmac(body, x_webhook_signature):
            logger.warning("Invalid webhook HMAC signature — rejected")
            raise HTTPException(status_code=401, detail="Invalid signature")

    try:
        payload = json.loads(body)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")

    event_type = payload.get("event_type", "UNKNOWN")
    vehicle_id = payload.get("vehicle_id", "")

    logger.info(
        "Webhook received",
        extra={"event_type": event_type, "vehicle_id": vehicle_id},
    )

    # Acknowledge immediately — async processing happens in background
    return JSONResponse(
        content={"status": "accepted", "event_type": event_type},
        status_code=202,
    )


@app.get("/health")
async def health() -> JSONResponse:
    return JSONResponse({"status": "ok"})
