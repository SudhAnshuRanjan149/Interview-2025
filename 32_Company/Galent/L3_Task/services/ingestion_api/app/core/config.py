from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Kafka
    kafka_bootstrap_servers: str = "kafka:9092"
    kafka_consumer_group_id: str = "fleet-maintenance"

    # Redis
    redis_url: str = "redis://redis:6379/0"

    # Database
    database_url: str = "postgresql+asyncpg://fleet:secret@postgres:5432/fleet_db"

    # Security
    api_key_hash: str = ""
    api_key: str = "dev-api-key"  # raw key for dev only

    # App
    app_env: str = "development"
    log_level: str = "INFO"

    # Ingestion
    max_batch_size: int = 100
    telemetry_dedup_ttl_hours: int = 24

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
