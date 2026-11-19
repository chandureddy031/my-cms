import { FAULT_TEXT } from "@/constants/health";
import { apiUrl, describeFailure } from "@/lib/api/client";
import type { DonationInput } from "@/types/donation";
import { DONATION_ERRORS } from "./constants";

/** Browser: posts the donation. Never throws; a failure comes back as a message for the visitor. */
export async function postDonation(input: DonationInput): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const response = await fetch(apiUrl("/api/donations"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (response.ok) return { ok: true };
    return { ok: false, message: DONATION_ERRORS[response.status] ?? (await describeFailure(response)) };
  } catch {
    return { ok: false, message: FAULT_TEXT.backend };
  }
}
