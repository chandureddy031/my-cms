import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBySlug, getSection } from "@/lib/api";
import { Back, Card, CTA, Rich } from "@/components/ui";

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P) {
  return { title: (await getBySlug("activities", (await params).slug))?.title ?? "Activity" };
}

export default async function Activity({ params }: P) {
  const { slug } = await params;
  const [a, gallery, stories] = await Promise.all([getBySlug("activities", slug), getSection("gallery"), getSection("stories")]);
  if (!a) notFound();
  const photos = gallery.filter((g) => g.parent === slug);
  const related = stories.filter((s) => s.parent === slug);

  return (
    <>
      <section className="relative mx-6 mt-6 h-[26rem] overflow-hidden rounded-[2rem] shadow-lift md:mx-12">
        {a.image && <Image src={a.image} alt="" fill priority sizes="100vw" className="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <div className="absolute left-4 top-4"><span className="glass inline-block rounded-full"><Back href="/activities" label="All activities" /></span></div>
        <div className="absolute bottom-0 p-8 text-white md:p-12">
          <span className="glass rounded-full px-3 py-1 text-xs font-bold text-brand-800">{a.meta}</span>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-6xl">{a.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/90">{a.body}</p>
        </div>
      </section>

      <div className="grid gap-10 px-6 py-14 md:px-12 lg:grid-cols-[1fr_20rem]">
        <article className="reveal glass rounded-[2rem] p-8 shadow-soft md:p-12"><Rich text={a.details || a.body} /></article>
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-500 p-7 text-white shadow-glow">
            <p className="font-display text-2xl font-bold">Support {a.meta}</p>
            <p className="mt-2 text-sm text-brand-50">Your gift goes directly to this programme.</p>
            <Link href={`/donate?cause=${slug}`} className="mt-5 block rounded-full bg-white py-3 text-center font-semibold text-brand-800 shadow-soft hover:shadow-lift">Donate to this cause</Link>
          </div>
          {photos.length > 0 && (
            <Link href={`/gallery/${slug}`} className="block rounded-3xl border border-brand-100 bg-white p-5 text-center text-sm font-semibold text-brand-700 lift">
              View all {photos.length} photos →
            </Link>
          )}
        </aside>
      </div>

      {photos.length > 0 && (
        <section className="px-6 md:px-12">
          <h2 className="font-display text-3xl font-bold">In pictures</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
            {photos.map((p, i) => (
              <figure key={p.id} className={`reveal relative overflow-hidden rounded-3xl shadow-soft ${i === 0 ? "col-span-2 row-span-2 h-80 md:h-full" : "h-40"}`}>
                <Image src={p.image!} alt={p.title} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-700 hover:scale-110" />
                <figcaption className="glass absolute bottom-2 left-2 rounded-full px-3 py-1 text-xs font-semibold text-brand-900">{p.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="px-6 pt-16 md:px-12">
          <h2 className="mb-6 font-display text-3xl font-bold">Stories from this programme</h2>
          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">{related.map((s) => <Card key={s.id} item={s} href={`/success-stories/${s.slug}`} cta="Read story" />)}</div>
        </section>
      )}

      <CTA title={`Help us grow ${a.meta}.`} sub="Pick an amount that feels right. We will tell you what it achieved." href={`/donate?cause=${slug}`} />
    </>
  );
}
