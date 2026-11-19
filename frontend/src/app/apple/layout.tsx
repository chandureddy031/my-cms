import { CmsHeader } from "@/components/cms";
import { readAdminKey } from "@/lib/admin/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "CMS", robots: { index: false, follow: false } };

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  const unlocked = Boolean(await readAdminKey());
  return (
    <div className="min-h-screen">
      <CmsHeader unlocked={unlocked} />
      <main className="px-4 py-6 md:px-10 md:py-10">{children}</main>
    </div>
  );
}
