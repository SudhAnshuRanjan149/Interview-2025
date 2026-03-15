"""
Health check and metrics endpoints.
"""
from fastapi import APIRouter
from datetime import datetime
from app.config import settings
import sys

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check():
    """
    Health check endpoint.
    Returns system status and component health.
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "0.1.0",
        "environment": settings.app_env,
        "python_version": f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}",
        "components": {
            "api": "operational",
            "config": "loaded"
        }
    }


@router.get("/")
async def root():
    """Root endpoint with welcome message."""
    return {
        "message": "Welcome to AgentIQ - Advanced Agentic AI Chat Backend",
        "version": "0.1.0",
        "docs_url": "/docs",
        "health_url": "/health"
    }


@router.get("/metrics")
async def metrics():
    """
    Metrics endpoint for monitoring.
    Will be expanded in Phase 7 with detailed metrics.
    """
    return {
        "status": "operational",
        "metrics": {
            "total_requests": 0,
            "active_sessions": 0,
            "vector_db_documents": 0
        }
    }
