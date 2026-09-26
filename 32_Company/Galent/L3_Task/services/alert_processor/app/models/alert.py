"""SQLAlchemy ORM model for maintenance_alerts table."""
from __future__ import annotations
import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, Enum, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from shared.db.session import Base
from shared.models.enums import AlertStatus, PartsStatus, Severity


class MaintenanceAlert(Base):
    __tablename__ = "maintenance_alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vehicle_id = Column(String(50), nullable=False, index=True)
    depot_id = Column(String(50), nullable=True, index=True)
    rule_name = Column(String(100), nullable=False)
    severity = Column(Enum(Severity, name="severity_level"), nullable=False)
    status = Column(Enum(AlertStatus, name="alert_status"), nullable=False, default=AlertStatus.OPEN)
    parts_status = Column(Enum(PartsStatus, name="parts_status"), nullable=False, default=PartsStatus.PENDING)
    evidence = Column(JSONB, nullable=False)
    recommendation = Column(Text, nullable=True)
    fingerprint = Column(String(64), unique=True, nullable=False)
    parts_data = Column(JSONB, nullable=True)
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
