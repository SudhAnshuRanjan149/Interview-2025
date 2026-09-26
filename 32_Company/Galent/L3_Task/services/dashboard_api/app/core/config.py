from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    kafka_bootstrap_servers: str = "kafka:9092"
    kafka_consumer_group_id: str = "fleet-dashboard"
    redis_url: str = "redis://redis:6379/0"
    database_url: str = "postgresql+asyncpg://fleet:secret@postgres:5432/fleet_db"
    jwt_secret: str = "change-me-jwt-secret"
    ws_heartbeat_interval_seconds: int = 30
    cache_fleet_health_ttl_seconds: int = 10
    log_level: str = "INFO"
    app_env: str = "development"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
