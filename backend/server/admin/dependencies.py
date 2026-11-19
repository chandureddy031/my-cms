from __future__ import annotations

import time

from fastapi import Header, HTTPException

from server.admin.constants import WRONG_KEY_DELAY_SECONDS
from server.admin.service import KeyCheck, check_admin_key
from server.config import config


def require_admin(x_admin_key: str = Header("")) -> None:
    """Route dependency: lets the request through only with the right X-Admin-Key."""
    result = check_admin_key(x_admin_key, config)
    if result is KeyCheck.NOT_CONFIGURED:
        raise HTTPException(503, "ADMIN_KEY is not set (or too weak) on the server")
    if result is KeyCheck.WRONG:
        time.sleep(WRONG_KEY_DELAY_SECONDS)  # sync dependency: only this worker thread waits
        raise HTTPException(401, "bad admin key")
