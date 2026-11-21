import { notFound } from "next/navigation";
import { getContent } from "@/controller/content";
import { CMS_PAGES } from "@/controller/pages";
import Editor from "../Editor";

export default async function AdminPage({ params }: PageProps<"/admin/[page]">) {
  const { page: slug } = await params;
  const page = CMS_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  const content = getContent();
  const initial = Object.fromEntries(page.sections.map((s) => [s, content[s]]));
  // key: a fresh editor (no leftover edits) when switching pages.
  return <Editor key={page.slug} title={page.label} view={page.view} initial={initial} />;
}
