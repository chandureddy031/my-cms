import { cn } from "@/utils/cn";

/** Text input / textarea style used across the CMS. */
export const CMS_INPUT_CLASS = "w-full rounded-xl border border-brand-100 bg-white px-4 py-2.5 text-sm shadow-soft focus:border-brand-400 focus:shadow-glow focus:outline-none";

interface CmsFieldProps {
  label: string;
  hint?: string;
  capitalize?: boolean;
  children: React.ReactNode;
}

/** Label above a form control, with an optional hint under it. */
export function CmsField({ label, hint, capitalize, children }: CmsFieldProps) {
  return (
    <label className="block">
      <span className={cn("mb-1.5 block text-sm font-semibold text-gray-700", capitalize && "capitalize")}>{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  );
}
