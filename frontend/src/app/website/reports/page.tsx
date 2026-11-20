import type { Metadata } from "next";
import { PageIntro, ReportRow, Section, WEBSITE_REPORTS } from "@/website";

export const metadata: Metadata = { title: "Impact Reports" };

export default function ReportsPage() {
  return (
    <>
      <PageIntro title="Impact Reports" text="Annual reports, audited statements, tax returns and programme reports." />
      <Section><ul className="soil-card">{WEBSITE_REPORTS.map((r) => <ReportRow key={r.id} report={r} />)}</ul></Section>
    </>
  );
}
