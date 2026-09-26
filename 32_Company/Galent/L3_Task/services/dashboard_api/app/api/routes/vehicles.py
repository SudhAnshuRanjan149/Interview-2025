"""Vehicle history and depot listing endpoints."""
from fastapi import APIRouter, Depends, HTTPException, Path

from app.core.auth import get_current_user
from app.repository.alert_repo import FleetRepo, VehicleRepo
from shared.db.session import get_db

router = APIRouter()


@router.get("/vehicles/{vehicle_id}/history", summary="Vehicle telemetry and service history")
async def get_vehicle_history(
    vehicle_id: str = Path(...),
    _: dict = Depends(get_current_user),
    session=Depends(get_db),
) -> dict:
    repo = VehicleRepo(session)
    return await repo.get_history(vehicle_id)


@router.get("/depots", summary="List all depots")
async def list_depots(
    _: dict = Depends(get_current_user),
    session=Depends(get_db),
) -> list:
    repo = FleetRepo(session)
    depots = await repo.get_depots()
    return [
        {"depot_id": d.depot_id, "name": d.name, "region": d.region}
        for d in depots
    ]
