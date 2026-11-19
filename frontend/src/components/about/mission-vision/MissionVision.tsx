import type { SiteSettings } from "@/types/site";

interface MissionVisionProps {
  site: SiteSettings;
}

/** Mission (green panel) and vision (frosted panel) side by side. */
export function MissionVision({ site }: MissionVisionProps) {
  return (
    <section className="page-x grid gap-6 md:grid-cols-2">
      <div className="reveal panel-brand rounded-[2rem] p-10 shadow-lift">
        <h2 className="heading-section">Our Mission</h2>
        <p className="mt-4 text-lg text-brand-50">{site.mission}</p>
      </div>
      <div className="reveal glass rounded-[2rem] p-10 shadow-lift">
        <h2 className="heading-section">Our Vision</h2>
        <p className="mt-4 text-lg text-gray-600">{site.vision}</p>
      </div>
    </section>
  );
}
