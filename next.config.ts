import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Content-Security-Policy is intentionally conservative. Loosen only for
// specific, known third parties (Google Analytics is allowed below; it only
// loads after cookie consent — see src/components/CookieConsent.tsx)
// and prefer nonces/hashes over broad 'unsafe-inline' when that day comes.
// Dev mode needs 'unsafe-eval' for Turbopack/webpack HMR — never ship that
// to production.
const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  font-src 'self' data:;
  connect-src 'self' https://wa.me https://api.whatsapp.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com${isDev ? " ws:" : ""};
  frame-src 'self' https://www.google.com https://www.surf-forecast.com https://www.youtube-nocookie.com;
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
`
  .replace(/\n/g, "")
  .trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: __dirname,
  },
  // The fruit farm tour was merged into the night tour.
  async redirects() {
    return [
      {
        source: "/:locale(en|es)/tours/fruit-farm-tour",
        destination: "/:locale/tours/night-tour",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
