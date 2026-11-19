"""Entry point: `uvicorn main:app` (Render and `just api`)."""
from server.app import create_app

app = create_app()
