import type { Localized } from "./types";

export type YogaClass = {
  day: Localized<string>;
  time: string;
  name: Localized<string>;
};

/** Weekly yoga schedule at One Love Wellness, taught by Julie Hickey. */
export const yogaClasses: YogaClass[] = [
  {
    day: { en: "Tuesday", es: "Martes" },
    time: "9:00 AM",
    name: { en: "Vinyasa Hatha Flow", es: "Vinyasa Hatha Flow" },
  },
  {
    day: { en: "Wednesday", es: "Miércoles" },
    time: "9:00 AM",
    name: { en: "Breathe With Me Kundalini", es: "Breathe With Me Kundalini" },
  },
  {
    day: { en: "Thursday", es: "Jueves" },
    time: "9:00 AM",
    name: { en: "Vinyasa Flow", es: "Vinyasa Flow" },
  },
];

/**
 * Prices in USD. Set either to undefined to hide it — with no drop-in price
 * the section shows "pricing coming soon" instead.
 */
export const yogaDropInPrice: number | undefined = 15;
export const yogaPrivatePrice: number | undefined = 60;

/** Slug of the team member (src/data/team.ts) who teaches the classes. */
export const yogaInstructorSlug = "julie";

/** Photos in public/images/yoga/ (`.jpg` is added by YogaSection). */
export const yogaPhotos = [
  "yoga-class-puerto-viejo-1",
  "yoga-class-puerto-viejo-2",
  "yoga-class-puerto-viejo-3",
];
