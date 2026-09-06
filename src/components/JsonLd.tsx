/**
 * Renders a JSON-LD structured data block. `JSON.stringify` output is safe
 * to inline here because it never contains a literal "</script>" sequence
 * for plain-object schema data, but we still escape "<" defensively in case
 * a future field contains user-provided text.
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
