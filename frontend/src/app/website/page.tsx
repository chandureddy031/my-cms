import type { Metadata } from "next";
import {
  AboutSection, DonateSection, GallerySection, PeopleSection, ProgrammesSection,
  ReportsSection, StoriesSection, WebsiteFooter, WebsiteHeader, WebsiteHero,
} from "@/components/website";
import { causesFromActivities, getSection, getSiteSettings } from "@/lib/api";

export const revalidate = 60;
export const metadata: Metadata = { title: "APPLES NGO" };

/** Everything about APPLES on one scrolling page (read-only; edited through the normal CMS). */
export default async function WebsitePage() {
  const [site, activities, stories, gallery, people, reports, stats] = await Promise.all([
    getSiteSettings(),
    getSection("activities"),
    getSection("stories"),
    getSection("gallery"),
    getSection("caretakers"),
    getSection("reports"),
    getSection("stats"),
  ]);
  const heroPhotos = activities.flatMap((a) => (a.image ? [a.image] : [])).slice(0, 3);

  return (
    <div className="ws-page min-h-screen bg-ws-paper font-sans text-ws-ink">
      <WebsiteHeader name={site.name} />
      <main>
        <WebsiteHero tagline={site.tagline} photos={heroPhotos} stats={stats.slice(0, 4)} />
        <AboutSection site={site} />
        <ProgrammesSection activities={activities} />
        <StoriesSection stories={stories} />
        <GallerySection photos={gallery.filter((photo) => photo.image)} />
        <PeopleSection people={people} />
        <ReportsSection reports={reports} />
        <DonateSection causes={causesFromActivities(activities)} />
      </main>
      <WebsiteFooter site={site} />
    </div>
  );
}
