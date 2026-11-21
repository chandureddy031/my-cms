import fs from "node:fs";
import path from "node:path";
import type defaults from "./content.json";

/** Every editable text on the site. Edited from /admin, stored in content.json. */
export type Content = typeof defaults;

const FILE = path.join(process.cwd(), "src/chandu/controller/content.json");

// Read from disk (not imported) so edits saved from /admin show without a rebuild.
export const getContent = (): Content => JSON.parse(fs.readFileSync(FILE, "utf8"));

export function saveContent(content: Content) {
  // Write a temp file then rename, so a crash mid-save can't leave half a file.
  fs.writeFileSync(`${FILE}.tmp`, JSON.stringify(content, null, 2));
  fs.renameSync(`${FILE}.tmp`, FILE);
}

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
