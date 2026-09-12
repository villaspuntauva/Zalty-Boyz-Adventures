import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { HeroMedia } from "@/components/HeroMedia";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteUrl } from "@/lib/business";
import { tours } from "@/data/tours";

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
  const t = await getTranslations({ locale, namespace: "tours" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default async function ToursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations("tours");
  const tCommon = await getTranslations("common");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: t("hero.title"), url: `${siteUrl}/${locale}/tours` },
        ])}
      />

      <section className="relative isolate overflow-hidden py-16 text-white sm:py-20">
        <HeroMedia videoSrc="/images/tours/hero.mp4" />
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <div
                key={tour.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm"
              >
                <PlaceholderImage
                  src={`/images/tours/${tour.slug}.jpg`}
                  alt={tour.heroImageAlt[l]}
                  aspect="aspect-[16/10]"
                  className="rounded-none"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-heading text-xl font-bold text-ink-900">
                    {tour.name[l]}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-ink-700">
                    {tour.shortDescription[l]}
                  </p>
                  <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-700">
                    <div>
                      <dt className="inline font-semibold">{tCommon("duration")}: </dt>
                      <dd className="inline">{tour.durationLabel[l]}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold">{tCommon("difficulty")}: </dt>
                      <dd className="inline">{tour.difficulty[l]}</dd>
                    </div>
                  </dl>
                  <Link
                    href={{ pathname: "/tours/[slug]", params: { slug: tour.slug } }}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    {tCommon("learnMore")}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-50 py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
            {t("packagesNote.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-700">
            {t("packagesNote.body")}
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton href="/packages" variant="primary">
              {t("packagesNote.cta")}
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}
