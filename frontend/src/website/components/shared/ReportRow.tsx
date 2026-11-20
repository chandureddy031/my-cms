import type { WebsiteReport } from "../../constants/reports";

/** Year, title and summary; opens the PDF, or a "coming soon" popover (native, no JavaScript) until it is uploaded. */
export function ReportRow({ report }: { report: WebsiteReport }) {
  const noticeId = `report-${report.id}`;
  return (
    <li className="grid gap-2 border-b border-soil-line px-6 py-5 last:border-0 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:gap-6">
      <span className="font-soil-head text-2xl text-soil-brand">{report.year}</span>
      <div>
        <h3 className="font-semibold">{report.title}</h3>
        <p className="text-soil-body">{report.summary}</p>
      </div>
      {report.file ? (
        <a href={report.file} target="_blank" rel="noopener" className="soil-btn-line py-2">View PDF</a>
      ) : (
        <>
          <button type="button" popoverTarget={noticeId} className="soil-btn-line py-2">View PDF</button>
          <div id={noticeId} popover="auto" className="m-auto max-w-sm rounded-md border border-soil-line bg-soil-paper p-8 text-center shadow-2xl backdrop:bg-soil-ink/40">
            <p className="soil-h3">Uploading soon</p>
            <p className="mt-3 text-soil-body">The {report.title} is being prepared and will be available here shortly. Please check back in a little while.</p>
            <button type="button" popoverTarget={noticeId} popoverTargetAction="hide" className="soil-btn mt-6">OK</button>
          </div>
        </>
      )}
    </li>
  );
}
