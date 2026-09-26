"""
conftest.py for unit tests.
Adds the rule_engine service directory to sys.path so its modules are importable.
"""
import sys
import os

# Make rule_engine's 'app' package importable
RULE_ENGINE_DIR = os.path.join(os.path.dirname(__file__), '../../../services/rule_engine')
if RULE_ENGINE_DIR not in sys.path:
    sys.path.insert(0, os.path.abspath(RULE_ENGINE_DIR))
