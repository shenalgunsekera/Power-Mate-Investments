"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Phone, BadgeCheck, MapPin, Clock } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localeHref } from "@/lib/utils";
import { company } from "@/data/site";
import { img, sized } from "@/lib/images";
import { ButtonLink } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.hero;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const stats = [
    { icon: BadgeCheck, value: h.stat2Value, label: h.stat2Label },
    { icon: MapPin, value: h.stat1Value, label: h.stat1Label },
    { icon: Clock, value: h.stat3Value, label: h.stat3Label },
  ];

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-hidden bg-brand-950 text-white"
    >
      {/* ── Background photo — Nine Arches Bridge, parallax via overscan ── */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute inset-0 scale-[1.18]" style={{ y: photoY }}>
          <Image
            src={sized(img.marketLife, { w: 1920, q: 85 })}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_45%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-r from-brand-950/85 via-brand-900/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-brand-950/65 to-transparent" />
        <div className="absolute inset-0 [box-shadow:inset_0_0_150px_50px_oklch(33%_0.1_18_/_0.35)]" />
      </div>

      {/* Content — vertically centered, sized to fit one viewport */}
      <motion.div
        className="container-pm relative z-10 flex flex-1 items-center pb-20 pt-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="flex max-w-2xl flex-col items-start gap-4">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-brand-200"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="h-px w-9 origin-left bg-brand-300"
            />
            {h.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.95, delay: 0.1, ease: EASE }}
            className="font-display text-balance text-[clamp(2rem,4.4vw,3.15rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
          >
            {h.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
            className="max-w-[46ch] text-pretty text-[1rem] leading-relaxed text-brand-100"
          >
            {h.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="mt-1 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href={localeHref(locale, "/contact?intent=apply")} variant="onDark" size="md">
              {h.ctaPrimary}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={localeHref(locale, "/products#calculator")} variant="onDarkGhost" size="md">
              {h.ctaSecondary}
            </ButtonLink>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/12 pt-4"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="size-4 shrink-0 text-brand-300" strokeWidth={1.8} aria-hidden />
                <span className="font-display text-sm font-bold tabular text-white">{value}</span>
                <span className="text-xs text-brand-200">{label}</span>
              </div>
            ))}
            <a
              href={company.phoneHref}
              className="ms-auto hidden items-center gap-2 whitespace-nowrap rounded-pill border border-white/20 px-3.5 py-1.5 text-sm font-medium text-brand-100 transition-colors hover:border-white/50 hover:text-white md:inline-flex"
            >
              <Phone className="size-4" aria-hidden />
              <span className="tabular font-bold text-white">{company.hotline}</span>
            </a>
          </motion.dl>
        </div>
      </motion.div>

      {/* Scroll cue — absolute so it never pushes content past the fold.
          Hidden on short viewports where every pixel counts. */}
      <motion.div
        aria-hidden
        style={{ opacity: cueOpacity }}
        className="absolute inset-x-0 bottom-6 z-10 mx-auto hidden flex-col items-center gap-1.5 [@media(min-height:720px)]:flex"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 pt-1.5">
          <motion.span
            animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-brand-300"
          />
        </span>
      </motion.div>
    </section>
  );
}
