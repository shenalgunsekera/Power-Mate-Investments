"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { productOrder, type ProductKey } from "@/data/site";
import { localeHref, cn } from "@/lib/utils";
import { img, sized } from "@/lib/images";
import { ProductIcon } from "@/components/ui/product-icon";
import { Reveal } from "@/components/ui/reveal";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const preview: Record<ProductKey, string> = {
  micro: "/Locations/Kandy/Vegitable%20seller/vegi.png",
  sme: "/Locations/Kandy/Vegitable%20seller/sme.png",
  agriculture: img.ricePlanting,
  gold: img.goldJewelry,
  leasing: img.galleTukTuk,
  insurance: "/Locations/Kandy/Vegitable%20seller/crash.png",
};

/** Local public images start with "/"; Unsplash ids go through the CDN sizer. */
function srcFor(value: string, opts: { w: number; h: number; q: number }) {
  return value.startsWith("/") ? value : sized(value, opts);
}

export function ProductsGrid({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
  /** Retained for call-site compatibility; the home index is the only variant. */
  variant?: "home" | "full";
}) {
  const [active, setActive] = useState(0);
  const activeKey = productOrder[active];
  const activeItem = dict.products.items[activeKey];

  return (
    <section id="products" className="section-pad bg-bg">
      <div className="container-pm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <Reveal kind="up" className="max-w-xl">
            <h2 className="font-display text-balance text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.08] tracking-[-0.025em] text-ink">
              {dict.products.title}
            </h2>
            <p className="mt-4 max-w-[56ch] text-[1.05rem] leading-relaxed text-ink-soft">
              {dict.products.subtitle}
            </p>
          </Reveal>
          <Reveal kind="up" delay={0.1}>
            <Link
              href={localeHref(locale, "/products")}
              className="group inline-flex shrink-0 items-center gap-2 rounded-pill border border-line-strong px-5 py-2.5 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              {dict.common.viewAll}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Editorial index — each product is a row, not a clone card */}
          <ul className="flex flex-col">
            {productOrder.map((key, i) => {
              const p = dict.products.items[key];
              const isActive = i === active;
              return (
                <li key={key}>
                  <Link
                    href={localeHref(locale, `/contact?intent=apply&product=${key}`)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={cn(
                      "group relative flex items-center gap-4 rounded-2xl border-b border-line px-3 py-5 transition-colors duration-300 sm:gap-5",
                      isActive ? "bg-brand-50/70" : "hover:bg-brand-50/40",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-sm font-bold tabular tabular-nums transition-colors",
                        isActive ? "text-brand-600" : "text-ink-faint",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Thumbnail — gives the list imagery on every breakpoint */}
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-brand-100 sm:size-16">
                      <Image
                        src={srcFor(preview[key], { w: 160, h: 160, q: 70 })}
                        alt=""
                        fill
                        sizes="64px"
                        className={cn(
                          "object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isActive ? "scale-105" : "group-hover:scale-105",
                        )}
                      />
                      <span className="absolute inset-0 grid place-items-center bg-brand-950/30 text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <ProductIcon product={key} className="size-5" />
                      </span>
                    </span>

                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span
                        className={cn(
                          "font-display text-lg font-bold tracking-[-0.01em] transition-colors sm:text-xl",
                          isActive ? "text-brand-800" : "text-ink",
                        )}
                      >
                        {p.name}
                      </span>
                      <span className="truncate text-sm text-ink-soft">{p.short}</span>
                    </span>

                    <ArrowUpRight
                      className={cn(
                        "size-5 shrink-0 transition-all duration-300",
                        isActive
                          ? "translate-x-0 -translate-y-0 text-brand-600 opacity-100"
                          : "text-ink-faint opacity-0 group-hover:opacity-100",
                      )}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Live preview — sticky on desktop, crossfades with the active row */}
          <div className="hidden lg:block">
            <div className="sticky top-24 overflow-hidden rounded-[1.75rem] bg-brand-950 shadow-(--shadow-lg)">
              <div className="relative aspect-[4/5]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeKey}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={srcFor(preview[activeKey], { w: 900, h: 1125, q: 82 })}
                      alt={`${activeItem.name}, Power Mate Investment`}
                      fill
                      sizes="(max-width: 1024px) 0px, 45vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-linear-to-t from-brand-950 via-brand-950/35 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-8 text-white">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-white/12 ring-1 ring-white/20 backdrop-blur-sm">
                    <ProductIcon product={activeKey} className="size-5" />
                  </span>
                  <h3 className="font-display text-2xl font-bold">{activeItem.name}</h3>
                  <p className="max-w-[40ch] text-pretty text-sm leading-relaxed text-brand-100">
                    {activeItem.description}
                  </p>
                  <Link
                    href={localeHref(locale, `/contact?intent=apply&product=${activeKey}`)}
                    className="mt-2 inline-flex w-fit items-center gap-2 rounded-pill bg-white px-5 py-2.5 text-sm font-semibold text-brand-900 transition-transform hover:-translate-y-0.5"
                  >
                    {dict.common.applyNow}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
