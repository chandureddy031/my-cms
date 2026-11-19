import type { DonationCause } from "@/types/donation";
import { StepLegend } from "../step-legend/StepLegend";
import { CauseOption } from "./CauseOption";

interface CausePickerProps {
  causes: DonationCause[];
  selected: string;
  onSelect: (label: string) => void;
}

/** Step 1: one card per programme. */
export function CausePicker({ causes, selected, onSelect }: CausePickerProps) {
  return (
    <fieldset>
      <StepLegend step={1}>Choose a cause</StepLegend>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {causes.map((cause) => <CauseOption key={cause.slug} cause={cause} checked={selected === cause.label} onSelect={() => onSelect(cause.label)} />)}
      </div>
    </fieldset>
  );
}
