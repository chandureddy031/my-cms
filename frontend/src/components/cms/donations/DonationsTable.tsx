import type { Donation } from "@/types/donation";
import { formatDateTime, formatInr, mailHref } from "@/utils/format";

const COLUMNS = ["Date", "Name", "Email", "Cause", "Amount", "Message"];

interface DonationsTableProps {
  donations: Donation[];
}

export function DonationsTable({ donations }: DonationsTableProps) {
  if (!donations.length) return <p className="text-gray-500">No donations yet.</p>;
  return (
    <div className="overflow-x-auto rounded-3xl border border-brand-100 bg-white shadow-soft">
      <table className="w-full text-left text-sm">
        <thead className="bg-brand-50 text-brand-900">
          <tr>{COLUMNS.map((column) => <th key={column} className="px-5 py-3 font-semibold">{column}</th>)}</tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id} className="border-t border-brand-50 align-top hover:bg-brand-50/50">
              <td className="whitespace-nowrap px-5 py-3 text-gray-500">{formatDateTime(donation.created_at)}</td>
              <td className="px-5 py-3 font-semibold">{donation.name}</td>
              <td className="px-5 py-3"><a href={mailHref(donation.email)} className="text-brand-700 hover:underline">{donation.email}</a></td>
              <td className="px-5 py-3">{donation.cause}</td>
              <td className="whitespace-nowrap px-5 py-3 font-display font-bold text-brand-700">{formatInr(Number(donation.amount))}</td>
              <td className="px-5 py-3 text-gray-600">{donation.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
