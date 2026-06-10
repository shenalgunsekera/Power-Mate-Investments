"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { productTerms, productOrder, type ProductKey } from "@/data/site";
import { formatLKR, localeHref, cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const calcKeys = productOrder.filter((k) => k !== "insurance");

function emi(principal: number, annualRatePct: number, months: number) {
  if (months <= 0) return { monthly: 0, total: 0, interest: 0 };
  const r = annualRatePct / 12 / 100;
  if (r === 0) {
    const monthly = principal / months;
    return { monthly, total: principal, interest: 0 };
  }
  const pow = Math.pow(1 + r, months);
  const monthly = (principal * r * pow) / (pow - 1);
  const total = monthly * months;
  return { monthly, total, interest: total - principal };
}

export function LoanCalculator({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.calculator;
  const [product, setProduct] = useState<ProductKey>("sme");
  const terms = productTerms[product];

  const defaultAmount = Math.round(terms.maxAmount * 0.3);
  const [amount, setAmount] = useState(defaultAmount);
  const [months, setMonths] = useState(Math.round(terms.maxMonths * 0.6));

  // Keep inputs in range when product changes.
  function selectProduct(p: ProductKey) {
    setProduct(p);
    const t = productTerms[p];
    setAmount(Math.min(Math.max(50_000, Math.round(t.maxAmount * 0.3)), t.maxAmount));
    setMonths(Math.min(Math.round(t.maxMonths * 0.6) || 12, t.maxMonths));
  }

  const result = useMemo(
    () => emi(amount, terms.minRate, months),
    [amount, terms.minRate, months],
  );

  const amountId = useId();
  const termId = useId();

  return (
    <section id="calculator" className="section-pad-tight scroll-mt-20 bg-bg">
      <div className="container-pm">
        <SectionHeading
          kicker={c.eyebrow}
          title={c.title}
          subtitle={c.subtitle}
          align="center"
        />

        <Reveal as="div" kind="up" className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-3xl border border-line bg-white shadow-(--shadow-lg) lg:grid-cols-[1.15fr_0.85fr]">
          {/* Controls */}
          <div className="flex flex-col gap-7 p-7 sm:p-9">
            {/* Product chooser */}
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-1 text-sm font-semibold text-ink">{c.productLabel}</legend>
              <div className="flex flex-wrap gap-2">
                {calcKeys.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => selectProduct(k)}
                    aria-pressed={product === k}
                    className={cn(
                      "rounded-pill px-3.5 py-2 text-sm font-medium transition-colors",
                      product === k
                        ? "bg-brand-700 text-white shadow-(--shadow-brand)"
                        : "bg-brand-50 text-brand-800 hover:bg-brand-100",
                    )}
                  >
                    {dict.products.items[k].name}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Amount */}
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <label htmlFor={amountId} className="text-sm font-semibold text-ink">
                  {c.amountLabel}
                </label>
                <span className="font-display text-lg font-bold text-brand-700 tabular">
                  {formatLKR(amount, locale)}
                </span>
              </div>
              <input
                id={amountId}
                type="range"
                min={50_000}
                max={terms.maxAmount}
                step={10_000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pm-range"
              />
              <div className="flex justify-between text-xs text-ink-faint tabular">
                <span>{formatLKR(50_000, locale)}</span>
                <span>{formatLKR(terms.maxAmount, locale)}</span>
              </div>
            </div>

            {/* Term */}
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <label htmlFor={termId} className="text-sm font-semibold text-ink">
                  {c.termLabel}
                </label>
                <span className="font-display text-lg font-bold text-brand-700 tabular">
                  {months} {c.months}
                </span>
              </div>
              <input
                id={termId}
                type="range"
                min={3}
                max={terms.maxMonths}
                step={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="pm-range"
              />
              <div className="flex justify-between text-xs text-ink-faint tabular">
                <span>3 {c.months}</span>
                <span>
                  {terms.maxMonths} {c.months}
                </span>
              </div>
            </div>

          </div>

          {/* Result */}
          <div className="relative flex flex-col justify-between gap-6 bg-(image:--grad-brand) p-7 text-white sm:p-9">
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
            <div className="relative flex flex-col gap-1">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-100">
                <Calculator className="size-4" aria-hidden />
                {c.monthlyPayment}
              </span>
              <p className="font-display text-[clamp(2rem,5vw,2.75rem)] font-extrabold leading-tight tabular">
                {formatLKR(Math.round(result.monthly), locale)}
                <span className="ms-1 text-base font-semibold text-brand-100">{c.perMonth}</span>
              </p>
            </div>

            <dl className="relative flex flex-col gap-3 border-y border-white/20 py-5">
              <div className="flex items-center justify-between text-sm">
                <dt className="text-brand-100">{c.totalInterest}</dt>
                <dd className="font-semibold tabular">{formatLKR(Math.round(result.interest), locale)}</dd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <dt className="text-brand-100">{c.totalPayable}</dt>
                <dd className="font-semibold tabular">{formatLKR(Math.round(result.total), locale)}</dd>
              </div>
            </dl>

            <div className="relative flex flex-col gap-3">
              <Link
                href={localeHref(locale, `/contact?intent=apply&product=${product}`)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-white px-6 font-semibold text-brand-900 transition-transform hover:-translate-y-0.5"
              >
                {c.applyCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <p className="text-xs leading-relaxed text-brand-100/90">{c.disclaimer}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
