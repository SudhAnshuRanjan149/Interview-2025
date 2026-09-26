from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    kafka_bootstrap_servers: str = "kafka:9092"
    redis_url: str = "redis://redis:6379/0"
    csv_ingest_interval_minutes: int = 5
    csv_incoming_dir: str = "/data/incoming"
    parts_retry_job_interval_minutes: int = 5
    parts_api_base_url: str = "http://parts-api-mock:8000"
    log_level: str = "INFO"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
