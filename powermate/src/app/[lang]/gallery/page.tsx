import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { img, sized } from "@/lib/images";
import { Reveal } from "@/components/ui/reveal";
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

const photos = [
  { id: img.nineArches, w: 800, h: 1000, alt: "The Nine Arches Bridge at Ella, a stone viaduct curving through tea-country forest", caption: "Ella, Hill Country" },
  { id: img.tukTuks, w: 800, h: 1000, alt: "Tuk-tuks loaded with surfboards on a Sri Lankan road", caption: "Everyday transport" },
  { id: img.mirisssaBeach, w: 800, h: 600, alt: "Coconut Tree Hill at Mirissa on the southern coast", caption: "Mirissa, Southern Coast" },
  { id: img.kandyCommunity, w: 800, h: 1000, alt: "People gathered at a hilltop temple near Kandy", caption: "Kandy, Central Province" },
  { id: img.blueTrain, w: 800, h: 600, alt: "The blue hill-country train crossing the Nine Arches Bridge", caption: "The hill-country line" },
  { id: img.elephants, w: 800, h: 600, alt: "Wild elephants grazing in a Sri Lankan national park", caption: "Wild Sri Lanka" },
  { id: img.ricePlanting, w: 800, h: 1000, alt: "A farmer planting young rice in a flooded paddy field", caption: "Paddy fields" },
  { id: img.galleTukTuk, w: 800, h: 600, alt: "A tuk-tuk parked along the ramparts of Galle Fort", caption: "Galle Fort" },
  { id: img.mirisssaPeople, w: 800, h: 600, alt: "People relaxing on the sand at Mirissa beach", caption: "Coastal life" },
  { id: img.goldJewelry, w: 800, h: 1000, alt: "Gold rings and a necklace, the security behind a gold loan", caption: "Gold loans" },
];

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

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-(image:--grad-dark) py-20 text-white lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 top-0 h-[26rem] w-[26rem] rounded-full bg-brand-500/20 blur-[130px]" />
        </div>
        <div className="container-pm relative max-w-3xl">
          <span className="kicker kicker--dark mb-4 block">{g.eyebrow}</span>
          <h1 className="font-display text-balance text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-[1.03] tracking-[-0.025em]">
            {g.title}
          </h1>
          <p className="mt-6 max-w-[56ch] text-pretty text-[1.1rem] leading-relaxed text-brand-100">
            {g.subtitle}
          </p>
        </div>
        <div aria-hidden className="mt-14 h-10 bg-bg [clip-path:ellipse(120%_100%_at_50%_100%)]" />
      </section>

      {/* Masonry gallery */}
      <section className="section-pad bg-bg">
        <div className="container-pm">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {photos.map((p, i) => (
              <Reveal
                key={p.caption}
                kind="up"
                delay={(i % 3) * 0.06}
                className="group relative mb-4 block break-inside-avoid overflow-hidden rounded-2xl"
              >
                <Image
                  src={sized(p.id, { w: p.w, h: p.h, q: 82 })}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-950/75 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="pointer-events-none absolute bottom-4 left-4 translate-y-2 font-display text-sm font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.caption}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
