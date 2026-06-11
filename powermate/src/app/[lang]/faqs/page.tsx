import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeHref } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";

export async function generateMetadata({ params }: PageProps<"/[lang]/faqs">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.faqs.title, description: dict.meta.faqs.description };
}

export default async function FaqsPage({ params }: PageProps<"/[lang]/faqs">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const f = dict.faqs;

  return (
    <>
      {/* Compact header — no full hero for a utility page */}
      <section className="border-b border-line bg-surface py-14">
        <div className="container-pm max-w-3xl">
          <span className="kicker mb-3 block">{f.hero.eyebrow}</span>
          <h1 className="font-display text-balance text-[clamp(2.2rem,4.8vw,3.4rem)] font-extrabold leading-tight tracking-[-0.025em] text-ink">
            {f.hero.title}
          </h1>
          <p className="mt-3 max-w-[56ch] text-[1.05rem] leading-relaxed text-ink-soft">
            {f.hero.subtitle}
          </p>
        </div>
      </section>

      {/* FAQ accordion — two-column on wide screens */}
      <section className="section-pad bg-bg">
        <div className="container-pm grid gap-12 lg:grid-cols-[1fr_2fr]">

          {/* Left nav / context on desktop */}
          <aside className="hidden lg:flex lg:flex-col lg:gap-6">
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
              <p className="text-[0.9rem] font-semibold text-brand-800">{f.stillHaveQuestions}</p>
              <p className="mt-1 text-sm text-brand-700">{f.contactPrompt}</p>
              <Link
                href={localeHref(locale, "/contact")}
                className="mt-4 inline-flex items-center gap-2 rounded-pill bg-(image:--grad-brand) px-4 py-2.5 text-sm font-semibold text-white shadow-(--shadow-brand) transition-transform hover:-translate-y-0.5"
              >
                {dict.common.talkToUs}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </aside>

          {/* Accordion */}
          <div>
            <Accordion items={f.items} />

            {/* Disclaimer */}
            <p className="mt-8 rounded-xl border border-line bg-surface px-5 py-4 text-sm leading-relaxed text-ink-soft">
              {f.disclaimer}
            </p>

            {/* Mobile CTA */}
            <div className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6 lg:hidden">
              <p className="font-semibold text-brand-800">{f.stillHaveQuestions}</p>
              <p className="mt-1 text-sm text-brand-700">{f.contactPrompt}</p>
              <Link
                href={localeHref(locale, "/contact")}
                className="mt-4 inline-flex items-center gap-2 rounded-pill bg-(image:--grad-brand) px-4 py-2.5 text-sm font-semibold text-white shadow-(--shadow-brand) transition-transform hover:-translate-y-0.5"
              >
                {dict.common.talkToUs}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
