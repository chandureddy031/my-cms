interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

/** Big title block at the top of a page, with a soft floating glow. */
export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="page-x relative overflow-hidden pb-10 pt-14 md:pt-20">
      <div aria-hidden className="absolute -right-20 -top-24 h-72 w-72 animate-float rounded-full bg-brand-200/60 blur-3xl" />
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="text-shine mt-2 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-lg text-gray-600">{subtitle}</p>}
    </section>
  );
}
