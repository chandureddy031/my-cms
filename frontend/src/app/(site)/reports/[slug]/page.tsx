import { notFound } from "next/navigation";
import { ReportViewer } from "@/components/reports";
import { getBySlug } from "@/lib/api";
import { isPdf } from "@/utils/format";

interface ReportPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ReportPageProps) {
  return { title: (await getBySlug("reports", (await params).slug))?.title ?? "Report" };
}

export default async function ReportPage({ params }: ReportPageProps) {
  const report = await getBySlug("reports", (await params).slug);
  if (!report?.image || !isPdf(report.image)) notFound();
  return <ReportViewer report={report} pdf={report.image} />;
}
