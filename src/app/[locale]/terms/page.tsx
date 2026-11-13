import type { Metadata } from "next";
import { staticPageMetadata } from "@/lib/metadata";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { LegalDocumentView } from "@/components/LegalDocumentView";
import { termsAndConditions } from "@/data/legal";

type Locale = "en" | "es";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale as "en" | "es", "/terms");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocumentView doc={termsAndConditions} locale={locale as Locale} />;
}
