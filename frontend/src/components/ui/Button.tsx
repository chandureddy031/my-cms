import Link from "next/link";
import { cn } from "@/utils/cn";

const VARIANTS = {
  primary: "bg-brand-600 text-white shadow-glow hover:bg-brand-700",
  outline: "border border-brand-200 bg-white text-brand-800 shadow-soft hover:shadow-glow",
};

const SIZES = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3",
  xl: "px-7 py-3",
};

interface ButtonStyle {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  className?: string;
}

/** Classes of a rounded button, for elements that can't be <Button> or <ButtonLink> (e.g. a plain <a>). */
export const buttonClass = ({ variant = "primary", size = "md", className }: ButtonStyle = {}) =>
  cn("inline-flex items-center justify-center gap-2 rounded-full font-semibold transition", VARIANTS[variant], SIZES[size], className);

export function Button({ variant, size, className, ...props }: ButtonStyle & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={buttonClass({ variant, size, className })} />;
}

export function ButtonLink({ variant, size, className, ...props }: ButtonStyle & React.ComponentProps<typeof Link>) {
  return <Link {...props} className={buttonClass({ variant, size, className })} />;
}
