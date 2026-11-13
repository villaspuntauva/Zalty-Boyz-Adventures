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
  // Price/schedule answers repeat figures from src/data/tours.ts,
  // src/data/yoga.ts and the surf-lessons messages — update them together.
  {
    question: {
      en: "How much do surf lessons cost in Puerto Viejo?",
      es: "¿Cuánto cuestan las clases de surf en Puerto Viejo?",
    },
    answer: {
      en: "Group surf lessons are $60 and private 1-on-1 lessons are $70. Both last about 2 hours and include transportation and all surf equipment; group lessons also include a snack. Message us on WhatsApp to confirm rates for your group.",
      es: "Las clases de surf grupales cuestan $60 y las privadas 1 a 1 cuestan $70. Ambas duran unas 2 horas e incluyen transporte y todo el equipo de surf; las grupales también incluyen un snack. Escríbenos por WhatsApp para confirmar tarifas para tu grupo.",
    },
  },
  {
    question: {
      en: "Where do the surf lessons take place?",
      es: "¿Dónde son las clases de surf?",
    },
    answer: {
      en: "We're based in Cocles, just outside Puerto Viejo de Talamanca on Costa Rica's Caribbean coast. We pick you up in our Zalty Tuk Tuk and take you to whichever beach has the best conditions that day — usually Cocles, Punta Uva, or Playa Grande.",
      es: "Estamos en Cocles, a las afueras de Puerto Viejo de Talamanca, en el Caribe de Costa Rica. Te recogemos en nuestro Zalty Tuk Tuk y te llevamos a la playa con las mejores condiciones del día — normalmente Cocles, Punta Uva o Playa Grande.",
    },
  },
  {
    question: {
      en: "What's included in a surf lesson, and how big are the groups?",
      es: "¿Qué incluye una clase de surf y qué tan grandes son los grupos?",
    },
    answer: {
      en: "Every lesson includes a soft-top surfboard, rash guard, reef-safe sunscreen, and transportation. Group lessons have a maximum of 4 students per instructor, and you can request photos or video of your session.",
      es: "Cada clase incluye tabla de surf soft-top, licra, bloqueador solar amigable con los arrecifes y transporte. Las clases grupales tienen un máximo de 4 estudiantes por instructor, y puedes pedir fotos o video de tu sesión.",
    },
  },
  {
    question: {
      en: "What tours do you offer, and how much do they cost?",
      es: "¿Qué tours ofrecen y cuánto cuestan?",
    },
    answer: {
      en: "Our tours include a Cocles River kayak tour (from $50), paddle boarding (from $50), a night wildlife tour with exotic fruit tasting (from $45), a jungle waterfall hike (from $45), and a mini surf trip to Isla Uvita and Cahuita (priced by group). Massages with Julie Hickey start at $85.",
      es: "Nuestros tours incluyen kayak por el río Cocles (desde $50), paddle board (desde $50), un tour nocturno de fauna con degustación de frutas exóticas (desde $45), una caminata a una cascada en la selva (desde $45) y un mini viaje de surf a Isla Uvita y Cahuita (precio según el grupo). Los masajes con Julie Hickey empiezan en $85.",
    },
  },
  {
    question: {
      en: "Do you offer yoga classes?",
      es: "¿Ofrecen clases de yoga?",
    },
    answer: {
      en: "Yes — Julie Hickey teaches weekly yoga at One Love Wellness, at the same spot as Zalty Boyz in Cocles: Vinyasa Hatha Flow on Tuesdays, Breathe With Me Kundalini on Wednesdays, and Vinyasa Flow on Thursdays, all at 9:00 AM. Drop-in classes are $15, private classes are $60, and class packages are available.",
      es: "Sí — Julie Hickey imparte yoga semanal en One Love Wellness, en el mismo lugar que Zalty Boyz en Cocles: Vinyasa Hatha Flow los martes, Breathe With Me Kundalini los miércoles y Vinyasa Flow los jueves, todas a las 9:00 AM. La clase suelta cuesta $15, la privada $60, y hay paquetes de clases disponibles.",
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
      en: "Many of our tours — kayaking, paddle boarding, and beginner surf lessons — are great for families. The night tour & fruit farm and waterfall hike are best for kids comfortable with a bit more walking. Let us know ages and we'll recommend the right mix.",
      es: "Muchos de nuestros tours — kayak, paddle board y clases de surf para principiantes — son ideales para familias. El tour nocturno con finca de frutas y la cascada son mejores para niños cómodos con un poco más de caminata. Cuéntanos las edades y te recomendamos la mejor combinación.",
    },
  },
];
