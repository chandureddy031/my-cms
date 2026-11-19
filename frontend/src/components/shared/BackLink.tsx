import Link from "next/link";
import { Icon } from "@/components/ui";

interface BackLinkProps {
  href: string;
  label: string;
}

/** "‹ All stories"-style link back to a listing. */
export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
      <Icon name="chevron" className="h-4 w-4" /> {label}
    </Link>
  );
}

/** BackLink on its own row above the page content. */
export function BackLinkBar(props: BackLinkProps) {
  return <div className="page-x pt-8"><BackLink {...props} /></div>;
}
