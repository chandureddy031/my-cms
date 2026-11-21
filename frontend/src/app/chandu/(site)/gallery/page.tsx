import type { Metadata } from "next";
import Link from "next/link";
import Board from "@/chandu/components/Board";
import Photo from "@/chandu/components/Photo";
import { photosIn } from "@/chandu/utils/photos";
import { getContent } from "@/chandu/controller/content";

export const metadata: Metadata = { title: "Gallery" };

/** Filter is a link (?group=slug), so it works without JavaScript and can be shared. */
export default async function GalleryPage({ searchParams }: PageProps<"/gallery">) {
  const { group } = await searchParams;
  const { gallery, programmes } = getContent();
  // No "All" tab: opens on the first programme.
  const active = programmes.find((p) => p.slug === group) ?? programmes[0];
  const photos = photosIn(active.folder);

  return (
    <Board title="Gallery" intro={gallery.intro}>
      <nav aria-label="Filter photos" className="mb-8 flex flex-wrap gap-2">
        {programmes.map(({ slug, label }) => (
          <Link key={slug} href={`/chandu/gallery?group=${slug}`} aria-current={active.slug === slug ? "page" : undefined}
            className={active.slug === slug ? "btn" : "btn-line"}>
            {label}
          </Link>
        ))}
      </nav>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((src) => (
          <li key={src}><Photo src={src} alt={active.label} className="aspect-[4/3]" sizes="(max-width:640px) 50vw, 25vw" /></li>
        ))}
      </ul>
    </Board>
  );
}
