"""
Application configuration using Pydantic Settings.
Loads environment variables from .env file.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Literal


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # LLM Configuration
    openai_api_key: str
    openai_model: str = "gpt-4o-mini"
    openai_embedding_model: str = "text-embedding-3-small"
    anthropic_api_key: str | None = None
    
    # External APIs
    openweather_api_key: str | None = None
    news_api_key: str | None = None
    
    # Database & Cache
    redis_url: str = "redis://localhost:6379/0"
    chroma_persist_dir: str = "./data/chroma_db"
    
    # Application
    app_env: Literal["development", "production"] = "development"
    log_level: str = "INFO"
    api_key: str = "dev-secret"
    max_tokens: int = 2048
    temperature: float = 0.1
    
    # Observability
    langchain_tracing_v2: bool = False
    langchain_api_key: str | None = None
    langchain_project: str = "agentiq-local"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )


# Global settings instance
settings = Settings()
