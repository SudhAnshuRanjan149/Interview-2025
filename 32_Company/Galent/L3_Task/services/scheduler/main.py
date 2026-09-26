"""
Scheduler — APScheduler-based automation.
Runs two jobs:
  - csv_ingest_job: discovers and ingests new CSV files every 5 minutes
  - parts_retry_job: processes pending parts retry queue every 5 minutes
"""
import asyncio
import logging
import os
import sys

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.core.config import settings
from app.jobs.csv_ingest_job import CsvIngestJob
from app.jobs.parts_retry_job import PartsRetryJob
from shared.kafka.producer import close_producer, get_producer
from shared.redis_client.client import close_redis_pool, get_redis_pool

logging.basicConfig(
    level=getattr(logging, settings.log_level.upper(), logging.INFO),
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
)
logger = logging.getLogger("scheduler")


async def main() -> None:
    logger.info("Scheduler starting up…")

    redis = get_redis_pool(settings.redis_url)
    producer = await get_producer(settings.kafka_bootstrap_servers)

    csv_job = CsvIngestJob(
        incoming_dir=settings.csv_incoming_dir,
        kafka_bootstrap_servers=settings.kafka_bootstrap_servers,
        redis_url=settings.redis_url,
    )

    parts_retry_job = PartsRetryJob(
        redis=redis,
        parts_api_base_url=settings.parts_api_base_url,
    )

    scheduler = AsyncIOScheduler()

    scheduler.add_job(
        csv_job.run,
        "interval",
        minutes=settings.csv_ingest_interval_minutes,
        id="csv_ingest",
        next_run_time=None,  # don't run immediately on startup
    )

    scheduler.add_job(
        parts_retry_job.run,
        "interval",
        minutes=settings.parts_retry_job_interval_minutes,
        id="parts_retry",
    )

    scheduler.start()
    logger.info(
        "Scheduler started. CSV ingest every %d min. Parts retry every %d min.",
        settings.csv_ingest_interval_minutes,
        settings.parts_retry_job_interval_minutes,
    )

    try:
        # Run forever
        while True:
            await asyncio.sleep(60)
    except (KeyboardInterrupt, asyncio.CancelledError):
        pass
    finally:
        scheduler.shutdown()
        await close_producer()
        await close_redis_pool()
        logger.info("Scheduler shut down cleanly")


if __name__ == "__main__":
    asyncio.run(main())
