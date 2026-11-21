/** The site lives under /chandu (on localhost and live). Links and redirects get it automatically; plain image/PDF paths need withBase(). */
export const BASE_PATH = "/chandu";
export const withBase = (p: string) => (p.startsWith("/") ? BASE_PATH + p : p);
