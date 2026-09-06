import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { StaticPathnames } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/business";

const links: { href: StaticPathnames; labelKey: string }[] = [
  { href: "/surf-lessons", labelKey: "surfLessons" },
  { href: "/tours", labelKey: "tours" },
  { href: "/packages", labelKey: "packages" },
  { href: "/massages", labelKey: "massages" },
  { href: "/about", labelKey: "about" },
  { href: "/gallery", labelKey: "gallery" },
  { href: "/faq", labelKey: "faq" },
  { href: "/blog", labelKey: "blog" },
  { href: "/contact", labelKey: "contact" },
];

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const locale = await getLocale();

  return (
    <footer className="mt-20 border-t border-brand-100 bg-brand-900 text-brand-50">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9" />
            <p className="font-heading text-lg font-bold text-white">
              {business.name}
            </p>
          </div>
          <p className="mt-2 text-sm text-brand-100/80">{t("tagline")}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-200">
            {t("quickLinks")}
          </h2>
          <ul className="mt-3 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-brand-100/90 hover:text-white"
                >
                  {tNav(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-200">
            {t("getInTouch")}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-100/90">
            <li>{t("location")}</li>
            <li>
              <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {business.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="hover:text-white">
                {business.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-200">
            {t("followUs")}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-100/90">
            {business.social.instagram && (
              <li>
                <a
                  href={business.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Instagram
                </a>
              </li>
            )}
            {business.social.facebook && (
              <li>
                <a
                  href={business.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Facebook
                </a>
              </li>
            )}
            {business.social.youtube && (
              <li>
                <a
                  href={business.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  YouTube
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-brand-800">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-brand-200 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {business.name}. {t("rights")}
          </p>
          <p className="text-brand-300">{locale === "en" ? "EN" : "ES"}</p>
        </Container>
      </div>
    </footer>
  );
}
