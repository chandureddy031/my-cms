import { notFound } from "next/navigation";
import { getBySlug } from "@/lib/api";
import { Back } from "@/components/ui";

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P) {
  return { title: (await getBySlug("reports", (await params).slug))?.title ?? "Report" };
}

export default async function Report({ params }: P) {
  const r = await getBySlug("reports", (await params).slug);
  if (!r?.image?.endsWith(".pdf")) notFound();
  return (
    <section className="px-6 py-8 md:px-12">
      <Back href="/reports" label="All reports" />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">{r.meta}</span>
          <h1 className="text-shine font-display text-4xl font-bold">{r.title}</h1>
          <p className="mt-2 max-w-2xl text-gray-600">{r.body}</p>
        </div>
        <a href={r.image} target="_blank" rel="noreferrer" className="rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 shadow-soft hover:shadow-glow">Open in new tab ↗</a>
      </div>
      <iframe src={r.image} title={r.title} className="mt-6 h-[80vh] w-full rounded-3xl border border-brand-100 bg-white shadow-lift" />
    </section>
  );
}
