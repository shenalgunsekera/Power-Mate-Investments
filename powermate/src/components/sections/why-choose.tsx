"use client";

import Image from "next/image";
import { Zap, HeartHandshake, CalendarClock, MapPinned, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const icons: LucideIcon[] = [Zap, HeartHandshake, CalendarClock, MapPinned];

export function WhyChoose({ dict }: { dict: Dictionary }) {
  return (
    <section className="section-pad bg-surface overflow-hidden">
      <div className="container-pm">
        <Reveal kind="up" className="max-w-2xl">
          <h2 className="font-display text-balance text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.08] tracking-[-0.025em] text-ink">
            {dict.why.title}
          </h2>
          <p className="mt-4 max-w-[58ch] text-[1.05rem] leading-relaxed text-ink-soft">
            {dict.why.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Art-directed photo — the people behind the promise */}
          <Reveal kind="left" className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] lg:min-h-full">
            <Image
              src="/Locations/Kandy/Kandy.png"
              alt="Kandy, Central Province, the communities Power Mate Investment serves"
              fill
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-950/85 via-brand-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="font-display text-xl font-bold text-white">The communities we serve</p>
              <p className="mt-1 text-sm text-brand-200">Kandy, Central Province, Sri Lanka</p>
            </div>
          </Reveal>

          {/* Reasons — hairline-separated list, inline icons, no clone cards */}
          <RevealGroup as="ul" className="flex flex-col" stagger={0.1}>
            {dict.why.items.map((item, i) => {
              const Icon = icons[i] ?? Zap;
              return (
                <RevealItem
                  as="li"
                  key={item.title}
                  className="group flex gap-5 border-t border-line py-7 first:border-t-0 first:pt-0 sm:gap-7"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-sm font-bold tabular text-brand-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-100">
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 pt-1">
                    <h3 className="font-display text-[1.15rem] font-bold tracking-[-0.01em] text-ink">
                      {item.title}
                    </h3>
                    <p className="max-w-[52ch] text-[0.95rem] leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
