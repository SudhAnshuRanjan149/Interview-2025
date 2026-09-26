"""
CSV Batch Ingestion — CLI entrypoint.
Usage: python main.py --file /data/service_records.csv
"""
import argparse
import asyncio
import logging
import sys

from app.core.config import settings
from app.parser.csv_parser import CSVParser
from app.services.deduplicator import ServiceRecordDeduplicator
from app.services.publisher import ServiceRecordPublisher
from shared.kafka.producer import close_producer, get_producer
from shared.redis_client.client import close_redis_pool, get_redis_pool

logging.basicConfig(
    level=getattr(logging, settings.log_level.upper(), logging.INFO),
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
)
logger = logging.getLogger("csv_ingestion")


async def ingest_file(file_path: str) -> dict:
    """Parse CSV, deduplicate, and publish valid rows to Kafka."""
    redis = get_redis_pool(settings.redis_url)
    producer = await get_producer(settings.kafka_bootstrap_servers)

    parser = CSVParser()
    deduplicator = ServiceRecordDeduplicator(redis)
    publisher = ServiceRecordPublisher(producer)

    try:
        records, errors = parser.parse(file_path)

        if errors:
            logger.warning("%d parse errors encountered:", len(errors))
            for err in errors:
                logger.warning("  Line %d: %s", err.line, err.reason)

        published = 0
        skipped_duplicates = 0

        for record in records:
            if await deduplicator.is_duplicate(record):
                skipped_duplicates += 1
                continue
            await publisher.publish(record)
            await deduplicator.mark_seen(record)
            published += 1

        summary = {
            "file": file_path,
            "total_rows": len(records) + len(errors),
            "valid_rows": len(records),
            "published": published,
            "duplicates_skipped": skipped_duplicates,
            "parse_errors": len(errors),
        }
        logger.info("Ingestion complete: %s", summary)
        return summary

    finally:
        await close_producer()
        await close_redis_pool()


def main():
    parser = argparse.ArgumentParser(description="CSV Batch Ingestion Service")
    parser.add_argument("--file", required=True, help="Path to CSV file to ingest")
    args = parser.parse_args()

    result = asyncio.run(ingest_file(args.file))

    if result["parse_errors"] > 0:
        print(f"WARNING: {result['parse_errors']} parse errors. Check logs.")

    print(f"Published {result['published']} records from {args.file}")
    sys.exit(0)


if __name__ == "__main__":
    main()
