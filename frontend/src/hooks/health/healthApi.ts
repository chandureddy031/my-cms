import { apiUrl } from "@/lib/api/client";
import type { Fault } from "@/types/health";

interface HealthCheck {
  reachable: boolean;
  healthy: boolean;
  database: "ok" | "down" | "unknown";
  responseMs: number;
}

/** Calls /api/health. No answer at all means the backend is down (or still waking up). */
export async function checkHealth(timeoutMs: number): Promise<HealthCheck> {
  const startedAt = performance.now();
  try {
    const response = await fetch(apiUrl("/api/health"), { cache: "no-store", signal: AbortSignal.timeout(timeoutMs) });
    const body = await response.json().catch(() => ({}));
    return {
      reachable: true,
      healthy: response.ok,
      database: body.database === "ok" ? "ok" : body.database === "down" ? "down" : "unknown",
      responseMs: Math.round(performance.now() - startedAt),
    };
  } catch {
    return { reachable: false, healthy: false, database: "unknown", responseMs: 0 };
  }
}

/** Which layer to blame for a failed page. */
export const faultOf = (health: HealthCheck): Fault =>
  health.healthy ? "ok" : health.reachable && health.database === "down" ? "database" : "backend";
