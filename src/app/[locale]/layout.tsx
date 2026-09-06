import type { Metadata } from "next";
import { Anton, Inter, UnifrakturCook } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, localBusinessSchema } from "@/lib/schema";
import { siteUrl, business } from "@/lib/business";
import "../globals.css";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Bold, condensed poster/impact face matching the "ZALTY BOYZ SURF SCHOOL"
// promo graphic — used for every content heading (h1/h2/h3) site-wide.
// Body copy stays in Inter so paragraph text stays easy to read.
const headingFont = Anton({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Blackletter/graffiti brand wordmark, matching the hand-painted "Zalty
// Boyz" lettering on the team's own surfboards — reserved for the site's
// own name (header nav + footer), not general headings.
const brandFont = UnifrakturCook({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${siteUrl}/${l}`]),
  );

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${t("siteName")} | Puerto Viejo, Costa Rica`,
      template: `%s | ${t("siteName")}`,
    },
    description: business.description[locale as "en" | "es"],
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: { ...languages, "x-default": `${siteUrl}/en` },
    },
    openGraph: {
      siteName: t("siteName"),
      type: "website",
      locale: locale === "es" ? "es_CR" : "en_US",
      url: `${siteUrl}/${locale}`,
      // Image comes from the opengraph-image.tsx file convention below.
    },
    twitter: {
      card: "summary_large_image",
    },
    // Favicon comes from the icon.png file convention (src/app/icon.png —
    // the client's actual logo mark) — no manual icons override needed.
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html
      lang={locale}
      className={`${bodyFont.variable} ${headingFont.variable} ${brandFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-sand-50 font-sans text-ink-900">
        <a href="#main-content" className="skip-link">
          {t("skipToContent")}
        </a>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema(locale as "en" | "es")} />
        <NextIntlClientProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloatingButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
