"""Alert trigger model produced by rule evaluations."""
from __future__ import annotations
from datetime import datetime, timezone
from typing import Any

from pydantic import BaseModel, Field


class RuleTrigger(BaseModel):
    rule_name: str
    severity: str  # LOW | MEDIUM | HIGH | CRITICAL
    vehicle_id: str
    depot_id: str | None = None
    evidence: list[dict[str, Any]]
    trigger_ts: datetime = Field(default_factory=lambda: datetime.now(tz=timezone.utc))
    recommendation: str = ""
