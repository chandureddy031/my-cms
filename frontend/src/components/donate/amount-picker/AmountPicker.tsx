import { formatInr } from "@/utils/format";
import { DONATION_AMOUNTS } from "../constants";
import { StepLegend } from "../step-legend/StepLegend";

interface AmountPickerProps {
  preset: number;
  custom: string;
  onPreset: (amount: number) => void;
  onCustom: (value: string) => void;
}

/** Step 2: a preset amount, or any amount typed in. */
export function AmountPicker({ preset, custom, onPreset, onCustom }: AmountPickerProps) {
  return (
    <fieldset>
      <StepLegend step={2}>Pick an amount</StepLegend>
      <div className="flex flex-wrap gap-3">
        {DONATION_AMOUNTS.map((amount) => (
          <label key={amount} className="cursor-pointer rounded-2xl border-2 border-brand-100 bg-white px-6 py-3 font-display text-xl font-semibold shadow-soft transition hover:shadow-lift has-[:checked]:border-brand-500 has-[:checked]:bg-brand-600 has-[:checked]:text-white has-[:checked]:shadow-glow has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-200">
            <input type="radio" name="amount" value={amount} checked={!custom && preset === amount} onChange={() => onPreset(amount)} className="sr-only" />
            {formatInr(amount)}
          </label>
        ))}
        <label className="flex items-center rounded-2xl border-2 border-brand-100 bg-white px-4 shadow-soft has-[input:not(:placeholder-shown)]:border-brand-500 has-[input:not(:placeholder-shown)]:shadow-glow">
          <span className="font-display text-xl text-gray-400">₹</span>
          <input name="custom" type="number" min={1} max={10000000} value={custom} onChange={(e) => onCustom(e.target.value)} placeholder="Other amount" aria-label="Other amount" className="w-36 bg-transparent px-2 py-3 font-display text-xl focus:outline-none" />
        </label>
      </div>
    </fieldset>
  );
}
