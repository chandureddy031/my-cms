"use client";
import { FaultNotice } from "@/components/feedback";
import { Button, ButtonLink } from "@/components/ui";
import { cmsDashboardHref } from "@/utils/routes";

interface CmsErrorPanelProps {
  onRetry: () => void;
}

export function CmsErrorPanel({ onRetry }: CmsErrorPanelProps) {
  return (
    <div className="mx-auto mt-10 max-w-lg rounded-[2rem] border border-red-200 bg-white p-8 text-center shadow-soft">
      <h1 className="font-display text-3xl font-bold">Couldn't load this page</h1>
      <FaultNotice />
      <div className="mt-6 flex justify-center gap-3">
        <Button onClick={onRetry}>Try again</Button>
        <ButtonLink href={cmsDashboardHref()} variant="outline">Dashboard</ButtonLink>
      </div>
    </div>
  );
}
