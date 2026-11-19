import type { Fault } from "@/types/health";

/** What the visitor is told when a page fails, per failing layer. */
export const FAULT_TEXT: Record<Fault, string> = {
  ok: "Server and database are fine — this was a problem in the page itself (UI). Please try again.",
  database: "Database problem: our database is not responding right now. The team has been alerted by the health check.",
  backend: "Backend problem: our API server is not responding. It may be waking up — try again in a minute.",
};
