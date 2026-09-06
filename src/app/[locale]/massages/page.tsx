import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteUrl, whatsappLink } from "@/lib/business";

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
  const t = await getTranslations({ locale, namespace: "massages" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default async function MassagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations("massages");
  const tWhatsapp = await getTranslations("whatsapp");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: t("hero.title"), url: `${siteUrl}/${locale}/massages` },
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
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <PlaceholderImage
            src="/images/massages/hero.jpg"
            alt={
              l === "es"
                ? "Espacio de masajes relajante cerca de Puerto Viejo"
                : "Relaxing massage space near Puerto Viejo"
            }
            aspect="aspect-[4/3]"
          />
          <div>
            <h2 className="font-heading text-2xl font-bold text-ink-900 sm:text-3xl">
              {t("body.title")}
            </h2>
            <p className="mt-3 text-ink-700">{t("body.text")}</p>
          </div>
        </Container>
      </section>

      <section className="bg-brand-50 py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
            {t("cta.title")}
          </h2>
          <div className="mt-8 flex justify-center">
            <CTAButton
              href={whatsappLink(tWhatsapp("prefilledMessage"))}
              external
              variant="whatsapp"
            >
              {t("cta.cta")}
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}
