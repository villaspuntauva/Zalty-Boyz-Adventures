import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/Button";
import { HeroMedia } from "@/components/HeroMedia";
import { QuickBookWidget } from "@/components/QuickBookWidget";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PlaceholderVideo } from "@/components/ui/PlaceholderVideo";
import { Testimonials } from "@/components/Testimonials";
import { whatsappLink } from "@/lib/business";

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
  const t = await getTranslations({ locale, namespace: "home" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  return {
    // Next's title.template (set in the locale layout) only applies to
    // child route segments, not to page.tsx sharing the layout's own
    // segment — so the home page builds its full title explicitly.
    title: `${t("hero.title")} | ${tMeta("siteName")}`,
    description: t("hero.subtitle"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tWhatsapp = await getTranslations("whatsapp");
  const tCommon = await getTranslations("common");

  return (
    <>
      <section className="relative isolate overflow-hidden pb-12 pt-16 sm:pb-28 sm:pt-24">
        <HeroMedia
          imageSrc="/images/home/hero-surf-class.webp"
          imageAlt={
            locale === "es"
              ? "Clase de surf en Puerto Viejo, Costa Rica"
              : "Surf lesson in Puerto Viejo, Costa Rica"
          }
        />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="text-white">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-100">
                {t("hero.eyebrow")}
              </p>
              <h1 className="mt-3 font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-brand-50/90">
                {t("hero.subtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <CTAButton
                  href={whatsappLink(tWhatsapp("prefilledMessage"))}
                  external
                  variant="whatsapp"
                >
                  {t("hero.primaryCta")}
                </CTAButton>
                <CTAButton href="/surf-lessons" variant="secondary">
                  {t("hero.secondaryCta")}
                </CTAButton>
              </div>
            </div>

            {/* Stacking this inside the photo's grid row on mobile forced
                the hero section (and the background photo covering it) to
                stretch to the combined height of the text + form, cropping
                the photo down to an unrecognizable sliver. Below `lg` it
                renders instead in its own section after the photo. */}
            <div className="hidden lg:block lg:justify-self-end">
              <QuickBookWidget />
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Check availability" className="bg-white pb-10 pt-2 lg:hidden">
        <Container>
          <QuickBookWidget />
        </Container>
      </section>

      <section aria-label="Why book with us" className="bg-white py-8">
        <Container>
          <ul className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            {[
              t("trustBar.localGuides"),
              t("trustBar.smallGroups"),
              t("trustBar.allLevels"),
              t("trustBar.fastReplies"),
            ].map((item) => (
              <li
                key={item}
                className="rounded-xl bg-brand-50 px-3 py-4 text-sm font-medium text-brand-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              {t("servicesIntro.eyebrow")}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
              {t("servicesIntro.title")}
            </h2>
            <p className="mt-3 text-ink-700">{t("servicesIntro.subtitle")}</p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <ServiceCard
              eyebrow={t("surfHighlight.eyebrow")}
              title={t("surfHighlight.title")}
              body={t("surfHighlight.body")}
              cta={t("surfHighlight.cta")}
              href="/surf-lessons"
              imageSrc="/images/home/surf-highlight.jpg"
              imageAlt={
                locale === "es"
                  ? "Instructor enseñando una clase de surf en Puerto Viejo"
                  : "Instructor teaching a surf lesson in Puerto Viejo"
              }
              priceLabel={`${tCommon("from")} $60`}
            />
            <ServiceCard
              eyebrow={t("toursTeaser.eyebrow")}
              title={t("toursTeaser.title")}
              body={t("toursTeaser.body")}
              cta={t("toursTeaser.cta")}
              href="/tours"
              imageSrc="/images/home/tours-teaser.jpg"
              imageAlt={
                locale === "es"
                  ? "Kayak y cascada en la selva de Talamanca"
                  : "Kayaking and a waterfall in the Talamanca rainforest"
              }
              priceLabel={`${tCommon("from")} $45`}
            />
            <ServiceCard
              eyebrow={t("packagesTeaser.eyebrow")}
              title={t("packagesTeaser.title")}
              body={t("packagesTeaser.body")}
              cta={t("packagesTeaser.cta")}
              href="/packages"
              imageSrc="/images/home/packages-teaser.jpg"
              imageAlt={
                locale === "es"
                  ? "Collage de actividades incluidas en un paquete de aventura"
                  : "Collage of activities included in an adventure package"
              }
            />
          </div>
        </Container>
      </section>

      <Testimonials locale={locale as Locale} />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              {t("instructorSpotlight.eyebrow")}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
              {t("instructorSpotlight.title")}
            </h2>
            <p className="mt-3 text-ink-700">
              {t("instructorSpotlight.subtitle")}
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <PlaceholderVideo
              src="/videos/cedric-surfing.mp4"
              label={
                locale === "es"
                  ? "Video de Cedric surfeando — próximamente"
                  : "Cedric surfing — video coming soon"
              }
            />
          </div>

          <div className="mt-8 flex justify-center">
            <CTAButton href="/about" variant="secondary">
              {t("instructorSpotlight.cta")}
            </CTAButton>
          </div>
        </Container>
      </section>

      <section className="bg-brand-800 py-16 text-white sm:py-20">
        <Container className="text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("finalCta.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-50/90">
            {t("finalCta.subtitle")}
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton
              href={whatsappLink(tWhatsapp("prefilledMessage"))}
              external
              variant="whatsapp"
            >
              {t("finalCta.cta")}
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}

function ServiceCard({
  eyebrow,
  title,
  body,
  cta,
  href,
  imageSrc,
  imageAlt,
  priceLabel,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: "/surf-lessons" | "/tours" | "/packages";
  imageSrc: string;
  imageAlt: string;
  priceLabel?: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
      <div className="relative">
        <PlaceholderImage
          src={imageSrc}
          alt={imageAlt}
          aspect="aspect-[16/10]"
          className="rounded-none"
        />
        {priceLabel && (
          <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-brand-700 shadow-sm">
            {priceLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {eyebrow}
        </p>
        <h3 className="mt-2 font-heading text-xl font-bold text-ink-900">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-ink-700">{body}</p>
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          {cta}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
