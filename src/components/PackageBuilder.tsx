"use client";

import { useState } from "react";
import Image from "next/image";
import { whatsappLink } from "@/lib/business";
import { Container } from "@/components/ui/Container";

export type BuilderItem = {
  id: string;
  name: string;
  /** Photo path, or null to show the gradient placeholder. */
  image: string | null;
  priceFrom?: number;
};

/**
 * "Build your own package" picker, styled like selecting photos in an
 * album: tap tiles to toggle them (a check badge marks each pick), then
 * send the selection to WhatsApp as a prefilled message.
 */
export function PackageBuilder({
  items,
  labels,
}: {
  items: BuilderItem[];
  labels: {
    title: string;
    body: string;
    from: string;
    selected: string;
    clear: string;
    cta: string;
    emptyCta: string;
    message: string;
  };
}) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const picks = items.filter((item) => selected.includes(item.id));
  const message = `${labels.message}\n${picks.map((item) => `• ${item.name}`).join("\n")}`;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
            {labels.title}
          </h2>
          <p className="mt-3 text-ink-700">{labels.body}</p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {items.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-pressed={isSelected}
                  className="group relative block w-full overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-400"
                >
                  <div
                    className={`relative aspect-square overflow-hidden rounded-2xl transition-transform duration-200 ${
                      isSelected ? "scale-[0.94]" : "group-hover:scale-[0.98]"
                    }`}
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-300 via-brand-200 to-sand-100" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    {isSelected && <div className="absolute inset-0 bg-white/15" />}

                    <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                      <p className="font-heading text-sm font-bold leading-tight sm:text-base">
                        {item.name}
                      </p>
                      {item.priceFrom !== undefined && (
                        <p className="mt-0.5 text-xs text-white/85">
                          {labels.from} ${item.priceFrom}
                        </p>
                      )}
                    </div>

                    <span
                      aria-hidden="true"
                      className={`absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white shadow-md transition-colors ${
                        isSelected ? "bg-[#0a84ff]" : "bg-black/20"
                      }`}
                    >
                      {isSelected && (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                          <path
                            d="M5 12.5l4.5 4.5L19 7.5"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <div
          aria-live="polite"
          className="sticky bottom-24 z-40 mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-between gap-3 rounded-full bg-white/95 px-4 py-2 shadow-lg ring-1 ring-black/5 backdrop-blur sm:bottom-6"
        >
          <p className="pl-2 text-sm font-semibold text-ink-900">
            {labels.selected.replace("{count}", String(picks.length))}
            {picks.length > 0 && (
              <button
                type="button"
                onClick={() => setSelected([])}
                className="ml-3 text-sm font-medium text-brand-600 underline-offset-2 hover:underline"
              >
                {labels.clear}
              </button>
            )}
          </p>
          {picks.length > 0 ? (
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#25D366] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1fb958]"
            >
              {labels.cta}
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center px-2 text-sm text-ink-700/70">
              {labels.emptyCta}
            </span>
          )}
        </div>
      </Container>
    </section>
  );
}
