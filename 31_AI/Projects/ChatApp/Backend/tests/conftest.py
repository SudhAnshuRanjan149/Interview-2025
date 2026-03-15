"""
Pytest configuration and shared fixtures.
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture
def client():
    """FastAPI test client."""
    return TestClient(app)


@pytest.fixture
def api_headers():
    """Headers with valid API key."""
    return {"X-API-Key": "your-secret-api-key"}


@pytest.fixture
def sample_chat_request():
    """Sample chat request payload."""
    return {
        "message": "What is AgentIQ?",
        "session_id": "test-session-001"
    }
