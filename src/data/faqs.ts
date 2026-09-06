import type { Localized } from "./types";

export type Faq = {
  question: Localized<string>;
  answer: Localized<string>;
};

export const faqs: Faq[] = [
  {
    question: {
      en: "Do I need surf experience to book a lesson?",
      es: "¿Necesito experiencia en surf para reservar una clase?",
    },
    answer: {
      en: "No — most of our surf students are complete beginners. We tailor every lesson to your level, from your first time standing on a board to more advanced coaching.",
      es: "No — la mayoría de nuestros estudiantes son principiantes totales. Adaptamos cada clase a tu nivel, desde tu primera vez parándote en una tabla hasta coaching más avanzado.",
    },
  },
  {
    question: {
      en: "What should I bring to a surf lesson or tour?",
      es: "¿Qué debo llevar a una clase de surf o tour?",
    },
    answer: {
      en: "Swimwear, reef-safe sunscreen, a hat, and water are a good start. Each tour page lists specific recommendations, and we'll always confirm details by WhatsApp before your session.",
      es: "Traje de baño, protector solar biodegradable, gorra y agua son un buen inicio. Cada página de tour incluye recomendaciones específicas, y siempre confirmamos los detalles por WhatsApp antes de tu sesión.",
    },
  },
  {
    question: {
      en: "How far in advance should I book?",
      es: "¿Con cuánta anticipación debo reservar?",
    },
    answer: {
      en: "For multi-day packages, we recommend booking a few weeks ahead, especially in high season (December–April, July–August). Single lessons and tours can often be arranged with just a day or two of notice.",
      es: "Para paquetes de varios días, recomendamos reservar con algunas semanas de anticipación, especialmente en temporada alta (diciembre–abril, julio–agosto). Clases y tours individuales suelen poder organizarse con solo uno o dos días de aviso.",
    },
  },
  {
    question: {
      en: "How do I pay?",
      es: "¿Cómo puedo pagar?",
    },
    answer: {
      en: "We prefer cash, but we also accept SINPE Móvil, Zelle, PayPal, and bank transfers. We'll confirm the easiest option for you when you message us to book.",
      es: "Preferimos efectivo, pero también aceptamos SINPE Móvil, Zelle, PayPal y transferencias bancarias. Te confirmamos la opción más fácil para ti cuando nos escribas para reservar.",
    },
  },
  {
    question: {
      en: "Can you combine tours, surf lessons, and a massage into one booking?",
      es: "¿Pueden combinar tours, clases de surf y un masaje en una sola reserva?",
    },
    answer: {
      en: "Yes — that's exactly what our packages are for. Check out our multi-day packages, or message us your travel dates and interests and we'll build a custom combination.",
      es: "Sí — para eso son exactamente nuestros paquetes. Revisa nuestros paquetes de varios días, o escríbenos tus fechas de viaje e intereses y armamos una combinación a tu medida.",
    },
  },
  {
    question: {
      en: "Is Puerto Viejo family-friendly for these activities?",
      es: "¿Puerto Viejo es apto para familias para estas actividades?",
    },
    answer: {
      en: "Many of our tours — kayaking, paddle boarding, the fruit farm, and beginner surf lessons — are great for families. The night wildlife walk and waterfall hike are best for kids comfortable with a bit more walking. Let us know ages and we'll recommend the right mix.",
      es: "Muchos de nuestros tours — kayak, paddle board, la finca de frutas y clases de surf para principiantes — son ideales para familias. La caminata nocturna y la cascada son mejores para niños cómodos con un poco más de caminata. Cuéntanos las edades y te recomendamos la mejor combinación.",
    },
  },
];
