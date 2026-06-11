"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { productOrder, branches } from "@/data/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const phoneRe = /^(?:\+94|0)?[1-9]\d{8}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LeadForm({
  locale,
  dict,
  mode = "contact",
  defaultProduct,
}: {
  locale: Locale;
  dict: Dictionary;
  mode?: "contact" | "apply";
  defaultProduct?: string;
}) {
  const f = dict.form;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: Record<string, string>) {
    const e: Record<string, string> = {};
    if (!data.name?.trim()) e.name = f.errors.nameRequired;
    if (!data.phone?.trim()) e.phone = f.errors.phoneRequired;
    else if (!phoneRe.test(data.phone.replace(/\s/g, ""))) e.phone = f.errors.phoneInvalid;
    if (data.email?.trim() && !emailRe.test(data.email)) e.email = f.errors.emailInvalid;
    if (!data.consent) e.consent = f.errors.consentRequired;
    return e;
  }

  // The company's WhatsApp inbox (070 708 0033).
  const WHATSAPP_NUMBER = "94707080033";

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(
      [...fd.entries()].map(([k, v]) => [k, typeof v === "string" ? v : ""]),
    ) as Record<string, string>;
    data.consent = fd.get("consent") ? "yes" : "";

    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }

    const productName = data.product
      ? dict.products.items[data.product as keyof typeof dict.products.items]?.name ?? data.product
      : "";

    // Clean, structured WhatsApp message
    const lines = [
      `*${mode === "apply" ? "New loan application" : "New inquiry"} — Power Mate Investment*`,
      "",
      `*Name:* ${data.name}`,
      `*Phone:* ${data.phone}`,
      data.email ? `*Email:* ${data.email}` : "",
      productName ? `*Interested in:* ${productName}` : "",
      data.branch ? `*Preferred branch:* ${data.branch}` : "",
      data.amount ? `*Amount needed:* LKR ${data.amount}` : "",
      data.message ? `\n*Message:*\n${data.message}` : "",
    ].filter(Boolean);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;

    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-line bg-white p-10 text-center shadow-(--shadow-md)">
        <span className="flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="size-8" aria-hidden />
        </span>
        <h3 className="font-display text-2xl font-bold text-ink">{f.successTitle}</h3>
        <p className="max-w-sm text-ink-soft">{f.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-pill bg-brand-50 px-5 py-2.5 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-100"
        >
          {f.sendAnother}
        </button>
      </div>
    );
  }

  const fieldClass =
    "h-12 w-full rounded-xl border bg-white px-4 text-[0.95rem] outline-none transition-colors placeholder:text-ink-faint focus:ring-2 focus:ring-brand-200";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-3xl border border-line bg-white p-6 shadow-(--shadow-md) sm:p-8"
    >
      {status === "error" && (
        <div className="flex items-start gap-3 rounded-xl bg-danger/10 p-4 text-sm text-danger" role="alert">
          <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div>
            <p className="font-semibold">{f.errorTitle}</p>
            <p>{f.errorBody}</p>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.name} required error={errors.name}>
          <input name="name" type="text" placeholder={f.namePlaceholder}
            className={cn(fieldClass, errors.name ? "border-danger" : "border-line focus:border-brand-400")} />
        </Field>
        <Field label={f.phone} required error={errors.phone}>
          <input name="phone" type="tel" inputMode="tel" placeholder={f.phonePlaceholder}
            className={cn(fieldClass, errors.phone ? "border-danger" : "border-line focus:border-brand-400")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.email} optional={dict.common.optional} error={errors.email}>
          <input name="email" type="email" inputMode="email" placeholder={f.emailPlaceholder}
            className={cn(fieldClass, errors.email ? "border-danger" : "border-line focus:border-brand-400")} />
        </Field>
        <Field label={f.product}>
          <select name="product" defaultValue={defaultProduct ?? ""} className={cn(fieldClass, "border-line focus:border-brand-400")}>
            <option value="">{f.selectProduct}</option>
            {productOrder.map((p) => (
              <option key={p} value={p}>{dict.products.items[p].name}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.branch}>
          <select name="branch" defaultValue="" className={cn(fieldClass, "border-line focus:border-brand-400")}>
            <option value="">{f.selectBranch}</option>
            {branches.map((b) => (
              <option key={b.id} value={b.city}>{b.city}</option>
            ))}
          </select>
        </Field>
        <Field label={f.amount} optional={dict.common.optional}>
          <input name="amount" type="text" inputMode="numeric" placeholder="500,000"
            className={cn(fieldClass, "border-line focus:border-brand-400")} />
        </Field>
      </div>

      <Field label={f.message} optional={dict.common.optional}>
        <textarea name="message" rows={4} placeholder={f.messagePlaceholder}
          className={cn("w-full rounded-xl border bg-white p-4 text-[0.95rem] outline-none transition-colors placeholder:text-ink-faint focus:ring-2 focus:ring-brand-200 border-line focus:border-brand-400")} />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input name="consent" type="checkbox"
          className="mt-0.5 size-5 rounded border-line-strong text-brand-600 accent-brand-700" />
        <span>
          {f.consent}
          {errors.consent && <span className="mt-1 block text-danger">{errors.consent}</span>}
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-13 items-center justify-center gap-2 rounded-pill bg-(image:--grad-brand) px-7 font-semibold text-white shadow-(--shadow-brand) transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden />
            {dict.common.sending}
          </>
        ) : (
          <>
            <Send className="size-4.5" aria-hidden />
            {mode === "apply" ? f.submitApply : f.submitContact}
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-danger">*</span>}
        {optional && <span className="font-normal text-ink-faint">({optional})</span>}
      </label>
      {children}
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
