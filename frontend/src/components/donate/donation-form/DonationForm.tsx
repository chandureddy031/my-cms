"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MASCOT_LINES } from "@/constants/mascot";
import { useDonation } from "@/hooks/donations";
import { emitMascot } from "@/hooks/mascot";
import type { DonationCause } from "@/types/donation";
import { homeHref } from "@/utils/routes";
import { AmountPicker } from "../amount-picker/AmountPicker";
import { CausePicker } from "../cause-picker/CausePicker";
import { DONATION_AMOUNTS, THANK_YOU_REDIRECT_MS } from "../constants";
import { DonationThanks } from "../donation-thanks/DonationThanks";
import { DonorDetails } from "../donor-details/DonorDetails";
import { GiftSummary } from "../gift-summary/GiftSummary";

interface DonationFormProps {
  causes: DonationCause[];
  /** Programme slug from ?cause= */
  initialCause?: string;
}

/** Three-step donation form with a live gift summary. */
export function DonationForm({ causes, initialCause }: DonationFormProps) {
  const { status, error, submit } = useDonation();
  const router = useRouter();
  const [cause, setCause] = useState(causes.find((c) => c.slug === initialCause)?.label ?? causes[0]?.label ?? "");
  const [preset, setPreset] = useState(DONATION_AMOUNTS[1]);
  const [custom, setCustom] = useState("");
  const amount = Number(custom) || preset;

  useEffect(() => {
    if (status === "error") emitMascot("sorry", error);
    if (status !== "done") return;
    emitMascot("celebrate", MASCOT_LINES.donated);
    const timer = setTimeout(() => router.push(homeHref()), THANK_YOU_REDIRECT_MS);
    return () => clearTimeout(timer);
  }, [status, error, router]);

  if (status === "done") return <DonationThanks amount={amount} cause={cause} />;

  const choosePreset = (value: number) => {
    setPreset(value);
    setCustom("");
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(e.currentTarget); }} className="page-x grid gap-8 pb-16 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-10">
        <CausePicker causes={causes} selected={cause} onSelect={setCause} />
        <AmountPicker preset={preset} custom={custom} onPreset={choosePreset} onCustom={setCustom} />
        <DonorDetails />
      </div>
      <GiftSummary amount={amount} cause={cause} sending={status === "sending"} error={status === "error" ? error : undefined} />
    </form>
  );
}
