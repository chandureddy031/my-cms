/** Base URL of the FastAPI backend (NEXT_PUBLIC_API_URL in production). */
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** Seconds a public page may be served from cache before it is rebuilt. */
export const REVALIDATE_SECONDS = 60;

export const ADMIN_COOKIE = "apple_admin";
export const ADMIN_KEY_HEADER = "X-Admin-Key";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 8;

/** Browser storage keys. */
export const STORAGE_KEYS = {
  sidebar: "apple.sidebar",
  mascotHidden: "apple.mascot.hidden",
  mascotGreeted: "apple.mascot.greeted",
} as const;
