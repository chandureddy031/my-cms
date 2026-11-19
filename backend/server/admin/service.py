from __future__ import annotations

import secrets
from enum import Enum

from server.config import Config


class KeyCheck(Enum):
    OK = "ok"
    NOT_CONFIGURED = "not_configured"
    WRONG = "wrong"


def check_admin_key(provided: str, config: Config) -> KeyCheck:
    """Compares in constant time, so the answer time doesn't reveal how much of the key matched."""
    if not config.admin_ready or not config.admin_key:
        return KeyCheck.NOT_CONFIGURED
    if not secrets.compare_digest(provided.encode(), config.admin_key.encode()):
        return KeyCheck.WRONG
    return KeyCheck.OK
