/**
 * CMS text format: a blank line starts a new block, a block starting with "## " is a heading
 * (its other lines become a paragraph), and a block whose every line starts with "- " is a list.
 */
type RichBlock =
  | { kind: "heading"; text: string; after?: string }
  | { kind: "list"; items: string[] }
  | { kind: "paragraph"; text: string };

export function parseRichText(text: string): RichBlock[] {
  return text.split(/\n\s*\n/).map((block) => {
    const lines = block.trim().split("\n");
    if (lines[0].startsWith("## ")) {
      const after = lines.slice(1).join("\n");
      return after ? { kind: "heading", text: lines[0].slice(3), after } : { kind: "heading", text: lines[0].slice(3) };
    }
    if (lines.every((line) => line.startsWith("- "))) return { kind: "list", items: lines.map((line) => line.slice(2)) };
    return { kind: "paragraph", text: block.trim() };
  });
}
