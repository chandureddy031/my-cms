import { LOGO_COLORS } from "@/constants";

// Each letter in its own colour.
export function Logo({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`font-display font-black tracking-tight ${className}`} aria-label={name}>
      {[...name].map((c, i) => (
        <span key={i} aria-hidden style={{ color: LOGO_COLORS[i % LOGO_COLORS.length], textShadow: "0 2px 12px rgb(34 197 94 / .25)" }}>{c}</span>
      ))}
    </span>
  );
}
