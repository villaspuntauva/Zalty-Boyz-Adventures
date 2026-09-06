import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { business } from "@/lib/business";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated social-share image (Next's file-convention OG image route).
 * Replace with real branded artwork once the client's designer delivers
 * one — until then this keeps link previews on WhatsApp/Facebook/iMessage
 * from showing a broken image.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "home",
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #17726e 0%, #0b2f2e 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.8, display: "flex" }}>
          {business.address.addressLocality}, Costa Rica
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            marginTop: 24,
            maxWidth: 900,
            display: "flex",
          }}
        >
          {business.name}
        </div>
        <div style={{ fontSize: 30, marginTop: 24, maxWidth: 850, opacity: 0.9, display: "flex" }}>
          {t("hero.subtitle")}
        </div>
      </div>
    ),
    { ...size },
  );
}
