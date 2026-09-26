"""
Per-vehicle sliding window state manager.
Holds recent telemetry readings and service record data in memory.
"""
from __future__ import annotations

import bisect
import logging
import time
from collections import defaultdict, deque
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

logger = logging.getLogger(__name__)


@dataclass
class TempReading:
    ts: datetime
    value: float

    def __lt__(self, other: "TempReading") -> bool:
        return self.ts < other.ts


@dataclass
class VehicleWindow:
    vehicle_id: str
    temp_readings: list = field(default_factory=list)   # sorted list of TempReading
    dtc_occurrences: dict = field(default_factory=lambda: defaultdict(list))  # dtc → [datetime]
    last_service_km: Optional[float] = None
    last_service_date: Optional[datetime] = None
    last_odometer_km: Optional[float] = None
    last_updated: float = field(default_factory=time.monotonic)
    depot_id: Optional[str] = None

    MAX_TEMP_READINGS = 10

    def add_temp_reading(self, ts: datetime, value: float) -> None:
        """Insert a temp reading in timestamp order."""
        reading = TempReading(ts=ts, value=value)
        bisect.insort(self.temp_readings, reading)
        # Keep only the most recent MAX_TEMP_READINGS
        if len(self.temp_readings) > self.MAX_TEMP_READINGS:
            self.temp_readings = self.temp_readings[-self.MAX_TEMP_READINGS:]
        self.last_updated = time.monotonic()

    def add_dtc_occurrence(self, dtc_code: str, ts: datetime) -> None:
        self.dtc_occurrences[dtc_code].append(ts)
        self.last_updated = time.monotonic()

    def update_service_record(self, odometer_km: float, service_date: datetime) -> None:
        if self.last_service_km is None or odometer_km > self.last_service_km:
            self.last_service_km = odometer_km
        if self.last_service_date is None or service_date > self.last_service_date:
            self.last_service_date = service_date
        self.last_updated = time.monotonic()


class WindowManager:
    """
    In-memory dict keyed by vehicle_id.
    Evicts stale vehicles after `evict_after_seconds` of inactivity.
    """

    def __init__(self, evict_after_seconds: int = 3600) -> None:
        self._windows: dict[str, VehicleWindow] = {}
        self._evict_after = evict_after_seconds

    def update(self, vehicle_id: str, event: dict) -> VehicleWindow:
        """Update window from a telemetry event dict. Returns the updated window."""
        self._evict_stale()

        if vehicle_id not in self._windows:
            self._windows[vehicle_id] = VehicleWindow(vehicle_id=vehicle_id)

        window = self._windows[vehicle_id]

        # Parse timestamp
        from datetime import timezone
        ts_raw = event.get("timestamp")
        if isinstance(ts_raw, str):
            ts = datetime.fromisoformat(ts_raw.replace("Z", "+00:00"))
        elif isinstance(ts_raw, datetime):
            ts = ts_raw
        else:
            ts = datetime.now(tz=timezone.utc)

        # Engine temperature
        if (temp := event.get("engine_temp_c")) is not None:
            window.add_temp_reading(ts, float(temp))

        # DTC codes
        for dtc in event.get("dtc_codes", []):
            window.add_dtc_occurrence(dtc, ts)

        # Odometer
        if (odometer := event.get("odometer_km")) is not None:
            window.last_odometer_km = float(odometer)

        # Depot
        if depot := event.get("depot_id"):
            window.depot_id = depot

        return window

    def update_from_service_record(self, vehicle_id: str, record: dict) -> VehicleWindow:
        """Update window from a service.records Kafka message."""
        if vehicle_id not in self._windows:
            self._windows[vehicle_id] = VehicleWindow(vehicle_id=vehicle_id)

        window = self._windows[vehicle_id]

        from datetime import timezone
        service_date_raw = record.get("service_date", "")
        try:
            from datetime import date
            sd = datetime.strptime(service_date_raw, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        except (ValueError, TypeError):
            sd = datetime.now(tz=timezone.utc)

        odometer_km = record.get("odometer_km")
        if odometer_km is not None:
            window.update_service_record(float(odometer_km), sd)

        return window

    def get(self, vehicle_id: str) -> Optional[VehicleWindow]:
        return self._windows.get(vehicle_id)

    def _evict_stale(self) -> None:
        """Remove vehicles with no activity for evict_after_seconds."""
        now = time.monotonic()
        stale = [
            vid
            for vid, w in self._windows.items()
            if (now - w.last_updated) > self._evict_after
        ]
        for vid in stale:
            del self._windows[vid]
            logger.debug("Evicted stale window for vehicle %s", vid)
