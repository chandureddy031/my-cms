from __future__ import annotations

from collections import defaultdict, deque

from server.donations.constants import DONATION_WINDOW_SECONDS, DONATIONS_PER_WINDOW, MAX_TRACKED_IPS


class RateLimiter:
    """Sliding-window limit per key.

    ponytail: in memory, so it is per server process; move to Redis if the API ever runs on several instances.
    """

    def __init__(self, limit: int = DONATIONS_PER_WINDOW, window_seconds: float = DONATION_WINDOW_SECONDS, max_keys: int = MAX_TRACKED_IPS):
        self.limit = limit
        self.window_seconds = window_seconds
        self.max_keys = max_keys
        self._hits: dict[str, deque[float]] = defaultdict(deque)

    def allow(self, key: str, now: float) -> bool:
        """Records one attempt at `now` (seconds) and says whether it is within the limit."""
        hits = self._hits[key]
        while hits and now - hits[0] > self.window_seconds:
            hits.popleft()
        if len(hits) >= self.limit:
            return False
        hits.append(now)
        if len(self._hits) > self.max_keys:
            self._hits.clear()
        return True


def client_ip(headers: dict[str, str], peer: str | None) -> str:
    """The visitor's IP behind Cloudflare / Render's proxy: their header, else the last proxy hop, else the socket peer."""
    forwarded = headers.get("cf-connecting-ip") or headers.get("x-forwarded-for", "").split(",")[-1].strip()
    return forwarded or peer or "unknown"
