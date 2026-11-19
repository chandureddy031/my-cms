import Link from "next/link";
import { notFound } from "next/navigation";
import { CmsNotice, CmsPageTitle, ContentEditor } from "@/components/cms";
import { SECTION_LABELS } from "@/constants/cms";
import { isSection } from "@/constants/content";
import { requireAdminKey } from "@/lib/admin/session";
import { getById } from "@/lib/api";
import type { ContentItem } from "@/types/content";
import { cmsSectionHref } from "@/utils/routes";

interface EditItemPageProps {
  params: Promise<{ section: string; id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditItemPage({ params, searchParams }: EditItemPageProps) {
  await requireAdminKey();
  const [{ section, id }, { error }] = await Promise.all([params, searchParams]);
  if (!isSection(section)) notFound();
  const isNew = id === "new";
  const item: Partial<ContentItem> | undefined = isNew ? {} : await getById(section, Number(id));
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <Link href={cmsSectionHref(section)} className="text-link text-sm">← {SECTION_LABELS[section]}</Link>
      <CmsPageTitle title={isNew ? `Add to ${SECTION_LABELS[section]}` : item.title!} />
      <CmsNotice error={error} />
      <ContentEditor section={section} item={item} isNew={isNew} />
    </div>
  );
}
