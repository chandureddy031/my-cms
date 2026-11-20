import type { Metadata } from "next";
import { getSection } from "@/lib/api";
import { GalleryFilter, PageIntro, PhotoGrid, Section } from "@/website";

export const revalidate = 60;
export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ group?: string }> }) {
  const [{ group }, activities, gallery] = await Promise.all([searchParams, getSection("activities"), getSection("gallery")]);
  const photos = gallery.filter((photo) => photo.image && (!group || photo.parent === group));
  return (
    <>
      <PageIntro title="Gallery" text="Photos from our programmes in the field." />
      <Section>
        <GalleryFilter programmes={activities} active={group} />
        <PhotoGrid photos={photos} />
      </Section>
    </>
  );
}
