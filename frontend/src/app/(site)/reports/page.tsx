import Link from "next/link";
import { getSection } from "@/lib/api";
import { PageHeader } from "@/components/ui";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Reports" };

export default async function Reports() {
  const items = await getSection("reports");
  return (
    <>
      <PageHeader eyebrow="Transparency" title="Reports" sub="Reports and documents about our work." />
      <section className="px-6 pb-16 md:px-12">
        <div className="reveal mb-8 rounded-[2rem] bg-gradient-to-br from-brand-700 to-brand-500 p-8 text-white shadow-glow md:p-10">
          <h2 className="font-display text-3xl font-bold">Want to see our reports?</h2>
          <p className="mt-2 max-w-2xl text-brand-50">Read our annual reports and audited accounts. Open any report to view the full PDF right here.</p>
        </div>
        <div className="space-y-5">
          {items.map((r) => (
            <article key={r.id} className="reveal flex flex-col gap-5 rounded-3xl border border-brand-100 bg-white p-7 lift sm:flex-row sm:items-center">
              <span className="self-start rounded-2xl bg-brand-100 p-4 text-brand-700 shadow-glow"><Icon name="doc" className="h-7 w-7" /></span>
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-600">{r.meta}</span>
                <h3 className="font-display text-2xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-gray-600">{r.body}</p>
              </div>
              {r.image?.endsWith(".pdf") && r.slug && (
                <Link href={`/reports/${r.slug}`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-glow transition hover:bg-brand-700">
                  View report <Icon name="arrow" className="h-4 w-4" />
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
