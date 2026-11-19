import { ReportCard, ReportsIntro } from "@/components/reports";
import { PageHeader } from "@/components/shared";
import { getSection } from "@/lib/api";

export const metadata = { title: "Reports" };

export default async function ReportsPage() {
  const reports = await getSection("reports");
  return (
    <>
      <PageHeader eyebrow="Transparency" title="Reports" subtitle="Reports and documents about our work." />
      <section className="page-x pb-16">
        <ReportsIntro />
        <div className="space-y-5">{reports.map((report) => <ReportCard key={report.id} report={report} />)}</div>
      </section>
    </>
  );
}
