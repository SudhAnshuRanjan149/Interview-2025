"""
CSV ingest job — discovers new CSV files in /data/incoming/ and ingests them.
Tracks processed files in Redis to avoid re-ingestion.
"""
import asyncio
import logging
import os

import redis.asyncio as aioredis

logger = logging.getLogger(__name__)
PROCESSED_KEY = "scheduler:processed_csv_files"


class CsvIngestJob:
    def __init__(self, incoming_dir: str, kafka_bootstrap_servers: str, redis_url: str) -> None:
        self.incoming_dir = incoming_dir
        self.kafka_bootstrap_servers = kafka_bootstrap_servers
        self.redis_url = redis_url

    async def run(self) -> None:
        """Discover unprocessed CSV files and ingest each one."""
        if not os.path.exists(self.incoming_dir):
            logger.debug("CSV incoming dir does not exist: %s", self.incoming_dir)
            return

        redis = aioredis.from_url(self.redis_url)
        csv_files = [
            f for f in os.listdir(self.incoming_dir)
            if f.endswith(".csv")
        ]

        for filename in csv_files:
            file_path = os.path.join(self.incoming_dir, filename)
            already_processed = await redis.sismember(PROCESSED_KEY, filename)

            if already_processed:
                logger.debug("CSV already processed — skipping: %s", filename)
                continue

            logger.info("Processing CSV file: %s", filename)
            try:
                proc = await asyncio.create_subprocess_exec(
                    "python", "/app/services/csv_ingestion/main.py",
                    "--file", file_path,
                    stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE,
                )
                stdout, stderr = await proc.communicate()

                if proc.returncode == 0:
                    await redis.sadd(PROCESSED_KEY, filename)
                    logger.info("CSV ingested successfully: %s", filename)
                else:
                    logger.error("CSV ingestion failed for %s: %s", filename, stderr.decode())
            except Exception as exc:
                logger.error("Error running CSV ingestion for %s: %s", filename, exc)

        await redis.aclose()
