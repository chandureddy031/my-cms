# Per visitor IP: at most this many donation attempts per window.
DONATIONS_PER_WINDOW = 10
DONATION_WINDOW_SECONDS = 600
# The limiter forgets everyone when it tracks more IPs than this, so memory stays bounded.
MAX_TRACKED_IPS = 10_000

DEFAULT_LIST_LIMIT = 200
MAX_LIST_LIMIT = 1000

RATE_LIMITED_MESSAGE = "Too many donations from your network. Please try again in a few minutes."
