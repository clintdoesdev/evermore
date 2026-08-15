"use client";

import { useActionState } from "react";
import { memberLogin, type MemberLoginState } from "@/app/portal/actions";

export function MemberLoginForm() {
  const [state, action, pending] = useActionState<MemberLoginState, FormData>(
    memberLogin,
    undefined,
  );

  return (
    <form action={action} className="space-y-5">
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
          autoComplete="current-password"
          required
          className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
          placeholder="••••••••"
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
        {pending ? "Signing in…" : "Log In"}
      </button>
    </form>
  );
}
