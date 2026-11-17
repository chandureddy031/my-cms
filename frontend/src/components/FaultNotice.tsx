"use client";
import { useEffect, useState } from "react";
import { diagnose, FAULT_TEXT, type Fault } from "@/lib/diagnose";
import { mascot } from "@/lib/mascotBus";

// Shown by error pages: checks which layer failed (UI / backend / database) and says so.
export function FaultNotice() {
  const [f, setF] = useState<Fault | null>(null);
  useEffect(() => {
    diagnose().then((f) => { setF(f); mascot(f === "backend" ? "sleepy" : "worried", FAULT_TEXT[f]); });
  }, []);
  return (
    <p role="status" className="mx-auto mt-4 max-w-md rounded-2xl bg-brand-50 px-4 py-3 text-sm text-brand-900">
      {f ? FAULT_TEXT[f] : "Checking what went wrong…"}
    </p>
  );
}
