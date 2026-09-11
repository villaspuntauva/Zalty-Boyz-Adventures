import fs from "node:fs";
import path from "node:path";

/**
 * Same idea as PlaceholderImage: renders a real <video> if a file exists at
 * `src` (checked against public/ on the server), otherwise a placeholder
 * card — so dropping a correctly-named clip into public/videos/... is the
 * whole workflow for adding it, no component changes needed.
 */
export function PlaceholderVideo({
  src,
  label,
  className = "",
  aspect = "aspect-video",
}: {
  src?: string;
  label?: string;
  className?: string;
  aspect?: string;
}) {
  const fileExists =
    !!src && fs.existsSync(path.join(process.cwd(), "public", src));

  if (fileExists && src) {
    return (
      <div className={`${aspect} ${className} overflow-hidden rounded-2xl bg-black`}>
        <video controls playsInline preload="metadata" className="h-full w-full object-cover">
          <source src={src} />
        </video>
      </div>
    );
  }

  return (
    <div
      className={`${aspect} ${className} flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 text-center`}
    >
      <div className="flex flex-col items-center gap-3 px-4">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15"
        >
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="text-sm font-medium text-white/80">
          {label ?? "Video coming soon"}
        </span>
      </div>
    </div>
  );
}
