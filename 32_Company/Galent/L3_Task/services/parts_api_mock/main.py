"""
Parts API Mock — simulates a spare-parts supplier API.
Supports controllable failure modes via PARTS_API_MODE env var.
"""
import json
import logging
import os
from pathlib import Path
from threading import Lock
from typing import Optional

from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel

logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

app = FastAPI(title="Parts API Mock", version="1.0.0")

# ── Mode state ─────────────────────────────────────────────────────────────
_mode_lock = Lock()
_current_mode: str = os.environ.get("PARTS_API_MODE", "normal")
_request_counter: int = 0

# ── Parts catalog ──────────────────────────────────────────────────────────
_CATALOG_PATH = Path(__file__).parent / "app" / "data" / "parts_catalog.json"


def _load_catalog() -> dict:
    if _CATALOG_PATH.exists():
        with open(_CATALOG_PATH) as f:
            return json.load(f)
    # Fallback catalog
    return {
        "P001": {"name": "Oil Filter", "available": True, "lead_time_days": 1},
        "P002": {"name": "Air Filter", "available": True, "lead_time_days": 2},
        "P003": {"name": "Brake Pads", "available": True, "lead_time_days": 3},
        "P004": {"name": "Brake Discs", "available": False, "lead_time_days": 7},
        "OIL_FILTER": {"name": "Oil Filter", "available": True, "lead_time_days": 1},
        "AIR_FILTER": {"name": "Air Filter", "available": True, "lead_time_days": 2},
        "BRAKE_PADS": {"name": "Brake Pads", "available": True, "lead_time_days": 3},
        "BRAKE_DISCS": {"name": "Brake Discs", "available": False, "lead_time_days": 7},
    }


_catalog = _load_catalog()


# ── Control endpoint ────────────────────────────────────────────────────────
class ModeRequest(BaseModel):
    mode: str  # normal | rate_limited | unavailable


@app.post("/mock/mode", summary="Change the mock response mode (for testing)")
async def set_mode(request: ModeRequest) -> JSONResponse:
    global _current_mode, _request_counter
    allowed = {"normal", "rate_limited", "unavailable"}
    if request.mode not in allowed:
        return JSONResponse(
            {"error": f"Invalid mode. Choose from: {allowed}"}, status_code=400
        )
    with _mode_lock:
        _current_mode = request.mode
        _request_counter = 0
    logger.info("Mode changed to: %s", _current_mode)
    return JSONResponse({"mode": _current_mode})


@app.get("/mock/status", summary="Get current mock mode")
async def get_status() -> JSONResponse:
    return JSONResponse({"mode": _current_mode, "request_count": _request_counter})


# ── Parts availability endpoint ─────────────────────────────────────────────
@app.get("/parts/available", summary="Check spare-parts availability")
async def check_availability(
    codes: str = Query(..., description="Comma-separated part codes, e.g. P001,P002")
) -> JSONResponse:
    global _request_counter, _current_mode

    with _mode_lock:
        _request_counter += 1
        mode = _current_mode
        count = _request_counter

    # Unavailable mode → always 503
    if mode == "unavailable":
        return JSONResponse({"error": "service_unavailable"}, status_code=503)

    # Rate-limited mode → 429 on every 3rd request
    if mode == "rate_limited" and count % 3 == 0:
        return JSONResponse(
            {"error": "rate_limited"},
            status_code=429,
            headers={"Retry-After": "30"},
        )

    # Normal mode → return availability
    part_list = [c.strip() for c in codes.split(",") if c.strip()]
    available = {}
    lead_time_days = {}

    for code in part_list:
        part = _catalog.get(code)
        if part:
            available[code] = part.get("available", True)
            if part.get("available", True):
                lead_time_days[code] = part.get("lead_time_days", 3)
        else:
            available[code] = False  # unknown parts not available

    return JSONResponse({
        "available": available,
        "lead_time_days": lead_time_days,
        "request_number": count,
    })


@app.get("/health")
async def health() -> JSONResponse:
    return JSONResponse({"status": "ok", "mode": _current_mode})
