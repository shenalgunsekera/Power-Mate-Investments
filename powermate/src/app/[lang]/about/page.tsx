import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { CtaBand } from "@/components/sections/cta-band";
import { HeartHandshake, Sparkles, Users, Shield, Sprout, ExternalLink } from "lucide-react";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1558871624-7b507467240f?auto=format&fit=crop&w=1920&q=80";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.about.title, description: dict.meta.about.description };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const a = dict.about;

  const valueIcons = [Shield, HeartHandshake, Sparkles, Users, Sprout];

  return (
    <>
      {/* Hero — Sri Lanka community photo with maroon brand overlay */}
      <section className="relative overflow-hidden py-24 text-white lg:py-32">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={ABOUT_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-brand-950/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-(image:--grad-dark) opacity-75" />
        </div>
        <div className="container-pm relative z-10 max-w-3xl">
          <span className="kicker kicker--dark mb-4 block">{a.hero.eyebrow}</span>
          <h1 className="font-display text-balance text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.03] tracking-[-0.025em]">
            {a.hero.title}
          </h1>
          <p className="mt-6 max-w-[58ch] text-pretty text-[1.1rem] leading-relaxed text-brand-100">
            {a.hero.subtitle}
          </p>
        </div>
        <div aria-hidden className="mt-16 h-10 bg-bg [clip-path:ellipse(120%_100%_at_50%_100%)]" />
      </section>

      {/* Story — two-column long-read layout, generous measure */}
      <section className="section-pad bg-bg">
        <div className="container-pm grid gap-16 lg:grid-cols-[1fr_0.85fr]">
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.3rem)] font-bold tracking-[-0.02em] text-ink">
              {a.storyTitle}
            </h2>
            {a.story.map((para, i) => (
              <p key={i} className="max-w-[65ch] text-[1.05rem] leading-[1.8] text-ink-soft">
                {para}
              </p>
            ))}
          </div>

          {/* Mission / Vision pair — different visual weight from the story text */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-7">
              <h3 className="font-display text-lg font-bold text-brand-800">{a.missionTitle}</h3>
              <p className="mt-3 text-[0.975rem] leading-[1.75] text-brand-700">{a.mission}</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h3 className="font-display text-lg font-bold text-ink">{a.visionTitle}</h3>
              <p className="mt-3 text-[0.975rem] leading-[1.75] text-ink-soft">{a.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — horizontal strip, plain numbers without oversized metric template */}
      <section className="border-y border-line bg-surface py-14">
        <div className="container-pm">
          <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-ink-faint">
            {a.statsTitle}
          </p>
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {a.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt className="font-display text-[2.2rem] font-extrabold tabular text-brand-700 leading-none">
                  {s.value}
                </dt>
                <dd className="text-sm leading-snug text-ink-soft">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Values — 2×2 grid, no icon-tile-above-every-heading template */}
      <section className="section-pad bg-bg">
        <div className="container-pm">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.02em] text-ink">
            {a.valuesTitle}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {a.values.map((v, i) => {
              const Icon = valueIcons[i] ?? HeartHandshake;
              return (
                <div
                  key={v.title}
                  className="flex gap-5 rounded-2xl border border-line bg-surface p-6"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-(image:--grad-brand) text-white shadow-(--shadow-brand)">
                    <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-lg font-bold text-ink">{v.title}</h3>
                    <p className="text-[0.95rem] leading-relaxed text-ink-soft">{v.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Management team */}
      <section className="section-pad bg-surface">
        <div className="container-pm">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.02em] text-ink">
            {a.teamTitle}
          </h2>
          <p className="mt-3 max-w-[55ch] text-[1.05rem] leading-relaxed text-ink-soft">
            {a.teamSubtitle}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {a.team.map((member) => (
              <article
                key={member.name}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-bg p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-lg)"
              >
                {/* soft maroon glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 size-44 rounded-full bg-brand-100 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                />

                <div className="relative flex items-center gap-5">
                  {/* Portrait, or a branded initials avatar until a photo is added */}
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-(image:--grad-brand) shadow-(--shadow-md) ring-1 ring-black/5">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="96px"
                        className="object-cover object-[center_22%] transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className="flex size-full items-center justify-center font-display text-xl font-bold text-white">
                        {member.initials}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-bold leading-tight tracking-[-0.01em] text-ink">
                      {member.name}
                    </h3>
                    <p className="mt-1.5 text-sm font-semibold text-brand-700">{member.role}</p>
                  </div>
                </div>

                <p className="relative mt-5 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                  {member.bio}
                </p>

                {member.links.length > 0 && (
                  <div className="relative mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-5">
                    {member.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 transition-colors hover:text-brand-500"
                      >
                        <ExternalLink className="size-3.5" aria-hidden />
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
