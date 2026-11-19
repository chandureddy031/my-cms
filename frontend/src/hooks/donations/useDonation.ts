"use client";
import { useState } from "react";
import { postDonation } from "./donationsApi";

type DonationStatus = "idle" | "sending" | "done" | "error";

/** Sends the donation form; `status` and `error` drive the form and the thank-you screen. */
export function useDonation() {
  const [status, setStatus] = useState<DonationStatus>("idle");
  const [error, setError] = useState("");

  async function submit(form: HTMLFormElement) {
    setStatus("sending");
    const fields = new FormData(form);
    const value = (name: string) => String(fields.get(name) ?? "");
    const result = await postDonation({
      name: value("name"),
      email: value("email"),
      cause: value("cause"),
      message: value("message"),
      amount: Number(value("custom") || value("amount")),
    });
    if (result.ok) return setStatus("done");
    setError(result.message);
    setStatus("error");
  }

  return { status, error, submit };
}
