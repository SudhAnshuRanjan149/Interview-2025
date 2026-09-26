"""
Alert fingerprinting — deterministic SHA256 hash per unique trigger.
Same event window always produces the same fingerprint, preventing duplicate alerts.
"""
import hashlib
import json

from app.models.alert_trigger import RuleTrigger


class Fingerprinter:
    def compute(self, trigger: RuleTrigger) -> str:
        """
        Compute a deterministic fingerprint for a rule trigger.
        SHA256 of: vehicle_id | rule_name | sorted evidence
        """
        evidence_str = json.dumps(trigger.evidence, sort_keys=True, default=str)
        payload = f"{trigger.vehicle_id}|{trigger.rule_name}|{evidence_str}"
        return hashlib.sha256(payload.encode()).hexdigest()
