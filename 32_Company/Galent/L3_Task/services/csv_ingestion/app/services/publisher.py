"""Publishes service records to Kafka service.records topic."""
import logging
from aiokafka import AIOKafkaProducer
from app.parser.csv_parser import ServiceRecord
from shared.kafka.producer import publish

logger = logging.getLogger(__name__)
TOPIC = "service.records"


class ServiceRecordPublisher:
    def __init__(self, producer: AIOKafkaProducer) -> None:
        self.producer = producer

    async def publish(self, record: ServiceRecord) -> None:
        payload = {
            "vehicle_id": record.vehicle_id,
            "service_date": record.service_date,
            "service_type": record.service_type,
            "odometer_km": record.odometer_km,
            "depot_id": record.depot_id,
            "technician_id": record.technician_id,
            "notes": record.notes,
            "parts_used": record.parts_used,
            "cost_gbp": record.cost_gbp,
            "next_service_km": record.next_service_km,
        }
        await publish(self.producer, TOPIC, payload, key=record.vehicle_id)
