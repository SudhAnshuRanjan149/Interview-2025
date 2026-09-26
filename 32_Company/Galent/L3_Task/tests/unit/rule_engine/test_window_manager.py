"""
Unit tests for WindowManager.
Tests insertion ordering, out-of-order events, stale eviction, bounded deque.
"""
import sys
import os
from datetime import datetime, timezone, timedelta
import time

import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../../../services/rule_engine'))

from app.engine.window_manager import VehicleWindow, WindowManager


def _ts(offset_minutes=0):
    base = datetime(2026, 9, 26, 8, 0, 0, tzinfo=timezone.utc)
    return base + timedelta(minutes=offset_minutes)


class TestVehicleWindow:

    def test_readings_inserted_in_order(self):
        """In-order insertions should remain sorted by timestamp."""
        w = VehicleWindow(vehicle_id="VH-001")
        w.add_temp_reading(_ts(0), 100.0)
        w.add_temp_reading(_ts(1), 101.0)
        w.add_temp_reading(_ts(2), 102.0)
        assert [r.value for r in w.temp_readings] == [100.0, 101.0, 102.0]

    def test_out_of_order_insertion_sorted(self):
        """Out-of-order event inserted at correct sorted position."""
        w = VehicleWindow(vehicle_id="VH-001")
        w.add_temp_reading(_ts(0), 100.0)
        w.add_temp_reading(_ts(2), 102.0)
        w.add_temp_reading(_ts(1), 101.0)  # arrives late but has ts=1
        values = [r.value for r in w.temp_readings]
        assert values == [100.0, 101.0, 102.0]

    def test_bounded_to_max_readings(self):
        """Window keeps only the most recent MAX_TEMP_READINGS readings."""
        w = VehicleWindow(vehicle_id="VH-001")
        for i in range(15):  # More than MAX (10)
            w.add_temp_reading(_ts(i), float(100 + i))
        assert len(w.temp_readings) <= VehicleWindow.MAX_TEMP_READINGS

    def test_oldest_readings_dropped_when_full(self):
        """When full, oldest readings are evicted — not newest."""
        w = VehicleWindow(vehicle_id="VH-001")
        for i in range(12):
            w.add_temp_reading(_ts(i), float(100 + i))
        # The last reading should be the most recent
        assert w.temp_readings[-1].value == 111.0

    def test_dtc_occurrence_recorded(self):
        """DTC occurrences accumulated per code."""
        w = VehicleWindow(vehicle_id="VH-001")
        w.add_dtc_occurrence("P0300", _ts(0))
        w.add_dtc_occurrence("P0300", _ts(1))
        w.add_dtc_occurrence("P0301", _ts(2))
        assert len(w.dtc_occurrences["P0300"]) == 2
        assert len(w.dtc_occurrences["P0301"]) == 1

    def test_last_updated_set_on_add(self):
        """last_updated monotonic timestamp advances on each reading."""
        w = VehicleWindow(vehicle_id="VH-001")
        before = time.monotonic()
        w.add_temp_reading(_ts(0), 100.0)
        assert w.last_updated >= before


class TestWindowManager:

    def test_get_returns_none_for_unknown_vehicle(self):
        """First access for an unknown vehicle_id returns None (use update() to create)."""
        mgr = WindowManager()
        w = mgr.get("VH-UNKNOWN")
        assert w is None

    def test_get_returns_same_window_on_repeated_access(self):
        """Same vehicle_id always returns the same window object after update."""
        mgr = WindowManager()
        event = {"vehicle_id": "VH-SAME", "depot_id": "D01",
                 "engine_temp_c": 100.0, "timestamp": _ts(0).isoformat(),
                 "dtc_codes": [], "odometer_km": 10000}
        mgr.update("VH-SAME", event)
        w1 = mgr.get("VH-SAME")
        w2 = mgr.get("VH-SAME")
        assert w1 is w2

    def test_update_sets_depot_id(self):
        """update() should propagate depot_id into the window."""
        mgr = WindowManager()
        event = {
            "vehicle_id": "VH-001",
            "depot_id": "D03",
            "engine_temp_c": 102.0,
            "timestamp": _ts(0).isoformat(),
            "dtc_codes": [],
            "odometer_km": 50000,
        }
        mgr.update("VH-001", event)
        w = mgr.get("VH-001")
        assert w is not None
        assert w.depot_id == "D03"

    def test_stale_windows_evicted(self):
        """Windows not updated for > evict_after_seconds should be removed."""
        mgr = WindowManager(evict_after_seconds=0)  # Evict immediately
        event = {"vehicle_id": "VH-STALE", "depot_id": "D01",
                 "engine_temp_c": 100.0, "timestamp": _ts(0).isoformat(),
                 "dtc_codes": [], "odometer_km": 10000}
        mgr.update("VH-STALE", event)
        mgr._evict_stale()
        assert mgr.get("VH-STALE") is None
