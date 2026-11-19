import { CmsNotice, CmsPageTitle, SettingsForm } from "@/components/cms";
import { requireAdminKey } from "@/lib/admin/session";
import { getSiteSettings } from "@/lib/api";

interface SettingsPageProps {
  searchParams: Promise<{ error?: string; saved?: string }>;
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  await requireAdminKey();
  const [{ error, saved }, site] = await Promise.all([searchParams, getSiteSettings({ fresh: true })]);
  return (
    <div className="mx-auto max-w-3xl">
      <CmsPageTitle title="Site settings" subtitle="Organisation name (shown in the multicolour logo), tagline, About text and contact details." />
      <CmsNotice error={error} saved={saved} />
      <SettingsForm site={site} />
    </div>
  );
}
