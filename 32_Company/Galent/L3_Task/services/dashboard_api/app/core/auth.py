"""
JWT authentication dependency for Dashboard API.
In development mode, allows a dev token for testing.
"""
import logging
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.config import settings

logger = logging.getLogger(__name__)
bearer_scheme = HTTPBearer(auto_error=False)

DEV_TOKEN = "dev-dashboard-token"


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
) -> dict:
    """
    Validate JWT Bearer token.
    In development, accepts 'dev-dashboard-token' directly.
    """
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header required",
        )

    token = credentials.credentials

    # Development shortcut
    if settings.app_env == "development" and token == DEV_TOKEN:
        return {"sub": "dev-user", "role": "admin"}

    # Production: validate JWT
    try:
        from jose import JWTError, jwt
        payload = jwt.decode(token, settings.jwt_secret, algorithms=["HS256"])
        return payload
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
