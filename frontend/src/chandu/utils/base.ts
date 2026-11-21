/** The APPLES site lives under /chandu. Its photos are in public/chandu, so plain image/PDF/page paths go through withBase(). */
export const BASE_PATH = "/chandu";
export const withBase = (p: string) => (p === "/" ? BASE_PATH : p.startsWith("/") ? BASE_PATH + p : p);
