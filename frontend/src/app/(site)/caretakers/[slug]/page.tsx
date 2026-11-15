import { notFound } from "next/navigation";
import { getBySlug, getSection } from "@/lib/api";
import { Avatar, Back, PersonCard, Rich } from "@/components/ui";
import { Icon } from "@/components/Icon";

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P) {
  return { title: (await getBySlug("caretakers", (await params).slug))?.title ?? "Caretaker" };
}

export default async function Person({ params }: P) {
  const { slug } = await params;
  const [p, all] = await Promise.all([getBySlug("caretakers", slug), getSection("caretakers")]);
  if (!p) notFound();
  return (
    <>
      <div className="px-6 pt-8 md:px-12"><Back href="/caretakers" label="All caretakers" /></div>
      <section className="grid gap-8 px-6 py-8 md:px-12 lg:grid-cols-[22rem_1fr]">
        <div className="reveal glass flex flex-col items-center rounded-[2rem] p-10 text-center shadow-lift lg:sticky lg:top-6 lg:self-start">
          <Avatar name={p.title} image={p.image} size="h-40 w-40 text-5xl" />
          <h1 className="mt-6 font-display text-3xl font-bold">{p.title}</h1>
          <p className="mt-1 font-semibold text-brand-600">{p.meta}</p>
          <div className="mt-8 w-full space-y-3">
            {p.email && (
              <a href={`mailto:${p.email}`} className="flex items-center gap-3 rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:bg-brand-700">
                <Icon name="mail" /> <span className="truncate">{p.email}</span>
              </a>
            )}
            {p.phone && (
              <a href={`tel:${p.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-800 shadow-soft hover:shadow-glow">
                <Icon name="phone" /> {p.phone}
              </a>
            )}
          </div>
        </div>
        <article className="reveal rounded-[2rem] border border-brand-100 bg-white p-8 shadow-soft md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">About</p>
          <p className="mt-3 font-display text-2xl text-brand-900">{p.body}</p>
          <div className="mt-6"><Rich text={p.details} /></div>
        </article>
      </section>
      <section className="px-6 pt-8 md:px-12">
        <h2 className="mb-6 font-display text-3xl font-bold">Meet the whole team</h2>
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {all.filter((x) => x.slug !== slug).map((x) => <PersonCard key={x.id} p={x} />)}
        </div>
      </section>
    </>
  );
}
