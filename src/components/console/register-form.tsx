"use client";

import { useActionState } from "react";
import { registerFromInvite, type RegisterState } from "@/app/portal/actions";

export function RegisterForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState<RegisterState, FormData>(
    registerFromInvite,
    undefined,
  );

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="token" value={token} />

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/85">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          placeholder="Ada Lovelace"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/85">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/85">
          Password
        </label>
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
      </div>

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
