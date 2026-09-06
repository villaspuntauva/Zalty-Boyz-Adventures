import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteUrl } from "@/lib/business";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

/**
 * Structural placeholder. Once the client is ready to publish guides, this
 * becomes a real index over MDX/CMS posts — the route, metadata, and
 * schema wiring are already in place so adding content doesn't require an
 * architecture change. A steady stream of location-specific guides here is
 * one of the highest-leverage local SEO and AI-answer-engine moves available
 * (fresh, specific, citable content beats a static brochure site).
 */
export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blog");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: t("hero.title"), url: `${siteUrl}/${locale}/blog` },
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

      <section className="py-20 text-center">
        <Container>
          <p className="mx-auto max-w-xl text-ink-700">{t("comingSoon")}</p>
        </Container>
      </section>
    </>
  );
}
