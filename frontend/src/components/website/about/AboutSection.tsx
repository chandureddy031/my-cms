import type { SiteSettings } from "@/types/site";
import { WebsiteSection } from "../shared/WebsiteSection";

/** Who we are, then mission and vision side by side. */
export function AboutSection({ site }: { site: SiteSettings }) {
  return (
    <WebsiteSection id="about" eyebrow="About us" title="Love and concern for those left behind.">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <p className="text-xl leading-relaxed text-ws-ink/85">{site.about}</p>
        <div className="space-y-8">
          {[
            ["Mission", site.mission],
            ["Vision", site.vision],
          ].map(([label, text]) => (
            <div key={label} className="border-t border-ws-line pt-5">
              <h3 className="font-display text-xl font-medium text-ws-ink">{label}</h3>
              <p className="mt-2 leading-relaxed text-ws-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </WebsiteSection>
  );
}
