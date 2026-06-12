"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Download } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { productTerms, productOrder, company, type ProductKey } from "@/data/site";
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
  const [rate, setRate] = useState(terms.minRate);

  // Keep inputs in range when product changes.
  function selectProduct(p: ProductKey) {
    setProduct(p);
    const t = productTerms[p];
    setAmount(Math.min(Math.max(50_000, Math.round(t.maxAmount * 0.3)), t.maxAmount));
    setMonths(Math.min(Math.round(t.maxMonths * 0.6) || 12, t.maxMonths));
    setRate(t.minRate);
  }

  const result = useMemo(
    () => emi(amount, rate, months),
    [amount, rate, months],
  );

  const amountId = useId();
  const termId = useId();
  const rateId = useId();

  async function downloadPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    const M = 40;
    const maroon: [number, number, number] = [124, 22, 35];
    const ink: [number, number, number] = [33, 28, 28];
    const gray: [number, number, number] = [110, 105, 105];
    const money = (n: number) => "LKR " + Math.round(n).toLocaleString("en-US");
    // Built-in PDF font is Latin-only, so always label products in English.
    const enNames: Record<ProductKey, string> = {
      micro: "Micro Loan",
      sme: "SME Loan",
      agriculture: "Agriculture Loan",
      gold: "Gold Loan",
      leasing: "Leasing",
      insurance: "Insurance Solutions",
    };
    const productName = enNames[product];

    // Header band
    doc.setFillColor(...maroon);
    doc.rect(0, 0, W, 96, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("POWER MATE INVESTMENT", M, 50);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Strengthening Your Financial Power", M, 70);

    // Title
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Loan Estimate", M, 142);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.text(
      "Prepared on " +
        new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      M,
      160,
    );

    // Monthly payment highlight
    doc.setFillColor(248, 235, 236);
    doc.roundedRect(M, 182, W - M * 2, 80, 10, 10, "F");
    doc.setTextColor(...gray);
    doc.setFontSize(11);
    doc.text("Estimated monthly payment", M + 22, 212);
    doc.setTextColor(...maroon);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text(money(result.monthly) + "  / month", M + 22, 244);

    // Details
    let y = 306;
    const rows: [string, string][] = [
      ["Loan type", productName],
      ["Loan amount", money(amount)],
      ["Repayment period", months + " months"],
      ["Indicative annual rate", rate + "%"],
      ["Total interest", money(result.interest)],
      ["Total payable", money(result.total)],
    ];
    doc.setFontSize(11);
    for (const [label, value] of rows) {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gray);
      doc.text(label, M, y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...ink);
      doc.text(value, W - M, y, { align: "right" });
      doc.setDrawColor(232, 226, 226);
      doc.line(M, y + 11, W - M, y + 11);
      y += 30;
    }

    // Disclaimer
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    const disclaimer =
      "This is an indicative estimate only, calculated using the reducing-balance method. Final eligibility, rates and repayment terms are assessed individually and may vary with your personal credit rating, with specific terms and conditions for each risk profile.";
    doc.text(doc.splitTextToSize(disclaimer, W - M * 2), M, y);

    // Footer
    const fy = H - 72;
    doc.setDrawColor(...maroon);
    doc.setLineWidth(1.2);
    doc.line(M, fy, W - M, fy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...ink);
    doc.text("Power Mate Investment", M, fy + 20);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    doc.text(
      `Hotline ${company.hotline}    WhatsApp ${company.whatsapp}    ${company.email}`,
      M,
      fy + 36,
    );
    doc.text(company.address, M, fy + 50);

    doc.save(`Power-Mate-Loan-Estimate-${productName.replace(/\s+/g, "-")}.pdf`);
  }

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

            {/* Interest rate */}
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <label htmlFor={rateId} className="text-sm font-semibold text-ink">
                  {c.rateLabel}
                </label>
                <span className="font-display text-lg font-bold text-brand-700 tabular">
                  {rate}%
                </span>
              </div>
              <input
                id={rateId}
                type="range"
                min={0}
                max={100}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="pm-range"
              />
              <div className="flex justify-between text-xs text-ink-faint tabular">
                <span>0%</span>
                <span>100%</span>
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
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={localeHref(locale, `/contact?intent=apply&product=${product}`)}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-pill bg-white px-6 font-semibold text-brand-900 transition-transform hover:-translate-y-0.5"
                >
                  {c.applyCta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <button
                  type="button"
                  onClick={downloadPdf}
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-pill border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Download className="size-4" aria-hidden />
                  PDF
                </button>
              </div>
              <p className="text-xs leading-relaxed text-brand-100/90">{c.disclaimer}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
