"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/constants";

type Row = { label: string; state: "ok" | "down" | "checking"; note: string };

// Live check of each layer: website (this page rendered), backend API, database.
export default function Status() {
  const [rows, setRows] = useState<Row[]>([
    { label: "Website (UI)", state: "ok", note: "This page loaded" },
    { label: "Backend API", state: "checking", note: "" },
    { label: "Database", state: "checking", note: "" },
  ]);
  useEffect(() => {
    const t0 = performance.now();
    fetch(`${API_URL}/api/health`, { cache: "no-store", signal: AbortSignal.timeout(20000) })
      .then(async (r) => {
        const b = await r.json().catch(() => ({}));
        const ms = Math.round(performance.now() - t0);
        setRows((x) => [x[0], { label: "Backend API", state: "ok", note: `Responded in ${ms} ms` },
          { label: "Database", state: b.database === "ok" ? "ok" : "down", note: b.database === "ok" ? "Connected" : "Not responding" }]);
      })
      .catch(() => setRows((x) => [x[0], { label: "Backend API", state: "down", note: "No response (down or waking up)" },
        { label: "Database", state: "down", note: "Unknown — API unreachable" }]));
  }, []);
  const dot = { ok: "bg-brand-500 shadow-glow", down: "bg-red-500", checking: "bg-gray-300 animate-pulse" };
  return (
    <section className="px-6 py-14 md:px-12">
      <h1 className="text-shine font-display text-5xl font-bold">System status</h1>
      <div className="mt-8 max-w-xl space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
            <span className={`h-3 w-3 rounded-full ${dot[r.state]}`} />
            <span className="flex-1 font-semibold">{r.label}</span>
            <span className="text-sm text-gray-500">{r.state === "checking" ? "Checking…" : r.note}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
