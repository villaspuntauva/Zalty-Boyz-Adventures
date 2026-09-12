"use client";

import { useState } from "react";

/**
 * Click-to-load YouTube embed ("lite embed" pattern): shows just the
 * thumbnail + play button until clicked, then swaps in the real iframe.
 * A real YouTube embed pulls in a surprisingly large amount of JS even
 * when paused — loading it eagerly for a video that's below the fold
 * would hurt Core Web Vitals for no benefit until someone actually wants
 * to watch it.
 */
export function YouTubeEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={title}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-black"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail, not a local asset */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-accent-600 shadow-lg transition-transform group-hover:scale-105">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
