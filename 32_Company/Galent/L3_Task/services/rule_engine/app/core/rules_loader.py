"""Load and validate rules.yaml configuration at startup."""
import logging
import os
from typing import Any

import yaml

logger = logging.getLogger(__name__)

REQUIRED_RULE_KEYS = {"enabled"}
KNOWN_RULES = {"overheating", "repeated_fault_code", "overdue_service"}


def load_rules(config_path: str) -> dict[str, Any]:
    """
    Load and validate rules configuration from YAML.
    Raises ValueError on invalid config — causes startup failure (fail fast).
    """
    if not os.path.exists(config_path):
        raise FileNotFoundError(f"Rules config not found: {config_path}")

    with open(config_path, "r") as f:
        config = yaml.safe_load(f)

    if not config or "rules" not in config:
        raise ValueError("Rules config must have a 'rules' top-level key")

    for rule_name, rule_config in config["rules"].items():
        if "enabled" not in rule_config:
            raise ValueError(f"Rule '{rule_name}' is missing required key 'enabled'")
        if rule_name not in KNOWN_RULES:
            logger.warning("Unknown rule '%s' in config — will be ignored", rule_name)

    logger.info("Rules configuration loaded from %s", config_path)
    return config
