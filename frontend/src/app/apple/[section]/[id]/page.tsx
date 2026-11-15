import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FIELDS, SECTIONS, SECTION_LABELS } from "@/constants";
import { getSection, type Item, type Section } from "@/lib/api";
import { adminKey } from "@/lib/admin";
import { deleteItem, saveItem } from "../../actions";
import { btn, ghost, input, Notice, Title } from "../../ui";

type P = { params: Promise<{ section: string; id: string }>; searchParams: Promise<{ error?: string }> };

const LONG = new Set(["body", "details"]);
const HINT: Record<string, string> = {
  details: "Blank line = new paragraph. Start a line with “## ” for a heading, or “- ” for a bullet point.",
  image: "A file in frontend/public/assets, e.g. /assets/elder.jpg",
  slug: "Lowercase letters, numbers and dashes. Used in the page address.",
  parent: "For gallery and stories: the activity slug, e.g. elder-care.",
};

export default async function Edit({ params, searchParams }: P) {
  await adminKey();
  const [{ section, id }, { error }] = await Promise.all([params, searchParams]);
  if (!SECTIONS.includes(section as Section)) notFound();
  const sec = section as Section;
  const item: Partial<Item> | undefined = id === "new" ? {} : (await getSection(sec, true)).find((i) => i.id === Number(id));
  if (!item) notFound();
  const fields = Object.entries(FIELDS[sec]);

  return (
    <div className="mx-auto max-w-5xl">
      <Link href={`/apple/${sec}`} className="text-sm font-semibold text-brand-700 hover:underline">← {SECTION_LABELS[sec]}</Link>
      <Title title={id === "new" ? `New ${SECTION_LABELS[sec].replace(/s$/, "").toLowerCase()}` : item.title!} />
      <Notice error={error} />
      <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
        <form action={saveItem} className="glass space-y-5 rounded-[2rem] p-8 shadow-lift">
          <input type="hidden" name="section" value={sec} />
          <input type="hidden" name="id" value={id === "new" ? "" : id} />
          {fields.map(([k, label]) => {
            const v = item[k as keyof Item];
            const common = { name: k, defaultValue: v == null ? "" : String(v), "aria-label": label, className: input, required: k === "title" };
            return (
              <label key={k} className="block">
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">{label}</span>
                {LONG.has(k) ? <textarea {...common} rows={k === "details" ? 16 : 3} className={`${input} font-mono text-[13px] leading-relaxed`} />
                  : <input {...common} type={k === "position" ? "number" : k === "email" ? "email" : "text"} />}
                {HINT[k] && <span className="mt-1 block text-xs text-gray-500">{HINT[k]}</span>}
              </label>
            );
          })}
          <div className="flex flex-wrap gap-3 pt-2">
            <button className={btn}>Save</button>
            <Link href={`/apple/${sec}`} className={ghost}>Cancel</Link>
            {id !== "new" && <button formAction={deleteItem} formNoValidate className="ml-auto rounded-full px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>}
          </div>
        </form>
        <aside className="space-y-4">
          {item.image && (
            <div className="relative h-48 overflow-hidden rounded-3xl shadow-lift"><Image src={item.image} alt="" fill sizes="300px" className="object-cover" /></div>
          )}
          {item.slug && ["activities", "stories", "caretakers"].includes(sec) && (
            <a href={`/${{ activities: "activities", stories: "success-stories", caretakers: "caretakers" }[sec as "activities"]}/${item.slug}`} target="_blank" className={`${ghost} w-full justify-center`}>View on site ↗</a>
          )}
        </aside>
      </div>
    </div>
  );
}
