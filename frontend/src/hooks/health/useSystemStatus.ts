"use client";
import { useEffect, useState } from "react";
import { checkHealth } from "./healthApi";

export type LayerState = "ok" | "down" | "checking";
export interface LayerStatus {
  label: string;
  state: LayerState;
  note: string;
}

const STATUS_TIMEOUT_MS = 20000;

/** Live status of each layer: this page (it rendered), the backend API, the database. */
export function useSystemStatus(): LayerStatus[] {
  const [layers, setLayers] = useState<LayerStatus[]>([
    { label: "Website (UI)", state: "ok", note: "This page loaded" },
    { label: "Backend API", state: "checking", note: "" },
    { label: "Database", state: "checking", note: "" },
  ]);

  useEffect(() => {
    checkHealth(STATUS_TIMEOUT_MS).then((health) => {
      const databaseUp = health.database === "ok";
      setLayers(([website]) =>
        health.reachable
          ? [website,
            { label: "Backend API", state: "ok", note: `Responded in ${health.responseMs} ms` },
            { label: "Database", state: databaseUp ? "ok" : "down", note: databaseUp ? "Connected" : "Not responding" }]
          : [website,
            { label: "Backend API", state: "down", note: "No response (down or waking up)" },
            { label: "Database", state: "down", note: "Unknown — API unreachable" }],
      );
    });
  }, []);

  return layers;
}
