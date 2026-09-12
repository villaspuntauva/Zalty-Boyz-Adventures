import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/Button";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteUrl, whatsappLink, business } from "@/lib/business";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const tWhatsapp = await getTranslations("whatsapp");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: t("hero.title"), url: `${siteUrl}/${locale}/contact` },
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
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="rounded-2xl bg-brand-50 p-6">
              <h2 className="font-heading text-xl font-bold text-ink-900">
                {t("whatsapp.title")}
              </h2>
              <p className="mt-2 text-sm text-ink-700">{t("whatsapp.body")}</p>
              <CTAButton
                href={whatsappLink(tWhatsapp("prefilledMessage"))}
                external
                variant="whatsapp"
                className="mt-4"
              >
                {t("whatsapp.cta")}
              </CTAButton>
            </div>

            <div className="mt-8">
              <h2 className="font-heading text-xl font-bold text-ink-900">
                {t("info.title")}
              </h2>
              <address className="mt-2 space-y-1 text-sm not-italic text-ink-700">
                <p>{t("info.location")}</p>
                <p>
                  <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="hover:text-brand-700">
                    {business.phone}
                  </a>
                </p>
              </address>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-ink-900">
              {t("form.title")}
            </h2>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
