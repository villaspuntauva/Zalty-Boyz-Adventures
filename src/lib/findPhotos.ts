import fs from "node:fs";
import path from "node:path";

/**
 * Auto-discovers a numbered set of photos for a carousel: `${dir}/${slug}.jpg`
 * as the first photo, then `${dir}/${slug}-2.jpg`, `${dir}/${slug}-3.jpg`, ...
 * up to `max`. Only paths that actually exist in public/ are returned, so
 * dropping `kayak-tour-4.jpg` into the folder later is the entire workflow
 * for adding a photo to that carousel — no code changes needed.
 */
export function findPhotos(dir: string, slug: string, max = 15): string[] {
  const found: string[] = [];

  const first = `/images/${dir}/${slug}.jpg`;
  if (fs.existsSync(path.join(process.cwd(), "public", first))) {
    found.push(first);
  }

  for (let i = 2; i <= max; i++) {
    const rel = `/images/${dir}/${slug}-${i}.jpg`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) {
      found.push(rel);
    }
  }

  return found;
}
