"""
Unit tests for Fingerprinter.
Verifies determinism, uniqueness, and hash stability.
"""
import sys
import os
from datetime import datetime, timezone

import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../../../services/rule_engine'))

from app.engine.fingerprint import Fingerprinter
from app.models.alert_trigger import RuleTrigger

fp = Fingerprinter()


def _make_trigger(vehicle_id="VH-001", rule_name="overheating", evidence=None):
    return RuleTrigger(
        rule_name=rule_name,
        severity="HIGH",
        vehicle_id=vehicle_id,
        depot_id="D01",
        evidence=evidence or [{"ts": "2026-09-26T08:00:00", "engine_temp_c": 108.0}],
        trigger_ts=datetime.now(tz=timezone.utc),
        recommendation="Inspect cooling system.",
    )


class TestFingerprinter:

    def test_same_input_produces_same_hash(self):
        """Determinism: identical triggers always produce identical fingerprints."""
        evidence = [
            {"ts": "2026-09-26T08:00:00", "engine_temp_c": 108.0},
            {"ts": "2026-09-26T08:01:00", "engine_temp_c": 109.0},
        ]
        t1 = _make_trigger(evidence=evidence)
        t2 = _make_trigger(evidence=evidence)
        assert fp.compute(t1) == fp.compute(t2)

    def test_different_vehicle_produces_different_hash(self):
        """Different vehicle_id → different fingerprint."""
        t1 = _make_trigger(vehicle_id="VH-001")
        t2 = _make_trigger(vehicle_id="VH-002")
        assert fp.compute(t1) != fp.compute(t2)

    def test_different_rule_produces_different_hash(self):
        """Different rule_name → different fingerprint."""
        t1 = _make_trigger(rule_name="overheating")
        t2 = _make_trigger(rule_name="repeated_fault_code")
        assert fp.compute(t1) != fp.compute(t2)

    def test_different_evidence_produces_different_hash(self):
        """Different evidence values → different fingerprint."""
        t1 = _make_trigger(evidence=[{"ts": "2026-09-26T08:00:00", "engine_temp_c": 108.0}])
        t2 = _make_trigger(evidence=[{"ts": "2026-09-26T08:00:00", "engine_temp_c": 109.0}])
        assert fp.compute(t1) != fp.compute(t2)

    def test_hash_is_sha256_length(self):
        """Output must be a 64-char hex string (SHA-256)."""
        t = _make_trigger()
        h = fp.compute(t)
        assert isinstance(h, str)
        assert len(h) == 64
        assert all(c in "0123456789abcdef" for c in h)

    def test_trigger_ts_does_not_affect_hash(self):
        """trigger_ts is excluded from fingerprint — same event at different times = same hash."""
        evidence = [{"ts": "2026-09-26T08:00:00", "engine_temp_c": 108.0}]
        t1 = _make_trigger(evidence=evidence)
        t2 = _make_trigger(evidence=evidence)
        # trigger_ts differs (set inside _make_trigger) but hash must be equal
        assert fp.compute(t1) == fp.compute(t2)

    def test_hash_is_stable_across_calls(self):
        """The same trigger always produces the same hash across multiple calls."""
        t = _make_trigger()
        h = fp.compute(t)
        for _ in range(10):
            assert fp.compute(t) == h
