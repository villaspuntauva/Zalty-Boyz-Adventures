import type { Localized } from "./types";
import type { StaticPathnames } from "@/i18n/routing";

/**
 * Search-focused <title> and meta description for each static page,
 * written separately from the on-page hero copy so the hero can stay
 * punchy while titles carry the location + service keywords people search
 * for. Titles get " | Zalty Boyz" appended by the layout's title template
 * (except the home page, which is used as-is) — keep the rest under ~47
 * characters and descriptions around 120–155 characters.
 */
export const pageSeo: Record<
  StaticPathnames,
  { title: Localized<string>; description: Localized<string> }
> = {
  "/": {
    title: {
      en: "Surf Lessons & Tours in Puerto Viejo, Costa Rica | Zalty Boyz",
      es: "Clases de Surf y Tours en Puerto Viejo, Costa Rica | Zalty Boyz",
    },
    description: {
      en: "Surf lessons, river kayak tours, waterfall hikes and night wildlife tours in Cocles, Puerto Viejo de Talamanca — run by local surfers. Book on WhatsApp.",
      es: "Clases de surf, tours en kayak, caminatas a cascadas y tours nocturnos de fauna en Cocles, Puerto Viejo de Talamanca, con surfistas locales. Reserva por WhatsApp.",
    },
  },
  "/surf-lessons": {
    title: {
      en: "Surf Lessons in Puerto Viejo & Cocles",
      es: "Clases de Surf en Puerto Viejo y Cocles",
    },
    description: {
      en: "Group and private surf lessons in Cocles and Puerto Viejo, Costa Rica, for first-timers to advanced surfers. Board, rash guard and pickup included.",
      es: "Clases de surf grupales y privadas en Cocles y Puerto Viejo, Costa Rica, desde principiantes hasta avanzados. Tabla, licra y transporte incluidos.",
    },
  },
  "/tours": {
    title: {
      en: "Puerto Viejo Tours: Kayak, Waterfall & Night",
      es: "Tours en Puerto Viejo: Kayak, Cascada y Noche",
    },
    description: {
      en: "River kayak and paddle board tours, jungle waterfall hikes, night wildlife tours with exotic fruit tasting, and surf trips to Isla Uvita and Cahuita.",
      es: "Tours en kayak y paddle board, caminatas a cascadas en la selva, tours nocturnos de fauna con frutas exóticas y viajes de surf a Isla Uvita y Cahuita.",
    },
  },
  "/yoga": {
    title: {
      en: "Yoga & Massage in Cocles, Puerto Viejo",
      es: "Yoga y Masajes en Cocles, Puerto Viejo",
    },
    description: {
      en: "Yoga and massage with Julie Hickey at One Love Wellness in Cocles, Puerto Viejo. Vinyasa & Kundalini classes from $15; Thai, deep tissue & Watsu from $85.",
      es: "Yoga y masajes con Julie Hickey en One Love Wellness en Cocles, Puerto Viejo. Clases de Vinyasa y Kundalini desde $15; masajes desde $85.",
    },
  },
  "/packages": {
    title: {
      en: "Surf & Adventure Packages in Puerto Viejo",
      es: "Paquetes de Surf y Aventura en Puerto Viejo",
    },
    description: {
      en: "Bundle surf lessons, tours and a massage into one easy booking in Puerto Viejo, Costa Rica — from a 1-day Surf & Relax to a full week of adventure.",
      es: "Combina clases de surf, tours y un masaje en una sola reserva en Puerto Viejo, Costa Rica — desde un día de Surf y Relax hasta una semana de aventura.",
    },
  },
  "/about": {
    title: {
      en: "About Us — Local Surf Instructors",
      es: "Sobre Nosotros — Instructores de Surf Locales",
    },
    description: {
      en: "Meet the local family behind Zalty Boyz in Puerto Viejo: an ISA-certified head surf instructor who surfed for Costa Rica's national team, and crew.",
      es: "Conoce a la familia local detrás de Zalty Boyz en Puerto Viejo: un instructor principal certificado por la ISA que surfeó con la selección de Costa Rica.",
    },
  },
  "/location": {
    title: {
      en: "Location & Surf Forecast — Cocles, Puerto Viejo",
      es: "Ubicación y Pronóstico de Surf — Cocles, Puerto Viejo",
    },
    description: {
      en: "Find Zalty Boyz in Cocles, Puerto Viejo de Talamanca, on Costa Rica's Caribbean coast — map, directions, and a live Cocles surf forecast.",
      es: "Encuentra a Zalty Boyz en Cocles, Puerto Viejo de Talamanca, en el Caribe de Costa Rica — mapa, cómo llegar y pronóstico de surf en vivo de Cocles.",
    },
  },
  "/faq": {
    title: {
      en: "FAQ — Surf Lessons & Tours in Puerto Viejo",
      es: "Preguntas Frecuentes — Surf y Tours en Puerto Viejo",
    },
    description: {
      en: "Prices, what's included, where lessons happen, what to bring, how to pay and booking tips for surf lessons, tours and yoga in Puerto Viejo, Costa Rica.",
      es: "Precios, qué incluye, dónde son las clases, qué llevar, cómo pagar y cómo reservar clases de surf, tours y yoga en Puerto Viejo, Costa Rica.",
    },
  },
  "/contact": {
    title: {
      en: "Contact & Book on WhatsApp",
      es: "Contacto y Reservas por WhatsApp",
    },
    description: {
      en: "Book surf lessons and tours in Puerto Viejo, Costa Rica. Message us on WhatsApp with your dates, group size and interests, or send an inquiry.",
      es: "Reserva clases de surf y tours en Puerto Viejo, Costa Rica. Escríbenos por WhatsApp con tus fechas, grupo e intereses, o envía una consulta.",
    },
  },
  "/privacy-policy": {
    title: { en: "Privacy Policy", es: "Política de Privacidad" },
    description: {
      en: "How Zalty Boyz collects, uses and protects personal information from our website, WhatsApp and bookings in Puerto Viejo, Costa Rica.",
      es: "Cómo Zalty Boyz recopila, usa y protege la información personal de nuestro sitio web, WhatsApp y reservas en Puerto Viejo, Costa Rica.",
    },
  },
  "/terms": {
    title: { en: "Terms & Conditions", es: "Términos y Condiciones" },
    description: {
      en: "Booking, payment, cancellation, safety and liability terms for Zalty Boyz surf lessons, tours, massage and yoga in Puerto Viejo, Costa Rica.",
      es: "Términos de reserva, pago, cancelación, seguridad y responsabilidad para clases de surf, tours, masajes y yoga de Zalty Boyz en Puerto Viejo.",
    },
  },
  "/cookie-policy": {
    title: { en: "Cookie Policy", es: "Política de Cookies" },
    description: {
      en: "Which cookies the Zalty Boyz website uses (Google Analytics, only with your consent) and how to change your choice at any time.",
      es: "Qué cookies usa el sitio de Zalty Boyz (Google Analytics, solo con tu consentimiento) y cómo cambiar tu elección en cualquier momento.",
    },
  },
};
