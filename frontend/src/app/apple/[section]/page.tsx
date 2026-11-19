import { notFound } from "next/navigation";
import { CmsNotice, CmsPageTitle, ContentList, GroupFilter } from "@/components/cms";
import { ButtonLink } from "@/components/ui";
import { SECTION_LABELS } from "@/constants/cms";
import { isSection } from "@/constants/content";
import { requireAdminKey } from "@/lib/admin/session";
import { getSection } from "@/lib/api";
import { cmsItemHref } from "@/utils/routes";

interface SectionPageProps {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ saved?: string; error?: string; group?: string }>;
}

export default async function SectionPage({ params, searchParams }: SectionPageProps) {
  await requireAdminKey();
  const [{ section }, { saved, error, group }] = await Promise.all([params, searchParams]);
  if (!isSection(section)) notFound();
  const items = await getSection(section, { fresh: true });
  const groups = [...new Set(items.map((item) => item.parent).filter((parent): parent is string => Boolean(parent)))];

  return (
    <>
      <CmsPageTitle title={SECTION_LABELS[section]} subtitle={`${items.length} items · click any item to edit it`}>
        <ButtonLink href={cmsItemHref(section, "new")}>+ Add new</ButtonLink>
      </CmsPageTitle>
      <CmsNotice error={error} saved={saved} />
      {groups.length > 1 && <GroupFilter groups={groups} active={group} />}
      <ContentList section={section} items={group ? items.filter((item) => item.parent === group) : items} />
    </>
  );
}
