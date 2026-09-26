"""
Alert Processor — Main entrypoint.
Consumes from `alerts.notifications`, persists alerts to DB,
checks spare-parts availability, and manages retry state.
"""
import asyncio
import logging
import signal

from app.consumer.handler import AlertHandler
from app.consumer.kafka_consumer import AlertProcessorConsumer
from app.core.config import settings
from app.services.notifier import AlertNotifier
from app.services.parts_client import PartsClient
from app.services.retry_manager import RetryManager
from shared.kafka.producer import close_producer, get_producer
from shared.redis_client.client import close_redis_pool, get_redis_pool

logging.basicConfig(
    level=getattr(logging, settings.log_level.upper(), logging.INFO),
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
)
logger = logging.getLogger("alert_processor")


async def main() -> None:
    logger.info("Alert Processor starting up…")

    redis = get_redis_pool(settings.redis_url)
    producer = await get_producer(settings.kafka_bootstrap_servers)

    parts_client = PartsClient(
        base_url=settings.parts_api_base_url,
        max_retries=settings.parts_api_max_retries,
    )
    retry_manager = RetryManager(redis=redis)
    notifier = AlertNotifier(producer=producer)

    handler = AlertHandler(
        parts_client=parts_client,
        retry_manager=retry_manager,
        notifier=notifier,
    )

    consumer = AlertProcessorConsumer(
        bootstrap_servers=settings.kafka_bootstrap_servers,
        group_id=settings.kafka_consumer_group_id,
        handler=handler,
    )

    loop = asyncio.get_running_loop()
    stop_event = asyncio.Event()

    def _shutdown(sig):
        logger.info("Signal %s received — shutting down", sig.name)
        stop_event.set()

    for sig in (signal.SIGTERM, signal.SIGINT):
        loop.add_signal_handler(sig, lambda s=sig: _shutdown(s))

    await consumer.start()
    logger.info("Alert Processor ready — consuming from Kafka")

    try:
        consumer_task = asyncio.create_task(consumer.run())
        await stop_event.wait()
        consumer_task.cancel()
        try:
            await consumer_task
        except asyncio.CancelledError:
            pass
    finally:
        await consumer.stop()
        await parts_client.aclose()
        await close_producer()
        await close_redis_pool()
        logger.info("Alert Processor shut down cleanly")


if __name__ == "__main__":
    asyncio.run(main())
