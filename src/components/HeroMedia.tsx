import Image from "next/image";

/**
 * Background layer for hero sections. Pass `imageSrc` for a static photo
 * background, or `videoSrc` once real surf footage is available (e.g.
 * public/videos/hero.mp4) for an autoplaying background video — video wins
 * if both are given. With neither, this renders an ocean/jungle gradient
 * so the layout and copy can still be reviewed.
 *
 * The video is hidden for users who've asked for reduced motion — see the
 * `.hero-video` rule in globals.css — falling back to the image/gradient.
 *
 * The image uses `preload` (skips lazy-loading) because it's the largest
 * above-the-fold element on the homepage — lazy-loading it would delay
 * Largest Contentful Paint.
 */
export function HeroMedia({
  imageSrc,
  imageAlt,
  videoSrc,
  waveClassName = "text-sand-50",
  overlay = "default",
}: {
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  /** Text-color class for the bottom wave, to match the section below. */
  waveClassName?: string;
  /**
   * Tint over the photo/video: "light" lets it show through brighter,
   * "none" removes the tint entirely (pair with a text-shadow on the copy).
   */
  overlay?: "default" | "light" | "none";
}) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900">
      {videoSrc ? (
        <video
          className={`hero-video absolute inset-0 h-full w-full object-cover ${overlay === "default" ? "opacity-60" : "opacity-100"}`}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            preload
            sizes="100vw"
            className="object-cover object-[32%_center]"
          />
        )
      )}
      {(imageSrc || videoSrc) && overlay !== "none" && (
        // Flat tint under the directional gradient below, so heading/CTA
        // text stays legible no matter what a future replacement photo
        // looks like in the top-left where the copy sits.
        <div className={`absolute inset-0 ${overlay === "light" ? "bg-brand-900/15" : "bg-brand-900/35"}`} />
      )}
      {overlay !== "none" && (
        <div
          className={`absolute inset-0 bg-gradient-to-t to-transparent ${
            overlay === "light"
              ? "from-brand-900/45 via-transparent"
              : "from-brand-900/80 via-brand-900/20"
          }`}
        />
      )}
      <svg
        aria-hidden="true"
        className={`absolute -bottom-1 left-0 h-16 w-full sm:h-24 ${waveClassName}`}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,100L0,100Z"
        />
      </svg>
    </div>
  );
}
