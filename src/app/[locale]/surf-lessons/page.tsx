import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PhotoCarousel } from "@/components/ui/PhotoCarousel";
import { HeroMedia } from "@/components/HeroMedia";
import { QuickBookWidget } from "@/components/QuickBookWidget";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, tourServiceSchema } from "@/lib/schema";
import { siteUrl, whatsappLink } from "@/lib/business";
import { findPhotos } from "@/lib/findPhotos";

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
  const t = await getTranslations({ locale, namespace: "surfLessons" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default async function SurfLessonsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations("surfLessons");
  const tCommon = await getTranslations("common");
  const tWhatsapp = await getTranslations("whatsapp");

  const levelKeys = ["beginner", "improver", "advanced"] as const;

  const lessonPhotoAlt =
    l === "es"
      ? "Estudiante de surf principiante practicando pop-up en la playa"
      : "Beginner surf student practicing a pop-up on the beach";
  const photoPaths = findPhotos("surf-lessons", "lesson");
  const lessonPhotos = photoPaths.map((src, i) => ({
    src,
    alt:
      photoPaths.length > 1
        ? `${lessonPhotoAlt} (${i + 1}/${photoPaths.length})`
        : lessonPhotoAlt,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: t("hero.title"), url: `${siteUrl}/${locale}/surf-lessons` },
        ])}
      />
      <JsonLd
        data={tourServiceSchema({
          locale: l,
          name: t("hero.title"),
          description: t("hero.subtitle"),
          slug: "surf-lessons",
          durationIso: "PT2H",
          priceFrom: 60,
        })}
      />

      <section className="relative isolate overflow-hidden py-16 text-white sm:py-20">
        <HeroMedia
          imageSrc="/images/surf-lessons/hero.jpg"
          imageAlt={
            l === "es"
              ? "Clase de surf en Puerto Viejo, Costa Rica"
              : "Surf lesson in Puerto Viejo, Costa Rica"
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
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <h2 className="font-heading text-2xl font-bold text-ink-900 sm:text-3xl">
              {t("intro.title")}
            </h2>
            <p className="mt-3 text-ink-700">{t("intro.body")}</p>
            <p className="mt-3 text-ink-700">{t("pickup.body")}</p>

            <div className="mt-8">
              {lessonPhotos.length > 0 ? (
                <PhotoCarousel
                  images={lessonPhotos}
                  aspect="aspect-[16/9]"
                  prevLabel={tCommon("previousPhoto")}
                  nextLabel={tCommon("nextPhoto")}
                  photoLabelTemplate={tCommon.raw("goToPhoto")}
                />
              ) : (
                <PlaceholderImage alt={lessonPhotoAlt} aspect="aspect-[16/9]" />
              )}
            </div>

            <h2 className="mt-12 font-heading text-2xl font-bold text-ink-900 sm:text-3xl">
              {t("levels.title")}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {levelKeys.map((key) => (
                <div
                  key={key}
                  className="rounded-2xl border border-brand-100 bg-white p-5"
                >
                  <h3 className="font-heading text-lg font-bold text-brand-700">
                    {t(`levels.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-ink-700">
                    {t(`levels.${key}.body`)}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 font-heading text-2xl font-bold text-ink-900 sm:text-3xl">
              {t("whatToExpect.title")}
            </h2>
            <ul className="mt-4 space-y-3">
              {t.raw("whatToExpect.items").map((item: string) => (
                <li key={item} className="flex gap-3 text-ink-700">
                  <span aria-hidden="true" className="mt-1 text-brand-600">
                    ✓
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

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="text-center font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
            {t("pricing.title")}
          </h2>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {(["group", "private"] as const).map((plan) => (
              <div
                key={plan}
                className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm"
              >
                <h3 className="font-heading text-xl font-bold text-ink-900">
                  {t(`pricing.${plan}.title`)}
                </h3>
                <p className="mt-1 text-3xl font-extrabold text-brand-700">
                  {t(`pricing.${plan}.price`)}
                </p>
                <ul className="mt-4 space-y-2">
                  {t.raw(`pricing.${plan}.items`).map((item: string) => (
                    <li key={item} className="flex gap-2 text-sm text-ink-700">
                      <span aria-hidden="true" className="mt-0.5 text-brand-600">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-ink-700/70">
            {t("pricing.note")}
          </p>
        </Container>
      </section>

      <section className="bg-brand-50 py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-700">
            {t("cta.subtitle")}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <CTAButton
              href={whatsappLink(tWhatsapp("prefilledMessage"))}
              external
              variant="whatsapp"
            >
              {t("cta.cta")}
            </CTAButton>
            <CTAButton href="/contact" variant="secondary">
              {tCommon("contactUs")}
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}
