"use client";

import { useState, type ComponentProps } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { StaticPathnames } from "@/i18n/routing";
import { CTAButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type LinkHref = ComponentProps<typeof Link>["href"];

const navItems: { href: StaticPathnames; labelKey: string }[] = [
  { href: "/surf-lessons", labelKey: "surfLessons" },
  { href: "/tours", labelKey: "tours" },
  { href: "/packages", labelKey: "packages" },
  { href: "/about", labelKey: "about" },
  { href: "/location", labelKey: "location" },
  { href: "/faq", labelKey: "faq" },
];

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const routeParams = useParams<{ slug?: string }>();
  const [open, setOpen] = useState(false);

  // Dynamic tour pages need their slug carried along when switching locale,
  // since the typed pathname alone ("/tours/[slug]") can't resolve to a URL.
  const localeSwitchHref: LinkHref =
    pathname === "/tours/[slug]"
      ? { pathname, params: { slug: routeParams.slug ?? "" } }
      : pathname;

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-sand-50/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 whitespace-nowrap"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="h-8 w-8 sm:h-10 sm:w-10"
            priority
          />
          <span className="text-lg font-heading font-bold text-brand-800 sm:text-xl">
            Zalty Boyz
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-4 xl:flex xl:gap-5"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-brand-600 ${
                  isActive ? "text-brand-700" : "text-ink-700"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LocaleSwitcher locale={locale} href={localeSwitchHref} />
          <CTAButton href="/contact" variant="primary" className="whitespace-nowrap px-5 py-2.5 text-sm">
            {tCommon("contactUs")}
          </CTAButton>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-900 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t("closeMenu") : t("menu")}
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-brand-100 bg-sand-50 xl:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink-700 hover:bg-brand-50"
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3 px-3">
              <LocaleSwitcher locale={locale} href={localeSwitchHref} />
            </div>
            <CTAButton
              href="/contact"
              variant="primary"
              className="mt-3"
              onClick={() => setOpen(false)}
            >
              {tCommon("contactUs")}
            </CTAButton>
          </Container>
        </nav>
      )}
    </header>
  );
}

function LocaleSwitcher({
  locale,
  href,
}: {
  locale: string;
  href: LinkHref;
}) {
  const otherLocale = locale === "en" ? "es" : "en";

  return (
    <Link
      href={href}
      locale={otherLocale}
      className="rounded-full border border-brand-300 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
      aria-label={`Switch to ${otherLocale === "en" ? "English" : "Español"}`}
    >
      {otherLocale.toUpperCase()}
    </Link>
  );
}
