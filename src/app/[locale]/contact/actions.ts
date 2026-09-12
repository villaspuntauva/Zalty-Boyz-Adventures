"use server";

import { business } from "@/lib/business";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
};

/**
 * Sends the inquiry via Resend if RESEND_API_KEY and CONTACT_TO_EMAIL are
 * both configured, otherwise logs it server-side and reports that email
 * isn't set up yet.
 *
 * TODO(client): create a Resend account (or swap in your preferred email
 * provider), set RESEND_API_KEY and CONTACT_TO_EMAIL as environment
 * variables, and this starts sending for real with no code changes. There's
 * no business.email to fall back on — the site currently has no public
 * inbox, WhatsApp is the primary contact channel.
 */
async function sendInquiryEmail(fields: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.warn(
      "[contact] RESEND_API_KEY/CONTACT_TO_EMAIL not set — inquiry logged but not emailed:",
      fields,
    );
    return { sent: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${business.name} Website <onboarding@resend.dev>`,
      to: [toEmail],
      reply_to: fields.email,
      subject: `New inquiry from ${fields.name}`,
      text: Object.entries(fields)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n"),
    }),
  });

  return { sent: response.ok };
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitInquiry(
  _prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot: real users never fill this hidden field; bots often do.
  if (formData.get("company")) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const dates = String(formData.get("dates") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "missing_fields" };
  }

  if (!isValidEmail(email)) {
    return { status: "error", message: "invalid_email" };
  }

  try {
    const result = await sendInquiryEmail({
      name,
      email,
      phone,
      dates,
      interest,
      message,
    });

    if (!result.sent) {
      return { status: "error", message: "not_configured" };
    }

    return { status: "success" };
  } catch (error) {
    console.error("[contact] Failed to send inquiry email:", error);
    return { status: "error", message: "send_failed" };
  }
}
