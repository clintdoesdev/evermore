"use client";

import { useActionState } from "react";
import { updateMember, type UpdateMemberState } from "@/app/admin/actions";
import { countries } from "@/lib/countries";

type MemberFormValues = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  country: string;
  paymentPlan: string | null;
  activationDate: string;
  loginDetails: string;
  customFieldsText: string;
};

export function MemberEditForm({ member }: { member: MemberFormValues }) {
  const [state, action, pending] = useActionState<UpdateMemberState, FormData>(
    updateMember,
    undefined,
  );

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="id" value={member.id} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <input
            id="name"
            name="name"
            defaultValue={member.name}
            required
            className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          />
        </Field>
        <Field label="Username" htmlFor="username">
          <input
            id="username"
            name="username"
            defaultValue={member.username}
            required
            pattern="[a-zA-Z0-9_.]{3,32}"
            className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={member.email}
            required
            className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            defaultValue={member.phone}
            required
            className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          />
        </Field>
        <Field label="Country" htmlFor="country">
          <select
            id="country"
            name="country"
            defaultValue={member.country}
            required
            className="glass-input w-full appearance-none rounded-xl px-4 py-3 text-sm outline-none"
          >
            {countries.map((c) => (
              <option key={c} value={c} className="bg-surface-1 text-white">
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Payment plan" htmlFor="paymentPlan">
          <select
            id="paymentPlan"
            name="paymentPlan"
            defaultValue={member.paymentPlan ?? ""}
            className="glass-input w-full appearance-none rounded-xl px-4 py-3 text-sm outline-none"
          >
            <option value="" className="bg-surface-1 text-white">
              No plan set
            </option>
            <option value="MONTHLY" className="bg-surface-1 text-white">
              Monthly
            </option>
            <option value="ANNUAL" className="bg-surface-1 text-white">
              Annual
            </option>
            <option value="LIFETIME" className="bg-surface-1 text-white">
              Lifetime
            </option>
          </select>
        </Field>
      </div>

      <Field
        label="Activation date"
        htmlFor="activationDate"
        hint="Shown to the member on their dashboard as when their account will be activated."
      >
        <input
          id="activationDate"
          name="activationDate"
          type="date"
          defaultValue={member.activationDate}
          className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
        />
      </Field>

      <Field
        label="Login details"
        htmlFor="loginDetails"
        hint="Free text shown on the member's dashboard once set — e.g. platform credentials."
      >
        <textarea
          id="loginDetails"
          name="loginDetails"
          rows={3}
          defaultValue={member.loginDetails}
          className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          placeholder="e.g. Trading platform login: user123 / temp-pass-456"
        />
      </Field>

      <Field
        label="Custom fields"
        htmlFor="customFieldsText"
        hint={'One per line, formatted as "Label: Value" — e.g. "Referral: Jane Doe"'}
      >
        <textarea
          id="customFieldsText"
          name="customFieldsText"
          rows={4}
          defaultValue={member.customFieldsText}
          className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          placeholder={"Referral: Jane Doe\nSource: Instagram"}
        />
      </Field>

      {state?.error && (
        <p className="text-sm font-medium text-red-400" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-gradient-to-r from-brand-green to-brand-mint px-6 py-3 text-sm font-semibold text-brand-navy transition-opacity disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-white/85">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-white/40">{hint}</p>}
    </div>
  );
}
