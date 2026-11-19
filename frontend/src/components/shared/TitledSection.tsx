import { cn } from "@/utils/cn";

interface TitledSectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

/** Section with a plain heading, e.g. "More stories" under an article. */
export function TitledSection({ title, className, children }: TitledSectionProps) {
  return (
    <section className={cn("page-x", className)}>
      <h2 className="heading-section mb-6">{title}</h2>
      {children}
    </section>
  );
}
