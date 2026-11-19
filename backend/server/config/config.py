from __future__ import annotations

import os
from collections.abc import Mapping
from dataclasses import dataclass

# Render sets RENDER=true on its servers; anything else is a developer machine.
RENDER_ENV_VAR = "RENDER"
DEFAULT_DATABASE_URL = "dbname=foodwave"
# Only for local development; production refuses it (see admin_ready).
DEV_ADMIN_KEY = "apple-admin"
MIN_PROD_ADMIN_KEY_LENGTH = 12
# The local Next.js dev server may always call the API from the browser.
DEV_ORIGIN = "http://localhost:3000"


@dataclass(frozen=True)
class Config:
    production: bool
    database_url: str
    admin_key: str | None
    # Sites allowed to call the API from a browser (the donation form).
    allowed_origins: list[str]

    @property
    def admin_ready(self) -> bool:
        """In production a missing, short or default key turns the admin endpoints off (fail closed)."""
        if not self.admin_key:
            return False
        if not self.production:
            return True
        return len(self.admin_key) >= MIN_PROD_ADMIN_KEY_LENGTH and self.admin_key != DEV_ADMIN_KEY


def load_config(env: Mapping[str, str] = os.environ) -> Config:
    production = bool(env.get(RENDER_ENV_VAR))
    frontend_urls = [url.strip().rstrip("/") for url in env.get("FRONTEND_URL", "").split(",") if url.strip()]
    return Config(
        production=production,
        database_url=env.get("DATABASE_URL", DEFAULT_DATABASE_URL),
        # ponytail: one shared editor key; real accounts when there are many editors.
        admin_key=env.get("ADMIN_KEY") or (None if production else DEV_ADMIN_KEY),
        allowed_origins=[DEV_ORIGIN, *frontend_urls],
    )


config = load_config()
