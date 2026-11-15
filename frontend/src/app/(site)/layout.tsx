import { Shell } from "@/components/Shell";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { getSite } from "@/lib/api";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  return (
    <Shell logo={<Logo name={site.name} />} mini={<Logo name={site.name.slice(0, 1)} />}>
      <main>{children}</main>
      <Footer site={site} />
    </Shell>
  );
}
