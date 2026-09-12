import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { HeroMedia } from "@/components/HeroMedia";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteUrl, business } from "@/lib/business";
import { team } from "@/data/team";

type Locale = "en" | "es";

// A real Zalty Boyz surf vlog, picked from their own channel
// (youtube.com/@zaltyboyz6720) via YouTube's oEmbed API.
const FEATURED_YOUTUBE_VIDEO_ID = "HI3V08zGKyA";
const FEATURED_YOUTUBE_VIDEO_TITLE =
  "Surfing the perfect lefts of Boca Barranca | ZALTY BOYZ VLOG #8";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations("about");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: t("hero.title"), url: `${siteUrl}/${locale}/about` },
        ])}
      />

      <section className="relative isolate overflow-hidden py-16 text-white sm:py-20">
        <HeroMedia
          imageSrc="/images/about/hero.jpg"
          imageAlt={
            l === "es"
              ? "El equipo de Zalty Boyz en Puerto Viejo"
              : "The Zalty Boyz team in Puerto Viejo"
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
          <h2 className="text-center font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
            {t("team.title")}
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm"
              >
                <PlaceholderImage
                  src={`/images/about/team-${member.slug}.jpg`}
                  alt={member.photoAlt[l]}
                  aspect="aspect-[4/5]"
                  className="rounded-none"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-bold text-ink-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-brand-600">
                    {member.role[l]}
                  </p>
                  <div className="mt-3 space-y-3 text-sm text-ink-700">
                    {member.bio[l].map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-50 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              {business.social.youtube ? (
                <YouTubeEmbed
                  videoId={FEATURED_YOUTUBE_VIDEO_ID}
                  title={FEATURED_YOUTUBE_VIDEO_TITLE}
                />
              ) : (
                <PlaceholderImage
                  alt={
                    l === "es"
                      ? "El equipo de Zalty Boyz en la playa de Puerto Viejo"
                      : "The Zalty Boyz team on the beach in Puerto Viejo"
                  }
                  aspect="aspect-video"
                />
              )}
              {business.social.youtube && (
                <div className="mt-4 flex justify-center">
                  <CTAButton
                    href={business.social.youtube}
                    external
                    variant="secondary"
                  >
                    {t("howItStarted.youtubeCta")}
                  </CTAButton>
                </div>
              )}
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-ink-900 sm:text-3xl">
                {t("howItStarted.title")}
              </h2>
              <div className="mt-3 space-y-4 text-ink-700">
                {t.raw("howItStarted.paragraphs").map((paragraph: string) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
