"use client";
import { useState } from "react";
import { API_URL } from "@/constants";

type Status = "idle" | "sending" | "done" | "error";

export function useDonate() {
  const [status, setStatus] = useState<Status>("idle");
  async function submit(form: HTMLFormElement) {
    setStatus("sending");
    const { custom, amount, ...rest } = Object.fromEntries(new FormData(form));
    try {
      const r = await fetch(`${API_URL}/api/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest, amount: Number(custom || amount) }),
      });
      setStatus(r.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }
  return { status, submit };
}
