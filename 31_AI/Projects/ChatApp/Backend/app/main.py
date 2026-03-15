"""
FastAPI application factory and configuration.
Main entry point for the AgentIQ backend.
"""
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import time
import structlog

from app.config import settings
from app.api import health

# Configure structured logging
logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    # Startup
    logger.info(
        "starting_agentiq",
        environment=settings.app_env,
        log_level=settings.log_level
    )
    
    # TODO: Initialize components in future phases
    # - Vector store connection
    # - Redis connection pool
    # - MCP server connection
    
    yield
    
    # Shutdown
    logger.info("shutting_down_agentiq")
    # TODO: Cleanup resources


# Create FastAPI application
app = FastAPI(
    title="AgentIQ",
    description="Advanced Agentic AI Chat Backend with RAG, LangGraph, and MCP",
    version="0.1.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)


# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.app_env == "development" else [],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all incoming requests with timing."""
    start_time = time.time()
    
    # Log request
    logger.info(
        "request_started",
        method=request.method,
        path=request.url.path,
        client=request.client.host if request.client else None
    )
    
    response = await call_next(request)
    
    # Log response
    duration = time.time() - start_time
    logger.info(
        "request_completed",
        method=request.method,
        path=request.url.path,
        status_code=response.status_code,
        duration_ms=round(duration * 1000, 2)
    )
    
    return response


# API Key authentication middleware
@app.middleware("http")
async def verify_api_key(request: Request, call_next):
    """
    Verify API key for protected endpoints.
    Exempt: /health, /, /docs, /redoc, /openapi.json
    """
    exempt_paths = {"/", "/health", "/metrics", "/docs", "/redoc", "/openapi.json"}
    
    if request.url.path in exempt_paths:
        return await call_next(request)
    
    api_key = request.headers.get("X-API-Key")
    
    if not api_key or api_key != settings.api_key:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Invalid or missing API key"}
        )
    
    return await call_next(request)


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Catch-all exception handler for unhandled errors."""
    logger.error(
        "unhandled_exception",
        error=str(exc),
        error_type=type(exc).__name__,
        path=request.url.path
    )
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "An internal error occurred",
            "error_type": type(exc).__name__ if settings.app_env == "development" else None
        }
    )


# Include routers
app.include_router(health.router)


# Development hot-reload notice
if settings.app_env == "development":
    logger.info(
        "development_mode",
        message="Running in development mode with auto-reload enabled"
    )
