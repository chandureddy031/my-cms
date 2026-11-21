import FloatingActions from "@/chandu/components/FloatingActions";
import Footer from "@/chandu/components/Footer";
import Header from "@/chandu/components/Header";
import LogoBackground from "@/chandu/components/LogoBackground";
import { getContent } from "@/chandu/controller/content";

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
