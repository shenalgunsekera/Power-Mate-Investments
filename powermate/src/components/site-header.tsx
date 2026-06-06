"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localeHref, cn } from "@/lib/utils";
import { company } from "@/data/site";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const nav = [
    { href: "/", label: dict.nav.home },
    { href: "/about", label: dict.nav.about },
    { href: "/products", label: dict.nav.products },
    { href: "/branches", label: dict.nav.branches },
    { href: "/careers", label: dict.nav.careers },
    { href: "/faqs", label: dict.nav.faqs },
    { href: "/contact", label: dict.nav.contact },
  ];

  const isActive = (href: string) => {
    const full = localeHref(locale, href);
    return href === "/" ? pathname === full : pathname.startsWith(full);
  };

  // Sinhala/Tamil labels are far wider than English; a 7-item desktop bar
  // can't fit them in the content width without overflowing. Show the inline
  // nav only for English; si/ta use the (compact, complete) menu instead.
  const inlineNav = locale === "en";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/75"
          : "border-b border-transparent bg-bg/0",
      )}
    >
      <div className="container-pm flex h-18 items-center justify-between gap-4 py-2">
        <Logo locale={locale} />

        <nav aria-label="Primary" className={cn("hidden", inlineNav && "xl:block")}>
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={localeHref(locale, item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative whitespace-nowrap rounded-pill px-3 py-2 text-[0.92rem] font-medium transition-colors",
                    isActive(item.href)
                      ? "text-brand-800"
                      : "text-ink-soft hover:text-brand-800",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-600" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={company.phoneHref}
            className="hidden items-center gap-2 rounded-pill px-3 py-2 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50 2xl:inline-flex"
          >
            <Phone className="size-4" aria-hidden />
            <span className="tabular">{company.hotline}</span>
          </a>
          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} label={dict.nav.language} />
          </div>
          <ButtonLink
            href={localeHref(locale, "/contact?intent=apply")}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {dict.nav.apply}
          </ButtonLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? dict.nav.close : dict.nav.menu}
            aria-expanded={open}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-pill text-brand-800 hover:bg-brand-50",
              inlineNav && "xl:hidden",
            )}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={cn("border-t border-line bg-bg", inlineNav && "xl:hidden")}>
          <nav aria-label="Mobile" className="container-pm py-4">
            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localeHref(locale, item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-brand-50 text-brand-800"
                        : "text-ink-soft hover:bg-brand-50 hover:text-brand-800",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
              <div className="flex items-center justify-between">
                <LanguageSwitcher locale={locale} label={dict.nav.language} />
                <a
                  href={company.phoneHref}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800"
                >
                  <Phone className="size-4" aria-hidden />
                  {company.hotline}
                </a>
              </div>
              <ButtonLink href={localeHref(locale, "/contact?intent=apply")} size="lg" className="w-full">
                {dict.nav.apply}
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
