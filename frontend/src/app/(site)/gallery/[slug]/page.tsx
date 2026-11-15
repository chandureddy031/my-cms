import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBySlug, getSection } from "@/lib/api";
import { Back, PageHeader } from "@/components/ui";

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P) {
  return { title: `${(await getBySlug("activities", (await params).slug))?.title ?? "Album"} · Gallery` };
}

export default async function Album({ params }: P) {
  const { slug } = await params;
  const [a, photos] = await Promise.all([getBySlug("activities", slug), getSection("gallery")]);
  const items = photos.filter((p) => p.parent === slug);
  if (!a || !items.length) notFound();
  return (
    <>
      <div className="px-6 pt-8 md:px-12"><Back href="/gallery" label="All albums" /></div>
      <PageHeader eyebrow={`Album · ${items.length} photos`} title={a.title} sub={a.body} />
      <div className="columns-1 gap-6 px-6 pb-10 sm:columns-2 md:px-12 xl:columns-3">
        {items.map((p, i) => (
          <figure key={p.id} className="reveal mb-6 break-inside-avoid overflow-hidden rounded-3xl border border-brand-100 bg-white lift">
            <a href={p.image!} target="_blank" rel="noreferrer" className={`relative block overflow-hidden ${["h-80", "h-60", "h-72", "h-64", "h-96"][i % 5]}`}>
              <Image src={p.image!} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 hover:scale-105" />
            </a>
            <figcaption className="p-5">
              <p className="font-display text-lg font-semibold">{p.title}</p>
              {p.body && <p className="mt-1 text-sm text-gray-600">{p.body}</p>}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="px-6 md:px-12"><Link href={`/activities/${slug}`} className="font-semibold text-brand-700 hover:underline">Read how {a.meta} works →</Link></div>
    </>
  );
}
