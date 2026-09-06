import type { Localized } from "./types";

export type Tour = {
  slug: string;
  name: Localized<string>;
  shortDescription: Localized<string>;
  description: Localized<string>;
  durationLabel: Localized<string>;
  /** ISO 8601 duration, used in TouristTrip schema. */
  durationIso: string;
  groupSize: Localized<string>;
  difficulty: Localized<string>;
  included: Localized<string[]>;
  goodToKnow: Localized<string[]>;
  heroImageAlt: Localized<string>;
};

/**
 * Tour catalog. This is the site's lightweight content layer — edit copy
 * here rather than in page components, and this is the first place to
 * migrate into a real CMS later if the client wants self-serve editing.
 *
 * TODO(client): add real pricing once confirmed; until then pages show a
 * "ask for pricing" CTA instead of a number, since seasonal/group rates and
 * package bundling make a single displayed price easy to get wrong.
 */
export const tours: Tour[] = [
  {
    slug: "kayak-tour",
    name: { en: "Kayak Tour", es: "Tour en Kayak" },
    shortDescription: {
      en: "Paddle calm coastal waters and jungle-lined canals.",
      es: "Rema por aguas costeras tranquilas y canales bordeados de selva.",
    },
    description: {
      en: "Explore the calmer waters around Puerto Viejo by kayak, gliding along the coastline and jungle-fringed canals where howler monkeys and toucans are often spotted from the water. Suitable for beginners — no experience needed.",
      es: "Explora las aguas más tranquilas alrededor de Puerto Viejo en kayak, deslizándote por la costa y canales bordeados de selva donde es común ver monos congo y tucanes desde el agua. Apto para principiantes, no se necesita experiencia.",
    },
    durationLabel: { en: "Approx. 2.5 hours", es: "Aprox. 2.5 horas" },
    durationIso: "PT2H30M",
    groupSize: { en: "2–8 people", es: "2–8 personas" },
    difficulty: { en: "Easy — all levels", es: "Fácil — todos los niveles" },
    included: {
      en: ["Kayak & paddle", "Life jacket", "Local guide", "Bottled water"],
      es: ["Kayak y remo", "Chaleco salvavidas", "Guía local", "Agua embotellada"],
    },
    goodToKnow: {
      en: [
        "Bring sunscreen, a hat, and clothes you don't mind getting wet",
        "Best paired with a morning departure for calmer water",
      ],
      es: [
        "Trae protector solar, gorra y ropa que no te importe mojar",
        "Se recomienda salida en la mañana para aguas más tranquilas",
      ],
    },
    heroImageAlt: {
      en: "Guide leading a kayak tour along the Puerto Viejo coastline",
      es: "Guía liderando un tour en kayak por la costa de Puerto Viejo",
    },
  },
  {
    slug: "paddle-board",
    name: { en: "Paddle Board (SUP)", es: "Paddle Board (SUP)" },
    shortDescription: {
      en: "Stand-up paddle boarding on flat coastal water.",
      es: "Stand-up paddle sobre aguas costeras tranquilas.",
    },
    description: {
      en: "A relaxed introduction to stand-up paddle boarding on flat, protected water — great for balance, a full-body workout, and calm ocean views. We'll cover the basics on land before you head out.",
      es: "Una introducción relajada al stand-up paddle en aguas planas y protegidas — ideal para el equilibrio, un ejercicio completo y vistas tranquilas del mar. Cubrimos lo básico en tierra antes de salir.",
    },
    durationLabel: { en: "Approx. 2 hours", es: "Aprox. 2 horas" },
    durationIso: "PT2H",
    groupSize: { en: "1–6 people", es: "1–6 personas" },
    difficulty: { en: "Easy — all levels", es: "Fácil — todos los niveles" },
    included: {
      en: ["Paddle board & paddle", "Life jacket", "Basic instruction", "Local guide"],
      es: ["Tabla de paddle y remo", "Chaleco salvavidas", "Instrucción básica", "Guía local"],
    },
    goodToKnow: {
      en: ["Comfortable swimwear recommended", "Great to pair with a surf lesson day off"],
      es: ["Se recomienda ropa de baño cómoda", "Ideal para combinar con un día libre de surf"],
    },
    heroImageAlt: {
      en: "Traveler stand-up paddle boarding on calm water near Puerto Viejo",
      es: "Turista haciendo stand-up paddle en aguas tranquilas cerca de Puerto Viejo",
    },
  },
  {
    slug: "night-tour",
    name: { en: "Night Wildlife Tour", es: "Tour Nocturno de Fauna" },
    shortDescription: {
      en: "After-dark jungle walk to spot frogs, spiders, snakes & more.",
      es: "Caminata nocturna por la selva para ver ranas, arañas, serpientes y más.",
    },
    description: {
      en: "The rainforest comes alive after sunset. On this guided night walk, our naturalist guides use red-light flashlights to spot nocturnal wildlife with minimal disturbance — red-eyed tree frogs, tarantulas, snakes, insects, and more, all explained along the way.",
      es: "La selva cobra vida después del atardecer. En esta caminata nocturna guiada, nuestros guías naturalistas usan linternas de luz roja para observar fauna nocturna con mínima alteración — ranas de ojos rojos, tarántulas, serpientes, insectos y más, todo explicado en el camino.",
    },
    durationLabel: { en: "Approx. 2 hours", es: "Aprox. 2 horas" },
    durationIso: "PT2H",
    groupSize: { en: "2–10 people", es: "2–10 personas" },
    difficulty: { en: "Easy walk", es: "Caminata fácil" },
    included: {
      en: ["Naturalist guide", "Red-light flashlight", "Rubber boots (if needed)"],
      es: ["Guía naturalista", "Linterna de luz roja", "Botas de hule (si se necesitan)"],
    },
    goodToKnow: {
      en: [
        "Wear closed shoes and long pants; insect repellent recommended",
        "Not recommended for guests with a severe fear of insects/reptiles",
      ],
      es: [
        "Usa zapato cerrado y pantalón largo; se recomienda repelente de insectos",
        "No recomendado para personas con miedo severo a insectos/reptiles",
      ],
    },
    heroImageAlt: {
      en: "Red-eyed tree frog spotted during a night wildlife tour near Puerto Viejo",
      es: "Rana de ojos rojos vista durante un tour nocturno de fauna cerca de Puerto Viejo",
    },
  },
  {
    slug: "waterfall-tour",
    name: { en: "Waterfall Tour", es: "Tour de Cascadas" },
    shortDescription: {
      en: "Jungle hike to a swimmable waterfall.",
      es: "Caminata por la selva hasta una cascada donde se puede nadar.",
    },
    description: {
      en: "Hike through Talamanca rainforest trails to a swimmable waterfall, with stops to point out plants, birds, and wildlife along the way. Cool off with a swim before heading back.",
      es: "Camina por senderos de la selva de Talamanca hasta una cascada donde se puede nadar, con paradas para observar plantas, aves y fauna en el camino. Refréscate con un baño antes de regresar.",
    },
    durationLabel: { en: "Approx. 3–4 hours", es: "Aprox. 3–4 horas" },
    durationIso: "PT3H30M",
    groupSize: { en: "2–10 people", es: "2–10 personas" },
    difficulty: { en: "Moderate — some uneven terrain", es: "Moderado — terreno irregular en tramos" },
    included: {
      en: ["Local guide", "Bottled water", "Fruit snack"],
      es: ["Guía local", "Agua embotellada", "Snack de fruta"],
    },
    goodToKnow: {
      en: ["Wear hiking shoes or river sandals with grip", "Bring swimwear and a towel"],
      es: ["Usa zapatos de montaña o sandalias de río con buen agarre", "Trae traje de baño y toalla"],
    },
    heroImageAlt: {
      en: "Waterfall in the Talamanca rainforest near Puerto Viejo",
      es: "Cascada en la selva de Talamanca cerca de Puerto Viejo",
    },
  },
  {
    slug: "fruit-farm-tour",
    name: { en: "Exotic Fruit Farm Tour", es: "Tour de Finca de Frutas Exóticas" },
    shortDescription: {
      en: "Taste tropical fruit at a local farm.",
      es: "Prueba frutas tropicales en una finca local.",
    },
    description: {
      en: "Visit a local farm to see and taste tropical fruits you likely won't recognize — from cacao straight off the tree to seasonal exotics — guided by farmers who know the land. A relaxed, family-friendly experience.",
      es: "Visita una finca local para ver y probar frutas tropicales que probablemente no reconocerás — desde cacao recién cortado hasta exóticas de temporada — guiado por agricultores que conocen la tierra. Una experiencia relajada, ideal para familias.",
    },
    durationLabel: { en: "Approx. 2 hours", es: "Aprox. 2 horas" },
    durationIso: "PT2H",
    groupSize: { en: "2–12 people", es: "2–12 personas" },
    difficulty: { en: "Easy — family friendly", es: "Fácil — ideal para familias" },
    included: {
      en: ["Farm guide", "Fruit tasting", "Cacao demonstration"],
      es: ["Guía de la finca", "Degustación de frutas", "Demostración de cacao"],
    },
    goodToKnow: {
      en: ["Great option on a rest day or with young kids", "Let us know about any fruit allergies in advance"],
      es: ["Buena opción en un día de descanso o con niños", "Avísanos con anticipación sobre alergias a frutas"],
    },
    heroImageAlt: {
      en: "Farmer showing exotic tropical fruit on a farm tour near Puerto Viejo",
      es: "Agricultor mostrando fruta tropical exótica en un tour de finca cerca de Puerto Viejo",
    },
  },
  {
    slug: "mini-surf-trip",
    name: { en: "Mini Surf Trip: Isla Uvita & Cahuita", es: "Mini Viaje de Surf: Isla Uvita y Cahuita" },
    shortDescription: {
      en: "A day trip to nearby breaks for surfers wanting more.",
      es: "Una excursión de un día a olas cercanas para quienes quieren más surf.",
    },
    description: {
      en: "For surfers who want to explore beyond Puerto Viejo's beach breaks, we run day trips to Isla Uvita (near Limón) and Cahuita — different wave types, less crowded lineups, and a good option once you're comfortable in the water.",
      es: "Para surfistas que quieren explorar más allá de las olas de Puerto Viejo, organizamos excursiones de un día a Isla Uvita (cerca de Limón) y Cahuita — olas distintas, menos gente en el agua y una buena opción cuando ya te sientes cómodo en el mar.",
    },
    durationLabel: { en: "Half-day", es: "Medio día" },
    durationIso: "PT4H",
    groupSize: { en: "2–6 people", es: "2–6 personas" },
    difficulty: { en: "Improver & up", es: "Nivel en progreso en adelante" },
    included: {
      en: ["Transport", "Local guide", "Board rental available"],
      es: ["Transporte", "Guía local", "Renta de tabla disponible"],
    },
    goodToKnow: {
      en: ["Best for surfers past the first-timer stage", "Conditions vary — we'll pick the best day with you"],
      es: ["Ideal para surfistas que ya superaron el nivel de principiante", "Las condiciones varían — elegimos el mejor día contigo"],
    },
    heroImageAlt: {
      en: "Surfer paddling out at Isla Uvita near Limón, Costa Rica",
      es: "Surfista remando en Isla Uvita cerca de Limón, Costa Rica",
    },
  },
];

export function getTourBySlug(slug: string) {
  return tours.find((tour) => tour.slug === slug);
}
