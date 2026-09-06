import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteUrl, whatsappLink } from "@/lib/business";
import { packages } from "@/data/packages";
import { getTourBySlug } from "@/data/tours";

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
  const t = await getTranslations({ locale, namespace: "packages" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default async function PackagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations("packages");
  const tCommon = await getTranslations("common");
  const tWhatsapp = await getTranslations("whatsapp");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: t("hero.title"), url: `${siteUrl}/${locale}/packages` },
        ])}
      />

      <section className="bg-brand-800 py-16 text-white sm:py-20">
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
        <Container className="grid gap-8 lg:grid-cols-3">
          {packages.map((pkg) => {
            const includedTours = pkg.includesTourSlugs
              .map((slug) => getTourBySlug(slug)?.name[l])
              .filter(Boolean);

            return (
              <div
                key={pkg.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm"
              >
                <PlaceholderImage
                  src={`/images/packages/${pkg.slug}.jpg`}
                  alt={pkg.name[l]}
                  aspect="aspect-[16/10]"
                  className="rounded-none"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {pkg.durationLabel[l]} · {pkg.goodFor[l]}
                  </p>
                  <h2 className="mt-2 font-heading text-xl font-bold text-ink-900">
                    {pkg.name[l]}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-ink-700">
                    {pkg.shortDescription[l]}
                  </p>

                  <ul className="mt-4 space-y-1.5 text-sm text-ink-700">
                    {pkg.includesSurfLessons && (
                      <li className="flex gap-2">
                        <span aria-hidden="true" className="text-brand-600">✓</span>
                        {l === "es" ? "Clases de surf" : "Surf lessons"}
                      </li>
                    )}
                    {includedTours.map((name) => (
                      <li key={name} className="flex gap-2">
                        <span aria-hidden="true" className="text-brand-600">✓</span>
                        {name}
                      </li>
                    ))}
                    {pkg.includesMassage && (
                      <li className="flex gap-2">
                        <span aria-hidden="true" className="text-brand-600">✓</span>
                        {l === "es" ? "Masaje" : "Massage"}
                      </li>
                    )}
                  </ul>

                  <CTAButton
                    href={whatsappLink(
                      `${tWhatsapp("prefilledMessage")} (${pkg.name[l]})`,
                    )}
                    external
                    variant="whatsapp"
                    className="mt-6"
                  >
                    {tCommon("bookNow")}
                  </CTAButton>
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="bg-brand-50 py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
            {t("customNote.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-700">
            {t("customNote.body")}
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton
              href={whatsappLink(tWhatsapp("prefilledMessage"))}
              external
              variant="whatsapp"
            >
              {t("customNote.cta")}
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}
