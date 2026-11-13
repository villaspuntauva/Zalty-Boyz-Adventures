import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { JsonLd } from "@/components/JsonLd";
import { CookieConsent } from "@/components/CookieConsent";
import { organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";
import { siteUrl, business } from "@/lib/business";
import "../globals.css";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const headingFont = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
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

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${t("siteName")} | Puerto Viejo, Costa Rica`,
      template: `%s | ${t("siteName")}`,
    },
    description: business.description[locale as "en" | "es"],
    // Canonical + hreflang are set per page (src/lib/metadata.ts) — setting
    // them here would make every page inherit the home page's URL.
    openGraph: {
      siteName: t("siteName"),
      type: "website",
      locale: locale === "es" ? "es_CR" : "en_US",
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
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-sand-50 font-sans text-ink-900">
        <a href="#main-content" className="skip-link">
          {t("skipToContent")}
        </a>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema(locale as "en" | "es")} />
        <JsonLd data={localBusinessSchema(locale as "en" | "es")} />
        <NextIntlClientProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloatingButton />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
