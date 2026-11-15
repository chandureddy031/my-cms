import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SECTIONS, SECTION_LABELS } from "@/constants";
import { getSection, type Section } from "@/lib/api";
import { adminKey } from "@/lib/admin";
import { Avatar } from "@/components/ui";
import { btn, Notice, Title } from "../ui";

type P = { params: Promise<{ section: string }>; searchParams: Promise<{ saved?: string; error?: string; group?: string }> };

export default async function List({ params, searchParams }: P) {
  await adminKey();
  const [{ section }, { saved, error, group }] = await Promise.all([params, searchParams]);
  if (!SECTIONS.includes(section as Section)) notFound();
  const items = await getSection(section as Section, true);
  const groups = [...new Set(items.map((i) => i.parent).filter(Boolean))] as string[];
  const shown = group ? items.filter((i) => i.parent === group) : items;

  return (
    <>
      <Title title={SECTION_LABELS[section as Section]} sub={`${items.length} items · click any item to edit it`}>
        <Link href={`/apple/${section}/new`} className={btn}>+ Add new</Link>
      </Title>
      <Notice error={error} saved={saved} />
      {groups.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {[undefined, ...groups].map((g) => (
            <Link key={g ?? "all"} href={g ? `?group=${g}` : "?"} className={`rounded-full px-4 py-1.5 text-sm font-semibold shadow-soft ${group === g ? "bg-brand-600 text-white" : "bg-white text-gray-600 hover:text-brand-800"}`}>
              {g ?? "All"}
            </Link>
          ))}
        </div>
      )}
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((i) => (
          <li key={i.id}>
            <Link href={`/apple/${section}/${i.id}`} className="group flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4 lift">
              {section === "caretakers" ? <Avatar name={i.title} image={i.image} size="h-16 w-16 text-xl" />
                : i.image ? <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl"><Image src={i.image} alt="" fill sizes="80px" className="object-cover" /></div>
                : <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-lg font-bold text-brand-700">{section === "stats" ? i.body : "Aa"}</div>}
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold group-hover:text-brand-700">{i.title}</p>
                <p className="truncate text-sm text-gray-500">{[i.meta, i.parent, i.slug && `/${i.slug}`].filter(Boolean).join(" · ") || i.body}</p>
              </div>
              <span className="text-sm text-brand-600 opacity-0 transition group-hover:opacity-100">Edit →</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
