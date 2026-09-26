"""
Overheating rule: fires when N consecutive temp readings are above threshold.
"""
from __future__ import annotations
from datetime import datetime, timezone
from typing import Optional

from app.engine.rules.base_rule import BaseRule
from app.engine.window_manager import VehicleWindow
from app.models.alert_trigger import RuleTrigger


class OverheatingRule(BaseRule):
    name = "overheating"
    severity = "HIGH"

    def evaluate(self, window: VehicleWindow, config: dict) -> Optional[RuleTrigger]:
        if not config.get("enabled", True):
            return None

        threshold = float(config["threshold"])      # e.g. 105.0 °C
        consecutive = int(config["consecutive"])    # e.g. 3
        recommendation = config.get("recommendation", "")
        severity = config.get("severity", self.severity)

        # Take the last N readings in order
        recent = window.temp_readings[-consecutive:] if window.temp_readings else []

        if len(recent) < consecutive:
            return None  # Not enough data yet — avoid false positives on startup

        if all(r.value >= threshold for r in recent):
            return RuleTrigger(
                rule_name=self.name,
                severity=severity,
                vehicle_id=window.vehicle_id,
                depot_id=window.depot_id,
                evidence=[{"ts": r.ts.isoformat(), "engine_temp_c": r.value} for r in recent],
                trigger_ts=datetime.now(tz=timezone.utc),
                recommendation=recommendation,
            )
        return None
