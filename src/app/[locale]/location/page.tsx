import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ScrollCarousel } from "@/components/ui/ScrollCarousel";
import { HeroMedia } from "@/components/HeroMedia";
import { SurfForecastWidget } from "@/components/SurfForecastWidget";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteUrl, business } from "@/lib/business";
import { beaches } from "@/data/beaches";

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
  const t = await getTranslations({ locale, namespace: "location" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
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
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: t("hero.title"), url: `${siteUrl}/${locale}/location` },
        ])}
      />

      <section className="relative isolate overflow-hidden py-16 text-white sm:py-20">
        <HeroMedia
          imageSrc="/images/location/hero.jpg"
          imageAlt={
            l === "es"
              ? "Ola rompiendo junto a un acantilado cubierto de selva en Puerto Viejo"
              : "A wave breaking beside a jungle-covered point in Puerto Viejo"
          }
        />
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-100">
            {t("hero.eyebrow")}
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-50/90">
            {t("hero.subtitle")}
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-2xl font-bold text-ink-900 sm:text-3xl">
            {t("map.title")}
          </h2>
          <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-brand-100">
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

      <section className="bg-brand-50 py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-2xl font-bold text-ink-900 sm:text-3xl">
            {t("beaches.title")}
          </h2>
          <p className="mt-2 max-w-2xl text-ink-700">{t("beaches.subtitle")}</p>

          <div className="mt-8">
            <ScrollCarousel
              prevLabel={l === "es" ? "Playa anterior" : "Previous beach"}
              nextLabel={l === "es" ? "Siguiente playa" : "Next beach"}
              regionLabel={
                l === "es"
                  ? "Playas, desliza para ver más"
                  : "Beaches, scroll to see more"
              }
            >
              {beaches.map((beach) => (
                <figure
                  key={beach.slug}
                  data-carousel-card
                  className="w-[85%] flex-none snap-start overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm sm:w-[340px]"
                >
                  <PlaceholderImage
                    src={`/images/location/${beach.slug}.jpg`}
                    alt={beach.imageAlt[l]}
                    aspect="aspect-[4/3]"
                    className="rounded-none"
                  />
                  <figcaption className="p-5">
                    <p className="font-heading text-lg font-bold text-ink-900">
                      {beach.name[l]}
                    </p>
                    <p className="mt-1 text-sm text-ink-700">{beach.blurb[l]}</p>
                  </figcaption>
                </figure>
              ))}
            </ScrollCarousel>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="font-heading text-2xl font-bold text-ink-900 sm:text-3xl">
            {t("forecast.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-700">
            {t("forecast.subtitle")}
          </p>

          <div className="mt-8 flex justify-center">
            <SurfForecastWidget title={t("forecast.title")} />
          </div>

          <div className="mt-6 flex justify-center">
            <CTAButton href={forecastUrl} external variant="secondary">
              {t("forecast.cta")}
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}
