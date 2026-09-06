/**
 * Single source of truth for business identity, contact details, and NAP
 * (Name/Address/Phone) data. Consistent NAP across the site and directory
 * listings (Google Business Profile, TripAdvisor, etc.) is a core local SEO
 * signal, so every component/schema builder should read from here rather
 * than hardcoding values.
 *
 * TODO(client): confirm exact social handles/URLs, a working email inbox,
 * and the precise meeting-point coordinates before launch — phone/WhatsApp
 * and opening hours below are already the real values.
 */
export const business = {
  name: "Zalty Boyz Adventures",
  legalName: "Zalty Boyz Adventures",
  tagline: {
    en: "Surf lessons & jungle-to-ocean adventures in Puerto Viejo",
    es: "Clases de surf y aventuras de selva a mar en Puerto Viejo",
  },
  description: {
    en: "Surf school and adventure tour operator based in Puerto Viejo, Talamanca, on Costa Rica's Caribbean coast. Surf lessons, kayak and paddle board tours, night wildlife walks, waterfall hikes, and multi-day adventure packages.",
    es: "Escuela de surf y operador de tours de aventura en Puerto Viejo, Talamanca, en el Caribe de Costa Rica. Clases de surf, tours en kayak y paddle board, caminatas nocturnas de fauna, cascadas y paquetes de aventura de varios días.",
  },

  whatsappNumber: "50685634224",
  phone: "+506 8563 4224",
  // TODO(client): confirm a real inbox for this once the domain is set up —
  // currently a placeholder guess, not a working address.
  email: "hello@zaltyboyzadventures.com",

  address: {
    streetAddress: "Playa Cocles",
    addressLocality: "Puerto Viejo de Talamanca",
    addressRegion: "Limón",
    postalCode: "70403",
    addressCountry: "CR",
  },

  // Approximate coordinates for Puerto Viejo de Talamanca; refine to the
  // exact shop/meeting-point location before launch.
  geo: {
    latitude: 9.6553,
    longitude: -82.7554,
  },

  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "07:00", closes: "18:00" },
  ],

  social: {
    instagram: "https://www.instagram.com/zalty_boyz/",
    facebook: "",
    youtube: "https://www.youtube.com/@zaltyboyz6720",
    tripadvisor: "",
  },

  founded: "2020",
  priceRange: "$$",
  currency: "USD",

  paymentMethods: {
    en: "cash (preferred), SINPE Móvil, Zelle, PayPal, or bank transfer",
    es: "efectivo (preferido), SINPE Móvil, Zelle, PayPal o transferencia bancaria",
  },

  // Google Business Profile share link for "Zalty Boyz Surf School",
  // confirmed to resolve to the correct listing (not a competitor's).
  googleReviewsUrl: "https://share.google/rXAxaNnweyH8MbOqT",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zaltyboyzadventures.com";
