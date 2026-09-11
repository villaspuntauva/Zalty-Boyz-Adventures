import { getTranslations } from "next-intl/server";
import { reviews } from "@/data/reviews";
import { Container } from "@/components/ui/Container";
import { ScrollCarousel } from "@/components/ui/ScrollCarousel";
import { business } from "@/lib/business";

type Locale = "en" | "es";

export async function Testimonials({ locale }: { locale: Locale }) {
  const t = await getTranslations("testimonials");

  return (
    <section aria-labelledby="testimonials-heading" className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {t("eyebrow")}
          </p>
          <h2
            id="testimonials-heading"
            className="mt-2 font-heading text-3xl font-bold text-ink-900 sm:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-3 text-ink-700">{t("subtitle")}</p>
          {business.googleReviewsUrl && (
            <a
              href={business.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              {t("googleLink")}
            </a>
          )}
        </div>

        <div className="mt-10">
          <ScrollCarousel
            prevLabel={t("prev")}
            nextLabel={t("next")}
            regionLabel={t("region")}
          >
            {reviews.map((review, index) => (
              <figure
                key={index}
                data-carousel-card
                className="flex w-[85%] flex-none snap-start flex-col justify-between rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:w-[380px]"
              >
                <div>
                  <div
                    aria-label={`${review.rating} out of 5 stars`}
                    className="flex gap-0.5 text-accent-500"
                  >
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className="h-4 w-4"
                        fill={starIndex < review.rating ? "currentColor" : "none"}
                        stroke="currentColor"
                      >
                        <path d="M10 1.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L10 14.8l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.7L10 1.5z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-3 text-sm text-ink-700">
                    “{review.text[locale]}”
                  </blockquote>
                </div>
                <figcaption className="mt-4 text-sm font-semibold text-ink-900">
                  {review.author}
                  {review.location && (
                    <span className="font-normal text-ink-700/70">
                      {" "}
                      · {review.location}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </ScrollCarousel>
        </div>
      </Container>
    </section>
  );
}
