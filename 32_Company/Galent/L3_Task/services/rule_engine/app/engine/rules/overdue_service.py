"""
Overdue service rule: fires when a vehicle exceeds odometer or time service intervals.
"""
from __future__ import annotations
from datetime import datetime, timedelta, timezone
from typing import Optional

from app.engine.rules.base_rule import BaseRule
from app.engine.window_manager import VehicleWindow
from app.models.alert_trigger import RuleTrigger


class OverdueServiceRule(BaseRule):
    name = "overdue_service"
    severity = "MEDIUM"

    def evaluate(self, window: VehicleWindow, config: dict) -> Optional[RuleTrigger]:
        if not config.get("enabled", True):
            return None

        odometer_interval_km = float(config["odometer_interval_km"])
        time_interval_days = int(config["time_interval_days"])
        recommendation = config.get("recommendation", "")
        severity = config.get("severity", self.severity)

        # Do not trigger if no service history is known
        if window.last_service_km is None and window.last_service_date is None:
            return None

        triggered = False
        evidence = []
        now = datetime.now(tz=timezone.utc)

        # Odometer check
        if window.last_service_km is not None and window.last_odometer_km is not None:
            overdue_at_km = window.last_service_km + odometer_interval_km
            if window.last_odometer_km >= overdue_at_km:
                triggered = True
                evidence.append({
                    "reason": "odometer_exceeded",
                    "last_service_km": window.last_service_km,
                    "current_km": window.last_odometer_km,
                    "overdue_at_km": overdue_at_km,
                })

        # Time check
        if window.last_service_date is not None:
            last_date = window.last_service_date
            if last_date.tzinfo is None:
                last_date = last_date.replace(tzinfo=timezone.utc)
            overdue_at = last_date + timedelta(days=time_interval_days)
            if now >= overdue_at:
                triggered = True
                evidence.append({
                    "reason": "time_exceeded",
                    "last_service_date": last_date.isoformat(),
                    "overdue_since": overdue_at.isoformat(),
                })

        if triggered:
            return RuleTrigger(
                rule_name=self.name,
                severity=severity,
                vehicle_id=window.vehicle_id,
                depot_id=window.depot_id,
                evidence=evidence,
                trigger_ts=now,
                recommendation=recommendation,
            )
        return None
