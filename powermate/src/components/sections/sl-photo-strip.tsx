"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Dictionary } from "@/i18n/dictionaries";
import { img, sized } from "@/lib/images";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const photos = [
  {
    src: sized(img.nineArches, { w: 800, h: 600, q: 80 }),
    alt: "The Nine Arches Bridge near Ella in the Uva hill country",
    caption: "Ella, Uva Province",
    credit: "Nine Arches Bridge",
  },
  {
    src: sized(img.teaCountry, { w: 800, h: 600, q: 80 }),
    alt: "Tea plantations carpeting the hills around Nuwara Eliya",
    caption: "Nuwara Eliya, Central",
    credit: "Tea country",
  },
  {
    src: sized(img.kandyCommunity, { w: 800, h: 600, q: 80 }),
    alt: "A hilltop temple near Kandy in the Central Province",
    caption: "Kandy, Central Province",
    credit: "Nelligala Temple",
  },
  {
    src: sized(img.hillCountry, { w: 800, h: 600, q: 80 }),
    alt: "Misty green highlands of Sri Lanka's hill country",
    caption: "Uva Highlands",
    credit: "Hill country",
  },
];

export function SriLankaPhotoStrip({ dict }: { dict: Dictionary }) {
  const t = dict.photoStrip;
  return (
    <section className="bg-brand-950 py-14">
      <div className="container-pm">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">
              {t.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.6rem,3.5vw,2.3rem)] font-bold text-white leading-tight tracking-[-0.02em] text-balance">
              {t.title}
            </h2>
          </div>
          <p className="max-w-[44ch] text-sm leading-relaxed text-brand-300 sm:text-right">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {photos.map((p, i) => (
            <motion.div
              key={p.credit}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                {/* Caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display text-sm font-bold text-white">{p.caption}</p>
                  <p className="text-xs text-brand-300">{p.credit}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
