"""API key authentication dependency."""
import logging

from fastapi import Header, HTTPException, status

from app.core.config import settings

logger = logging.getLogger(__name__)


async def verify_api_key(x_api_key: str = Header(..., alias="X-API-Key")) -> str:
    """
    Validate the X-API-Key header.
    In development mode, accepts the raw key directly.
    In production, compare against bcrypt hash.
    """
    if not x_api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="X-API-Key header is required",
        )

    if settings.app_env == "development":
        # Dev: compare raw key
        if x_api_key == settings.api_key:
            return x_api_key
    else:
        # Production: verify bcrypt hash
        try:
            import bcrypt
            if bcrypt.checkpw(x_api_key.encode(), settings.api_key_hash.encode()):
                return x_api_key
        except Exception as exc:
            logger.error("API key validation error", extra={"error": str(exc)})

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid API key",
    )
