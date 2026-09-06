"use client";

import { useState } from "react";
import type { Faq } from "@/data/faqs";

type Locale = "en" | "es";

export function FAQAccordion({
  items,
  locale,
}: {
  items: Faq[];
  locale: Locale;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-brand-100 rounded-2xl border border-brand-100 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question[locale]}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-ink-900 hover:bg-brand-50 sm:px-6"
              >
                {item.question[locale]}
                <span aria-hidden="true" className="text-brand-600">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 pb-4 text-sm text-ink-700 sm:px-6"
              >
                {item.answer[locale]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
