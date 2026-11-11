"use client";

import { useEffect, useRef } from "react";

/**
 * Autoplaying, muted background video. With `start`/`end` (seconds) it plays
 * only that segment and loops it, so a clip can be trimmed without
 * re-encoding the file. The `#t=` media fragment makes the first frame load
 * at `start`; the timeupdate handler jumps back when playback passes `end`.
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
    if (!video || (start === undefined && end === undefined)) return;
    const from = start ?? 0;

    const onTimeUpdate = () => {
      if (end !== undefined && video.currentTime >= end) {
        video.currentTime = from;
        void video.play();
      }
    };
    // Covers clips whose `end` is past the file's real length.
    const onEnded = () => {
      video.currentTime = from;
      void video.play();
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [start, end]);

  const trimmed = start !== undefined || end !== undefined;
  const fragment = trimmed ? `#t=${start ?? 0}${end !== undefined ? `,${end}` : ""}` : "";

  return (
    <video
      ref={ref}
      className="hero-video absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      // Native loop would restart at 0, not `start`, so handle it ourselves.
      loop={!trimmed}
      playsInline
      aria-hidden="true"
    >
      <source src={`${src}${fragment}`} type="video/mp4" />
    </video>
  );
}
