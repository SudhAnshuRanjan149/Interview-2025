"""
Unit tests for OverheatingRule.
Tests boundary conditions: N-1, exactly N, above-threshold reset.
"""
import sys
import os
from datetime import datetime, timezone, timedelta

import pytest

# Add the rule_engine service to path so we can import its modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../../../services/rule_engine'))

from app.engine.rules.overheating import OverheatingRule
from app.engine.window_manager import VehicleWindow

RULE_CONFIG = {
    "enabled": True,
    "threshold": 105.0,
    "consecutive": 3,
    "severity": "HIGH",
    "recommendation": "Immediate cooling system inspection required.",
}


def _make_window(vehicle_id="VH-TEST-001", depot_id="D01"):
    return VehicleWindow(vehicle_id=vehicle_id, depot_id=depot_id)


def _add_readings(window, temps):
    """Add temperature readings with sequential timestamps."""
    base = datetime(2026, 9, 26, 8, 0, 0, tzinfo=timezone.utc)
    for i, temp in enumerate(temps):
        ts = base + timedelta(minutes=i)
        window.add_temp_reading(ts, temp)


class TestOverheatingRule:
    rule = OverheatingRule()

    def test_no_readings_returns_none(self):
        """No data → no trigger (cold start safety)."""
        window = _make_window()
        result = self.rule.evaluate(window, RULE_CONFIG)
        assert result is None

    def test_n_minus_one_readings_returns_none(self):
        """N-1 readings above threshold → should NOT trigger."""
        window = _make_window()
        _add_readings(window, [108.0, 109.0])  # only 2, need 3
        result = self.rule.evaluate(window, RULE_CONFIG)
        assert result is None

    def test_exactly_n_consecutive_triggers(self):
        """Exactly N readings all above threshold → SHOULD trigger."""
        window = _make_window()
        _add_readings(window, [106.0, 107.0, 108.0])
        result = self.rule.evaluate(window, RULE_CONFIG)
        assert result is not None
        assert result.rule_name == "overheating"
        assert result.severity == "HIGH"
        assert result.vehicle_id == "VH-TEST-001"
        assert len(result.evidence) == 3

    def test_n_plus_one_consecutive_triggers(self):
        """More than N readings all above threshold → SHOULD trigger."""
        window = _make_window()
        _add_readings(window, [106.0, 107.0, 108.0, 109.0])
        result = self.rule.evaluate(window, RULE_CONFIG)
        assert result is not None
        # Evidence should use the last N readings (last 3)
        assert len(result.evidence) == 3
        assert result.evidence[-1]["engine_temp_c"] == 109.0

    def test_one_reading_below_threshold_resets(self):
        """If last reading is below threshold, should NOT trigger even with N-1 above."""
        window = _make_window()
        _add_readings(window, [108.0, 109.0, 95.0])  # last one is cool
        result = self.rule.evaluate(window, RULE_CONFIG)
        assert result is None

    def test_reading_at_exactly_threshold_triggers(self):
        """Reading == threshold counts as 'above' (>= comparison)."""
        window = _make_window()
        _add_readings(window, [105.0, 105.0, 105.0])
        result = self.rule.evaluate(window, RULE_CONFIG)
        assert result is not None

    def test_disabled_rule_returns_none(self):
        """Disabled rule should never trigger."""
        window = _make_window()
        _add_readings(window, [110.0, 111.0, 112.0])
        config = {**RULE_CONFIG, "enabled": False}
        result = self.rule.evaluate(window, config)
        assert result is None

    def test_evidence_contains_correct_fields(self):
        """Each evidence item must have ts and engine_temp_c."""
        window = _make_window()
        _add_readings(window, [106.0, 107.0, 108.0])
        result = self.rule.evaluate(window, RULE_CONFIG)
        assert result is not None
        for ev in result.evidence:
            assert "ts" in ev
            assert "engine_temp_c" in ev

    def test_recommendation_included(self):
        """Trigger must carry the recommendation from config."""
        window = _make_window()
        _add_readings(window, [106.0, 107.0, 108.0])
        result = self.rule.evaluate(window, RULE_CONFIG)
        assert result is not None
        assert result.recommendation == RULE_CONFIG["recommendation"]

    def test_depot_id_propagated(self):
        """Trigger must carry depot_id from window."""
        window = _make_window(depot_id="D05")
        _add_readings(window, [106.0, 107.0, 108.0])
        result = self.rule.evaluate(window, RULE_CONFIG)
        assert result is not None
        assert result.depot_id == "D05"
