import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBySlug, getSection } from "@/lib/api";
import { Back, Card, CTA, Rich } from "@/components/ui";

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P) {
  return { title: (await getBySlug("stories", (await params).slug))?.title ?? "Story" };
}

export default async function Story({ params }: P) {
  const { slug } = await params;
  const [s, all] = await Promise.all([getBySlug("stories", slug), getSection("stories")]);
  if (!s) notFound();
  return (
    <>
      <div className="px-6 pt-8 md:px-12"><Back href="/success-stories" label="All stories" /></div>
      <article className="grid gap-10 px-6 py-8 md:px-12 lg:grid-cols-2">
        {s.image && (
          <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-lift lg:sticky lg:top-6 lg:h-[32rem]">
            <Image src={s.image} alt="" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
        )}
        <div>
          <span className="glass rounded-full px-3 py-1 text-xs font-bold text-brand-800 shadow-soft">{s.meta}</span>
          <h1 className="text-shine mt-4 font-display text-5xl font-bold">{s.title}</h1>
          <p className="mt-4 font-display text-xl text-brand-900">{s.body}</p>
          <div className="mt-8 border-l-4 border-brand-400 pl-6"><Rich text={s.details || s.body} /></div>
          {s.parent && <Link href={`/activities/${s.parent}`} className="mt-8 inline-block font-semibold text-brand-700 hover:underline">Learn about {s.meta} →</Link>}
        </div>
      </article>
      <section className="px-6 pt-8 md:px-12">
        <h2 className="mb-6 font-display text-3xl font-bold">More stories</h2>
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
          {all.filter((x) => x.slug !== slug).slice(0, 3).map((x) => <Card key={x.id} item={x} href={`/success-stories/${x.slug}`} cta="Read story" />)}
        </div>
      </section>
      <CTA title="Write the next story with us." sub="One donation can be the turning point in someone's life." />
    </>
  );
}
