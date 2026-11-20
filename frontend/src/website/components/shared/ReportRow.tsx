import type { ContentItem } from "@/types/content";
import { isPdf } from "@/utils/format";

/** Year, title, summary and a link to the PDF. */
export function ReportRow({ report }: { report: ContentItem }) {
  return (
    <li className="grid gap-2 border-b border-soil-line px-6 py-5 last:border-0 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:gap-6">
      <span className="font-soil-head text-2xl text-soil-brand">{report.meta}</span>
      <div>
        <h3 className="font-semibold">{report.title}</h3>
        {report.body && <p className="text-soil-body">{report.body}</p>}
      </div>
      {isPdf(report.image) && <a href={report.image!} target="_blank" rel="noopener" className="soil-btn-line py-2">View PDF</a>}
    </li>
  );
}
