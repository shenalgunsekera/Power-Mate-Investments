import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, TrendingUp, Heart, Star } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeHref } from "@/lib/utils";
import { company } from "@/data/site";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({ params }: PageProps<"/[lang]/careers">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.careers.title, description: dict.meta.careers.description };
}

const perkIcons = [TrendingUp, Heart, Star];

export default async function CareersPage({ params }: PageProps<"/[lang]/careers">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const c = dict.careers;

  return (
    <>
      {/* Hero — maroon, purpose-driven tone */}
      <section className="relative overflow-hidden bg-(image:--grad-dark) py-20 text-white lg:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-0 h-[26rem] w-[26rem] rounded-full bg-brand-500/18 blur-[130px]" />
        </div>
        <div className="container-pm relative max-w-2xl">
          <span className="kicker kicker--dark mb-4 block">{c.hero.eyebrow}</span>
          <h1 className="font-display text-balance text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-[1.03] tracking-[-0.025em]">
            {c.hero.title}
          </h1>
          <p className="mt-6 max-w-[56ch] text-pretty text-[1.05rem] leading-relaxed text-brand-100">
            {c.hero.subtitle}
          </p>
        </div>
        <div aria-hidden className="mt-14 h-10 bg-bg [clip-path:ellipse(120%_100%_at_50%_100%)]" />
      </section>

      {/* Why work here — 3 horizontal perks, no icon-tile-above-heading */}
      <section className="section-pad bg-bg">
        <div className="container-pm">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-[-0.02em] text-ink">
            {c.whyTitle}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {c.perks.map((perk, i) => {
              const Icon = perkIcons[i] ?? Star;
              return (
                <div key={perk.title} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-(image:--grad-brand) text-white shadow-(--shadow-brand)">
                    <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{perk.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{perk.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="section-pad bg-surface">
        <div className="container-pm">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-[-0.02em] text-ink">
            {c.openingsTitle}
          </h2>

          <div className="mt-10 flex flex-col gap-3">
            {c.openings.map((job) => (
              <div
                key={`${job.role}-${job.location}`}
                className="flex flex-col gap-4 rounded-2xl border border-line bg-bg p-6 transition-shadow hover:shadow-(--shadow-md) sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-lg font-bold text-ink">{job.role}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-ink-soft">
                    <span>{c.departmentLabel}: <span className="font-medium text-ink">{job.department}</span></span>
                    <span>·</span>
                    <span>{c.locationLabel}: <span className="font-medium text-ink">{job.location}</span></span>
                    <span>·</span>
                    <span className="inline-flex items-center rounded-pill bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                      {job.type}
                    </span>
                  </div>
                </div>
                <a
                  href={localeHref(locale, `/contact?intent=apply&role=${encodeURIComponent(job.role)}`)}
                  className="inline-flex shrink-0 items-center gap-2 rounded-pill bg-(image:--grad-brand) px-5 py-2.5 text-sm font-semibold text-white shadow-(--shadow-brand) transition-transform hover:-translate-y-0.5"
                >
                  {c.applyCta}
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </div>
            ))}
          </div>

          {/* Open application */}
          <div className="mt-8 rounded-2xl border border-dashed border-line-strong bg-bg p-8 text-center">
            <h3 className="font-display text-xl font-bold text-ink">{c.noOpeningTitle}</h3>
            <p className="mt-2 text-ink-soft">{c.noOpeningText}</p>
            <a
              href={`mailto:${company.email}`}
              className="mt-5 inline-flex items-center gap-2 rounded-pill border border-line-strong px-5 py-2.5 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              {c.sendCv}
            </a>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
