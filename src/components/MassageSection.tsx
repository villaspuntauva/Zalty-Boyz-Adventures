import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { whatsappLink } from "@/lib/business";
import { getTourBySlug } from "@/data/tours";
import { team } from "@/data/team";

type Locale = "en" | "es";

/**
 * Massage summary for the One Love Wellness (yoga) page. Content comes from
 * the "massage" entry in src/data/tours.ts so prices and treatment types
 * stay in sync with the full massage page it links to.
 */
export async function MassageSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("yoga.massage");
  const tCommon = await getTranslations("common");
  const massage = getTourBySlug("massage");
  if (!massage) return null;
  const therapist = team.find((m) => m.slug === massage.practitioner?.slug);
  // First item is "Professional local massage therapist"; the rest are treatments.
  const treatments = massage.included[locale].slice(1);

  return (
    <section id="massage" className="scroll-mt-24 pt-10 sm:pt-12">
      <Container>
        <div className="grid overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm lg:grid-cols-2">
          <PlaceholderImage
            src="/images/tours/massage.jpg"
            alt={massage.heroImageAlt[locale]}
            aspect="aspect-[4/3] lg:aspect-auto lg:h-full"
            className="rounded-none"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="p-6 sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-ink-900">{t("title")}</h2>
            <p className="mt-4 text-ink-700">{massage.shortDescription[locale]}</p>
            {therapist && (
              <p className="mt-4 text-ink-700">
                {t("withTherapist")}{" "}
                <Link
                  href={{ pathname: "/about", hash: therapist.slug }}
                  className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
                >
                  {therapist.name}
                </Link>
              </p>
            )}

            <ul className="mt-6 flex flex-wrap gap-2 text-sm font-semibold text-brand-700">
              {treatments.map((item) => (
                <li key={item} className="rounded-full bg-brand-50 px-3 py-1">
                  {item}
                </li>
              ))}
            </ul>

            {massage.pricing && (
              <p className="mt-6 text-ink-900">
                <span className="text-sm text-ink-700">{tCommon("from")} </span>
                <span className="font-heading text-3xl font-extrabold">
                  ${massage.pricing.priceFromNumber}
                </span>
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <CTAButton href={whatsappLink(t("whatsappMessage"))} external variant="whatsapp">
                {t("cta")}
              </CTAButton>
              <Link
                href={{ pathname: "/tours/[slug]", params: { slug: "massage" } }}
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                {t("details")}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
