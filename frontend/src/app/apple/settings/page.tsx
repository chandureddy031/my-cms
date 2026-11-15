import { getSite } from "@/lib/api";
import { adminKey } from "@/lib/admin";
import { saveSite } from "../actions";
import { btn, input, Notice, Title } from "../ui";

export default async function Settings({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string }> }) {
  await adminKey();
  const [{ error, saved }, site] = await Promise.all([searchParams, getSite(true)]);
  return (
    <div className="mx-auto max-w-3xl">
      <Title title="Site settings" sub="Organisation name (shown in the multicolour logo), tagline, About text and contact details." />
      <Notice error={error} saved={saved} />
      <form action={saveSite} className="glass space-y-5 rounded-[2rem] p-8 shadow-lift">
        {Object.entries(site).map(([k, v]) => (
          <label key={k} className="block">
            <span className="mb-1.5 block text-sm font-semibold capitalize text-gray-700">{k}</span>
            {v.length > 80 ? <textarea name={k} defaultValue={v} rows={4} className={input} /> : <input name={k} defaultValue={v} className={input} />}
          </label>
        ))}
        <button className={btn}>Save settings</button>
      </form>
    </div>
  );
}
