import Image from "next/image";
import Link from "next/link";
import { getSection } from "@/lib/api";
import { Grid, PageHeader } from "@/components/ui";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Gallery" };

export default async function Gallery() {
  const [activities, photos] = await Promise.all([getSection("activities"), getSection("gallery")]);
  const albums = activities.map((a) => ({ a, items: photos.filter((p) => p.parent === a.slug) })).filter((x) => x.items.length);
  return (
    <>
      <PageHeader eyebrow="Moments" title="Gallery" sub="Six programmes, seen through the people in them. Open an album to see every photo." />
      <Grid>
        {albums.map(({ a, items }) => (
          <Link key={a.id} href={`/gallery/${a.slug}`} className="reveal group relative block h-80 overflow-hidden rounded-[2rem] shadow-lift">
            <Image src={items[0].image ?? a.image!} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            <span className="glass absolute right-4 top-4 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-brand-800"><Icon name="image" className="h-4 w-4" />{items.length} photos</span>
            <div className="absolute bottom-0 p-6 text-white">
              <h2 className="font-display text-2xl font-bold">{a.title}</h2>
              <p className="mt-1 text-sm text-white/85">{a.body}</p>
            </div>
          </Link>
        ))}
      </Grid>
    </>
  );
}
