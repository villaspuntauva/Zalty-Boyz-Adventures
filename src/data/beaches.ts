import type { Localized } from "./types";

export type Beach = {
  slug: string;
  name: Localized<string>;
  blurb: Localized<string>;
  imageAlt: Localized<string>;
};

export const beaches: Beach[] = [
  {
    slug: "cocles",
    name: { en: "Cocles Beach", es: "Playa Cocles" },
    blurb: {
      en: "Our home beach — a consistent, beginner-friendly beach break just outside Puerto Viejo.",
      es: "Nuestra playa principal — una ola constante e ideal para principiantes, justo a las afueras de Puerto Viejo.",
    },
    imageAlt: {
      en: "Cocles Beach in Puerto Viejo, Costa Rica",
      es: "Playa Cocles en Puerto Viejo, Costa Rica",
    },
  },
  {
    slug: "punta-uva",
    name: { en: "Punta Uva", es: "Punta Uva" },
    blurb: {
      en: "A calmer, jungle-backed beach a short ride down the coast — great for relaxed lessons and flat-water paddling.",
      es: "Una playa más tranquila, rodeada de selva, a poca distancia por la costa — ideal para clases relajadas y remar en aguas planas.",
    },
    imageAlt: {
      en: "Punta Uva beach near Puerto Viejo, Costa Rica",
      es: "Playa Punta Uva cerca de Puerto Viejo, Costa Rica",
    },
  },
  {
    slug: "playa-grande",
    name: { en: "Playa Grande", es: "Playa Grande" },
    blurb: {
      en: "A quieter stretch of coast we use when conditions call for it — fewer crowds, more room to learn.",
      es: "Un tramo de costa más tranquilo que usamos cuando las condiciones lo piden — menos gente, más espacio para aprender.",
    },
    imageAlt: {
      en: "Playa Grande near Puerto Viejo, Costa Rica",
      es: "Playa Grande cerca de Puerto Viejo, Costa Rica",
    },
  },
  {
    slug: "playa-negra",
    name: { en: "Playa Negra", es: "Playa Negra" },
    blurb: {
      en: "A striking black-sand beach near Cahuita — a fun change of scenery for more experienced surfers.",
      es: "Una llamativa playa de arena negra cerca de Cahuita — un cambio divertido de escenario para surfistas con más experiencia.",
    },
    imageAlt: {
      en: "Playa Negra, a black sand beach near Cahuita, Costa Rica",
      es: "Playa Negra, una playa de arena negra cerca de Cahuita, Costa Rica",
    },
  },
];
