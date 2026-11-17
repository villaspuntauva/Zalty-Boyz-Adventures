"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export type CarouselItem = { src: string; type: "image" | "video"; alt: string };

/**
 * Single large photo (or video) with prev/next arrows and dot indicators —
 * for a tour/page's main media when there's more than one shot of it.
 * Takes an already-filtered list of real media (see findMedia()); renders
 * nothing if the list is empty, so the caller can fall back to
 * PlaceholderImage in that case. Video slides get playback controls
 * instead of autoplay, since this is content the visitor chooses to watch,
 * not background ambiance. On touch screens it can also be swiped.
 */
export function PhotoCarousel({
  images,
  aspect = "aspect-[16/9]",
  frameClassName = "rounded-2xl",
  sizes = "(min-width: 1024px) 60vw, 100vw",
  priority = true,
  prevLabel,
  nextLabel,
  photoLabelTemplate,
}: {
  images: CarouselItem[];
  aspect?: string;
  /** Rounding etc. for the photo frame — e.g. "rounded-none" inside a card. */
  frameClassName?: string;
  sizes?: string;
  /** Load the first photo eagerly — only when the carousel is near the top of the page. */
  priority?: boolean;
  prevLabel: string;
  nextLabel: string;
  /** Raw template with `{number}`/`{total}` placeholders — a function prop
   *  can't cross the server/client boundary, so formatting happens here. */
  photoLabelTemplate: string;
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (images.length === 0) return null;

  function photoLabel(photoIndex: number) {
    return photoLabelTemplate
      .replace("{number}", String(photoIndex + 1))
      .replace("{total}", String(images.length));
  }

  function go(delta: number) {
    setIndex((i) => (i + delta + images.length) % images.length);
  }

  return (
    <div>
      <div
        className={`${aspect} ${frameClassName} relative touch-pan-y overflow-hidden bg-brand-900`}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null || images.length < 2) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          // Ignore taps and small drags; swipe left = next, right = previous.
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        {/* Every photo stays mounted (hidden ones invisible), so the browser
            fetches them in the background once the carousel is on screen and
            switching is instant. Videos only mount while showing. */}
        {images.map((item, i) =>
          item.type === "image" ? (
            <Image
              key={item.src}
              src={item.src}
              alt={i === index ? item.alt : ""}
              aria-hidden={i !== index}
              fill
              sizes={sizes}
              className={`object-cover transition-opacity duration-300 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              priority={priority && i === 0}
            />
          ) : (
            i === index && (
              <video
                key={item.src}
                src={item.src}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <track kind="captions" />
              </video>
            )
          ),
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={prevLabel}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-800 shadow transition-colors hover:bg-white"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={nextLabel}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-800 shadow transition-colors hover:bg-white"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-1 flex justify-center">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={photoLabel(i)}
              aria-current={i === index}
              // 24px tap target (WCAG 2.5.8) around a small visual dot.
              className="group flex h-6 w-6 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === index ? "bg-brand-700" : "bg-brand-200 group-hover:bg-brand-400"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
