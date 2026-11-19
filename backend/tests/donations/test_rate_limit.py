from server.donations.rate_limit import RateLimiter, client_ip


def test_allows_up_to_the_limit_then_blocks():
    limiter = RateLimiter(limit=3, window_seconds=60)
    assert [limiter.allow("ip", now=t) for t in (0, 1, 2, 3)] == [True, True, True, False]


def test_old_attempts_expire_after_the_window():
    limiter = RateLimiter(limit=1, window_seconds=60)
    assert limiter.allow("ip", now=0)
    assert not limiter.allow("ip", now=59)
    assert limiter.allow("ip", now=61)


def test_each_ip_has_its_own_limit():
    limiter = RateLimiter(limit=1, window_seconds=60)
    assert limiter.allow("a", now=0)
    assert limiter.allow("b", now=0)


def test_forgets_everyone_when_tracking_too_many_ips():
    limiter = RateLimiter(limit=1, window_seconds=60, max_keys=2)
    for ip in ("a", "b", "c"):
        limiter.allow(ip, now=0)
    assert limiter.allow("a", now=1)  # memory was cleared, so "a" starts fresh


def test_client_ip_prefers_cloudflare_then_last_forwarded_hop_then_peer():
    assert client_ip({"cf-connecting-ip": "1.1.1.1", "x-forwarded-for": "2.2.2.2"}, "3.3.3.3") == "1.1.1.1"
    assert client_ip({"x-forwarded-for": "9.9.9.9, 2.2.2.2"}, "3.3.3.3") == "2.2.2.2"
    assert client_ip({}, "3.3.3.3") == "3.3.3.3"
    assert client_ip({}, None) == "unknown"
