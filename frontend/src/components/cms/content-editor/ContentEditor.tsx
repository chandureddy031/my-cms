import Link from "next/link";
import { Button, buttonClass } from "@/components/ui";
import { SECTION_FIELDS } from "@/constants/cms";
import { deleteContentItem, saveContentItem } from "@/lib/admin/actions";
import type { ContentField, ContentItem, Section } from "@/types/content";
import { cmsSectionHref } from "@/utils/routes";
import { CmsField } from "../shared/CmsField";
import { FIELD_HINTS } from "./constants";
import { EditorPreview } from "./EditorPreview";
import { FieldInput } from "./FieldInput";

interface ContentEditorProps {
  section: Section;
  item: Partial<ContentItem>;
  isNew: boolean;
}

/** Edit form for one content item. */
export function ContentEditor({ section, item, isNew }: ContentEditorProps) {
  const fields = Object.entries(SECTION_FIELDS[section]) as [ContentField, string][];
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
      <form action={saveContentItem} className="glass space-y-5 rounded-[2rem] p-5 shadow-lift md:p-8">
        <input type="hidden" name="section" value={section} />
        <input type="hidden" name="id" value={isNew ? "" : item.id} />
        {fields.map(([field, label]) => (
          <CmsField key={field} label={label} hint={FIELD_HINTS[field]}>
            <FieldInput field={field} label={label} value={item[field]} />
          </CmsField>
        ))}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button>Save</Button>
          <Link href={cmsSectionHref(section)} className={buttonClass({ variant: "outline" })}>Cancel</Link>
          {!isNew && <button formAction={deleteContentItem} formNoValidate className="ml-auto rounded-full px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>}
        </div>
      </form>
      <EditorPreview section={section} item={item} />
    </div>
  );
}
