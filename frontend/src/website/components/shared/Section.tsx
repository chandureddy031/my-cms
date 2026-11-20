import { cn } from "@/utils/cn";

interface SectionProps {
  title?: string;
  text?: string;
  band?: boolean;
  action?: React.ReactNode;
  children: React.ReactNode;
}

/** A page block: optional heading and intro (with a link on the right), then content. `band` gives the clay background. */
export function Section({ title, text, band, action, children }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-24", band && "bg-soil-band")}>
      <div className="soil-x">
        {title && (
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="soil-h2 max-w-2xl">{title}</h2>
              {text && <p className="soil-lead mt-4">{text}</p>}
            </div>
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
