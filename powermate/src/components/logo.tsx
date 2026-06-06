import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/lib/utils";
import { company } from "@/data/site";

/**
 * Brand lockup. The source asset (`/logo-powermate.png`) is a full square
 * lockup (mark + wordmark + tagline), which renders illegibly small at header
 * sizes. So we crop the image down to just the interlocking mark and, for the
 * `wordmark` variant, pair it with crisp live text.
 *
 * `tone` controls the text colour: `dark` for light surfaces (header),
 * `light` for dark surfaces (footer).
 */
export function Logo({
  locale,
  variant = "mark",
  tone = "dark",
  className,
}: {
  locale: Locale;
  variant?: "mark" | "wordmark";
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <Link
      href={localeHref(locale, "/")}
      aria-label={company.name}
      className={`inline-flex shrink-0 items-center gap-2.5 ${className ?? ""}`}
    >
      {/* Crop the full lockup down to the mark only */}
      <span className="relative block size-10 shrink-0 overflow-hidden">
        <Image
          src="/logo-powermate.png"
          alt=""
          width={500}
          height={500}
          priority
          className="absolute left-1/2 -top-1.75 h-18 w-18 max-w-none -translate-x-1/2 object-contain"
        />
      </span>
      {variant === "wordmark" && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-lg font-extrabold tracking-tight ${
              light ? "text-white" : "text-ink"
            }`}
          >
            POWER MATE
          </span>
          <span
            className={`font-display text-[0.7rem] font-semibold tracking-[0.22em] ${
              light ? "text-brand-200" : "text-brand-700"
            }`}
          >
            INVESTMENT
          </span>
        </span>
      )}
    </Link>
  );
}
