from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    DATABASE_URL: str = Field(..., description="Database connection string")
    SECRET_KEY: str = Field(..., description="JWT secret key")

    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()