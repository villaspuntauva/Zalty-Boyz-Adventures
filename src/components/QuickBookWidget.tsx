"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { tours } from "@/data/tours";
import { whatsappLink } from "@/lib/business";

type Locale = "en" | "es";

export function QuickBookWidget() {
  const t = useTranslations("quickBook");
  const locale = useLocale() as Locale;
  const activityId = useId();
  const peopleId = useId();
  const dateId = useId();

  const [activity, setActivity] = useState("");
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");

  const activityOptions = [
    { value: "surf-lessons", label: t("surfLessonOption") },
    ...tours.map((tour) => ({ value: tour.slug, label: tour.name[locale] })),
    { value: "custom-package", label: t("customOption") },
  ];

  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const activityLabel =
      activityOptions.find((option) => option.value === activity)?.label ??
      activity;

    const lines = [
      t("messageIntro"),
      `${t("messageActivity")}: ${activityLabel || "—"}`,
      `${t("messagePeople")}: ${people}`,
      `${t("messageDate")}: ${date || t("messageNotSet")}`,
    ];

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl rounded-3xl bg-white/95 p-5 shadow-xl shadow-brand-900/10 backdrop-blur sm:p-6"
    >
      {/* Plain (non-display) font here on purpose: this is a functional
          control label, not a marketing heading, and the blackletter
          display face misreads "Check" as "Chef" at this size/weight. */}
      <h2 className="text-lg font-bold text-ink-900 sm:text-xl">
        {t("title")}
      </h2>
      <p className="mt-1 text-sm text-ink-700">{t("subtitle")}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-[2fr_1fr]">
        <div className="sm:col-span-2">
          <label htmlFor={activityId} className="text-sm font-medium text-ink-900">
            {t("activityLabel")}
          </label>
          <select
            id={activityId}
            required
            value={activity}
            onChange={(event) => setActivity(event.target.value)}
            className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-base text-ink-900 focus-visible:border-brand-500"
          >
            <option value="" disabled>
              {t("activityPlaceholder")}
            </option>
            {activityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={peopleId} className="text-sm font-medium text-ink-900">
            {t("peopleLabel")}
          </label>
          <input
            id={peopleId}
            type="number"
            min={1}
            max={20}
            required
            value={people}
            onChange={(event) => setPeople(Number(event.target.value))}
            className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-base text-ink-900 focus-visible:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor={dateId} className="text-sm font-medium text-ink-900">
            {t("dateLabel")}
          </label>
          <input
            id={dateId}
            type="date"
            min={today}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-base text-ink-900 focus-visible:border-brand-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#1fb958]"
      >
        {t("submit")}
      </button>
      <p className="mt-2 text-center text-xs text-ink-700/70">
        {t("disclaimer")}
      </p>
    </form>
  );
}
