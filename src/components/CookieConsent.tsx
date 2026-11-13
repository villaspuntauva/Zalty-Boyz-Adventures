"use client";

import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  GA_MEASUREMENT_ID,
  OPEN_CONSENT_EVENT,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Cookie banner + consent-gated Google Analytics 4.
 *
 * GA's script is only added to the page after the visitor clicks Accept, so
 * nothing is sent to Google and no analytics cookies are set before that.
 * Declining (or later withdrawing via "Cookie settings" in the footer)
 * deletes the _ga cookies and tells gtag consent is denied.
 *
 * GA4's enhanced measurement tracks client-side route changes (browser
 * history events) on its own, so no manual page_view calls are needed.
 */
export function CookieConsent() {
  const t = useTranslations("cookies.banner");
  // "unknown" during server render / hydration, so the banner never flashes
  // for visitors who already chose.
  const choice = useSyncExternalStore(
    subscribeConsent,
    readConsent,
    () => "unknown" as const,
  );
  const [reopened, setReopened] = useState(false);
  const open = choice === null || reopened;

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  function decide(next: ConsentChoice) {
    writeConsent(next);
    setReopened(false);
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
    if (next === "denied") {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies();
    } else {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    }
  }

  return (
    <>
      {choice === "granted" && GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {open && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={t("title")}
          className="fixed inset-x-0 bottom-0 z-50 p-4 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md"
        >
          <div className="rounded-2xl border border-brand-100 bg-white p-5 text-ink-900 shadow-xl">
            <p className="font-heading text-base font-bold">{t("title")}</p>
            <p className="mt-2 text-sm text-ink-700">
              {t("body")}{" "}
              <Link
                href="/cookie-policy"
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                {t("policyLink")}
              </Link>
            </p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => decide("granted")}
                className="flex-1 rounded-full bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
              >
                {t("accept")}
              </button>
              <button
                type="button"
                onClick={() => decide("denied")}
                className="flex-1 rounded-full border border-brand-200 px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              >
                {t("decline")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const CONSENT_CHANGED_EVENT = "zb:consent-changed";

function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Remove GA's first-party cookies (_ga, _ga_<id>) on this domain. */
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !name.startsWith("_ga")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

/** Footer button that reopens the banner so visitors can change their choice. */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="hover:text-white"
    >
      {label}
    </button>
  );
}
