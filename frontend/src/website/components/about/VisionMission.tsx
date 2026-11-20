import type { SiteSettings } from "@/types/site";

export function VisionMission({ site }: { site: SiteSettings }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
      <p className="text-xl leading-relaxed text-soil-ink/85">{site.about}</p>
      <div className="grid gap-5">
        {[["Vision", site.vision], ["Mission", site.mission]].map(([title, text]) => (
          <div key={title} className="soil-card p-7">
            <h3 className="soil-h3">{title}</h3>
            <p className="mt-2 leading-relaxed text-soil-body">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
