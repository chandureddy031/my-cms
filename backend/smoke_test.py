"""End-to-end check against a running API: python smoke_test.py [base_url] (uses ADMIN_KEY env, default dev key).
Creates and deletes one test item and one test donation; leaves no data behind on success."""
import json
import os
import sys
import urllib.error
import urllib.request

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000").rstrip("/")
KEY = os.getenv("ADMIN_KEY", "apple-admin")


def call(method, path, body=None, key=None):
    req = urllib.request.Request(BASE + path, method=method, data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Content-Type": "application/json", **({"X-Admin-Key": key} if key else {})})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status, json.loads(r.read() or "null")
    except urllib.error.HTTPError as e:
        return e.code, None


assert call("GET", "/api/health")[0] == 200, "health"
for s in ["activities", "reports", "stories", "gallery", "caretakers", "stats"]:
    code, rows = call("GET", f"/api/{s}")
    assert code == 200 and isinstance(rows, list), s
assert call("GET", "/api/nope")[0] == 422, "unknown section rejected"
assert call("GET", "/api/donations")[0] == 401, "donations need key"
assert call("POST", "/api/content", {"section": "stats", "title": "x"})[0] == 401, "writes need key"
assert call("POST", "/api/content", {"section": "stats", "title": "x", "image": "http://evil/x.jpg"}, KEY)[0] == 422, "image path validated"
code, row = call("POST", "/api/content", {"section": "stats", "title": "smoke-test", "body": "1"}, KEY)
assert code == 201, f"create {code}"
assert call("PUT", f"/api/content/{row['id']}", {"section": "stats", "title": "smoke-test-2", "body": "2"}, KEY)[0] == 200, "update"
assert call("DELETE", f"/api/content/{row['id']}", key=KEY)[0] == 204, "delete"
assert call("DELETE", f"/api/content/{row['id']}", key=KEY)[0] == 404, "delete twice -> 404"
assert call("POST", "/api/donations", {"name": "x", "email": "bad", "amount": 1, "cause": "x"})[0] == 422, "donation validated"
assert call("POST", "/api/donations", {"name": "x", "email": "a@example.com", "amount": 1.234, "cause": "x"})[0] == 422, "max 2 decimals"
print("smoke test passed:", BASE)
