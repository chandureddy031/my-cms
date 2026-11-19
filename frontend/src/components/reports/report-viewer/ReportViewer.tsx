import { BackLink } from "@/components/shared";
import { buttonClass } from "@/components/ui";
import type { ContentItem } from "@/types/content";
import { reportsHref } from "@/utils/routes";

interface ReportViewerProps {
  report: ContentItem;
  pdf: string;
}

/** Report heading and the PDF embedded in the page. */
export function ReportViewer({ report, pdf }: ReportViewerProps) {
  return (
    <section className="page-x py-8">
      <BackLink href={reportsHref()} label="All reports" />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="meta-label">{report.meta}</span>
          <h1 className="text-shine font-display text-4xl font-bold">{report.title}</h1>
          <p className="mt-2 max-w-2xl text-gray-600">{report.body}</p>
        </div>
        <a href={pdf} target="_blank" rel="noreferrer" className={buttonClass({ variant: "outline" })}>Open in new tab ↗</a>
      </div>
      <iframe src={pdf} title={report.title} className="mt-6 h-[80vh] w-full rounded-3xl border border-brand-100 bg-white shadow-lift" />
    </section>
  );
}
