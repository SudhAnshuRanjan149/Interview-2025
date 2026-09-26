"""Runs all enabled rules against a vehicle window."""
from __future__ import annotations
import logging
from typing import Any

from app.engine.rules.base_rule import BaseRule
from app.engine.rules.overheating import OverheatingRule
from app.engine.rules.fault_code import FaultCodeRule
from app.engine.rules.overdue_service import OverdueServiceRule
from app.engine.window_manager import VehicleWindow
from app.models.alert_trigger import RuleTrigger

logger = logging.getLogger(__name__)

_RULE_REGISTRY: dict[str, BaseRule] = {
    "overheating": OverheatingRule(),
    "repeated_fault_code": FaultCodeRule(),
    "overdue_service": OverdueServiceRule(),
}


class RuleEvaluator:
    def __init__(self, rules_config: dict[str, Any]) -> None:
        self.rules_config = rules_config["rules"]

    def evaluate_all(self, window: VehicleWindow) -> list[RuleTrigger]:
        """Run all enabled rules against the window. Return flat list of triggers."""
        triggers: list[RuleTrigger] = []

        for rule_name, config in self.rules_config.items():
            if not config.get("enabled", True):
                continue

            rule = _RULE_REGISTRY.get(rule_name)
            if rule is None:
                logger.warning("No implementation for rule '%s'", rule_name)
                continue

            try:
                result = rule.evaluate(window, config)
                if result is None:
                    continue
                if isinstance(result, list):
                    triggers.extend(result)
                else:
                    triggers.append(result)
            except Exception as exc:
                logger.error(
                    "Rule '%s' raised an exception", rule_name,
                    extra={"vehicle_id": window.vehicle_id, "error": str(exc)},
                    exc_info=True,
                )

        return triggers
