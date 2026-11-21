import type { Metadata } from "next";
import Board from "@/components/Board";
import { getContent, telHref } from "@/controller/content";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const { site, contact } = getContent();
  const rows = [
    { label: "Head office", value: site.headOffice },
    { label: "Field office", value: site.fieldOffice },
    { label: "Chief functionary", value: site.chiefFunctionary },
    { label: "Phone", value: site.phone, href: telHref(site.phone) },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
  ];
  return (
    <Board title="Contact Us" intro={contact.intro}>
      <dl className="max-w-3xl divide-y divide-stone-200">
        {rows.map(({ label, value, href }) => (
          <div key={label} className="py-4">
            <dt className="text-sm font-semibold text-stone-500">{label}</dt>
            <dd className="mt-1 text-lg">{href ? <a href={href} className="font-semibold text-orange-800 underline underline-offset-4">{value}</a> : value}</dd>
          </div>
        ))}
      </dl>
      <a href={`mailto:${site.email}`} className="btn mt-8">Write to us</a>
    </Board>
  );
}
