import { notFound } from "next/navigation";
import { getContent } from "@/chandu/controller/content";
import { CMS_PAGES } from "@/chandu/controller/pages";
import Editor from "../Editor";

export default async function AdminPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: slug } = await params;
  const page = CMS_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  const content = getContent();
  const initial = Object.fromEntries(page.sections.map((s) => [s, content[s]]));
  // key: a fresh editor (no leftover edits) when switching pages.
  return <Editor key={page.slug} title={page.label} view={page.view} initial={initial} />;
}
