import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localeHref } from "@/lib/utils";
import { company, productOrder } from "@/data/site";
import { Logo } from "@/components/logo";
import { FacebookGlyph, WhatsAppGlyph } from "@/components/ui/brand-glyphs";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: "/about", label: dict.nav.about },
    { href: "/branches", label: dict.nav.branches },
    { href: "/careers", label: dict.nav.careers },
    { href: "/gallery", label: dict.nav.gallery },
    { href: "/faqs", label: dict.nav.faqs },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <footer className="bg-(image:--grad-dark) text-brand-100">
      <div className="container-pm grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <Logo locale={locale} variant="wordmark" tone="light" />
          <p className="max-w-xs text-sm leading-relaxed text-brand-200">{dict.footer.blurb}</p>
          <div className="mt-1 flex items-center gap-2.5">
            <a
              href={company.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <FacebookGlyph className="size-4" />
            </a>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <WhatsAppGlyph className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label={dict.footer.quickLinks} className="flex flex-col gap-3">
          <h2 className="font-display text-sm font-semibold tracking-wide text-white">
            {dict.footer.quickLinks}
          </h2>
          {quickLinks.map((l) => (
            <Link
              key={l.href}
              href={localeHref(locale, l.href)}
              className="text-sm text-brand-200 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <nav aria-label={dict.footer.products} className="flex flex-col gap-3">
          <h2 className="font-display text-sm font-semibold tracking-wide text-white">
            {dict.footer.products}
          </h2>
          {productOrder.map((p) => (
            <Link
              key={p}
              href={localeHref(locale, `/products#${p}`)}
              className="text-sm text-brand-200 transition-colors hover:text-white"
            >
              {dict.products.items[p].name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="font-display text-sm font-semibold tracking-wide text-white">
            {dict.footer.contactTitle}
          </h2>
          <a href={company.phoneHref} className="flex items-start gap-2.5 text-sm text-brand-200 transition-colors hover:text-white">
            <Phone className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden />
            <span className="tabular">{company.phone}</span>
          </a>
          <a href={`mailto:${company.email}`} className="flex items-start gap-2.5 text-sm text-brand-200 transition-colors hover:text-white">
            <Mail className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden />
            {company.email}
          </a>
          <p className="flex items-start gap-2.5 text-sm text-brand-200">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden />
            {company.address}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-pm flex flex-col gap-3 py-6 text-xs text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. {dict.footer.rights}
          </p>
          <p className="max-w-xl sm:text-end">{dict.footer.licence}</p>
        </div>
      </div>
    </footer>
  );
}
