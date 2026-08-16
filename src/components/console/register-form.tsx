"use client";

import { useActionState } from "react";
import { registerFromInvite, type RegisterState } from "@/app/portal/actions";
import { countries } from "@/lib/countries";

export function RegisterForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState<RegisterState, FormData>(
    registerFromInvite,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="token" value={token} />

      <Field label="Full name" htmlFor="name">
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          placeholder="Ada Lovelace"
        />
      </Field>

      <Field label="Username" htmlFor="username">
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          minLength={3}
          maxLength={32}
          pattern="[a-zA-Z0-9_.]{3,32}"
          className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          placeholder="ada_lovelace"
        />
      </Field>

      <Field label="Email address" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          placeholder="you@example.com"
        />
      </Field>

      <Field label="Phone number" htmlFor="phone">
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          placeholder="+234 800 000 0000"
        />
      </Field>

      <Field label="Country" htmlFor="country">
        <select
          id="country"
          name="country"
          required
          defaultValue=""
          className="glass-input w-full appearance-none rounded-xl px-4 py-3 text-sm outline-none"
        >
          <option value="" disabled>
            Select your country
          </option>
          {countries.map((c) => (
            <option key={c} value={c} className="bg-surface-1 text-white">
              {c}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Password" htmlFor="password">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          placeholder="At least 8 characters"
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
        className="w-full rounded-xl bg-gradient-to-r from-brand-green to-brand-mint px-6 py-3 text-sm font-semibold text-brand-navy transition-opacity disabled:opacity-60"
      >
        {pending ? "Creating your account…" : "Create my account"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-white/85">
        {label}
      </label>
      {children}
    </div>
  );
}
