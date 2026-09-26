"""
Fleet, alerts, and vehicle repositories for Dashboard API.
"""
from __future__ import annotations
import uuid
from typing import Optional

from sqlalchemy import and_, func, or_, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.alert import Depot, MaintenanceAlert, ServiceRecord, TelemetryReading, Vehicle
from shared.models.enums import AlertStatus, PartsStatus, Severity


class AlertRepo:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_list(
        self,
        depot_id: Optional[str] = None,
        vehicle_id: Optional[str] = None,
        severity: Optional[str] = None,
        status: Optional[str] = None,
        rule_name: Optional[str] = None,
        page: int = 1,
        page_size: int = 20,
    ) -> tuple[list[MaintenanceAlert], int]:
        """Return paginated alert list with optional filters."""
        filters = []
        if depot_id:
            filters.append(MaintenanceAlert.depot_id == depot_id)
        if vehicle_id:
            filters.append(MaintenanceAlert.vehicle_id == vehicle_id)
        if severity:
            filters.append(MaintenanceAlert.severity == Severity(severity))
        if status:
            filters.append(MaintenanceAlert.status == AlertStatus(status))
        if rule_name:
            filters.append(MaintenanceAlert.rule_name == rule_name)

        where_clause = and_(*filters) if filters else True

        # Count
        count_q = select(func.count()).select_from(MaintenanceAlert).where(where_clause)
        total = (await self.session.execute(count_q)).scalar() or 0

        # Items
        q = (
            select(MaintenanceAlert)
            .where(where_clause)
            .order_by(MaintenanceAlert.created_at.desc())
            .offset((page - 1) * page_size)
            .limit(page_size)
        )
        result = await self.session.execute(q)
        return result.scalars().all(), total

    async def get_by_id(self, alert_id: str) -> Optional[MaintenanceAlert]:
        result = await self.session.execute(
            select(MaintenanceAlert).where(MaintenanceAlert.id == uuid.UUID(alert_id))
        )
        return result.scalar_one_or_none()

    async def update_status(self, alert_id: str, new_status: AlertStatus) -> Optional[MaintenanceAlert]:
        alert = await self.get_by_id(alert_id)
        if alert:
            alert.status = new_status
            await self.session.flush()
        return alert


class FleetRepo:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_fleet_counts(self) -> dict:
        """Return total vehicles and open alert counts."""
        total_q = select(func.count()).select_from(Vehicle)
        total = (await self.session.execute(total_q)).scalar() or 0

        open_alerts_q = (
            select(func.count())
            .select_from(MaintenanceAlert)
            .where(MaintenanceAlert.status == AlertStatus.OPEN)
        )
        open_alerts = (await self.session.execute(open_alerts_q)).scalar() or 0

        critical_q = (
            select(func.count())
            .select_from(MaintenanceAlert)
            .where(
                and_(
                    MaintenanceAlert.status == AlertStatus.OPEN,
                    MaintenanceAlert.severity.in_([Severity.HIGH, Severity.CRITICAL]),
                )
            )
        )
        critical_alerts = (await self.session.execute(critical_q)).scalar() or 0

        # Vehicles with open alerts = at-risk
        at_risk_q = (
            select(func.count(MaintenanceAlert.vehicle_id.distinct()))
            .where(MaintenanceAlert.status == AlertStatus.OPEN)
        )
        at_risk = (await self.session.execute(at_risk_q)).scalar() or 0

        return {
            "total_vehicles": total,
            "at_risk": at_risk,
            "healthy": max(0, total - at_risk),
            "critical": critical_alerts,
            "open_alerts": open_alerts,
        }

    async def get_high_risk_vehicles(self, limit: int = 10) -> list[dict]:
        """Return vehicles with open HIGH/CRITICAL alerts."""
        q = (
            select(
                MaintenanceAlert.vehicle_id,
                MaintenanceAlert.depot_id,
                MaintenanceAlert.severity,
                func.count(MaintenanceAlert.id).label("active_alerts"),
                func.max(MaintenanceAlert.created_at).label("last_alert"),
            )
            .where(
                and_(
                    MaintenanceAlert.status == AlertStatus.OPEN,
                    MaintenanceAlert.severity.in_([Severity.HIGH, Severity.CRITICAL]),
                )
            )
            .group_by(
                MaintenanceAlert.vehicle_id,
                MaintenanceAlert.depot_id,
                MaintenanceAlert.severity,
            )
            .order_by(func.count(MaintenanceAlert.id).desc())
            .limit(limit)
        )
        result = await self.session.execute(q)
        return [
            {
                "vehicle_id": row.vehicle_id,
                "depot_id": row.depot_id,
                "severity": row.severity.value,
                "active_alerts": row.active_alerts,
                "last_alert": row.last_alert.isoformat() if row.last_alert else None,
            }
            for row in result
        ]

    async def get_depots(self) -> list[Depot]:
        result = await self.session.execute(select(Depot).order_by(Depot.depot_id))
        return result.scalars().all()


class VehicleRepo:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_history(self, vehicle_id: str) -> dict:
        """Return last 100 telemetry readings and service records for a vehicle."""
        telem_q = (
            select(TelemetryReading)
            .where(TelemetryReading.vehicle_id == vehicle_id)
            .order_by(TelemetryReading.ts.desc())
            .limit(100)
        )
        telem_result = await self.session.execute(telem_q)
        readings = telem_result.scalars().all()

        svc_q = (
            select(ServiceRecord)
            .where(ServiceRecord.vehicle_id == vehicle_id)
            .order_by(ServiceRecord.service_date.desc())
            .limit(20)
        )
        svc_result = await self.session.execute(svc_q)
        records = svc_result.scalars().all()

        return {
            "vehicle_id": vehicle_id,
            "telemetry_readings": [
                {
                    "ts": r.ts.isoformat(),
                    "engine_temp_c": float(r.engine_temp_c) if r.engine_temp_c else None,
                    "battery_voltage": float(r.battery_voltage) if r.battery_voltage else None,
                    "odometer_km": float(r.odometer_km) if r.odometer_km else None,
                    "dtc_codes": r.dtc_codes or [],
                    "late_arrival": r.late_arrival,
                }
                for r in readings
            ],
            "service_records": [
                {
                    "service_date": str(r.service_date),
                    "service_type": r.service_type,
                    "odometer_km": float(r.odometer_km) if r.odometer_km else None,
                    "technician_id": r.technician_id,
                    "notes": r.notes,
                }
                for r in records
            ],
        }
