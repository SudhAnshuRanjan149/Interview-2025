"""
Fault code rule: fires when the same DTC appears M times within a time window.
"""
from __future__ import annotations
from datetime import datetime, timedelta, timezone
from typing import Optional

from app.engine.rules.base_rule import BaseRule
from app.engine.window_manager import VehicleWindow
from app.models.alert_trigger import RuleTrigger


class FaultCodeRule(BaseRule):
    name = "repeated_fault_code"
    severity = "MEDIUM"

    def evaluate(self, window: VehicleWindow, config: dict) -> list[RuleTrigger]:
        if not config.get("enabled", True):
            return []

        window_minutes = int(config["window_minutes"])   # e.g. 60
        min_occ = int(config["min_occurrences"])         # e.g. 3
        recommendation = config.get("recommendation", "")
        severity = config.get("severity", self.severity)

        cutoff = datetime.now(tz=timezone.utc) - timedelta(minutes=window_minutes)
        triggers = []

        for dtc_code, timestamps in window.dtc_occurrences.items():
            # Filter to timestamps within the window
            recent = [
                t for t in timestamps
                if (t.tzinfo is None and t.replace(tzinfo=timezone.utc) >= cutoff)
                or (t.tzinfo is not None and t >= cutoff)
            ]
            if len(recent) >= min_occ:
                triggers.append(RuleTrigger(
                    rule_name=self.name,
                    severity=severity,
                    vehicle_id=window.vehicle_id,
                    depot_id=window.depot_id,
                    evidence=[{
                        "dtc_code": dtc_code,
                        "occurrences": len(recent),
                        "first_seen": recent[0].isoformat(),
                        "last_seen": recent[-1].isoformat(),
                    }],
                    trigger_ts=datetime.now(tz=timezone.utc),
                    recommendation=recommendation,
                ))

        return triggers
