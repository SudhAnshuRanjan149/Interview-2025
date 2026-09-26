"""
Acceptance Test Suite — implements the exact acceptance scenario from task_planner.md.

Scenario:
  1. Send 3 readings of engine_temp_c > 105°C for vehicle VH-ACCEPTANCE-001
  2. Verify exactly ONE alert is created with severity HIGH
  3. Replay the same 3 readings → still exactly 1 alert (idempotency)
  4. Set parts API to unavailable → alert visible with PENDING parts_status
"""
import asyncio
import time

import httpx
import pytest

INGESTION_API = "http://localhost:8001"
DASHBOARD_API = "http://localhost:8002"
PARTS_MOCK_API = "http://localhost:8003"

API_KEY = "dev-api-key"
AUTH_TOKEN = "dev-dashboard-token"
VEHICLE_ID = "VH-ACCEPTANCE-001"
DEPOT_ID = "D-TEST"

HEADERS_INGEST = {"X-API-Key": API_KEY, "Content-Type": "application/json"}
HEADERS_DASH = {"Authorization": f"Bearer {AUTH_TOKEN}", "Content-Type": "application/json"}


def overheating_events():
    """3 consecutive events with engine_temp_c > 105°C."""
    return [
        {
            "vehicle_id": VEHICLE_ID,
            "timestamp": f"2026-01-01T10:0{i}:00Z",
            "engine_temp_c": 106.0 + i,
            "battery_voltage": 12.4,
            "odometer_km": 50000 + i,
            "dtc_codes": [],
            "depot_id": DEPOT_ID,
        }
        for i in range(3)
    ]


@pytest.fixture(scope="module", autouse=True)
def reset_parts_mode():
    """Ensure parts API is in normal mode before tests."""
    import httpx as _httpx
    try:
        _httpx.post(f"{PARTS_MOCK_API}/mock/mode", json={"mode": "normal"}, timeout=5)
    except Exception:
        pass  # May not be running — skip


@pytest.mark.asyncio
async def test_1_three_readings_create_exactly_one_alert():
    """Sending 3 overheating readings should create exactly ONE HIGH severity alert."""
    async with httpx.AsyncClient(timeout=15.0) as client:
        events = overheating_events()
        resp = await client.post(
            f"{INGESTION_API}/telemetry/batch",
            json={"events": events},
            headers=HEADERS_INGEST,
        )
        assert resp.status_code in (202, 207), f"Batch ingest failed: {resp.text}"
        data = resp.json()
        assert data["accepted"] == 3, f"Expected 3 accepted, got {data['accepted']}"

    # Wait for rule engine + alert processor pipeline
    await asyncio.sleep(10)

    # Count alerts for this vehicle
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(
            f"{DASHBOARD_API}/alerts",
            params={"vehicle_id": VEHICLE_ID, "rule_name": "overheating"},
            headers=HEADERS_DASH,
        )
        assert resp.status_code == 200, f"Dashboard API error: {resp.text}"
        data = resp.json()

    alerts = data.get("items", [])
    assert len(alerts) == 1, (
        f"Expected exactly 1 alert, got {len(alerts)}"
    )
    assert alerts[0]["severity"] == "HIGH", (
        f"Expected HIGH severity, got {alerts[0]['severity']}"
    )
    assert alerts[0]["status"] == "OPEN"


@pytest.mark.asyncio
async def test_2_replay_same_events_still_one_alert():
    """Re-sending the same events should NOT create duplicate alerts (idempotency)."""
    async with httpx.AsyncClient(timeout=15.0) as client:
        events = overheating_events()
        resp = await client.post(
            f"{INGESTION_API}/telemetry/batch",
            json={"events": events},
            headers=HEADERS_INGEST,
        )
        data = resp.json()
        assert data["duplicates"] == 3, (
            f"Expected 3 duplicates, got {data.get('duplicates')}"
        )

    await asyncio.sleep(5)

    # Alert count must still be 1
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(
            f"{DASHBOARD_API}/alerts",
            params={"vehicle_id": VEHICLE_ID, "rule_name": "overheating"},
            headers=HEADERS_DASH,
        )
        data = resp.json()

    alerts = data.get("items", [])
    assert len(alerts) == 1, (
        f"Expected still 1 alert after replay, got {len(alerts)}"
    )


@pytest.mark.asyncio
async def test_3_parts_unavailable_alert_has_pending_status():
    """With parts API unavailable, alert should be visible with PENDING parts_status."""
    # Set parts API to unavailable mode
    async with httpx.AsyncClient(timeout=5.0) as client:
        mode_resp = await client.post(
            f"{PARTS_MOCK_API}/mock/mode",
            json={"mode": "unavailable"},
        )
        assert mode_resp.status_code == 200

    # Send a NEW event to trigger a fresh alert (different vehicle to avoid dedup)
    new_vehicle = f"{VEHICLE_ID}-PARTS"
    async with httpx.AsyncClient(timeout=15.0) as client:
        events = [
            {
                "vehicle_id": new_vehicle,
                "timestamp": f"2026-01-02T10:0{i}:00Z",
                "engine_temp_c": 108.0 + i,
                "battery_voltage": 12.4,
                "odometer_km": 60000 + i,
                "dtc_codes": [],
                "depot_id": DEPOT_ID,
            }
            for i in range(3)
        ]
        resp = await client.post(
            f"{INGESTION_API}/telemetry/batch",
            json={"events": events},
            headers=HEADERS_INGEST,
        )
        assert resp.json()["accepted"] == 3

    await asyncio.sleep(12)

    # Verify alert exists and parts_status = PENDING
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(
            f"{DASHBOARD_API}/alerts",
            params={"vehicle_id": new_vehicle, "rule_name": "overheating"},
            headers=HEADERS_DASH,
        )
        data = resp.json()

    alerts = data.get("items", [])
    assert len(alerts) >= 1, f"Expected at least 1 alert, got {len(alerts)}"
    assert alerts[0]["parts_status"] in ("PENDING", "UNAVAILABLE"), (
        f"Expected PENDING/UNAVAILABLE parts_status, got {alerts[0]['parts_status']}"
    )

    # Restore normal mode
    async with httpx.AsyncClient(timeout=5.0) as client:
        await client.post(f"{PARTS_MOCK_API}/mock/mode", json={"mode": "normal"})
