"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Clickable photo grid + a simple, branded full-screen preview.
 * Click a photo to open it centered in a "Power Mate" frame; click anywhere
 * outside (or Esc) to close. No blur, no hover effects on the open image.
 */
export function GalleryLightbox({
  images,
  alt,
  caption,
}: {
  images: string[];
  alt: string;
  caption?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`View photo ${i + 1}`}
            className="group relative aspect-4/3 cursor-zoom-in overflow-hidden rounded-2xl bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${
                i === 0 ? "object-top" : "object-center"
              }`}
            />
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-900 flex items-center justify-center bg-[oklch(15%_0.01_18)] p-4 sm:p-6"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close preview"
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 transition-colors hover:bg-white/25 sm:right-6 sm:top-6"
          >
            <X className="size-5" aria-hidden />
          </button>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 transition-colors hover:bg-white/25 sm:left-6"
              >
                <ChevronLeft className="size-6" aria-hidden />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 transition-colors hover:bg-white/25 sm:right-6"
              >
                <ChevronRight className="size-6" aria-hidden />
              </button>
            </>
          )}

          {/* Power Mate frame */}
          <figure
            onClick={(e) => e.stopPropagation()}
            className="flex w-[min(92vw,860px)] flex-col overflow-hidden rounded-2xl bg-[oklch(20%_0.02_18)] shadow-2xl ring-1 ring-white/10"
          >
            <div className="relative h-[56vh] w-full sm:h-[66vh]">
              <Image
                src={images[index]}
                alt={alt}
                fill
                sizes="(max-width: 900px) 92vw, 860px"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 bg-(image:--grad-brand) px-5 py-3 text-white">
              <span className="flex items-center gap-2.5">
                <span
                  className="block size-7 shrink-0 rounded-md bg-white/95 bg-no-repeat"
                  style={{
                    backgroundImage: "url(/logo-powermate.png)",
                    backgroundSize: "190%",
                    backgroundPosition: "50% 20%",
                  }}
                  aria-hidden
                />
                <span className="font-display text-sm font-extrabold tracking-tight">
                  POWER MATE <span className="font-semibold text-brand-200">INVESTMENT</span>
                </span>
              </span>
              <span className="whitespace-nowrap text-xs text-brand-100">
                {caption ? `${caption} · ` : ""}
                {index + 1} / {images.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
