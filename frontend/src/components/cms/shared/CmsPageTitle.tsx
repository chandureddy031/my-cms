interface CmsPageTitleProps {
  title: string;
  subtitle?: string;
  /** Shown on the right, e.g. an "Add new" button. */
  children?: React.ReactNode;
}

export function CmsPageTitle({ title, subtitle, children }: CmsPageTitleProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
