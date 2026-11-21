"use client";
import { useState, useTransition } from "react";
import { save } from "@/controller/actions";
import { withBase } from "@/utils/base";

type Value = string | number | boolean | null | Value[] | { [key: string]: Value };

// "fullName" -> "Full name"
const label = (key: string) => key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).replace(/ (\w)/g, (_, c) => ` ${c.toLowerCase()}`);

// Same shape as `sample` with everything blank: used for "Add" in a list.
const blank = (sample: Value): Value =>
  typeof sample === "string" ? "" : typeof sample === "number" ? 0 : Array.isArray(sample) ? [] :
  sample && typeof sample === "object" ? Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, blank(v)])) : sample;

/** Draws an input for any value: text box, number box, list (add/remove/reorder) or group of fields. */
function Field({ name, value, onChange }: { name: string; value: Value; onChange: (v: Value) => void }) {
  if (Array.isArray(value)) {
    const set = (i: number, v: Value) => onChange(value.map((x, j) => (j === i ? v : x)));
    const move = (i: number, by: number) => {
      const next = [...value]; [next[i], next[i + by]] = [next[i + by], next[i]]; onChange(next);
    };
    return (
      <fieldset className="grid gap-3 rounded-xl border border-stone-200 bg-white/60 p-4">
        <legend className="px-1 font-semibold text-orange-900">{name} ({value.length})</legend>
        {value.map((item, i) => (
          <div key={i} className="rounded-lg border border-stone-200 bg-white p-3">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold text-stone-500">#{i + 1}</span>
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="rounded border px-2 disabled:opacity-30">↑</button>
              <button type="button" disabled={i === value.length - 1} onClick={() => move(i, 1)} className="rounded border px-2 disabled:opacity-30">↓</button>
              <button type="button" onClick={() => confirm("Remove this item?") && onChange(value.filter((_, j) => j !== i))}
                className="ml-auto rounded border border-red-200 px-2 text-red-700 hover:bg-red-50">Remove</button>
            </div>
            <Field name="" value={item} onChange={(v) => set(i, v)} />
          </div>
        ))}
        <button type="button" onClick={() => onChange([...value, value.length ? blank(value[0]) : ""])} className="btn-line justify-self-start">
          + Add
        </button>
      </fieldset>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="grid gap-4">
        {Object.entries(value).map(([key, v]) => (
          <Field key={key} name={label(key)} value={v} onChange={(nv) => onChange({ ...value, [key]: nv })} />
        ))}
      </div>
    );
  }

  const text = String(value ?? "");
  const long = text.length > 80 || text.includes("\n");
  const cls = "w-full rounded-lg border-2 border-stone-200 bg-white px-3 py-2 outline-none focus:border-orange-500";
  return (
    <label className="grid gap-1">
      {name && <span className="text-sm font-semibold text-stone-600">{name}</span>}
      {typeof value === "number" ? (
        <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className={cls} />
      ) : long ? (
        <textarea value={text} rows={Math.min(10, Math.ceil(text.length / 90) + 1)} onChange={(e) => onChange(e.target.value)} className={cls} />
      ) : (
        <input value={text} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  );
}

const HELP: Record<string, string> = {
  programmes: "“Slug” is the short id used in links. “Folder” is the photo folder inside public/.",
  stories: "“Programme” must match a programme's slug; its photos are used for the picture.",
  reports: "“File” is a PDF path in public/ (e.g. /annual-report.pdf). Leave empty to show “Uploading soon”.",
  about: "Team “photo” is an image path in public/ (e.g. /thirupal.jpeg). Leave empty to show initials.",
};

type Sections = Record<string, Value>;

/** Edits the sections of one website page. Save writes only these sections. */
export default function Editor({ title, view, initial }: { title: string; view: string; initial: Sections }) {
  const [content, setContent] = useState<Sections>(initial);
  const [saved, setSaved] = useState<Sections>(initial);
  const [status, setStatus] = useState("");
  const [saving, startSaving] = useTransition();
  const dirty = JSON.stringify(content) !== JSON.stringify(saved);
  const many = Object.keys(content).length > 1;

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-stone-900">{title}</h1>
        <a href={withBase(view)} target="_blank" className="text-sm font-semibold text-orange-700 hover:underline">View page ↗</a>
      </div>
      <div className="grid gap-6">
        {Object.entries(content).map(([section, value]) => (
          <section key={section} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200 sm:p-6">
            {many && <h2 className="mb-1 text-xl font-semibold text-stone-900">{label(section)}</h2>}
            {HELP[section] && <p className="mb-4 text-sm text-stone-500">{HELP[section]}</p>}
            <Field name="" value={value} onChange={(v) => { setContent({ ...content, [section]: v }); setStatus(""); }} />
          </section>
        ))}
      </div>
      <div className="sticky bottom-4 z-10 mt-6 flex flex-wrap items-center justify-end gap-3 rounded-2xl bg-white/95 p-3 shadow-lg ring-1 ring-stone-200 backdrop-blur">
        <span className="mr-auto px-2 text-sm font-semibold text-stone-600" role="status">{status || (dirty ? "Unsaved changes" : "No changes")}</span>
        <button type="button" disabled={!dirty} onClick={() => confirm("Undo all unsaved changes?") && setContent(saved)}
          className="btn-line disabled:opacity-50">Undo</button>
        <button type="button" disabled={saving || !dirty} className="btn disabled:opacity-50"
          onClick={() => startSaving(async () => {
            const msg = await save(JSON.stringify(content));
            setStatus(msg);
            if (msg.startsWith("Saved")) setSaved(content);
          })}>
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
