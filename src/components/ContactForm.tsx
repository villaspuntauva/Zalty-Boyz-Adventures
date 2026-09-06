"use client";

import { useActionState, useId } from "react";
import { useTranslations } from "next-intl";
import { submitInquiry, type InquiryState } from "@/app/[locale]/contact/actions";

const initialState: InquiryState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [state, formAction, isPending] = useActionState(
    submitInquiry,
    initialState,
  );

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const datesId = useId();
  const interestId = useId();
  const messageId = useId();

  const interestOptions = [
    { value: "surf", label: t("interestOptions.surf") },
    { value: "tours", label: t("interestOptions.tours") },
    { value: "packages", label: t("interestOptions.packages") },
    { value: "massage", label: t("interestOptions.massage") },
    { value: "other", label: t("interestOptions.other") },
  ];

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="rounded-xl bg-brand-50 p-4 text-sm font-medium text-brand-800"
      >
        {t("success")}
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {/* Honeypot field: hidden from real users via CSS, so anything that
          fills it is almost certainly a bot. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor={nameId} className="text-sm font-medium text-ink-900">
          {t("name")}
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-3 text-base text-ink-900 focus-visible:border-brand-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={emailId} className="text-sm font-medium text-ink-900">
            {t("email")}
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-3 text-base text-ink-900 focus-visible:border-brand-500"
          />
        </div>
        <div>
          <label htmlFor={phoneId} className="text-sm font-medium text-ink-900">
            {t("phone")}
          </label>
          <input
            id={phoneId}
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-3 text-base text-ink-900 focus-visible:border-brand-500"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={datesId} className="text-sm font-medium text-ink-900">
            {t("dates")}
          </label>
          <input
            id={datesId}
            name="dates"
            type="text"
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-3 text-base text-ink-900 focus-visible:border-brand-500"
          />
        </div>
        <div>
          <label htmlFor={interestId} className="text-sm font-medium text-ink-900">
            {t("interest")}
          </label>
          <select
            id={interestId}
            name="interest"
            defaultValue="surf"
            className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-base text-ink-900 focus-visible:border-brand-500"
          >
            {interestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={messageId} className="text-sm font-medium text-ink-900">
          {t("message")}
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={4}
          className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-3 text-base text-ink-900 focus-visible:border-brand-500"
        />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm font-medium text-accent-600">
          {t("error")}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-brand-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {t("submit")}
      </button>
    </form>
  );
}
