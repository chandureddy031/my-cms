import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  className?: string;
}

/** Eyebrow + large heading introducing a row of cards. */
export function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("page-x pb-8", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 font-display text-4xl font-bold">{title}</h2>
    </div>
  );
}
