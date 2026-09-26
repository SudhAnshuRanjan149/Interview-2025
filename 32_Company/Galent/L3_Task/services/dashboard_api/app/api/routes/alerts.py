"""
Alerts REST endpoints.
GET /alerts — paginated list with filters
GET /alerts/{id} — full alert detail
PATCH /alerts/{id} — update status
"""
import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Path, Query, status
from pydantic import BaseModel

from app.core.auth import get_current_user
from app.repository.alert_repo import AlertRepo
from shared.db.session import get_db
from shared.models.enums import AlertStatus

router = APIRouter()
logger = logging.getLogger(__name__)


class AlertStatusUpdate(BaseModel):
    status: str  # ACKNOWLEDGED | RESOLVED


def _serialize_alert(alert) -> dict:
    return {
        "id": str(alert.id),
        "vehicle_id": alert.vehicle_id,
        "depot_id": alert.depot_id,
        "rule_name": alert.rule_name,
        "severity": alert.severity.value,
        "status": alert.status.value,
        "parts_status": alert.parts_status.value,
        "evidence": alert.evidence,
        "recommendation": alert.recommendation,
        "fingerprint": alert.fingerprint,
        "parts_data": alert.parts_data,
        "resolved_at": alert.resolved_at.isoformat() if alert.resolved_at else None,
        "created_at": alert.created_at.isoformat() if alert.created_at else None,
        "updated_at": alert.updated_at.isoformat() if alert.updated_at else None,
    }


@router.get("/alerts", summary="List alerts with optional filters")
async def list_alerts(
    depot_id: Optional[str] = Query(None),
    vehicle_id: Optional[str] = Query(None),
    severity: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    rule_name: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    _: dict = Depends(get_current_user),
    session=Depends(get_db),
) -> dict:
    repo = AlertRepo(session)
    alerts, total = await repo.get_list(
        depot_id=depot_id,
        vehicle_id=vehicle_id,
        severity=severity,
        status=status,
        rule_name=rule_name,
        page=page,
        page_size=page_size,
    )
    return {
        "page": page,
        "page_size": page_size,
        "total": total,
        "items": [_serialize_alert(a) for a in alerts],
    }


@router.get("/alerts/{alert_id}", summary="Get alert detail by ID")
async def get_alert(
    alert_id: str = Path(...),
    _: dict = Depends(get_current_user),
    session=Depends(get_db),
) -> dict:
    repo = AlertRepo(session)
    alert = await repo.get_by_id(alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return _serialize_alert(alert)


@router.patch("/alerts/{alert_id}", summary="Update alert status (ACK / RESOLVED)")
async def update_alert_status(
    alert_id: str = Path(...),
    body: AlertStatusUpdate = None,
    _: dict = Depends(get_current_user),
    session=Depends(get_db),
) -> dict:
    try:
        new_status = AlertStatus(body.status)
    except ValueError:
        raise HTTPException(status_code=400, detail=f"Invalid status: {body.status}")

    repo = AlertRepo(session)
    alert = await repo.update_status(alert_id, new_status)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    logger.info("Alert %s status updated to %s", alert_id, new_status.value)
    return _serialize_alert(alert)
