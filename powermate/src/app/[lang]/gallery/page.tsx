import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.nav.gallery} | Power Mate Investment`,
    description: dict.gallery.subtitle,
  };
}

/** Four top sections; each holds one or more photo groups (sub-sections). */
const SECTIONS: {
  title: string;
  subtitle: string;
  groups: { dir: string; label?: string }[];
}[] = [
  {
    title: "Our commitment to the customers we serve",
    subtitle:
      "Proud sponsors of the 2025 Annual Inter-Collegiate Cricket Tournament, organised by Dharmaraja College.",
    groups: [{ dir: "community", label: "Annual Inter-Collegiate Cricket Tournament 2025 · Dharmaraja College" }],
  },
  {
    title: "Our talent development and empowerment",
    subtitle: "Investing in our team so they can serve you better.",
    groups: [{ dir: "talent", label: "Corporate Etiquette & Professional Conduct" }],
  },
  {
    title: "Our branch expansions",
    subtitle: "Bringing Power Mate Investment closer to more communities.",
    groups: [
      { dir: "bandarawela", label: "Bandarawela branch opening" },
      { dir: "mahiyanganaya", label: "Mahiyanganaya branch opening" },
    ],
  },
  {
    title: "Our commitment",
    subtitle: "Standing with the communities we are proud to be part of.",
    groups: [],
  },
];

function imagesFor(dir: string): string[] {
  try {
    const d = path.join(process.cwd(), "public", "media", "gallery", dir);
    return fs
      .readdirSync(d)
      .filter((f) => /\.(jpe?g|png)$/i.test(f))
      .sort()
      .map((f) => `/media/gallery/${dir}/${f}`);
  } catch {
    return [];
  }
}

function GalleryGrid({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src) => (
        <div
          key={src}
          className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-brand-100"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
        </div>
      ))}
    </div>
  );
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const g = dict.gallery;

  const sections = SECTIONS.map((s) => ({
    ...s,
    groups: s.groups
      .map((gr) => ({ ...gr, images: imagesFor(gr.dir) }))
      .filter((gr) => gr.images.length > 0),
  })).filter((s) => s.groups.length > 0);

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-(image:--grad-dark) py-20 text-white lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 top-0 h-104 w-104 rounded-full bg-brand-500/20 blur-[130px]" />
        </div>
        <div className="container-pm relative max-w-3xl">
          <span className="kicker kicker--dark mb-4 block">{g.eyebrow}</span>
          <h1 className="font-display text-balance text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-[1.03] tracking-tight">
            {g.title}
          </h1>
          <p className="mt-6 max-w-[56ch] text-pretty text-[1.1rem] leading-relaxed text-brand-100">
            {g.subtitle}
          </p>
        </div>
        <div aria-hidden className="mt-14 h-10 bg-bg [clip-path:ellipse(120%_100%_at_50%_100%)]" />
      </section>

      {/* Collapsible sections */}
      <section className="section-pad bg-bg">
        <div className="container-pm flex max-w-5xl flex-col gap-5">
          {sections.map((section, si) => {
            const total = section.groups.reduce((n, gr) => n + gr.images.length, 0);
            return (
              <details
                key={section.title}
                open={si === 0}
                className="pm-acc group overflow-hidden rounded-3xl border border-line bg-bg transition-shadow open:shadow-(--shadow-md)"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-6 transition-colors hover:bg-brand-50/40 sm:p-7 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-sm font-bold tabular tabular-nums text-brand-400">
                    {String(si + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-[clamp(1.2rem,2.6vw,1.65rem)] font-bold tracking-[-0.015em] text-ink">
                      {section.title}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{section.subtitle}</p>
                  </div>
                  <span className="hidden shrink-0 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 sm:block">
                    {total} photos
                  </span>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-brand-700 transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown className="size-5" aria-hidden />
                  </span>
                </summary>

                <div className="pm-acc-body flex flex-col gap-10 border-t border-line px-6 pb-9 pt-8 sm:px-7">
                  {section.groups.map((gr) => (
                    <div key={gr.dir} className="flex flex-col gap-4">
                      {gr.label && (
                        <div className="flex items-center gap-3">
                          <span className="h-px w-6 shrink-0 rounded bg-brand-300" />
                          <h3 className="font-display text-[0.95rem] font-bold tracking-[-0.01em] text-brand-800">
                            {gr.label}
                          </h3>
                          <span className="text-xs text-ink-faint tabular">{gr.images.length}</span>
                        </div>
                      )}
                      <GalleryGrid
                        images={gr.images}
                        alt={`${gr.label ?? section.title} — Power Mate Investment`}
                      />
                    </div>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
