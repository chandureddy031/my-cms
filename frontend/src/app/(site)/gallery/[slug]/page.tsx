import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoWall } from "@/components/gallery";
import { BackLinkBar, PageHeader } from "@/components/shared";
import { childrenOf, getBySlug, getSection } from "@/lib/api";
import { activityHref, galleryHref } from "@/utils/routes";

interface AlbumPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AlbumPageProps) {
  return { title: `${(await getBySlug("activities", (await params).slug))?.title ?? "Album"} · Gallery` };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { slug } = await params;
  const [activity, gallery] = await Promise.all([getBySlug("activities", slug), getSection("gallery")]);
  const photos = childrenOf(gallery, slug);
  if (!activity || !photos.length) notFound();
  return (
    <>
      <BackLinkBar href={galleryHref()} label="All albums" />
      <PageHeader eyebrow={`Album · ${photos.length} photos`} title={activity.title} subtitle={activity.body} />
      <PhotoWall photos={photos} />
      <div className="page-x"><Link href={activityHref(slug)} className="text-link">Read how {activity.meta} works →</Link></div>
    </>
  );
}
