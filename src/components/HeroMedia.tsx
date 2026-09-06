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
 * The image uses `priority` (skips lazy-loading) because it's the largest
 * above-the-fold element on the homepage — lazy-loading it would delay
 * Largest Contentful Paint.
 */
export function HeroMedia({
  imageSrc,
  imageAlt,
  videoSrc,
}: {
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
}) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900">
      {videoSrc ? (
        <video
          className="hero-video absolute inset-0 h-full w-full object-cover opacity-60"
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
            priority
            sizes="100vw"
            className="object-cover"
          />
        )
      )}
      {(imageSrc || videoSrc) && (
        // Flat tint under the directional gradient below, so heading/CTA
        // text stays legible no matter what a future replacement photo
        // looks like in the top-left where the copy sits.
        <div className="absolute inset-0 bg-brand-900/35" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/20 to-transparent" />
      <svg
        aria-hidden="true"
        className="absolute -bottom-1 left-0 h-16 w-full text-sand-50 sm:h-24"
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
