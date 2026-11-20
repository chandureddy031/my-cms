import type { SiteSettings } from "@/types/site";
import { mailHref, telHref } from "@/utils/format";

export function ContactDetails({ site }: { site: SiteSettings }) {
  const rows = [
    { label: "Head office", value: site.address },
    { label: "Field office", value: site.office.replace(/^Field office:\s*/, "") },
    { label: "Phone", value: site.phone, href: telHref(site.phone) },
    { label: "Email", value: site.email, href: mailHref(site.email) },
  ];
  return (
    <dl className="soil-card divide-y divide-soil-line px-7">
      {rows.map(({ label, value, href }) => (
        <div key={label} className="py-5">
          <dt className="text-sm font-semibold text-soil-body">{label}</dt>
          <dd className="mt-1 text-lg">{href ? <a href={href} className="soil-link">{value}</a> : value}</dd>
        </div>
      ))}
    </dl>
  );
}
