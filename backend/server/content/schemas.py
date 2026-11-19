from __future__ import annotations

from pydantic import BaseModel, Field

from server.content.constants import IMAGE_PATTERN, SLUG_PATTERN, Section


class ContentIn(BaseModel):
    """One CMS item; each section uses a subset of the fields."""

    section: Section
    title: str = Field(min_length=1, max_length=200)
    body: str = Field(default="", max_length=5000)
    image: str | None = Field(default=None, pattern=IMAGE_PATTERN)
    meta: str | None = Field(default=None, max_length=200)
    position: int = Field(default=0, ge=-10_000, le=10_000)
    slug: str | None = Field(default=None, pattern=SLUG_PATTERN, max_length=80)
    details: str = Field(default="", max_length=20000)
    parent: str | None = Field(default=None, pattern=SLUG_PATTERN, max_length=80)
    email: str | None = Field(default=None, max_length=200)
    phone: str | None = Field(default=None, max_length=40)


# Column names come from the model, never from the request, so building SQL with them is safe.
CONTENT_COLUMNS = list(ContentIn.model_fields)
