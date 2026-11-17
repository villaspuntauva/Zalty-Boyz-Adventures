"use client";

import { useEffect, useRef } from "react";

/**
 * Autoplaying, muted background video. With `start`/`end` (seconds) it plays
 * only that segment and loops it, so a clip can be trimmed without
 * re-encoding the file.
 *
 * Mobile notes (iOS Safari especially):
 * - React doesn't render the `muted` attribute into server HTML, and iOS
 *   refuses to autoplay a video that isn't muted, so we set it on the
 *   element and call play() ourselves.
 * - The trim is done in JS (seek on load, jump back on timeupdate) rather
 *   than with a `#t=start,end` media fragment, which iOS handles unreliably.
 */
export function HeroVideo({
  src,
  start,
  end,
}: {
  src: string;
  start?: number;
  end?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const from = start ?? 0;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    const tryPlay = () => {
      // Rejected in Low Power Mode etc. — the gradient behind stays visible.
      video.play().catch(() => {});
    };

    const seekToStart = () => {
      if (from > 0 && video.currentTime < from) video.currentTime = from;
      tryPlay();
    };

    const onTimeUpdate = () => {
      if (end !== undefined && video.currentTime >= end) {
        video.currentTime = from;
      }
    };
    // Covers clips whose `end` is past the file's real length.
    const onEnded = () => {
      video.currentTime = from;
      tryPlay();
    };

    if (video.readyState >= 1) seekToStart();
    else video.addEventListener("loadedmetadata", seekToStart, { once: true });
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("loadedmetadata", seekToStart);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [start, end]);

  const trimmed = start !== undefined || end !== undefined;

  return (
    <video
      ref={ref}
      className="hero-video absolute inset-0 h-full w-full object-cover"
      src={src}
      autoPlay
      muted
      // Native loop would restart at 0, not `start`, so handle it ourselves.
      loop={!trimmed}
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
