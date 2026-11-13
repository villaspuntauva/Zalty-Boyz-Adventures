import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { whatsappLink } from "@/lib/business";
import {
  yogaClasses,
  yogaDropInPrice,
  yogaPrivatePrice,
  yogaInstructorSlug,
  yogaPhotos,
} from "@/data/yoga";
import { team } from "@/data/team";

type Locale = "en" | "es";

/**
 * Weekly yoga classes with Julie Hickey at One Love Wellness — the same
 * spot as Zalty Boyz. Photos fall back to placeholders until real ones are
 * dropped into public/images/yoga/.
 */
export async function YogaSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("yoga");
  const instructor = team.find((m) => m.slug === yogaInstructorSlug);

  return (
    <section id="yoga" className="scroll-mt-24 pt-16 sm:pt-20">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
          <div className="grid grid-cols-3 gap-1">
            {yogaPhotos.map((photo, i) => (
              <PlaceholderImage
                key={photo}
                src={`/images/yoga/${photo}.jpg`}
                alt={`${t("photoAlt")} (${i + 1}/${yogaPhotos.length})`}
                label={i === 1 ? t("photosComingSoon") : ""}
                aspect="aspect-[4/3]"
                className="rounded-none"
                sizes="(min-width: 1024px) 400px, 33vw"
              />
            ))}
          </div>

          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="font-heading text-2xl font-bold text-ink-900">
                {t("aboutTitle")}
              </h2>
              <p className="mt-4 text-ink-700">
                {t.rich("body", {
                  place: (chunks) => (
                    <strong className="font-semibold text-ink-900">{chunks}</strong>
                  ),
                })}
              </p>
              {instructor && (
                <p className="mt-4 text-ink-700">
                  {t("taughtBy")}{" "}
                  <Link
                    href={{ pathname: "/about", hash: instructor.slug }}
                    className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
                  >
                    {instructor.name}
                  </Link>
                </p>
              )}

              <ul className="mt-6 flex flex-wrap gap-2 text-sm font-semibold text-brand-700">
                <li className="rounded-full bg-brand-50 px-3 py-1">{t("dropIns")}</li>
                <li className="rounded-full bg-brand-50 px-3 py-1">{t("classPackages")}</li>
                {yogaPrivatePrice !== undefined && (
                  <li className="rounded-full bg-brand-50 px-3 py-1">{t("privateAvailable")}</li>
                )}
              </ul>

              {yogaDropInPrice !== undefined ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-brand-100 p-4">
                    <p className="text-sm font-semibold text-brand-600">{t("dropInFrom")}</p>
                    <p className="mt-1 text-ink-900">
                      <span className="font-heading text-3xl font-extrabold">
                        ${yogaDropInPrice}
                      </span>
                      <span className="text-sm text-ink-700"> {t("perClass")}</span>
                    </p>
                  </div>
                  {yogaPrivatePrice !== undefined && (
                    <div className="rounded-xl border border-brand-100 p-4">
                      <p className="text-sm font-semibold text-brand-600">{t("privateClass")}</p>
                      <p className="mt-1 text-ink-900">
                        <span className="font-heading text-3xl font-extrabold">
                          ${yogaPrivatePrice}
                        </span>
                        <span className="text-sm text-ink-700"> {t("perClass")}</span>
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-6 text-sm text-ink-700">{t("pricingSoon")}</p>
              )}

              <CTAButton
                href={whatsappLink(t("whatsappMessage"))}
                external
                variant="whatsapp"
                className="mt-6"
              >
                {t("cta")}
              </CTAButton>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold text-ink-900">
                {t("scheduleTitle")}
              </h3>
              <ul className="mt-4 divide-y divide-brand-100 rounded-xl border border-brand-100">
                {yogaClasses.map((c) => (
                  <li key={c.day.en} className="flex items-center gap-4 p-4">
                    <div className="w-24 shrink-0">
                      <p className="font-semibold text-ink-900">{c.day[locale]}</p>
                      <p className="text-sm text-brand-600">{c.time}</p>
                    </div>
                    <p className="text-ink-700">{c.name[locale]}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
