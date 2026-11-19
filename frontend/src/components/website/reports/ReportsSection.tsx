import type { ContentItem } from "@/types/content";
import { isPdf } from "@/utils/format";
import { WebsiteSection } from "../shared/WebsiteSection";

/** Year, title and a link that opens the PDF. */
export function ReportsSection({ reports }: { reports: ContentItem[] }) {
  return (
    <WebsiteSection id="reports" eyebrow="Transparency" title="Reports, open to everyone.">
      <ul className="divide-y divide-ws-line border-y border-ws-line">
        {reports.map((report) => (
          <li key={report.id} className="grid gap-2 py-6 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-8">
            <span className="font-display text-2xl text-ws-accent">{report.meta}</span>
            <div>
              <h3 className="text-lg font-medium text-ws-ink">{report.title}</h3>
              {report.body && <p className="mt-1 text-sm text-ws-muted">{report.body}</p>}
            </div>
            {isPdf(report.image) && (
              <a href={report.image!} target="_blank" rel="noopener" className="text-sm font-semibold text-ws-ink underline decoration-ws-line underline-offset-4 hover:decoration-ws-ink">
                Read PDF ↗
              </a>
            )}
          </li>
        ))}
      </ul>
    </WebsiteSection>
  );
}
