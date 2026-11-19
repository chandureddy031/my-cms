import { cn } from "@/utils/cn";

interface WebsiteSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
  children: React.ReactNode;
}

/** One block of the page: small label, big serif heading, optional intro, then content. */
export function WebsiteSection({ id, eyebrow, title, intro, className, children }: WebsiteSectionProps) {
  return (
    <section id={id} className={cn("border-t border-ws-line py-20 sm:py-28", className)}>
      <div className="ws-x">
        <p className="ws-eyebrow">{eyebrow}</p>
        <h2 className="ws-heading mt-3 max-w-3xl">{title}</h2>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ws-muted">{intro}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
