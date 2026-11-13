import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { staticPageMetadata } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/Button";
import { HeroMedia } from "@/components/HeroMedia";
import { SurfForecastWidget } from "@/components/SurfForecastWidget";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteUrl, business } from "@/lib/business";

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
  return staticPageMetadata(locale as "en" | "es", "/location");
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations("location");

  const mapQuery = encodeURIComponent(business.mapQuery);
  const forecastUrl =
    "https://www.surf-forecast.com/breaks/Cocles/forecasts/latest/six_day";

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: locale === "es" ? "Inicio" : "Home", url: `${siteUrl}/${locale}` },
          { name: t("hero.title"), url: `${siteUrl}${getPathname({ locale: locale as "en" | "es", href: "/location" })}` },
        ])}
      />

      <section className="relative isolate overflow-hidden py-24 text-white [text-shadow:0_2px_4px_rgb(0_0_0/0.6),0_4px_24px_rgb(0_0_0/0.5)] sm:py-36">
        <HeroMedia
          imageSrc="/images/location/hero.jpg"
          imageAlt={
            l === "es"
              ? "Ola rompiendo junto a un acantilado cubierto de selva en Puerto Viejo"
              : "A wave breaking beside a jungle-covered point in Puerto Viejo"
          }
        />
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-white">
            {t("hero.eyebrow")}
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-medium text-white">
            {t("hero.subtitle")}
          </p>
        </Container>
      </section>

      <section className="bg-brand-50 py-10 sm:py-12">
        <Container>
          <h2 className="font-heading text-2xl font-bold text-ink-900 sm:text-3xl">
            {t("map.title")}
          </h2>
          <div className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-brand-100">
            <iframe
              title={t("map.title")}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12">
        <Container className="text-center">
          <h2 className="font-heading text-2xl font-bold text-ink-900 sm:text-3xl">
            {t("forecast.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-700">
            {t("forecast.subtitle")}
          </p>

          <div className="mt-5 flex justify-center">
            <SurfForecastWidget title={t("forecast.title")} />
          </div>

          <div className="mt-4 flex justify-center">
            <CTAButton href={forecastUrl} external variant="secondary">
              {t("forecast.cta")}
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}
