import type { Metadata } from "next";
import { routing, type StaticPathnames } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { siteUrl } from "@/lib/business";
import { pageSeo } from "@/data/seo";

type Locale = "en" | "es";
type Href =
  | StaticPathnames
  | { pathname: "/tours/[slug]"; params: { slug: string } };

const SITE_NAME = "Zalty Boyz";

/**
 * Per-page canonical, hreflang alternates and Open Graph URL.
 *
 * Every page must set these itself: Next merges `alternates`/`openGraph`
 * shallowly, so anything set only in the layout would make every page
 * claim the home page as its canonical URL.
 */
export function pageMetadata({
  locale,
  href,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: Locale;
  href: Href;
  title: string;
  description: string;
  /** Use `title` as-is instead of appending " | Zalty Boyz". */
  absoluteTitle?: boolean;
}): Metadata {
  const url = (l: Locale) => `${siteUrl}${getPathname({ locale: l, href })}`;
  const languages = Object.fromEntries(routing.locales.map((l) => [l, url(l)]));
  // Setting openGraph here replaces the layout's, which drops the image from
  // the [locale]/opengraph-image file convention — so add it back explicitly.
  const image = {
    url: `${siteUrl}/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    type: "image/png",
    alt: SITE_NAME,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url(locale),
      languages: { ...languages, "x-default": url("en") },
    },
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      locale: locale === "es" ? "es_CR" : "en_US",
      url: url(locale),
      title: absoluteTitle ? title : `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      images: [image.url],
    },
  };
}

/** Metadata for a static page, using its entry in src/data/seo.ts. */
export function staticPageMetadata(locale: Locale, href: StaticPathnames): Metadata {
  const seo = pageSeo[href];
  return pageMetadata({
    locale,
    href,
    title: seo.title[locale],
    description: seo.description[locale],
    absoluteTitle: href === "/",
  });
}

/** Trim text to a meta-description length at a word boundary. */
export function toMetaDescription(text: string, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—–-]\s*$/, "")}…`;
}
