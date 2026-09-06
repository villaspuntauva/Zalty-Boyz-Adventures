import type { Localized } from "./types";

export type Package = {
  slug: string;
  name: Localized<string>;
  shortDescription: Localized<string>;
  durationLabel: Localized<string>;
  goodFor: Localized<string>;
  /** Tour slugs (see src/data/tours.ts) bundled into this package. */
  includesTourSlugs: string[];
  includesSurfLessons: boolean;
  includesMassage: boolean;
};

/**
 * TODO(client): confirm exact itineraries, day-by-day order, and pricing
 * before publishing — these are illustrative bundles based on the tours
 * and services described, not confirmed packages yet.
 */
export const packages: Package[] = [
  {
    slug: "weekend-taste",
    name: { en: "Weekend Taste of Puerto Viejo", es: "Fin de Semana Sabor Puerto Viejo" },
    shortDescription: {
      en: "Two days: one surf lesson, one jungle or water tour, and a massage to finish.",
      es: "Dos días: una clase de surf, un tour de selva o agua, y un masaje para cerrar.",
    },
    durationLabel: { en: "2 days", es: "2 días" },
    goodFor: { en: "Short trips & weekend visitors", es: "Viajes cortos y visitantes de fin de semana" },
    includesTourSlugs: ["waterfall-tour"],
    includesSurfLessons: true,
    includesMassage: true,
  },
  {
    slug: "full-week-explorer",
    name: { en: "Full Week Explorer", es: "Explorador de Semana Completa" },
    shortDescription: {
      en: "A full week combining surf lessons, kayak or paddle board, a night wildlife walk, a waterfall hike, and the fruit farm — with rest days built in.",
      es: "Una semana completa que combina clases de surf, kayak o paddle board, una caminata nocturna de fauna, una cascada y la finca de frutas — con días de descanso incluidos.",
    },
    durationLabel: { en: "7 days", es: "7 días" },
    goodFor: { en: "Travelers who want to see it all", es: "Viajeros que quieren verlo todo" },
    includesTourSlugs: ["kayak-tour", "night-tour", "waterfall-tour", "fruit-farm-tour"],
    includesSurfLessons: true,
    includesMassage: true,
  },
  {
    slug: "surf-and-relax",
    name: { en: "Surf & Relax", es: "Surf y Relax" },
    shortDescription: {
      en: "Daily surf lessons paired with massages — built for travelers focused on surfing without the extra planning.",
      es: "Clases de surf diarias combinadas con masajes — pensado para viajeros enfocados en surfear sin planificación extra.",
    },
    durationLabel: { en: "3–5 days", es: "3–5 días" },
    goodFor: { en: "Surf-focused travelers", es: "Viajeros enfocados en el surf" },
    includesTourSlugs: [],
    includesSurfLessons: true,
    includesMassage: true,
  },
];
