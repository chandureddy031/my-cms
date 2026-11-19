from __future__ import annotations

from fastapi import APIRouter, Depends

from server.admin.dependencies import require_admin

router = APIRouter(prefix="/api/admin")


@router.get("/check", dependencies=[Depends(require_admin)])
def check_key() -> dict[str, bool]:
    """The CMS calls this to verify a key before unlocking."""
    return {"ok": True}
