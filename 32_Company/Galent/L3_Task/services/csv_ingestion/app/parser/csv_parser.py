"""CSV parser with header validation and row-level error collection."""
import csv
import logging
from dataclasses import dataclass
from datetime import date
from typing import Optional

logger = logging.getLogger(__name__)

REQUIRED_COLUMNS = [
    "vehicle_id", "service_date", "service_type",
    "odometer_km", "depot_id", "technician_id", "notes",
]
OPTIONAL_COLUMNS = ["parts_used", "cost_gbp", "next_service_km"]
VALID_SERVICE_TYPES = {"OIL_CHANGE", "BRAKE_SERVICE", "FULL_SERVICE", "TYRE_ROTATION", "BATTERY_CHECK", "OTHER"}


@dataclass
class ServiceRecord:
    vehicle_id: str
    service_date: str
    service_type: str
    odometer_km: Optional[float]
    depot_id: str
    technician_id: str
    notes: str
    parts_used: Optional[str] = None
    cost_gbp: Optional[float] = None
    next_service_km: Optional[float] = None


@dataclass
class ParseError:
    line: int
    reason: str


class CSVParser:
    def parse(self, file_path: str) -> tuple[list[ServiceRecord], list[ParseError]]:
        records: list[ServiceRecord] = []
        errors: list[ParseError] = []

        with open(file_path, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            self._validate_headers(reader.fieldnames or [])

            for i, row in enumerate(reader, start=2):  # start=2 (1=header)
                try:
                    records.append(self._parse_row(row, i))
                except ValueError as exc:
                    errors.append(ParseError(line=i, reason=str(exc)))
                    logger.warning("Parse error at line %d: %s", i, exc)

        return records, errors

    def _validate_headers(self, fieldnames: list[str]) -> None:
        missing = [col for col in REQUIRED_COLUMNS if col not in fieldnames]
        if missing:
            raise ValueError(f"Missing required CSV columns: {missing}")

    def _parse_row(self, row: dict, line: int) -> ServiceRecord:
        vehicle_id = row.get("vehicle_id", "").strip()
        if not vehicle_id:
            raise ValueError("vehicle_id is required")

        service_date_raw = row.get("service_date", "").strip()
        try:
            date.fromisoformat(service_date_raw)
        except (ValueError, TypeError):
            raise ValueError(f"Invalid service_date: '{service_date_raw}' (expected YYYY-MM-DD)")

        service_type = row.get("service_type", "").strip().upper()
        if service_type not in VALID_SERVICE_TYPES:
            raise ValueError(f"Invalid service_type: '{service_type}'")

        odometer_km = None
        odometer_raw = row.get("odometer_km", "").strip()
        if odometer_raw:
            try:
                odometer_km = float(odometer_raw)
            except ValueError:
                raise ValueError(f"Invalid odometer_km: '{odometer_raw}'")

        depot_id = row.get("depot_id", "").strip()
        if not depot_id:
            raise ValueError("depot_id is required")

        technician_id = row.get("technician_id", "").strip()
        cost_gbp = None
        cost_raw = row.get("cost_gbp", "").strip()
        if cost_raw:
            try:
                cost_gbp = float(cost_raw)
            except ValueError:
                pass

        next_service_km = None
        nsk_raw = row.get("next_service_km", "").strip()
        if nsk_raw:
            try:
                next_service_km = float(nsk_raw)
            except ValueError:
                pass

        return ServiceRecord(
            vehicle_id=vehicle_id,
            service_date=service_date_raw,
            service_type=service_type,
            odometer_km=odometer_km,
            depot_id=depot_id,
            technician_id=technician_id,
            notes=row.get("notes", "").strip(),
            parts_used=row.get("parts_used", "").strip() or None,
            cost_gbp=cost_gbp,
            next_service_km=next_service_km,
        )
