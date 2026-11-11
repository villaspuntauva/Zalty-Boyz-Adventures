import Image, { getImageProps } from "next/image";

/**
 * Background layer for hero sections. Pass `imageSrc` for a static photo
 * background, or `videoSrc` once real surf footage is available (e.g.
 * public/videos/hero.mp4) for an autoplaying background video — video wins
 * if both are given. With neither, this renders an ocean/jungle gradient
 * so the layout and copy can still be reviewed.
 *
 * A dark gradient (`scrim`, on by default) sits over the photo/video so
 * the white heading copy stays legible; pages also add a text-shadow.
 * Pass `scrim={false}` for a hero whose photo is already dark enough.
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
  mobileImageSrc,
  imageAlt,
  videoSrc,
  waveClassName = "text-sand-50",
  scrim = true,
}: {
  imageSrc?: string;
  /**
   * Optional different photo for phones/tablets (below the `lg` breakpoint),
   * for when the desktop photo crops badly into a tall, narrow screen.
   */
  mobileImageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  /** Darken the media so overlaid copy stays legible. Defaults to true. */
  scrim?: boolean;
  /** Text-color class for the bottom wave, to match the section below. */
  waveClassName?: string;
}) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900">
      {videoSrc ? (
        <video
          className="hero-video absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        imageSrc &&
        (mobileImageSrc ? (
          <ArtDirectedImage
            desktopSrc={imageSrc}
            mobileSrc={mobileImageSrc}
            alt={imageAlt ?? ""}
          />
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            preload
            sizes="100vw"
            className="object-cover object-[32%_center]"
          />
        ))
      )}
      {scrim && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/20 lg:bg-gradient-to-r lg:from-black/55 lg:via-black/30 lg:to-transparent"
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

/**
 * Desktop/mobile photo pair via <picture>, so each screen downloads only its
 * own photo. `preload` can't be used here (it would fetch both), so it uses
 * eager loading + fetchPriority="high" — see "Art direction" in the
 * next/image docs.
 * The 1024px breakpoint matches Tailwind's `lg`, where the hero layout
 * switches to two columns.
 */
function ArtDirectedImage({
  desktopSrc,
  mobileSrc,
  alt,
}: {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
}) {
  const common = { alt, fill: true, sizes: "100vw" };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: desktopSrc });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: mobileSrc });

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is in `rest` */}
      <img
        {...rest}
        srcSet={mobile}
        // Above-the-fold LCP image: don't lazy-load. Safe inside <picture>,
        // which only ever fetches the one matching source.
        loading="eager"
        fetchPriority="high"
        className="object-cover object-center lg:object-[32%_center]"
      />
    </picture>
  );
}
