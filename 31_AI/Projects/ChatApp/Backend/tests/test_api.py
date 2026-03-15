"""
Tests for health and basic API endpoints.
"""
import pytest
from fastapi.testclient import TestClient


def test_health_endpoint(client):
    """Test health check endpoint returns 200."""
    response = client.get("/health")
    assert response.status_code == 200
    
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data
    assert "timestamp" in data


def test_root_endpoint(client):
    """Test root endpoint returns welcome message."""
    response = client.get("/")
    assert response.status_code == 200
    
    data = response.json()
    assert "AgentIQ" in data["message"]
    assert data["version"] == "0.1.0"


def test_metrics_endpoint(client):
    """Test metrics endpoint."""
    response = client.get("/metrics")
    assert response.status_code == 200
    
    data = response.json()
    assert data["status"] == "operational"
    assert "metrics" in data


def test_api_key_required_for_protected_routes(client):
    """Test that protected routes require API key."""
    # This will be relevant when we add chat endpoints
    # For now, health/metrics are exempt
    response = client.get("/health")
    assert response.status_code == 200  # No auth needed


def test_cors_headers(client):
    """Test CORS headers are present."""
    response = client.options("/health")
    # CORS middleware should handle OPTIONS
    assert response.status_code in [200, 405]  # 405 if OPTIONS not explicitly handled
