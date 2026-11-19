import type { ContentItem } from "@/types/content";
import type { Donation, DonationCause } from "@/types/donation";
import { apiGet } from "./client";

/** CMS only: every donation, newest first. */
export const getDonations = (adminKey: string) => apiGet<Donation[]>("/api/donations", { fresh: true, adminKey });

export const totalOf = (donations: Donation[]) => donations.reduce((sum, donation) => sum + Number(donation.amount), 0);

/** [cause, total] pairs, largest first. */
export function totalsByCause(donations: Donation[]): [string, number][] {
  const totals = new Map<string, number>();
  for (const { cause, amount } of donations) totals.set(cause, (totals.get(cause) ?? 0) + Number(amount));
  return [...totals].sort((a, b) => b[1] - a[1]);
}

/** Every programme is a cause on the donation form. */
export const causesFromActivities = (activities: ContentItem[]): DonationCause[] =>
  activities.map((activity) => ({
    slug: activity.slug!,
    title: activity.title,
    label: activity.meta ?? activity.title,
    image: activity.image,
    summary: activity.body,
  }));
