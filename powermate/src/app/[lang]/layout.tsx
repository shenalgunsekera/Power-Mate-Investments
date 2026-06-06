import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  Noto_Sans_Sinhala,
  Noto_Sans_Tamil,
} from "next/font/google";
import "../globals.css";
import { locales, isLocale, localeDir, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { PageLoader } from "@/components/page-loader";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  variable: "--font-sinhala",
  display: "swap",
});

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
  display: "swap",
});

const fontVars = `${display.variable} ${body.variable} ${sinhala.variable} ${tamil.variable}`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: {
      default: dict.meta.home.title,
      template: "%s",
    },
    description: dict.meta.home.description,
    metadataBase: new URL("https://powermate.lk"),
    alternates: {
      languages: {
        en: "/en",
        si: "/si",
        ta: "/ta",
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={localeDir[locale]} data-scroll-behavior="smooth" className={`${fontVars} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <PageLoader />
        <ScrollProgress />
        <div className="grain-overlay" aria-hidden />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-800 focus:rounded-md focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.nav.skipToContent}
        </a>
        <SiteHeader locale={locale} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}
