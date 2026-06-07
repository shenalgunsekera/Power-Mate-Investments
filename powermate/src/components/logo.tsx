import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/lib/utils";
import { company } from "@/data/site";

/**
 * Brand lockup. The source asset (`/logo-powermate.png`) is a full square
 * lockup (mark + wordmark + tagline) that renders illegibly small at header
 * sizes, so we crop it down to just the interlocking mark using a zoomed
 * background-image (predictable framing). The `wordmark` variant pairs the
 * mark with crisp live text.
 *
 * `tone`: `dark` text for light surfaces (header), `light` for dark (footer).
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
      {/* Mark only — zoom past the baked-in wordmark/tagline */}
      <span
        aria-hidden
        className="block size-10 shrink-0 bg-no-repeat"
        style={{
          backgroundImage: "url(/logo-powermate.png)",
          backgroundSize: "190%",
          backgroundPosition: "50% 20%",
        }}
      />
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
