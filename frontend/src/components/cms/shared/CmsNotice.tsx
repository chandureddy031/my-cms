interface CmsNoticeProps {
  error?: string;
  /** "1" = saved, "deleted", or the saved item's title. */
  saved?: string;
}

/** Error or "saved" message from the ?error= / ?saved= query. */
export function CmsNotice({ error, saved }: CmsNoticeProps) {
  if (error) return <p role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{error}</p>;
  if (!saved) return null;
  const what = saved === "deleted" ? "Deleted." : saved === "1" ? "Saved." : `Saved “${saved}”.`;
  return <p role="status" className="mb-6 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-3 text-sm text-brand-800">{what} The website is updated.</p>;
}
