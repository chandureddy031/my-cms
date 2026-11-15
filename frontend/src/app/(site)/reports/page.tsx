import { getSection } from "@/lib/api";
import { PageHeader } from "@/components/ui";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Reports" };

export default async function Reports() {
  const items = await getSection("reports");
  return (
    <>
      <PageHeader eyebrow="Transparency" title="Reports" sub="Every rupee we receive and spend, reported openly." />
      <div className="space-y-5 px-6 pb-16 md:px-12">
        {items.map((r) => (
          <article key={r.id} className="reveal flex items-start gap-6 rounded-3xl border border-brand-100 bg-white p-7 lift">
            <span className="rounded-2xl bg-brand-100 p-4 text-brand-700 shadow-glow"><Icon name="doc" className="h-7 w-7" /></span>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600">{r.meta}</span>
              <h2 className="font-display text-2xl font-semibold">{r.title}</h2>
              <p className="mt-2 text-gray-600">{r.body}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
