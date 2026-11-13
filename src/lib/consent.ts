/**
 * Cookie-consent state, kept in the visitor's own browser (localStorage).
 * Google Analytics only loads once this is "granted" — see CookieConsent.
 */
export type ConsentChoice = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "zb-cookie-consent";
/** Window event the footer's "Cookie settings" button fires to reopen the banner. */
export const OPEN_CONSENT_EVENT = "zb:open-cookie-settings";

/** GA4 measurement ID (G-XXXXXXX), set in the hosting env / .env.local. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Private mode / blocked storage: the choice just won't persist.
  }
}
