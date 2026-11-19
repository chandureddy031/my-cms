from typing import Literal

# Must match the CHECK constraint on content.section in schema.sql.
Section = Literal["activities", "reports", "stories", "gallery", "caretakers", "stats"]

# Slugs and parent links: lowercase letters, digits and dashes (they appear in page URLs).
SLUG_PATTERN = r"^[a-z0-9-]+$"
# ponytail: images are local files under /assets; S3 presigned URLs when uploads are needed.
IMAGE_PATTERN = r"^/assets/[\w.-]+$"
