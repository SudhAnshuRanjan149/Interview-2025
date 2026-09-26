from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    kafka_bootstrap_servers: str = "kafka:9092"
    kafka_consumer_group_id: str = "fleet-alert-processor"
    redis_url: str = "redis://redis:6379/0"
    database_url: str = "postgresql+asyncpg://fleet:secret@postgres:5432/fleet_db"
    parts_api_base_url: str = "http://parts-api-mock:8000"
    parts_api_max_retries: int = 5
    parts_retry_interval_seconds: int = 300
    log_level: str = "INFO"
    app_env: str = "development"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
