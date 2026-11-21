import Logo from "@/components/Logo";

/** Logo fixed behind everything, on a soft warm glow. Used by the website and the CMS. */
export default function LogoBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,#fde68a80,transparent_45%),radial-gradient(circle_at_85%_80%,#fdba7466,transparent_45%),linear-gradient(135deg,#fffbeb,#fff7ed_50%,#ffe4e6)] p-4">
      <Logo alt="" className="h-full w-full object-contain opacity-75" />
    </div>
  );
}
