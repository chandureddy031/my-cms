import Image from "next/image";
import { LOGO_COLORS } from "@/constants/site";
import { cn } from "@/utils/cn";

/** public/logo.jpeg is 1366 × 1152. */
const EMBLEM = { src: "/logo.jpeg", width: 1366, height: 1152 };

interface LogoProps {
  name: string;
  className?: string;
  /** Only the emblem (collapsed sidebar). */
  emblemOnly?: boolean;
}

/** The APPLES emblem, sized to the text, followed by the name with every letter in its own colour. */
export function Logo({ name, className, emblemOnly }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-[0.3em] font-display font-black tracking-tight", className)} aria-label={name}>
      <Image src={EMBLEM.src} width={EMBLEM.width} height={EMBLEM.height} alt="" aria-hidden className="h-[1.35em] w-auto shrink-0" />
      {!emblemOnly && (
        <span aria-hidden>
          {[...name].map((letter, i) => <span key={i} style={{ color: LOGO_COLORS[i % LOGO_COLORS.length] }}>{letter}</span>)}
        </span>
      )}
    </span>
  );
}
