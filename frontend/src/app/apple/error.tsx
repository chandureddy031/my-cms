"use client";
import { CmsErrorPanel } from "@/components/cms/shared/CmsErrorPanel";

export default function CmsError({ reset }: { error: Error; reset: () => void }) {
  return <CmsErrorPanel onRetry={reset} />;
}
