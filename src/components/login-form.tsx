"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ButtonEl } from "@/components/button";

type FormState = {
  email: string;
  password: string;
  remember: boolean;
};

const initialState: FormState = {
  email: "",
  password: "",
  remember: true,
};

const REDIRECT_TARGET = "/";

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(values.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!values.password) {
      next.password = "Enter your password.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // No backend is wired up yet — this simulates authentication
    // before sending you back to the homepage.
    window.setTimeout(() => {
      router.push(REDIRECT_TARGET);
    }, 700);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <Field label="Email address" htmlFor="loginEmail" error={errors.email}>
        <input
          id="loginEmail"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          className={inputClass(Boolean(errors.email))}
        />
      </Field>

      <Field label="Password" htmlFor="loginPassword" error={errors.password}>
        <input
          id="loginPassword"
          name="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={(e) => update("password", e.target.value)}
          placeholder="Enter your password"
          aria-invalid={Boolean(errors.password)}
          className={inputClass(Boolean(errors.password))}
        />
      </Field>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-white/70">
          <input
            type="checkbox"
            checked={values.remember}
            onChange={(e) => update("remember", e.target.checked)}
            className="h-4 w-4 shrink-0 rounded border-white/25 bg-white/5 text-brand-green focus:ring-brand-green focus:ring-offset-0"
          />
          Remember me
        </label>
        <Link href="/" className="font-semibold text-brand-mint hover:underline">
          Forgot password?
        </Link>
      </div>

      <ButtonEl type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "Signing you in…" : "Log In"}
      </ButtonEl>

      <p className="text-center text-xs text-white/45">
        Account authentication isn&apos;t connected to a backend yet — this
        form is a working preview of the Evermore login flow.
      </p>
    </form>
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
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-white/85">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-red-400">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `glass-input w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
    hasError ? "border-red-400" : ""
  }`;
}
