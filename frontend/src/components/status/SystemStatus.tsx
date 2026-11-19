"use client";
import { useSystemStatus } from "@/hooks/health";
import { LayerStatusRow } from "./LayerStatusRow";

/** Live check of the website, backend API and database. */
export function SystemStatus() {
  const layers = useSystemStatus();
  return (
    <section className="page-x py-14">
      <h1 className="text-shine font-display text-5xl font-bold">System status</h1>
      <div className="mt-8 max-w-xl space-y-3">
        {layers.map((layer) => <LayerStatusRow key={layer.label} layer={layer} />)}
      </div>
    </section>
  );
}
