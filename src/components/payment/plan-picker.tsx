"use client";

import { plans, type Plan } from "@/lib/plans";

export function PlanPicker({
  selected,
  onSelect,
}: {
  selected: Plan["id"];
  onSelect: (id: Plan["id"]) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {plans.map((plan) => {
        const isSelected = plan.id === selected;
        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => onSelect(plan.id)}
            aria-pressed={isSelected}
            className={`relative flex h-full flex-col rounded-3xl border p-6 text-left transition-all duration-200 ${
              isSelected
                ? "border-brand-green bg-white shadow-[0_24px_50px_-20px_rgba(34,197,94,0.45)] -translate-y-1"
                : "border-black/10 bg-white/60 hover:-translate-y-0.5 hover:border-brand-blue/30"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-6 rounded-full bg-brand-green px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-navy">
                Most Popular
              </span>
            )}
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-semibold text-brand-ink">
                {plan.name}
              </span>
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  isSelected
                    ? "border-brand-green bg-brand-green text-white"
                    : "border-black/20"
                }`}
              >
                {isSelected && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1.5 5.2 3.8 7.5 8.5 2.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>

            <p className="font-display mt-3 text-3xl font-semibold text-brand-ink">
              {plan.price}
              <span className="text-sm font-medium text-brand-ink/50">
                {plan.period}
              </span>
            </p>
            <p className="mt-1 text-xs font-medium text-brand-ink/45">
              {plan.billedAs}
            </p>
            <p className="mt-3 text-sm text-brand-ink/60">{plan.description}</p>

            <ul className="mt-5 space-y-2.5 border-t border-black/8 pt-5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-xs text-brand-ink/65 sm:text-sm">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-brand-green-dark"
                  >
                    <path
                      d="M2.5 7.2 5.3 10 11.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}
