import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/**
 * Renders a real photo if one exists at `src` (checked against public/ on
 * the server), otherwise falls back to a gradient placeholder. This means
 * dropping a correctly-named file into public/images/... is the entire
 * workflow for swapping in real photography — no component code changes
 * needed. See public/images/README.md for the exact filenames expected.
 *
 * `alt` is required (not optional) so every placeholder — real photo or
 * not — carries the descriptive alt text it needs for accessibility and
 * image SEO.
 */
export function PlaceholderImage({
  src,
  alt,
  label,
  className = "",
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  aspect?: string;
  sizes?: string;
}) {
  const fileExists =
    !!src && fs.existsSync(path.join(process.cwd(), "public", src));

  if (fileExists && src) {
    return (
      <div className={`${aspect} ${className} relative overflow-hidden rounded-2xl`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`${aspect} ${className} flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-200 via-brand-100 to-sand-100 text-center`}
    >
      <span className="px-4 text-sm font-medium text-brand-700/70">
        {label ?? "Photo coming soon"}
      </span>
    </div>
  );
}
