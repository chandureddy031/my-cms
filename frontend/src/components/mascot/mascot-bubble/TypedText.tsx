"use client";
import { useTypewriter } from "@/hooks/mascot";

interface TypedTextProps {
  text: string;
}

/** Types the message out letter by letter; screen readers get it whole. */
export function TypedText({ text }: TypedTextProps) {
  const shown = useTypewriter(text);
  return (
    <p className="text-sm leading-relaxed text-ink">
      <span className="sr-only" aria-live="polite">{text}</span>
      <span aria-hidden>{[...text].slice(0, shown).join("")}<span className={shown < text.length ? "m-caret" : "hidden"}>▍</span></span>
    </p>
  );
}
