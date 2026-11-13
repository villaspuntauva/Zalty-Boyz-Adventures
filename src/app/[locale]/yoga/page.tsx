import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { staticPageMetadata } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { HeroMedia } from "@/components/HeroMedia";
import { YogaSection } from "@/components/YogaSection";
import { MassageSection } from "@/components/MassageSection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, tourServiceSchema } from "@/lib/schema";
import { yogaDropInPrice } from "@/data/yoga";
import { siteUrl } from "@/lib/business";

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
  return staticPageMetadata(locale as "en" | "es", "/yoga");
}

export default async function YogaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations("yoga");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: locale === "es" ? "Inicio" : "Home", url: `${siteUrl}/${locale}` },
          { name: t("title"), url: `${siteUrl}${getPathname({ locale: locale as "en" | "es", href: "/yoga" })}` },
        ])}
      />
      <JsonLd
        data={tourServiceSchema({
          locale: l,
          name: t("title"),
          description: t("hero.subtitle"),
          slug: "yoga",
          type: "Service",
          url: `${siteUrl}/${locale}/yoga`,
          priceFrom: yogaDropInPrice,
        })}
      />

      <section className="relative isolate overflow-hidden py-24 text-white [text-shadow:0_2px_4px_rgb(0_0_0/0.6),0_4px_24px_rgb(0_0_0/0.5)] sm:py-36">
        {/* No photo yet — HeroMedia shows its brand gradient. Pass imageSrc
            once a yoga photo is in public/images/yoga/. */}
        <HeroMedia waveClassName="text-[#eef9ef]" />
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-white">
            {t("hero.eyebrow")}
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-medium text-white">
            {t("hero.subtitle")}
          </p>
        </Container>
      </section>

      <div className="bg-[#eef9ef] pb-16 sm:pb-20">
        <YogaSection locale={l} />
        <MassageSection locale={l} />
      </div>
    </>
  );
}
