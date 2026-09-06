import type { Localized } from "./types";

export type Review = {
  author: string;
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: Localized<string>;
};

/**
 * Real guest reviews from the "Zalty Boyz Surf School" Google Business
 * Profile (copied by the client from Google directly, since the review
 * panel actively blocks automated scraping). Last names shortened to an
 * initial, matching common review-display privacy practice. English text
 * is verbatim from Google; Spanish is a natural translation for parity
 * with the rest of the bilingual site, not a literal machine translation.
 *
 * Deliberately not wired into AggregateRating/Review JSON-LD: schema.org
 * review markup needs a stable, verifiable source (e.g. a live Google
 * Places rating feed) to stay accurate over time — a hand-copied snapshot
 * would drift out of date. Revisit if a live ratings API is ever added.
 */
export const reviews: Review[] = [
  {
    author: "Angela D.",
    rating: 5,
    text: {
      en: "Cedric was the perfect instructor for my two friends and I. We are all in our 50's and first-time surfers. After one lesson we are completely hooked!! He shared so much knowledge and adapted to each of us with ease. The entire experience exceeded our expectations and we would highly recommend him to anyone wanting to learn how to surf!",
      es: "Cedric fue el instructor perfecto para mis dos amigas y para mí. Todas estamos en nuestros 50 y surfeábamos por primera vez. ¡Después de una clase quedamos totalmente enganchadas! Compartió muchísimo conocimiento y se adaptó a cada una de nosotras con facilidad. Toda la experiencia superó nuestras expectativas y lo recomendamos totalmente a cualquiera que quiera aprender a surfear.",
    },
  },
  {
    author: "Pernille A.",
    rating: 5,
    text: {
      en: "Had an awesome time surfing with Cedric in Puerto Viejo. My 9-year-old daughter and I took lessons with him for a couple of days, and he was super patient, supportive, and just great to be around. He made us feel safe in the water and kept things fun the whole time. Can't recommend Cedric enough — such a great surf instructor.",
      es: "Pasamos un tiempo increíble surfeando con Cedric en Puerto Viejo. Mi hija de 9 años y yo tomamos clases con él por un par de días, y fue súper paciente, comprensivo y una gran compañía. Nos hizo sentir seguras en el agua y mantuvo todo divertido en todo momento. No puedo recomendar a Cedric lo suficiente — un excelente instructor de surf.",
    },
  },
  {
    author: "Anne R.",
    rating: 5,
    text: {
      en: "Cedric is super friendly, social and helpful. He's a positive encouragement during lessons, which is very motivating to learn. He's a passionate surf instructor. Reliable (also when making appointments). He gives personalized attention. And I felt very safe with him in the ocean. 1000% one of the best surf teachers ever!",
      es: "Cedric es súper amigable, sociable y servicial. Es un apoyo muy positivo durante las clases, lo cual motiva mucho a aprender. Es un instructor de surf apasionado. Confiable (también al coordinar citas). Da atención personalizada. Y me sentí muy segura con él en el mar. ¡1000% uno de los mejores instructores de surf que existen!",
    },
  },
  {
    author: "Christina L.",
    rating: 5,
    text: {
      en: "We had a large group of 8 for our lesson with Cedric and Simon. Five adults and 3 ten year old girls. Cedric was very responsive with scheduling, very helpful with transportation ideas since we didn't have a car, and just great with our whole group. We had good instruction on land to practice before we got to the water. His easy 3 steps got us all surfing pretty quickly! The girls shared that this was the highlight of their trip and we're so happy we booked with Zalty Boyz!",
      es: "Fuimos un grupo grande de 8 personas para nuestra clase con Cedric y Simon. Cinco adultos y 3 niñas de diez años. Cedric respondió muy rápido para coordinar horarios, nos ayudó mucho con ideas de transporte ya que no teníamos carro, y fue excelente con todo el grupo. Practicamos bien en tierra antes de entrar al agua. ¡Sus 3 pasos sencillos nos tuvieron surfeando rápidamente! Las niñas contaron que esto fue lo mejor de su viaje y estamos felices de haber reservado con Zalty Boyz.",
    },
  },
  {
    author: "F.",
    rating: 5,
    text: {
      en: "Cedric is a really great teacher! Lots of fun, knowledgeable, patient and encouraging. He helped me get a ton of waves, but also showed me how to time them and take them on my own without needing a push. I always felt safe and comfortable. Such a great time!",
      es: "¡Cedric es un excelente maestro! Muy divertido, con mucho conocimiento, paciente y alentador. Me ayudó a agarrar muchísimas olas, y también me enseñó a calcular el momento para tomarlas por mi cuenta sin necesitar un empujón. Siempre me sentí segura y cómoda. ¡Lo pasé increíble!",
    },
  },
  {
    author: "Joleen O.",
    rating: 5,
    text: {
      en: "Wonderful experience! My husband and I took 3 surfing lessons from Cedric after I had a great experience surfing with him in 2022. We had a blast! He helped transport us around in his tuk tuk and brought us to a lot of different surf spots along the coast. Cedric grew up in Puerto Viejo and knows so much about the Caribbean Ocean — its waves, beaches, tides... everything! He let us know the day before where we'd surf after checking the local surf report, and found the best spots for beginners that weren't too crowded. He even took us out past the whitewater to catch some green waves. We can't thank him enough for such a great experience — it inspired me to surf at home in Oregon. Highly recommend!",
      es: "¡Experiencia maravillosa! Mi esposo y yo tomamos 3 clases de surf con Cedric después de haber tenido una gran experiencia surfeando con él en 2022. ¡La pasamos increíble! Nos ayudó a movernos en su tuk tuk y nos llevó a varios spots de surf a lo largo de la costa. Cedric creció en Puerto Viejo y sabe muchísimo sobre el Caribe — sus olas, playas, mareas... ¡todo! Nos avisaba un día antes dónde surfearíamos después de revisar el reporte de oleaje local, y encontraba los mejores spots para principiantes que no estuvieran muy llenos. Incluso nos llevó más allá de la espuma para agarrar olas verdes. No podemos agradecerle lo suficiente por una experiencia tan increíble — me inspiró a surfear en casa en Oregon. ¡Totalmente recomendado!",
    },
  },
];
