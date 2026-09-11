"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Single large photo with prev/next arrows and dot indicators — for a
 * tour/page's main photo when there's more than one shot of it. Takes an
 * already-filtered list of real image paths (see findPhotos()); renders
 * nothing if the list is empty, so the caller can fall back to
 * PlaceholderImage in that case.
 */
export function PhotoCarousel({
  images,
  aspect = "aspect-[16/9]",
  prevLabel,
  nextLabel,
  photoLabelTemplate,
}: {
  images: { src: string; alt: string }[];
  aspect?: string;
  prevLabel: string;
  nextLabel: string;
  /** Raw template with `{number}`/`{total}` placeholders — a function prop
   *  can't cross the server/client boundary, so formatting happens here. */
  photoLabelTemplate: string;
}) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const current = images[index];

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
        className={`${aspect} relative overflow-hidden rounded-2xl bg-brand-900`}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          priority={index === 0}
        />

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
            <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={photoLabel(i)}
              aria-current={i === index}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-brand-700" : "bg-brand-200"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
