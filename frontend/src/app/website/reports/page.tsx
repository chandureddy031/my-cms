import type { Metadata } from "next";
import { getSection } from "@/lib/api";
import { PageIntro, ReportRow, Section } from "@/website";

export const revalidate = 60;
export const metadata: Metadata = { title: "Impact Reports" };

export default async function ReportsPage() {
  const reports = await getSection("reports");
  return (
    <>
      <PageIntro title="Our work and our money, in the open" text="Annual, audit and programme reports. Each one opens as a PDF." />
      <Section><ul className="soil-card">{reports.map((r) => <ReportRow key={r.id} report={r} />)}</ul></Section>
    </>
  );
}
