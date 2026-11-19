import type { ContentField } from "@/types/content";
import { cn } from "@/utils/cn";
import { CMS_INPUT_CLASS } from "../shared/CmsField";
import { MULTILINE_FIELDS } from "./constants";

interface FieldInputProps {
  field: ContentField;
  label: string;
  value: unknown;
}

/** The right control for a field: textarea for long text, number / email / text input otherwise. */
export function FieldInput({ field, label, value }: FieldInputProps) {
  const common = { name: field, defaultValue: value == null ? "" : String(value), "aria-label": label, required: field === "title" };
  if (MULTILINE_FIELDS.includes(field))
    return <textarea {...common} rows={field === "details" ? 16 : 3} className={cn(CMS_INPUT_CLASS, "font-mono text-[13px] leading-relaxed")} />;
  return <input {...common} type={field === "position" ? "number" : field === "email" ? "email" : "text"} className={CMS_INPUT_CLASS} />;
}
