"use client";
import { Button, ButtonLink } from "@/components/ui";
import { homeHref } from "@/utils/routes";
import { FaultNotice } from "./FaultNotice";

interface SiteErrorPanelProps {
  onRetry: () => void;
}

/** When the API can't be reached for a page with no cached copy yet. */
export function SiteErrorPanel({ onRetry }: SiteErrorPanelProps) {
  return (
    <section className="page-mx glass my-16 rounded-[2rem] p-10 text-center shadow-lift">
      <h1 className="text-shine font-display text-4xl font-bold">We're waking up…</h1>
      <p className="mx-auto mt-3 max-w-md text-gray-600">This page couldn't load just now.</p>
      <FaultNotice />
      <div className="mt-8 flex justify-center gap-3">
        <Button onClick={onRetry} size="lg">Try again</Button>
        <ButtonLink href={homeHref()} variant="outline" size="lg">Home</ButtonLink>
      </div>
    </section>
  );
}
