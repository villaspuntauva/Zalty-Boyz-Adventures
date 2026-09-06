import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { QuickBookWidget } from "@/components/QuickBookWidget";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, tourServiceSchema } from "@/lib/schema";
import { siteUrl } from "@/lib/business";
import { getTourBySlug, tours } from "@/data/tours";

type Locale = "en" | "es";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    tours.map((tour) => ({ locale, slug: tour.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return {};
  const l = locale as Locale;
  return {
    title: tour.name[l],
    description: tour.shortDescription[l],
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const t = await getTranslations("common");
  const tTours = await getTranslations("tours");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: tTours("hero.title"), url: `${siteUrl}/${locale}/tours` },
          { name: tour.name[l], url: `${siteUrl}/${locale}/tours/${tour.slug}` },
        ])}
      />
      <JsonLd
        data={tourServiceSchema({
          locale: l,
          name: tour.name[l],
          description: tour.description[l],
          slug: tour.slug,
          durationIso: tour.durationIso,
          priceFrom: tour.pricing?.priceFromNumber,
        })}
      />

      <section className="bg-brand-800 py-16 text-white sm:py-20">
        <Container>
          <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
            {tour.name[l]}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-50/90">
            {tour.shortDescription[l]}
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <PlaceholderImage
              src={`/images/tours/${tour.slug}.jpg`}
              alt={tour.heroImageAlt[l]}
              aspect="aspect-[16/9]"
            />
            <p className="mt-8 text-ink-700">{tour.description[l]}</p>

            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-brand-50 p-4">
                <dt className="text-xs font-semibold uppercase text-brand-600">
                  {t("duration")}
                </dt>
                <dd className="mt-1 font-medium text-ink-900">
                  {tour.durationLabel[l]}
                </dd>
              </div>
              <div className="rounded-xl bg-brand-50 p-4">
                <dt className="text-xs font-semibold uppercase text-brand-600">
                  {t("groupSize")}
                </dt>
                <dd className="mt-1 font-medium text-ink-900">
                  {tour.groupSize[l]}
                </dd>
              </div>
              <div className="rounded-xl bg-brand-50 p-4">
                <dt className="text-xs font-semibold uppercase text-brand-600">
                  {t("difficulty")}
                </dt>
                <dd className="mt-1 font-medium text-ink-900">
                  {tour.difficulty[l]}
                </dd>
              </div>
            </dl>

            {tour.pricing && (
              <>
                <h2 className="mt-10 font-heading text-xl font-bold text-ink-900">
                  {t("pricing")}
                </h2>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {tour.pricing.plans.map((plan) => (
                    <div
                      key={plan.label[l]}
                      className="rounded-xl border border-brand-100 bg-white p-4"
                    >
                      <p className="text-sm font-semibold text-brand-600">
                        {plan.label[l]}
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-ink-900">
                        {plan.price[l]}
                      </p>
                    </div>
                  ))}
                </div>
                {tour.pricing.note && (
                  <p className="mt-3 text-sm text-ink-700/70">
                    {tour.pricing.note[l]}
                  </p>
                )}
              </>
            )}

            <h2 className="mt-10 font-heading text-xl font-bold text-ink-900">
              {t("included")}
            </h2>
            <ul className="mt-3 space-y-2">
              {tour.included[l].map((item) => (
                <li key={item} className="flex gap-3 text-ink-700">
                  <span aria-hidden="true" className="mt-1 text-brand-600">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-heading text-xl font-bold text-ink-900">
              {t("goodToKnow")}
            </h2>
            <ul className="mt-3 space-y-2">
              {tour.goodToKnow[l].map((item) => (
                <li key={item} className="flex gap-3 text-ink-700">
                  <span aria-hidden="true" className="mt-1 text-accent-500">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:sticky lg:top-24">
            <QuickBookWidget />
          </div>
        </Container>
      </section>
    </>
  );
}
