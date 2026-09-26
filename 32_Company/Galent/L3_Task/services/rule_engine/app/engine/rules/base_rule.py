"""Abstract base class for all health rules."""
from __future__ import annotations
from abc import ABC, abstractmethod
from typing import TYPE_CHECKING, Union

if TYPE_CHECKING:
    from app.engine.window_manager import VehicleWindow
    from app.models.alert_trigger import RuleTrigger


class BaseRule(ABC):
    name: str
    severity: str

    @abstractmethod
    def evaluate(
        self, window: "VehicleWindow", config: dict
    ) -> Union["RuleTrigger", list["RuleTrigger"], None]:
        """
        Evaluate the rule against the vehicle's current window state.
        Returns RuleTrigger if rule fires, list[RuleTrigger] for multiple triggers,
        or None if rule does not fire.
        """
        ...
