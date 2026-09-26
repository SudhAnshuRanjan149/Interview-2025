from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    kafka_bootstrap_servers: str = "kafka:9092"
    kafka_consumer_group_id: str = "fleet-maintenance"
    redis_url: str = "redis://redis:6379/0"
    rules_config_path: str = "/app/config/rules.yaml"
    vehicle_window_evict_seconds: int = 3600
    log_level: str = "INFO"
    app_env: str = "development"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
