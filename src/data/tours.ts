import type { Localized } from "./types";

export type TourPricing = {
  /** Lowest advertised price, in the site currency — feeds schema.org Offer. */
  priceFromNumber: number;
  plans: { label: Localized<string>; price: Localized<string> }[];
  note?: Localized<string>;
};

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
  /** Confirmed client pricing. Omitted for tours where it isn't set yet. */
  pricing?: TourPricing;
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
      en: "A scenic river paddle down to the beach, spotting wildlife along the way.",
      es: "Un recorrido escénico en kayak por el río hasta la playa, viendo fauna en el camino.",
    },
    description: {
      en: "We'll take you on a scenic paddle up the Cocles or Punta Uva River, all the way down to the beach. Along the way, we can see all types of wildlife, including monkeys, sloths, iguanas, turtles, and much more.",
      es: "Te llevamos a remar por el escénico río Cocles o Punta Uva, hasta llegar a la playa. En el camino, podemos ver todo tipo de fauna, incluyendo monos, perezosos, iguanas, tortugas y mucho más.",
    },
    durationLabel: { en: "2 hours", es: "2 horas" },
    durationIso: "PT2H",
    groupSize: { en: "2–8 people", es: "2–8 personas" },
    difficulty: { en: "Easy — all levels", es: "Fácil — todos los niveles" },
    included: {
      en: ["Kayaks", "Snack"],
      es: ["Kayaks", "Snack"],
    },
    pricing: {
      priceFromNumber: 50,
      plans: [
        {
          label: { en: "Private", es: "Privado" },
          price: { en: "$60", es: "$60" },
        },
        {
          label: { en: "Group", es: "Grupal" },
          price: { en: "$50 per person", es: "$50 por persona" },
        },
      ],
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
      en: "After-dark wildlife walk on our own private jungle and fruit farm property.",
      es: "Caminata nocturna de fauna en nuestra propia finca privada de selva y frutas.",
    },
    description: {
      en: "Once the sun goes down, we go looking for what's lurking in the shadows on our own private jungle and exotic fruit farm property. This is where we can see snakes, tarantulas, frogs, and plenty more nighttime wildlife.",
      es: "Una vez que se pone el sol, salimos a buscar lo que se esconde entre las sombras en nuestra propia finca privada de selva y frutas exóticas. Aquí es donde podemos ver serpientes, tarántulas, ranas y mucha más fauna nocturna.",
    },
    durationLabel: { en: "Approx. 2 hours", es: "Aprox. 2 horas" },
    durationIso: "PT2H",
    groupSize: { en: "2–10 people", es: "2–10 personas" },
    difficulty: { en: "Easy walk", es: "Caminata fácil" },
    included: {
      en: ["Gear", "Transportation"],
      es: ["Equipo", "Transporte"],
    },
    pricing: {
      priceFromNumber: 45,
      plans: [
        {
          label: { en: "Private", es: "Privado" },
          price: { en: "$55", es: "$55" },
        },
        {
          label: { en: "Group", es: "Grupal" },
          price: { en: "$45 per person", es: "$45 por persona" },
        },
      ],
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
  {
    slug: "massage",
    name: { en: "Massage", es: "Masaje" },
    shortDescription: {
      en: "Unwind with a massage from our trusted local partner.",
      es: "Relájate con un masaje de nuestra aliada local de confianza.",
    },
    description: {
      en: "After a day of surfing and exploring, unwind with a massage from our trusted local partner — bookable on its own or added to any package. Our massage services are run by a trusted local therapist in Puerto Viejo, a service we're proud to offer alongside our own tours because we know the quality firsthand.",
      es: "Después de un día de surf y exploración, relájate con un masaje de nuestra aliada local de confianza — disponible solo o agregado a cualquier paquete. Nuestros servicios de masaje están a cargo de una terapeuta local de confianza en Puerto Viejo, un servicio que nos enorgullece ofrecer junto a nuestros tours porque conocemos su calidad de primera mano.",
    },
    // TODO(client): confirm actual session length; "by appointment" avoids
    // stating a specific duration that hasn't been confirmed.
    durationLabel: { en: "By appointment", es: "Con cita previa" },
    durationIso: "PT1H",
    groupSize: { en: "1–2 people", es: "1–2 personas" },
    difficulty: { en: "For all guests", es: "Para todos los huéspedes" },
    included: {
      en: ["Professional local massage therapist"],
      es: ["Terapeuta de masajes profesional local"],
    },
    goodToKnow: {
      en: [
        "Can be booked on its own or added to any package",
        "Message us to confirm current availability and pricing",
      ],
      es: [
        "Se puede reservar sola o agregar a cualquier paquete",
        "Escríbenos para confirmar disponibilidad y precios actuales",
      ],
    },
    heroImageAlt: {
      en: "Relaxing massage space near Puerto Viejo",
      es: "Espacio de masajes relajante cerca de Puerto Viejo",
    },
  },
];

export function getTourBySlug(slug: string) {
  return tours.find((tour) => tour.slug === slug);
}
