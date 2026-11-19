from __future__ import annotations

from decimal import Decimal

from pydantic import BaseModel, EmailStr, Field


class DonationIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    amount: Decimal = Field(gt=0, le=10_000_000, max_digits=12, decimal_places=2)
    cause: str = Field(min_length=1, max_length=60)
    message: str | None = Field(default=None, max_length=1000)
