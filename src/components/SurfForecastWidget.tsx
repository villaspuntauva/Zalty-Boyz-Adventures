/**
 * Surf-Forecast.com's official free embeddable widget (configured via
 * their /pages/configure_widget tool) for the Cocles break — the nearest
 * named break to Puerto Viejo on their site. Anonymous/free embeds of this
 * widget are capped at a 48-hour forecast; a longer live range isn't
 * available without a Surf-Forecast.com account tied to the embed, which
 * doesn't apply to an anonymous visitor loading our page.
 */
export function SurfForecastWidget({ title }: { title: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-brand-100 bg-white p-2">
      <iframe
        title={title}
        src="https://www.surf-forecast.com/breaks/Cocles/forecasts/widget/m"
        width={780}
        height={460}
        scrolling="no"
        loading="lazy"
        style={{ border: 0 }}
        className="mx-auto block"
      />
    </div>
  );
}
