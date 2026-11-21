import type { Metadata } from "next";
import Board from "@/chandu/components/Board";
import { getContent } from "@/chandu/controller/content";
import { withBase } from "@/chandu/utils/base";

export const metadata: Metadata = { title: "Impact Reports" };

export default function ReportsPage() {
  const { reports } = getContent();
  return (
    <Board title="Impact Reports" intro={reports.intro}>
      <ul>
        {reports.items.map((r, i) => {
          // file = PDF path in public/ (e.g. /annual-report.pdf); empty shows "Uploading soon".
          const id = `report-${i}`;
          return (
          <li key={id} className="grid gap-2 border-b border-stone-200 py-5 last:border-0 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:gap-6">
            <span className="text-2xl font-bold grad-text">{r.year}</span>
            <div>
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-stone-600">{r.summary}</p>
            </div>
            {r.file ? (
              <a href={withBase(r.file)} target="_blank" rel="noopener" className="btn-line">View PDF</a>
            ) : (
              <>
                <button type="button" popoverTarget={id} className="btn-line">View PDF</button>
                <div id={id} popover="auto" className="m-auto max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl backdrop:bg-black/40">
                  <p className="text-2xl font-bold grad-text">Uploading soon</p>
                  <p className="mt-3 text-stone-600">The {r.title} is being prepared and will be available here shortly.</p>
                  <button type="button" popoverTarget={id} popoverTargetAction="hide" className="btn mt-6">OK</button>
                </div>
              </>
            )}
          </li>
          );
        })}
      </ul>
    </Board>
  );
}
