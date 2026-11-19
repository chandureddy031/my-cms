from __future__ import annotations

from fastapi import APIRouter, Depends

from server.admin import require_admin
from server.content import service
from server.content.constants import Section
from server.content.schemas import ContentIn
from server.database import pool

router = APIRouter(prefix="/api")

# Each handler commits before it returns, so the CMS reads its own write straight after saving.


@router.post("/content", status_code=201, dependencies=[Depends(require_admin)])
def create_content(item: ContentIn):
    with pool.connection() as conn:
        return service.create_item(conn, item)


@router.put("/content/{item_id}", dependencies=[Depends(require_admin)])
def update_content(item_id: int, item: ContentIn):
    with pool.connection() as conn:
        return service.update_item(conn, item_id, item)


@router.delete("/content/{item_id}", status_code=204, dependencies=[Depends(require_admin)])
def delete_content(item_id: int) -> None:
    with pool.connection() as conn:
        service.delete_item(conn, item_id)


# Catch-all path: the app registers this router last so /api/site, /api/health… match first.
@router.get("/{section}")
def list_section(section: Section):
    with pool.connection() as conn:
        return service.list_section(conn, section)
