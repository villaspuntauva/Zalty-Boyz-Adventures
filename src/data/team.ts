import type { Localized } from "./types";

export type TeamMember = {
  slug: string;
  name: string;
  role: Localized<string>;
  bio: Localized<string[]>;
  photoAlt: Localized<string>;
};

export const team: TeamMember[] = [
  {
    slug: "cedric",
    name: "Cedric McCrackin",
    role: {
      en: "Founder & Head Surf Instructor",
      es: "Fundador e Instructor Principal de Surf",
    },
    bio: {
      en: [
        "Cedric started surfing at age 5, and has been giving surf lessons since he was 14. He loves the sport — in 2019, at 18 years old, he completed the ISA Level 1 Surfing Coach course, becoming a certified ISA International Surf Instructor.",
        "His drive for competing is unmatched. After entering his first competition at 12 years old, Cedric discovered he was pretty darn good — over the years he's won several events on Costa Rica's national circuit, finishing as high as 4th and 5th in the rankings of all surfers across the entire country.",
        "In 2019, he was chosen to represent his homeland, Costa Rica, on the national team at the ISA World Surfing Games in Huntington Beach, California.",
      ],
      es: [
        "Cedric empezó a surfear a los 5 años y ha estado dando clases de surf desde los 14. Le encanta el deporte — en 2019, a los 18 años, completó el curso ISA Nivel 1 de entrenador de surf, convirtiéndose en instructor de surf certificado por la ISA (International Surfing Association).",
        "Su espíritu competitivo es incomparable. Después de entrar a su primera competencia a los 12 años, Cedric descubrió que era realmente bueno — a lo largo de los años ha ganado varios eventos del circuito nacional de Costa Rica, llegando a ubicarse en 4to y 5to lugar en el ranking de todos los surfistas del país.",
        "En 2019 fue elegido para representar a su país, Costa Rica, en la selección nacional de los ISA World Surfing Games realizados en Huntington Beach, California.",
      ],
    },
    photoAlt: {
      en: "Cedric McCrackin, founder and head surf instructor of Zalty Boyz",
      es: "Cedric McCrackin, fundador e instructor principal de surf de Zalty Boyz",
    },
  },
  {
    slug: "solomon",
    name: "Solomon McCrackin",
    role: {
      en: "Surf Instructor & Videographer",
      es: "Instructor de Surf y Videógrafo",
    },
    bio: {
      en: [
        "Cedric's brother, Solomon has also been surfing and teaching lessons since he was very young, alongside a lifelong passion for photography. Since childhood, he had a natural talent for capturing moments through the camera, and today he uses that gift to edit every Zalty Boyz YouTube video.",
        "He improves with every video he makes, and his eye behind the camera makes him the perfect person to capture the experience for our surf clients.",
      ],
      es: [
        "Hermano de Cedric, Solomon también ha estado surfeando y dando clases desde muy joven, junto con una pasión de toda la vida por la fotografía. Desde niño tuvo un talento natural para capturar momentos con la cámara, y hoy usa ese don para editar cada video de YouTube de Zalty Boyz.",
        "Mejora con cada video que hace, y su ojo detrás de la cámara lo convierte en la persona perfecta para capturar la experiencia de nuestros clientes de surf.",
      ],
    },
    photoAlt: {
      en: "Solomon McCrackin, surf instructor and videographer at Zalty Boyz",
      es: "Solomon McCrackin, instructor de surf y videógrafo de Zalty Boyz",
    },
  },
  {
    slug: "julie",
    name: "Julie Hickey",
    role: {
      en: "Zalty Mama · Massage Therapist, Yoga & Reiki",
      es: "Zalty Mama · Masajista, Yoga y Reiki",
    },
    bio: {
      en: [
        "Julie is the beautiful mother of both Cedric and Solomon, and taught both boys to surf as soon as they were old enough to walk. She passed on her knowledge of surf basics and etiquette to her sons, so they could go on to share that same knowledge and talent with others.",
        "Julie isn't just gifted on a surfboard — she's also a well-known, expert masseuse, yoga instructor, Reiki master, and Watsu practitioner, and she still rips on the waves herself.",
      ],
      es: [
        "Julie es la hermosa madre de Cedric y Solomon, y les enseñó a surfear a ambos desde que tenían edad para caminar. Les transmitió a sus hijos su conocimiento de las bases del surf y la etiqueta en el agua, para que ellos pudieran compartir ese mismo conocimiento y talento con otras personas.",
        "Julie no solo tiene talento sobre una tabla de surf — también es una masajista experta y reconocida, instructora de yoga, maestra de Reiki y practicante de Watsu, y todavía sabe romperla en las olas.",
      ],
    },
    photoAlt: {
      en: "Julie Hickey, \"Zalty Mama\" — massage therapist and yoga instructor",
      es: "Julie Hickey, \"Zalty Mama\" — masajista e instructora de yoga",
    },
  },
];
