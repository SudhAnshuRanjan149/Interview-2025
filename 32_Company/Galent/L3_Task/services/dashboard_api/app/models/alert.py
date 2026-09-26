"""SQLAlchemy ORM models for Dashboard API (read-only views)."""
from __future__ import annotations
import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, Date, DateTime, Enum, Float, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.sql import func

from shared.db.session import Base
from shared.models.enums import AlertStatus, PartsStatus, Severity


class MaintenanceAlert(Base):
    __tablename__ = "maintenance_alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vehicle_id = Column(String(50), nullable=False)
    depot_id = Column(String(50))
    rule_name = Column(String(100), nullable=False)
    severity = Column(Enum(Severity, name="severity_level"), nullable=False)
    status = Column(Enum(AlertStatus, name="alert_status"), nullable=False)
    parts_status = Column(Enum(PartsStatus, name="parts_status"), nullable=False)
    evidence = Column(JSONB, nullable=False)
    recommendation = Column(Text)
    fingerprint = Column(String(64), unique=True, nullable=False)
    parts_data = Column(JSONB)
    resolved_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now())


class Vehicle(Base):
    __tablename__ = "vehicles"

    vehicle_id = Column(String(50), primary_key=True)
    depot_id = Column(String(50))
    make = Column(String(100))
    model = Column(String(100))
    year = Column(Integer)
    registration = Column(String(20))
    status = Column(String(20))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now())


class Depot(Base):
    __tablename__ = "depots"

    depot_id = Column(String(50), primary_key=True)
    name = Column(String(200), nullable=False)
    region = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class TelemetryReading(Base):
    __tablename__ = "telemetry_readings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vehicle_id = Column(String(50), nullable=False)
    ts = Column(DateTime(timezone=True), nullable=False)
    engine_temp_c = Column(Numeric(6, 2))
    battery_voltage = Column(Numeric(5, 2))
    odometer_km = Column(Numeric(10, 2))
    dtc_codes = Column(ARRAY(Text))
    depot_id = Column(String(50))
    late_arrival = Column(Boolean, default=False)


class ServiceRecord(Base):
    __tablename__ = "service_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vehicle_id = Column(String(50), nullable=False)
    service_date = Column(Date, nullable=False)
    service_type = Column(String(50), nullable=False)
    odometer_km = Column(Numeric(10, 2))
    depot_id = Column(String(50))
    technician_id = Column(String(100))
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
