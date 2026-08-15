"use client";

import { useMemo, useState, type FormEvent } from "react";
import { PlanPicker } from "./plan-picker";
import { ButtonEl } from "@/components/button";
import { plans, type Plan } from "@/lib/plans";

type BillingState = {
  fullName: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

const initialBilling: BillingState = {
  fullName: "",
  email: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function PaymentFlow() {
  const [planId, setPlanId] = useState<Plan["id"]>("annual");
  const [billing, setBilling] = useState<BillingState>(initialBilling);
  const [errors, setErrors] = useState<Partial<Record<keyof BillingState, string>>>({});
  const [status, setStatus] = useState<"idle" | "processing" | "preview">("idle");

  const plan = useMemo(() => plans.find((p) => p.id === planId)!, [planId]);

  function update<K extends keyof BillingState>(key: K, raw: string) {
    const value =
      key === "cardNumber"
        ? formatCardNumber(raw)
        : key === "expiry"
          ? formatExpiry(raw)
          : key === "cvc"
            ? raw.replace(/\D/g, "").slice(0, 4)
            : raw;
    setBilling((b) => ({ ...b, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof BillingState, string>> = {};
    if (!billing.fullName.trim()) next.fullName = "Enter the name on your card.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(billing.email)) next.email = "Enter a valid email address.";
    if (billing.cardNumber.replace(/\s/g, "").length < 16)
      next.cardNumber = "Enter a 16-digit card number.";
    if (billing.expiry.length < 5) next.expiry = "Enter a valid expiry (MM/YY).";
    if (billing.cvc.length < 3) next.cvc = "Enter a valid CVC.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("processing");
    window.setTimeout(() => setStatus("preview"), 800);
  }

  return (
    <div>
      <PlanPicker selected={planId} onSelect={setPlanId} />

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl border border-black/8 bg-white p-7 sm:p-9">
          {status === "preview" ? (
            <SuccessPreview plan={plan} onReset={() => setStatus("idle")} />
          ) : (
            <form noValidate onSubmit={handleSubmit} className="space-y-5">
              <h2 className="font-display text-lg font-semibold text-brand-ink">
                Billing details
              </h2>

              <Field label="Name on card" htmlFor="fullName" error={errors.fullName}>
                <input
                  id="fullName"
                  autoComplete="cc-name"
                  value={billing.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Ada Lovelace"
                  className={inputClass(Boolean(errors.fullName))}
                />
              </Field>

              <Field label="Email address" htmlFor="billingEmail" error={errors.email}>
                <input
                  id="billingEmail"
                  type="email"
                  autoComplete="email"
                  value={billing.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass(Boolean(errors.email))}
                />
              </Field>

              <Field label="Card number" htmlFor="cardNumber" error={errors.cardNumber}>
                <input
                  id="cardNumber"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={billing.cardNumber}
                  onChange={(e) => update("cardNumber", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className={inputClass(Boolean(errors.cardNumber))}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry" htmlFor="expiry" error={errors.expiry}>
                  <input
                    id="expiry"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    value={billing.expiry}
                    onChange={(e) => update("expiry", e.target.value)}
                    placeholder="MM/YY"
                    className={inputClass(Boolean(errors.expiry))}
                  />
                </Field>
                <Field label="CVC" htmlFor="cvc" error={errors.cvc}>
                  <input
                    id="cvc"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={billing.cvc}
                    onChange={(e) => update("cvc", e.target.value)}
                    placeholder="123"
                    className={inputClass(Boolean(errors.cvc))}
                  />
                </Field>
              </div>

              <ButtonEl
                type="submit"
                size="lg"
                className="w-full"
                disabled={status === "processing"}
              >
                {status === "processing"
                  ? "Processing…"
                  : `Pay ${plan.price}${plan.period} securely`}
              </ButtonEl>

              <p className="flex items-center justify-center gap-2 text-center text-xs text-brand-ink/45">
                <LockIcon />
                Payments are encrypted. Card details never touch our servers.
              </p>
            </form>
          )}
        </div>

        <OrderSummary plan={plan} />
      </div>
    </div>
  );
}

function OrderSummary({ plan }: { plan: Plan }) {
  return (
    <aside className="h-fit rounded-3xl border border-black/8 bg-brand-navy p-7 text-white sm:p-8">
      <h2 className="font-display text-lg font-semibold">Order summary</h2>
      <div className="mt-5 flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <p className="font-semibold">Evermore — {plan.name}</p>
          <p className="text-xs text-white/50">{plan.billedAs}</p>
        </div>
        <p className="font-display text-xl font-semibold">
          {plan.price}
          <span className="text-xs font-medium text-white/50">{plan.period}</span>
        </p>
      </div>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between text-white/60">
          <dt>Subtotal</dt>
          <dd>{plan.price}</dd>
        </div>
        <div className="flex justify-between text-white/60">
          <dt>Taxes</dt>
          <dd>Calculated at checkout</dd>
        </div>
        <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold">
          <dt>Total due today</dt>
          <dd className="text-brand-mint">{plan.price}</dd>
        </div>
      </dl>

      <ul className="mt-6 space-y-2 border-t border-white/10 pt-6 text-xs text-white/50">
        <li>✓ Cancel or switch plans anytime</li>
        <li>✓ 7-day money-back guarantee</li>
        <li>✓ Instant access after checkout</li>
      </ul>
    </aside>
  );
}

function SuccessPreview({ plan, onReset }: { plan: Plan; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-brand-green-dark">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <path
            d="M5 13.5 10.5 19 21 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h2 className="font-display text-xl font-semibold text-brand-ink">
        Checkout preview complete
      </h2>
      <p className="max-w-sm text-sm leading-relaxed text-brand-ink/60">
        This is a demo checkout for the {plan.name} plan. Live payment
        processing isn&apos;t connected yet — no card was charged. Once
        billing is enabled, this step will hand off to secure Paystack
        checkout.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 text-sm font-semibold text-brand-blue hover:underline"
      >
        Edit billing details
      </button>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-brand-ink">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-brand-ink placeholder:text-brand-ink/35 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 ${
    hasError ? "border-red-400" : "border-black/12"
  }`;
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="2" y="5.5" width="8" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 5.5V4a2.5 2.5 0 0 1 5 0v1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
