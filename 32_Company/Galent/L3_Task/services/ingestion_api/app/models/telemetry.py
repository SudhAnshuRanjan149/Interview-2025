"""Pydantic input models for telemetry events."""
from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, model_validator


class TelemetryEvent(BaseModel):
    vehicle_id: str = Field(..., description="Vehicle identifier, e.g. 'VH-001'")
    timestamp: datetime = Field(..., description="Event time in UTC (ISO-8601)")
    engine_temp_c: Optional[float] = Field(None, description="Engine temperature in Celsius")
    battery_voltage: Optional[float] = Field(None, description="Battery voltage in Volts")
    odometer_km: Optional[float] = Field(None, description="Odometer reading in kilometres")
    dtc_codes: list[str] = Field(default_factory=list, description="OBD-II fault codes")
    depot_id: Optional[str] = Field(None, description="Depot identifier")
    late_arrival: bool = Field(False, description="True if event arrived >24h late")

    model_config = {"extra": "ignore"}  # schema-change tolerance


class BatchTelemetryRequest(BaseModel):
    events: list[TelemetryEvent] = Field(
        ..., description="Batch of telemetry events (max 100)"
    )


class TelemetryResponse(BaseModel):
    status: str
    event_id: Optional[str] = None
    duplicate: bool = False
    message: Optional[str] = None


class BatchTelemetryResponse(BaseModel):
    results: list[TelemetryResponse]
    accepted: int
    duplicates: int
    errors: int
