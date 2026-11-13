import type { Metadata } from "next";
import { staticPageMetadata } from "@/lib/metadata";
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
import { packages } from "@/data/packages";
import { yogaDropInPrice } from "@/data/yoga";
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
  return staticPageMetadata(locale as "en" | "es", "/");
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
  const lowestPackagePrice = Math.min(...packages.map((p) => p.priceFromPerPerson));

  return (
    <>
      <section className="relative isolate overflow-hidden pb-12 pt-16 sm:pb-28 sm:pt-24">
        <HeroMedia
          imageSrc="/images/home/hero-surf-class.webp"
          mobileImageSrc="/images/gallery/cocles3.webp"
          imageAlt={
            locale === "es"
              ? "Surfista en una ola en Puerto Viejo, Costa Rica"
              : "Surfer riding a wave in Puerto Viejo, Costa Rica"
          }
        />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="text-white">
              <div className="[text-shadow:0_2px_4px_rgb(0_0_0/0.6),0_4px_24px_rgb(0_0_0/0.5)]">
                <p className="text-sm font-semibold uppercase tracking-widest text-white">
                  {t("hero.eyebrow")}
                </p>
                <h1 className="mt-3 font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                  {t("hero.title")}
                </h1>
                <p className="mt-5 max-w-xl text-lg font-medium text-white">
                  {t("hero.subtitle")}
                </p>
              </div>
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
                className="flex items-center justify-center rounded-xl bg-brand-50 px-3 py-4 text-sm font-medium text-brand-800"
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
              imageSrc="/images/tours/kayak-tour.jpg"
              imageAlt={
                locale === "es"
                  ? "Grupo en kayak y paddle board por un río en la selva de Talamanca"
                  : "Group kayaking and paddle boarding down a jungle river in Talamanca"
              }
              priceLabel={`${tCommon("from")} $45`}
            />
            <ServiceCard
              eyebrow={t("packagesTeaser.eyebrow")}
              title={t("packagesTeaser.title")}
              body={t("packagesTeaser.body")}
              cta={t("packagesTeaser.cta")}
              href="/packages"
              priceLabel={`${tCommon("from")} $${lowestPackagePrice}`}
              imageSrc="/images/surf-lessons/surf13.webp"
              imageAlt={
                locale === "es"
                  ? "Estudiante de surf con rashguard de Zalty Boyz cargando una tabla por la playa en Puerto Viejo"
                  : "Surf student in a Zalty Boyz rash guard carrying a board across the beach in Puerto Viejo"
              }
            />
          </div>

          {/* Second row: links every remaining main page from the home page. */}
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <ServiceCard
              eyebrow={t("wellnessTeaser.eyebrow")}
              title={t("wellnessTeaser.title")}
              body={t("wellnessTeaser.body")}
              cta={t("wellnessTeaser.cta")}
              href="/yoga"
              priceLabel={`${tCommon("from")} $${yogaDropInPrice}`}
              imageSrc="/images/about/team-julie.jpg"
              imageAlt={
                locale === "es"
                  ? "Julie Hickey dando un masaje en su espacio al aire libre en la selva en Cocles"
                  : "Julie Hickey giving a massage in her open-air jungle space in Cocles"
              }
            />
            <ServiceCard
              eyebrow={t("aboutTeaser.eyebrow")}
              title={t("aboutTeaser.title")}
              body={t("aboutTeaser.body")}
              cta={t("aboutTeaser.cta")}
              href="/about"
              imageSrc="/images/about/team-cedric-surfing.jpg"
              imageAlt={
                locale === "es"
                  ? "Cedric McCrackin, fundador de Zalty Boyz, surfeando una ola en Cocles"
                  : "Cedric McCrackin, founder of Zalty Boyz, surfing a wave at Cocles"
              }
            />
            <ServiceCard
              eyebrow={t("locationTeaser.eyebrow")}
              title={t("locationTeaser.title")}
              body={t("locationTeaser.body")}
              cta={t("locationTeaser.cta")}
              href="/location"
              imageSrc="/images/location/cocles.jpg"
              imageAlt={
                locale === "es"
                  ? "Playa Cocles en Puerto Viejo, Costa Rica"
                  : "Cocles Beach in Puerto Viejo, Costa Rica"
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
              src="/images/gallery/cocles5.mp4"
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
  href: "/surf-lessons" | "/tours" | "/packages" | "/yoga" | "/about" | "/location";
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
