/** 2500 → "₹2,500" */
export const formatInr = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

export const formatDateTime = (iso: string) => new Date(iso).toLocaleString("en-IN");

export const mailHref = (email: string) => `mailto:${email}`;

/** "+91 94901 94281" → "tel:+919490194281" */
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export const isPdf = (path: string | null | undefined) => Boolean(path?.endsWith(".pdf"));

/** "Dr. Anita Rao" → "AR" */
export const initialsOf = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
