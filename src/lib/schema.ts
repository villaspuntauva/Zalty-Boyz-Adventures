import { business, siteUrl } from "./business";
import { team } from "@/data/team";
import { tours, tourPhotoName } from "@/data/tours";

type Locale = "en" | "es";

/**
 * JSON-LD builders. Plain functions returning serializable objects, rendered
 * server-side by <JsonLd> so the markup is in the static HTML Google fetches
 * (no client-side injection, identical on mobile and desktop).
 *
 * Entity graph — every node is linked by a stable `@id`:
 *
 *   #website  (WebSite) ──publisher──▶ #business
 *   #business (SportsActivityLocation = LocalBusiness + Organization)
 *       ├─ founder ──▶ /about#cedric, /about#solomon (Person)
 *       └─ hasOfferCatalog ──▶ each service/trip below
 *   /surf-lessons#service, /yoga#service, /tours/massage#service (Service)
 *   /tours/<slug>#trip (TouristTrip)
 *       └─ provider ──▶ #business
 *
 * The business is ONE entity (not a separate Organization + LocalBusiness),
 * so search engines never see two conflicting "Zalty Boyz" nodes.
 *
 * Only facts already on the site or in src/lib/business.ts are used — no
 * ratings, reviews, or invented details. Keep it that way: Google treats
 * structured data that doesn't match visible content as spam.
 */

export const schemaIds = {
  website: `${siteUrl}/#website`,
  business: `${siteUrl}/#business`,
  logo: `${siteUrl}/#logo`,
};

const businessRef = { "@id": schemaIds.business };

const abs = (path: string) => `${siteUrl}${path}`;

/** Canonical (English) page URL — `@id`s must be identical across locales. */
const enUrl = (path: string) => `${siteUrl}/en${path}`;

export const serviceIds = {
  surfLessons: `${enUrl("/surf-lessons")}#service`,
  yoga: `${enUrl("/yoga")}#service`,
  tour: (slug: string) =>
    `${enUrl(`/tours/${slug}`)}#${slug === "massage" ? "service" : "trip"}`,
};

const personId = (slug: string) => `${enUrl("/about")}#${slug}`;

const areaServed = [
  "Puerto Viejo de Talamanca",
  "Cocles",
  "Punta Uva",
  "Cahuita",
].map((name) => ({ "@type": "Place", name }));

/** "From $X" pricing, as shown on the site. */
function fromPriceOffer(price: number, url: string, name?: string) {
  return {
    "@type": "Offer",
    ...(name ? { name } : {}),
    url,
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: price,
      priceCurrency: business.currency,
    },
  };
}

/** A fixed price, as shown on the site. */
function priceOffer(price: number, url: string, name: string) {
  return {
    "@type": "Offer",
    name,
    url,
    price,
    priceCurrency: business.currency,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": schemaIds.website,
    name: business.name,
    alternateName: business.mapQuery,
    url: siteUrl,
    inLanguage: ["en", "es"],
    publisher: businessRef,
  };
}

export function businessSchema(locale: Locale) {
  const founders = team.filter((m) => m.slug === "cedric" || m.slug === "solomon");

  return {
    // SportsActivityLocation is a LocalBusiness subtype (and therefore also
    // an Organization), the closest Schema.org type for a surf school.
    "@type": "SportsActivityLocation",
    "@id": schemaIds.business,
    name: business.name,
    // The Google Business Profile listing still uses the pre-rebrand name.
    alternateName: business.mapQuery,
    description: business.description[locale],
    url: `${siteUrl}/${locale}`,
    logo: {
      "@type": "ImageObject",
      "@id": schemaIds.logo,
      url: abs("/logo.png"),
      contentUrl: abs("/logo.png"),
      width: 500,
      height: 500,
      caption: business.name,
    },
    image: [
      abs("/images/surf-lessons/surf-lesson-puerto-viejo-2.jpg"),
      abs("/images/home/surf-lesson-group-cocles-beach.jpg"),
      abs("/images/home/surfer-aerial-puerto-viejo-costa-rica.jpg"),
    ],
    telephone: business.phone,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.phone,
      contactType: "reservations",
      availableLanguage: ["English", "Spanish"],
      url: `https://wa.me/${business.whatsappNumber}`,
    },
    address: {
      "@type": "PostalAddress",
      ...business.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapQuery)}`,
    openingHoursSpecification: business.openingHours.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
    priceRange: business.priceRange,
    currenciesAccepted: business.currency,
    paymentAccepted: business.paymentMethods[locale],
    areaServed,
    sameAs: Object.values(business.social).filter(Boolean),
    founder: founders.map((m) => ({
      "@type": "Person",
      "@id": personId(m.slug),
      name: m.name,
      jobTitle: m.role[locale],
      image: abs(m.photo),
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "es" ? "Clases de surf y tours" : "Surf lessons and tours",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@id": serviceIds.surfLessons } },
        ...tours.map((tour) => ({
          "@type": "Offer",
          itemOffered: { "@id": serviceIds.tour(tour.slug) },
        })),
        { "@type": "Offer", itemOffered: { "@id": serviceIds.yoga } },
      ],
    },
  };
}

/**
 * Site-wide graph (WebSite + business) — rendered once, in the locale
 * layout, as a single script so no page can end up with duplicates.
 */
export function siteGraphSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteSchema(), businessSchema(locale)],
  };
}

export function surfLessonsServiceSchema(params: {
  locale: Locale;
  name: string;
  description: string;
  url: string;
  offers: { name: string; price: number }[];
}) {
  const { locale, name, description, url, offers } = params;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceIds.surfLessons,
    name,
    description,
    serviceType: locale === "es" ? "Clases de surf" : "Surf lessons",
    url,
    image: abs("/images/surf-lessons/surf-lesson-puerto-viejo-2.jpg"),
    provider: businessRef,
    areaServed,
    offers: offers.map((o) => priceOffer(o.price, url, o.name)),
  };
}

export function yogaServiceSchema(params: {
  locale: Locale;
  name: string;
  description: string;
  url: string;
  image: string;
  offers: { name: string; price: number }[];
}) {
  const { locale, name, description, url, image, offers } = params;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceIds.yoga,
    name,
    description,
    serviceType: locale === "es" ? "Clases de yoga" : "Yoga classes",
    url,
    image: abs(image),
    provider: businessRef,
    areaServed,
    offers: offers.map((o) => priceOffer(o.price, url, o.name)),
  };
}

/** Tour detail pages: TouristTrip, or Service for non-trips (massage). */
export function tourSchema(params: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
  url: string;
  priceFrom?: number;
}) {
  const { slug, name, description, url, priceFrom } = params;
  const isService = slug === "massage";
  return {
    "@context": "https://schema.org",
    "@type": isService ? "Service" : "TouristTrip",
    "@id": serviceIds.tour(slug),
    name,
    description,
    url,
    image: abs(`/images/tours/${tourPhotoName(slug)}.jpg`),
    provider: businessRef,
    ...(isService ? { serviceType: name, areaServed } : {}),
    ...(priceFrom ? { offers: fromPriceOffer(priceFrom, url) } : {}),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
