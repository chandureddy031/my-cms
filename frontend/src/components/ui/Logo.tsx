import { LOGO_COLORS } from "@/constants/site";
import { cn } from "@/utils/cn";

interface LogoProps {
  name: string;
  className?: string;
}

/** The organisation name, every letter in its own colour. */
export function Logo({ name, className }: LogoProps) {
  return (
    <span className={cn("font-display font-black tracking-tight", className)} aria-label={name}>
      {[...name].map((letter, i) => (
        <span key={i} aria-hidden style={{ color: LOGO_COLORS[i % LOGO_COLORS.length], textShadow: "0 2px 12px rgb(34 197 94 / .25)" }}>{letter}</span>
      ))}
    </span>
  );
}
