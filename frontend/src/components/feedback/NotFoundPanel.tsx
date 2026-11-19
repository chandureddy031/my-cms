import { ButtonLink, Logo } from "@/components/ui";
import { SITE_DEFAULTS } from "@/constants/site";
import { homeHref } from "@/utils/routes";

export function NotFoundPanel() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Logo name={SITE_DEFAULTS.name} className="text-4xl" />
      <h1 className="text-shine mt-8 font-display text-6xl font-bold">404</h1>
      <p className="mt-3 text-gray-600">We couldn't find that page.</p>
      <ButtonLink href={homeHref()} size="xl" className="mt-8">Back to home</ButtonLink>
    </main>
  );
}
