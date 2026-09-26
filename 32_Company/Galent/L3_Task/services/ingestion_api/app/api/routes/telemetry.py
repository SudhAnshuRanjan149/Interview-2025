"""
POST /telemetry and POST /telemetry/batch routes.
Validates, deduplicates, checks timestamps, and publishes to Kafka.
"""
import logging
from datetime import datetime, timezone, timedelta

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.config import settings
from app.core.security import verify_api_key
from app.models.telemetry import (
    BatchTelemetryRequest,
    BatchTelemetryResponse,
    TelemetryEvent,
    TelemetryResponse,
)
from app.services.deduplicator import Deduplicator
from shared.kafka.producer import get_producer, publish
from shared.redis_client.client import get_redis

router = APIRouter()
logger = logging.getLogger(__name__)

TOPIC = "telemetry.raw"
FUTURE_TOLERANCE_SECONDS = 60
LATE_ARRIVAL_HOURS = 24


def _check_timestamp(event: TelemetryEvent) -> TelemetryEvent:
    """Validate event timestamp; tag late arrivals."""
    now = datetime.now(tz=timezone.utc)
    ts = event.timestamp

    # Ensure timezone-aware
    if ts.tzinfo is None:
        ts = ts.replace(tzinfo=timezone.utc)
        event = event.model_copy(update={"timestamp": ts})

    if ts > now + timedelta(seconds=FUTURE_TOLERANCE_SECONDS):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Timestamp is too far in the future (>{FUTURE_TOLERANCE_SECONDS}s ahead)",
        )

    if ts < now - timedelta(hours=LATE_ARRIVAL_HOURS):
        event = event.model_copy(update={"late_arrival": True})

    return event


@router.post(
    "",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=TelemetryResponse,
    summary="Ingest a single telemetry event",
)
async def ingest_telemetry(
    event: TelemetryEvent,
    _: str = Depends(verify_api_key),
    redis=Depends(get_redis),
) -> TelemetryResponse:
    """
    Accept a single telemetry reading from a vehicle agent.
    Returns 202 on success, 200 on duplicate.
    """
    event = _check_timestamp(event)

    dedup = Deduplicator(redis)
    if await dedup.is_duplicate(event):
        logger.debug("Duplicate telemetry event — dropped", extra={"vehicle_id": event.vehicle_id})
        return TelemetryResponse(status="duplicate", duplicate=True, message="Event already processed")

    producer = await get_producer(settings.kafka_bootstrap_servers)
    payload = event.model_dump(mode="json")
    payload["ingested_at"] = datetime.now(tz=timezone.utc).isoformat()

    await publish(producer, TOPIC, payload, key=event.vehicle_id)
    await dedup.mark_seen(event)

    logger.info("Telemetry ingested", extra={"vehicle_id": event.vehicle_id, "topic": TOPIC})
    return TelemetryResponse(status="accepted", duplicate=False)


@router.post(
    "/batch",
    status_code=status.HTTP_207_MULTI_STATUS,
    response_model=BatchTelemetryResponse,
    summary="Ingest a batch of telemetry events (max 100)",
)
async def ingest_telemetry_batch(
    request: BatchTelemetryRequest,
    _: str = Depends(verify_api_key),
    redis=Depends(get_redis),
) -> BatchTelemetryResponse:
    """
    Accept a batch of telemetry events (max 100).
    Returns 207 Multi-Status with per-event results.
    """
    if len(request.events) > settings.max_batch_size:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Batch size exceeds maximum of {settings.max_batch_size}",
        )

    dedup = Deduplicator(redis)
    producer = await get_producer(settings.kafka_bootstrap_servers)
    results = []
    accepted = duplicates = errors = 0

    for event in request.events:
        try:
            event = _check_timestamp(event)
            if await dedup.is_duplicate(event):
                results.append(TelemetryResponse(status="duplicate", duplicate=True))
                duplicates += 1
                continue

            payload = event.model_dump(mode="json")
            payload["ingested_at"] = datetime.now(tz=timezone.utc).isoformat()
            await publish(producer, TOPIC, payload, key=event.vehicle_id)
            await dedup.mark_seen(event)

            results.append(TelemetryResponse(status="accepted"))
            accepted += 1
        except HTTPException as exc:
            results.append(TelemetryResponse(status="error", message=exc.detail))
            errors += 1
        except Exception as exc:
            logger.error("Batch event error", extra={"error": str(exc)})
            results.append(TelemetryResponse(status="error", message="Internal error"))
            errors += 1

    return BatchTelemetryResponse(
        results=results, accepted=accepted, duplicates=duplicates, errors=errors
    )
