"use client";
import { useState } from "react";
import { API_URL } from "@/constants";

type Status = "idle" | "sending" | "done" | "error";

const MESSAGES: Record<number, string> = {
  422: "Please check your details — the email or amount looks invalid.",
  429: "Too many donations from your network. Please try again in a few minutes.",
};

export function useDonate() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  async function submit(form: HTMLFormElement) {
    setStatus("sending");
    const { custom, amount, ...rest } = Object.fromEntries(new FormData(form));
    try {
      const r = await fetch(`${API_URL}/api/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest, amount: Number(custom || amount) }),
      });
      if (r.ok) return setStatus("done");
      setError(MESSAGES[r.status] ?? "Something went wrong on our side. Please try again.");
    } catch {
      setError("Couldn't reach our server. It may be waking up — please try again in a few seconds.");
    }
    setStatus("error");
  }
  return { status, error, submit };
}
