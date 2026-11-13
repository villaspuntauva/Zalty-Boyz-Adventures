import { business, siteUrl } from "./business";

type Locale = "en" | "es";

/**
 * JSON-LD builders. Kept as plain functions returning serializable objects
 * so they can be dropped into a <script type="application/ld+json"> tag
 * from any server component. These target both classic search (Google rich
 * results) and AI answer engines, which lean heavily on structured data to
 * ground factual claims about a business.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: business.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: Object.values(business.social).filter(Boolean),
    telephone: business.phone,
  };
}

/** WebSite entity — lets search engines tie every page to one site/publisher. */
export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: business.name,
    url: siteUrl,
    inLanguage: locale === "es" ? "es-CR" : "en",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function localBusinessSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    description: business.description[locale],
    image: [`${siteUrl}/${locale}/opengraph-image`, `${siteUrl}/logo.png`],
    logo: `${siteUrl}/logo.png`,
    url: `${siteUrl}/${locale}`,
    parentOrganization: { "@id": `${siteUrl}/#organization` },
    currenciesAccepted: business.currency,
    paymentAccepted: business.paymentMethods[locale],
    areaServed: ["Puerto Viejo de Talamanca", "Cocles", "Punta Uva", "Cahuita", "Limón, Costa Rica"],
    telephone: business.phone,
    priceRange: business.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    sameAs: Object.values(business.social).filter(Boolean),
    openingHoursSpecification: business.openingHours.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
  };
}

export function tourServiceSchema(params: {
  locale: Locale;
  name: string;
  description: string;
  slug: string;
  image?: string;
  durationIso?: string;
  priceFrom?: number;
  /** "Service" for things that aren't trips (massage, yoga, lessons). */
  type?: "TouristTrip" | "Service";
  /** Full page URL; defaults to the tour detail page. */
  url?: string;
}) {
  const { locale, name, description, slug, image, durationIso, priceFrom } =
    params;
  const type = params.type ?? "TouristTrip";
  const url = params.url ?? `${siteUrl}/${locale}/tours/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url,
    image: image ? `${siteUrl}${image}` : undefined,
    provider: {
      "@type": "Organization",
      name: business.name,
      url: siteUrl,
    },
    ...(type === "TouristTrip"
      ? {
          touristType: ["Adventure travelers", "Families", "Couples", "Solo travelers"],
          ...(durationIso ? { duration: durationIso } : {}),
        }
      : {
          serviceType: name,
          areaServed: "Puerto Viejo de Talamanca, Costa Rica",
        }),
    ...(priceFrom
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: business.currency,
            price: priceFrom,
            url,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
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
