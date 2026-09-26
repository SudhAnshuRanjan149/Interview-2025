"""Pydantic models for telemetry events and alert triggers used by the rule engine."""
from __future__ import annotations
from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel


class TelemetryEvent(BaseModel):
    vehicle_id: str
    timestamp: datetime
    engine_temp_c: Optional[float] = None
    battery_voltage: Optional[float] = None
    odometer_km: Optional[float] = None
    dtc_codes: list[str] = []
    depot_id: Optional[str] = None
    late_arrival: bool = False
    ingested_at: Optional[str] = None

    model_config = {"extra": "ignore"}


class ServiceRecord(BaseModel):
    vehicle_id: str
    service_date: str
    service_type: str
    odometer_km: Optional[float] = None
    depot_id: Optional[str] = None

    model_config = {"extra": "ignore"}
