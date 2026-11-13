import { Container } from "@/components/ui/Container";
import { business, whatsappLink } from "@/lib/business";
import type { LegalDocument } from "@/data/legal";

type Locale = "en" | "es";

/** Renders a Privacy Policy / Terms document from src/data/legal.ts. */
export function LegalDocumentView({
  doc,
  locale,
}: {
  doc: LegalDocument;
  locale: Locale;
}) {
  const contact =
    locale === "es"
      ? {
          title: "Contacto",
          body: `${business.legalName} · ${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion}, Costa Rica · Tel./WhatsApp: ${business.phone}`,
          message: `¡Hola! Tengo una pregunta sobre su ${doc.title.es}.`,
        }
      : {
          title: "Contact us",
          body: `${business.legalName} · ${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion}, Costa Rica · Phone/WhatsApp: ${business.phone}`,
          message: `Hi! I have a question about your ${doc.title.en}.`,
        };

  return (
    <section className="bg-[#eef9ef] py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-heading text-4xl font-extrabold text-ink-900">
          {doc.title[locale]}
        </h1>
        <p className="mt-2 text-sm text-ink-700/70">{doc.updated[locale]}</p>
        <p className="mt-6 text-ink-700">{doc.intro[locale]}</p>

        {doc.sections.map((section, i) => (
          <div key={section.title.en}>
            <h2 className="mt-10 font-heading text-xl font-bold text-ink-900">
              {i + 1}. {section.title[locale]}
            </h2>
            {section.paragraphs?.[locale].map((p) => (
              <p key={p} className="mt-3 text-ink-700">
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-700">
                {section.bullets[locale].map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <h2 className="mt-10 font-heading text-xl font-bold text-ink-900">
          {contact.title}
        </h2>
        <p className="mt-3 text-ink-700">{contact.body}</p>
        <p className="mt-3">
          <a
            href={whatsappLink(contact.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-700 underline underline-offset-2"
          >
            WhatsApp
          </a>
        </p>
      </Container>
    </section>
  );
}
