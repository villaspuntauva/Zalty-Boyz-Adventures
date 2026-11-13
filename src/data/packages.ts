import type { Localized } from "./types";

export type Package = {
  slug: string;
  name: Localized<string>;
  shortDescription: Localized<string>;
  durationLabel: Localized<string>;
  goodFor: Localized<string>;
  /** Tour slugs (see src/data/tours.ts) bundled into this package — "massage" included. */
  includesTourSlugs: string[];
  includesSurfLessons: boolean;
  /**
   * PROPOSED starting price per person, in USD — not yet confirmed by the
   * client. Roughly the sum of the included items' per-person rates with a
   * ~10% bundle discount.
   */
  priceFromPerPerson: number;
};

/**
 * TODO(client): confirm exact itineraries, day-by-day order, and pricing
 * before publishing — these are illustrative bundles based on the tours
 * and services described, not confirmed packages yet.
 */
export const packages: Package[] = [
  {
    slug: "surf-and-relax",
    name: { en: "Surf & Relax", es: "Surf y Relax" },
    shortDescription: {
      en: "Daily surf lessons paired with massages — built for travelers focused on surfing without the extra planning.",
      es: "Clases de surf diarias combinadas con masajes — pensado para viajeros enfocados en surfear sin planificación extra.",
    },
    durationLabel: { en: "1 day", es: "1 día" },
    goodFor: { en: "Surf-focused travelers", es: "Viajeros enfocados en el surf" },
    includesTourSlugs: ["massage"],
    includesSurfLessons: true,
    // Surf lesson $60 + massage $80 = $140
    priceFromPerPerson: 125,
  },
  {
    slug: "weekend-taste",
    name: { en: "Weekend Taste of Puerto Viejo", es: "Fin de Semana Sabor Puerto Viejo" },
    shortDescription: {
      en: "Two days: one surf lesson, one jungle or water tour, and a massage to finish.",
      es: "Dos días: una clase de surf, un tour de selva o agua, y un masaje para cerrar.",
    },
    durationLabel: { en: "2 days", es: "2 días" },
    goodFor: { en: "Short trips & weekend visitors", es: "Viajes cortos y visitantes de fin de semana" },
    includesTourSlugs: ["waterfall-tour", "massage"],
    includesSurfLessons: true,
    // Surf $60 + waterfall $45 + massage $80 = $185
    priceFromPerPerson: 165,
  },
  {
    slug: "full-week-explorer",
    name: { en: "Full Week Explorer", es: "Explorador de Semana Completa" },
    shortDescription: {
      en: "A full week combining surf lessons, kayak or paddle board, a night tour with exotic fruit tasting, and a waterfall hike — with rest days built in.",
      es: "Una semana completa que combina clases de surf, kayak o paddle board, un tour nocturno con degustación de frutas exóticas y una cascada — con días de descanso incluidos.",
    },
    durationLabel: { en: "5 days – 1 week", es: "5 días – 1 semana" },
    goodFor: { en: "Travelers who want to see it all", es: "Viajeros que quieren verlo todo" },
    includesTourSlugs: ["kayak-tour", "night-tour", "waterfall-tour", "massage"],
    includesSurfLessons: true,
    // 3 surf lessons $180 + kayak $50 + night $45 + waterfall $45 + massage $80 = $400
    priceFromPerPerson: 360,
  },
];
