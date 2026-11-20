import { SiteFooter, SiteShell } from "@/components/global";
import { MascotGuide } from "@/components/mascot";
import { Logo } from "@/components/ui";
import { getSiteSettings } from "@/lib/api";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteSettings();
  return (
    <SiteShell logo={<Logo name={site.name} />} logoMini={<Logo name={site.name} emblemOnly />}>
      <main>{children}</main>
      <SiteFooter site={site} />
      <MascotGuide />
    </SiteShell>
  );
}
