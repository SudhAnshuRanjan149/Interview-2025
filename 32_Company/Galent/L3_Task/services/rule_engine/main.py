"""
Rule Engine — Main entrypoint.
Consumes from `telemetry.raw` and `service.records` Kafka topics,
evaluates health rules, and publishes alert triggers to `alerts.notifications`.
"""
import asyncio
import logging
import signal
import sys

from app.consumer.kafka_consumer import RuleEngineConsumer
from app.core.config import settings

from app.core.rules_loader import load_rules
from app.engine.window_manager import WindowManager
from app.engine.rule_evaluator import RuleEvaluator
from app.engine.fingerprint import Fingerprinter
from app.services.idempotency import IdempotencyService
from app.services.publisher import AlertPublisher
from shared.kafka.producer import get_producer, close_producer
from shared.redis_client.client import get_redis_pool, close_redis_pool

logging.basicConfig(
    level=getattr(logging, settings.log_level.upper(), logging.INFO),
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
)
logger = logging.getLogger("rule_engine")


async def main() -> None:
    logger.info("Rule Engine starting up…")

    # Load rule configuration
    rules_config = load_rules(settings.rules_config_path)
    logger.info("Rules loaded", extra={"rules": list(rules_config["rules"].keys())})

    # Shared state
    redis = get_redis_pool(settings.redis_url)
    producer = await get_producer(settings.kafka_bootstrap_servers)

    window_manager = WindowManager(evict_after_seconds=settings.vehicle_window_evict_seconds)
    rule_evaluator = RuleEvaluator(rules_config=rules_config)
    fingerprinter = Fingerprinter()
    idempotency = IdempotencyService(redis=redis)
    alert_publisher = AlertPublisher(producer=producer)

    consumer = RuleEngineConsumer(
        bootstrap_servers=settings.kafka_bootstrap_servers,
        group_id=settings.kafka_consumer_group_id,
        window_manager=window_manager,
        rule_evaluator=rule_evaluator,
        fingerprinter=fingerprinter,
        idempotency=idempotency,
        alert_publisher=alert_publisher,
    )

    # Graceful shutdown
    loop = asyncio.get_running_loop()
    stop_event = asyncio.Event()

    def _shutdown(sig):
        logger.info(f"Received signal {sig.name} — shutting down…")
        stop_event.set()

    for sig in (signal.SIGTERM, signal.SIGINT):
        loop.add_signal_handler(sig, lambda s=sig: _shutdown(s))

    await consumer.start()
    logger.info("Rule Engine ready — consuming from Kafka")

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
        await close_producer()
        await close_redis_pool()
        logger.info("Rule Engine shut down cleanly")


if __name__ == "__main__":
    asyncio.run(main())
