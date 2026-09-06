"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { Review } from "@/data/reviews";

type Locale = "en" | "es";

export function ReviewsCarousel({
  reviews,
  locale,
  prevLabel,
  nextLabel,
  regionLabel,
}: {
  reviews: Review[];
  locale: Locale;
  prevLabel: string;
  nextLabel: string;
  regionLabel: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    const onResize = () => updateEdges();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateEdges]);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-review-card]");
    const gap = 24;
    const distance = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={updateEdges}
        tabIndex={0}
        role="group"
        aria-label={regionLabel}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {reviews.map((review, index) => (
          <figure
            key={index}
            data-review-card
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
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label={prevLabel}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-200 text-brand-700 transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label={nextLabel}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-200 text-brand-700 transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
