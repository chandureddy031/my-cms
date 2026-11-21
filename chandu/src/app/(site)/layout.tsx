import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LogoBackground from "@/components/LogoBackground";
import { getContent } from "@/controller/content";

/** The public website: logo background, header, footer. The CMS (/admin) does not use this. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const { site } = getContent();
  return (
    <>
      <LogoBackground />
      <Header name={site.name} fullName={site.fullName} tagline={site.tagline} />
      <main className="flex-1 pb-10">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
