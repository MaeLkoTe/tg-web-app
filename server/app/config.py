from pathlib import Path

from pydantic import AliasChoices, Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    tonapi_key: SecretStr = Field(validation_alias=AliasChoices("TONAPI_KEY"), min_length=1)
    toncenter_key: SecretStr = Field(validation_alias=AliasChoices("TONCENTER_API_KEY"), min_length=1)

    model_config = SettingsConfigDict(
        env_file=Path(__file__).resolve().parents[1] / ".env",
        env_file_encoding="utf-8-sig",
        extra="ignore",
        hide_input_in_errors=True,
    )


settings = Settings()

