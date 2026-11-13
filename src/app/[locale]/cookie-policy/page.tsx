import type { Metadata } from "next";
import { staticPageMetadata } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { whatsappLink } from "@/lib/business";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale as "en" | "es", "/cookie-policy");
}

type CookieRow = { name: string; purpose: string; duration: string };

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cookies.policy");
  const rows = t.raw("table.rows") as CookieRow[];

  return (
    <section className="bg-[#eef9ef] py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-heading text-4xl font-extrabold text-ink-900">{t("title")}</h1>
        <p className="mt-2 text-sm text-ink-700/85">{t("updated")}</p>
        <p className="mt-6 text-ink-700">{t("intro")}</p>

        <h2 className="mt-10 font-heading text-xl font-bold text-ink-900">{t("whatTitle")}</h2>
        <p className="mt-3 text-ink-700">{t("whatBody")}</p>

        <h2 className="mt-10 font-heading text-xl font-bold text-ink-900">{t("useTitle")}</h2>
        <p className="mt-3 text-ink-700">{t("useBody")}</p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-brand-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-brand-700">
              <tr>
                <th className="p-3 font-semibold">{t("table.name")}</th>
                <th className="p-3 font-semibold">{t("table.purpose")}</th>
                <th className="p-3 font-semibold">{t("table.duration")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100 text-ink-700">
              {rows.map((row) => (
                <tr key={row.name}>
                  <td className="p-3 font-mono text-xs text-ink-900">{row.name}</td>
                  <td className="p-3">{row.purpose}</td>
                  <td className="p-3 whitespace-nowrap">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 font-heading text-xl font-bold text-ink-900">{t("notTitle")}</h2>
        <p className="mt-3 text-ink-700">{t("notBody")}</p>

        <h2 className="mt-10 font-heading text-xl font-bold text-ink-900">{t("choiceTitle")}</h2>
        <p className="mt-3 text-ink-700">{t("choiceBody")}</p>
        <p className="mt-4 text-sm font-semibold text-brand-700 underline underline-offset-2">
          <CookieSettingsButton label={t("choiceButton")} />
        </p>

        <h2 className="mt-10 font-heading text-xl font-bold text-ink-900">{t("thirdTitle")}</h2>
        <p className="mt-3 text-ink-700">
          {t("thirdBody")}{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-700 underline underline-offset-2"
          >
            {t("thirdLink")}
          </a>
        </p>

        <h2 className="mt-10 font-heading text-xl font-bold text-ink-900">{t("contactTitle")}</h2>
        <p className="mt-3 text-ink-700">
          {t("contactBody")}{" "}
          <a
            href={whatsappLink(t("contactMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-700 underline underline-offset-2"
          >
            WhatsApp
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
