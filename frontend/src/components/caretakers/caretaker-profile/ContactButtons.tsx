import { Icon } from "@/components/ui";
import { mailHref, telHref } from "@/utils/format";

interface ContactButtonsProps {
  email: string | null;
  phone: string | null;
}

/** Email and call buttons for whichever contact details exist. */
export function ContactButtons({ email, phone }: ContactButtonsProps) {
  return (
    <div className="mt-8 w-full space-y-3">
      {email && (
        <a href={mailHref(email)} className="flex min-w-0 items-center gap-3 rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:bg-brand-700">
          <Icon name="mail" /> <span className="truncate">{email}</span>
        </a>
      )}
      {phone && (
        <a href={telHref(phone)} className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-800 shadow-soft hover:shadow-glow">
          <Icon name="phone" /> {phone}
        </a>
      )}
    </div>
  );
}
