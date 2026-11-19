"use client";
import { SiteErrorPanel } from "@/components/feedback/SiteErrorPanel";

export default function SiteError({ reset }: { error: Error; reset: () => void }) {
  return <SiteErrorPanel onRetry={reset} />;
}
