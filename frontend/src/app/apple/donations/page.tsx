import { getDonations } from "@/lib/api";
import { adminKey } from "@/lib/admin";
import { Title } from "../ui";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default async function Donations() {
  const donations = await getDonations(await adminKey());
  const total = donations.reduce((t, d) => t + Number(d.amount), 0);
  const byCause = Object.entries(donations.reduce<Record<string, number>>((m, d) => ((m[d.cause] = (m[d.cause] ?? 0) + Number(d.amount)), m), {})).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <Title title="Donations" sub={`${donations.length} donations · ${inr(total)} total`} />
      <div className="mb-8 flex flex-wrap gap-3">
        {byCause.map(([c, n]) => (
          <div key={c} className="rounded-2xl border border-brand-100 bg-white px-5 py-3 shadow-soft">
            <p className="text-xs font-semibold text-gray-500">{c}</p>
            <p className="font-display text-xl font-bold text-brand-700">{inr(n)}</p>
          </div>
        ))}
      </div>
      {donations.length ? (
        <div className="overflow-x-auto rounded-3xl border border-brand-100 bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-brand-900">
              <tr>{["Date", "Name", "Email", "Cause", "Amount", "Message"].map((h) => <th key={h} className="px-5 py-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.id} className="border-t border-brand-50 align-top hover:bg-brand-50/50">
                  <td className="whitespace-nowrap px-5 py-3 text-gray-500">{new Date(d.created_at).toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3 font-semibold">{d.name}</td>
                  <td className="px-5 py-3"><a href={`mailto:${d.email}`} className="text-brand-700 hover:underline">{d.email}</a></td>
                  <td className="px-5 py-3">{d.cause}</td>
                  <td className="whitespace-nowrap px-5 py-3 font-display font-bold text-brand-700">{inr(Number(d.amount))}</td>
                  <td className="px-5 py-3 text-gray-600">{d.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No donations yet.</p>
      )}
    </>
  );
}
