import { API_URL } from "@/constants";

export type Fault = "ok" | "database" | "backend";

// Asks the API's health check which layer is failing. No answer at all = backend down.
export async function diagnose(): Promise<Fault> {
  try {
    const r = await fetch(`${API_URL}/api/health`, { cache: "no-store", signal: AbortSignal.timeout(15000) });
    if (r.ok) return "ok";
    return (await r.json().catch(() => ({}))).database === "down" ? "database" : "backend";
  } catch {
    return "backend";
  }
}

export const FAULT_TEXT: Record<Fault, string> = {
  ok: "Server and database are fine — this was a problem in the page itself (UI). Please try again.",
  database: "Database problem: our database is not responding right now. The team has been alerted by the health check.",
  backend: "Backend problem: our API server is not responding. It may be waking up — try again in a minute.",
};

// Turns a failed API response (or none) into a message naming the failing layer.
export async function faultFrom(r: Response | null): Promise<string> {
  if (!r) return FAULT_TEXT.backend;
  const body = await r.clone().json().catch(() => ({}));
  if (body.source === "database") return FAULT_TEXT.database;
  return `Backend error (${r.status}). Please try again.`;
}
