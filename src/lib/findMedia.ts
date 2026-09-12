import fs from "node:fs";
import path from "node:path";

export type MediaItem = { src: string; type: "image" | "video" };

/**
 * Auto-discovers a numbered set of media for a carousel: `${dir}/${slug}.jpg`
 * as the first item, then `${dir}/${slug}-2.jpg`, `${dir}/${slug}-3.jpg`, ...
 * up to `max`. Each slot can be either a photo (`.jpg`) or a video (`.mp4`)
 * — whichever exists — so a carousel can mix both. Only paths that actually
 * exist in public/ are returned, so dropping `kayak-tour-4.mp4` into the
 * folder later is the entire workflow for adding it to that carousel — no
 * code changes needed.
 */
export function findMedia(dir: string, slug: string, max = 15): MediaItem[] {
  const found: MediaItem[] = [];

  function check(suffix: string) {
    const imageRel = `/images/${dir}/${slug}${suffix}.jpg`;
    if (fs.existsSync(path.join(process.cwd(), "public", imageRel))) {
      found.push({ src: imageRel, type: "image" });
      return;
    }
    const videoRel = `/images/${dir}/${slug}${suffix}.mp4`;
    if (fs.existsSync(path.join(process.cwd(), "public", videoRel))) {
      found.push({ src: videoRel, type: "video" });
    }
  }

  check("");
  for (let i = 2; i <= max; i++) check(`-${i}`);

  return found;
}
