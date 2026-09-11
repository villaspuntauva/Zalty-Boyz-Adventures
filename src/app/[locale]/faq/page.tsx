import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/Button";
import { HeroMedia } from "@/components/HeroMedia";
import { JsonLd } from "@/components/JsonLd";
import { FAQAccordion } from "@/components/FAQAccordion";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { siteUrl, whatsappLink } from "@/lib/business";
import { faqs } from "@/data/faqs";

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
  const t = await getTranslations({ locale, namespace: "faqPage" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations("faqPage");
  const tWhatsapp = await getTranslations("whatsapp");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: t("hero.title"), url: `${siteUrl}/${locale}/faq` },
        ])}
      />
      <JsonLd
        data={faqSchema(
          faqs.map((faq) => ({
            question: faq.question[l],
            answer: faq.answer[l],
          })),
        )}
      />

      <section className="relative isolate overflow-hidden py-16 text-white sm:py-20">
        <HeroMedia
          imageSrc="/images/faq/hero.jpg"
          imageAlt={
            l === "es"
              ? "Surfista saltando la ola en Puerto Viejo"
              : "Surfer catching air on a wave in Puerto Viejo"
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
        <Container className="max-w-3xl">
          <FAQAccordion items={faqs} locale={l} />
        </Container>
      </section>

      <section className="bg-brand-50 py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
            {t("stillQuestions.title")}
          </h2>
          <div className="mt-8 flex justify-center">
            <CTAButton
              href={whatsappLink(tWhatsapp("prefilledMessage"))}
              external
              variant="whatsapp"
            >
              {t("stillQuestions.cta")}
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}
