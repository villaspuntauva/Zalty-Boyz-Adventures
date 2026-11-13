import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/surf-lessons": {
      en: "/surf-lessons",
      es: "/lecciones-de-surf",
    },
    "/tours": {
      en: "/tours",
      es: "/tours",
    },
    "/tours/[slug]": {
      en: "/tours/[slug]",
      es: "/tours/[slug]",
    },
    "/yoga": {
      en: "/yoga",
      es: "/yoga",
    },
    "/packages": {
      en: "/packages",
      es: "/paquetes",
    },
    "/about": {
      en: "/about",
      es: "/sobre-nosotros",
    },
    "/location": {
      en: "/location",
      es: "/ubicacion",
    },
    "/faq": {
      en: "/faq",
      es: "/preguntas-frecuentes",
    },
    "/privacy-policy": {
      en: "/privacy-policy",
      es: "/politica-de-privacidad",
    },
    "/terms": {
      en: "/terms",
      es: "/terminos-y-condiciones",
    },
    "/cookie-policy": {
      en: "/cookie-policy",
      es: "/politica-de-cookies",
    },
    "/contact": {
      en: "/contact",
      es: "/contacto",
    },
  },
});

export type AppPathnames = keyof typeof routing.pathnames;

/**
 * Static (non-dynamic) pathnames only — i.e. every route except
 * "/tours/[slug]", which requires the `{ pathname, params }` link form
 * rather than a bare string. Use this for nav arrays and components that
 * only ever link to static pages.
 */
export type StaticPathnames = Exclude<AppPathnames, "/tours/[slug]">;
