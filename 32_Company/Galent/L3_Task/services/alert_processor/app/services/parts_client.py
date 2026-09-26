"""
Async HTTP client for the spare-parts API.
Implements exponential backoff retry and rate-limit header handling.
"""
import asyncio
import logging
from dataclasses import dataclass
from typing import Any, Optional

import httpx

logger = logging.getLogger("parts_client")

BACKOFF_BASE = 5  # seconds


@dataclass
class PartsResult:
    success: bool
    data: Optional[dict] = None
    error: Optional[str] = None


class PartsClient:
    def __init__(self, base_url: str, max_retries: int = 5) -> None:
        self.base_url = base_url.rstrip("/")
        self.max_retries = max_retries
        self._client = httpx.AsyncClient(timeout=10.0)

    async def check_availability(self, part_codes: list[str]) -> PartsResult:
        """
        Check spare-parts availability.
        Retries up to max_retries times with exponential backoff.
        """
        codes = ",".join(part_codes)

        for attempt in range(1, self.max_retries + 1):
            try:
                response = await self._client.get(
                    f"{self.base_url}/parts/available",
                    params={"codes": codes},
                )

                if response.status_code == 200:
                    return PartsResult(success=True, data=response.json())

                elif response.status_code == 429:
                    # Honour Retry-After header
                    retry_after = int(response.headers.get("Retry-After", BACKOFF_BASE))
                    logger.warning("Parts API rate-limited (429). Retry-After: %ds", retry_after)
                    await asyncio.sleep(retry_after)

                elif response.status_code == 503:
                    delay = BACKOFF_BASE * (2 ** (attempt - 1))  # 5, 10, 20, 40, 80
                    logger.warning("Parts API unavailable (503), attempt %d. Retrying in %ds", attempt, delay)
                    await asyncio.sleep(delay)

                else:
                    logger.error("Parts API unexpected status: %d", response.status_code)
                    return PartsResult(success=False, error=f"HTTP {response.status_code}")

            except httpx.TimeoutException:
                delay = BACKOFF_BASE * attempt
                logger.warning("Parts API timeout, attempt %d. Retrying in %ds", attempt, delay)
                await asyncio.sleep(delay)
            except Exception as exc:
                logger.error("Parts API request failed: %s", exc)
                return PartsResult(success=False, error=str(exc))

        return PartsResult(success=False, error="max_retries_exceeded")

    async def aclose(self) -> None:
        await self._client.aclose()
