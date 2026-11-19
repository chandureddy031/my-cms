import { Button } from "@/components/ui";
import { saveSiteSettings } from "@/lib/admin/actions";
import type { SiteSettings } from "@/types/site";
import { CMS_INPUT_CLASS, CmsField } from "../shared/CmsField";

/** Values longer than this get a textarea. */
const LONG_VALUE_LENGTH = 80;

interface SettingsFormProps {
  site: SiteSettings;
}

/** One field per site setting. */
export function SettingsForm({ site }: SettingsFormProps) {
  return (
    <form action={saveSiteSettings} className="glass space-y-5 rounded-[2rem] p-5 shadow-lift md:p-8">
      {Object.entries(site).map(([key, value]) => (
        <CmsField key={key} label={key} capitalize>
          {value.length > LONG_VALUE_LENGTH
            ? <textarea name={key} defaultValue={value} rows={4} className={CMS_INPUT_CLASS} />
            : <input name={key} defaultValue={value} className={CMS_INPUT_CLASS} />}
        </CmsField>
      ))}
      <Button>Save settings</Button>
    </form>
  );
}
