import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { siteUrl } from "@/lib/business";
import { tours } from "@/data/tours";

const staticPaths = [
  "/",
  "/surf-lessons",
  "/tours",
  "/packages",
  "/about",
  "/location",
  "/gallery",
  "/faq",
  "/blog",
  "/contact",
] as const;

function alternates(pathname: (typeof staticPaths)[number]) {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      `${siteUrl}${getPathname({ locale, href: pathname })}`,
    ]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      staticPaths.map((pathname) => ({
        url: `${siteUrl}${getPathname({ locale, href: pathname })}`,
        lastModified: new Date(),
        changeFrequency: pathname === "/" ? "weekly" : "monthly",
        priority: pathname === "/" ? 1 : 0.7,
        alternates: { languages: alternates(pathname) },
      })),
  );

  const tourEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      tours.map((tour) => ({
        url: `${siteUrl}${getPathname({
          locale,
          href: { pathname: "/tours/[slug]", params: { slug: tour.slug } },
        })}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      })),
  );

  return [...staticEntries, ...tourEntries];
}
