import Image from "next/image";
import type { DonationCause } from "@/types/donation";

interface CauseOptionProps {
  cause: DonationCause;
  checked: boolean;
  onSelect: () => void;
}

/** A selectable photo card (a radio button underneath). */
export function CauseOption({ cause, checked, onSelect }: CauseOptionProps) {
  return (
    <label className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-brand-100 bg-white shadow-soft transition hover:shadow-lift has-[:checked]:border-brand-500 has-[:checked]:shadow-glow has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-200">
      <input type="radio" name="cause" value={cause.label} checked={checked} onChange={onSelect} className="sr-only" required />
      {cause.image && (
        <div className="relative h-28">
          <Image src={cause.image} alt="" fill sizes="300px" className="object-cover transition duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-white" />
        </div>
      )}
      <div className="p-4 pt-1">
        <p className="font-semibold">{cause.title}</p>
        <p className="mt-1 line-clamp-2 text-xs text-gray-500">{cause.summary}</p>
      </div>
      <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white/80 text-sm text-transparent shadow-soft transition group-has-[:checked]:bg-brand-600 group-has-[:checked]:text-white">✓</span>
    </label>
  );
}
