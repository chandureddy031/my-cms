import { AlbumCard } from "@/components/gallery";
import { PageCardGrid, PageHeader } from "@/components/shared";
import { childrenOf, getSection } from "@/lib/api";

export const metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const [activities, gallery] = await Promise.all([getSection("activities"), getSection("gallery")]);
  const albums = activities.map((activity) => ({ activity, photos: childrenOf(gallery, activity.slug!) })).filter((album) => album.photos.length);
  return (
    <>
      <PageHeader eyebrow="Moments" title="Gallery" subtitle="Six programmes, seen through the people in them. Open an album to see every photo." />
      <PageCardGrid>{albums.map((album) => <AlbumCard key={album.activity.id} {...album} />)}</PageCardGrid>
    </>
  );
}
