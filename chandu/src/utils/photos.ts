import fs from "node:fs";
import path from "node:path";

const PUBLIC = path.join(process.cwd(), "public");
const IMAGE = /\.(jpe?g|png|webp|gif)$/i;

/** Image URLs inside one folder of public/, e.g. photosIn("Agriculture"). Drop a photo in the folder and it shows up. */
export function photosIn(folder: string): string[] {
  const dir = path.join(PUBLIC, folder);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => IMAGE.test(f)).sort().map((f) => `/${encodeURIComponent(folder)}/${encodeURIComponent(f)}`); // encoded: "&" in folder names breaks the image optimiser
}

/** Takes one photo from each folder in turn, so neighbours come from different programmes. */
export function mixPhotos(folders: string[], count: number): string[] {
  const lists = folders.map(photosIn);
  const longest = Math.max(0, ...lists.map((l) => l.length));
  return Array.from({ length: longest }, (_, i) => lists.flatMap((l) => l[i] ?? [])).flat().slice(0, count);
}
