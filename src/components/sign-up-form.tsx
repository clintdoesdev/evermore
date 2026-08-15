"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ButtonEl } from "@/components/button";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
};

const initialState: FormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

const REDIRECT_TARGET = "/payment";

export function SignUpForm() {
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

    if (!values.name.trim() || values.name.trim().length < 2) {
      next.name = "Enter your full name.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email)) {
      next.email = "Enter a valid email address.";
    }

    if (values.password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }

    if (values.confirmPassword !== values.password) {
      next.confirmPassword = "Passwords do not match.";
    }

    if (!values.agree) {
      next.agree = "You must agree to the Terms to continue.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // No backend is wired up yet — this simulates account creation
    // and hands the new member off to the membership/payment flow.
    window.setTimeout(() => {
      router.push(REDIRECT_TARGET);
    }, 700);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <Field
        label="Full name"
        htmlFor="name"
        error={errors.name}
      >
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Ada Lovelace"
          aria-invalid={Boolean(errors.name)}
          className={inputClass(Boolean(errors.name))}
        />
      </Field>

      <Field label="Email address" htmlFor="email" error={errors.email}>
        <input
          id="email"
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

      <Field label="Password" htmlFor="password" error={errors.password}>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          onChange={(e) => update("password", e.target.value)}
          placeholder="At least 8 characters"
          aria-invalid={Boolean(errors.password)}
          className={inputClass(Boolean(errors.password))}
        />
      </Field>

      <Field
        label="Confirm password"
        htmlFor="confirmPassword"
        error={errors.confirmPassword}
      >
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(e) => update("confirmPassword", e.target.value)}
          placeholder="Re-enter your password"
          aria-invalid={Boolean(errors.confirmPassword)}
          className={inputClass(Boolean(errors.confirmPassword))}
        />
      </Field>

      <div>
        <label className="flex items-start gap-3 text-sm text-white/70">
          <input
            type="checkbox"
            checked={values.agree}
            onChange={(e) => update("agree", e.target.checked)}
            aria-invalid={Boolean(errors.agree)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/25 bg-white/5 text-brand-green focus:ring-brand-green focus:ring-offset-0"
          />
          <span>
            I agree to Evermore&apos;s{" "}
            <Link href="/" className="font-semibold text-brand-mint hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/" className="font-semibold text-brand-mint hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.agree && (
          <p className="mt-1.5 text-xs font-medium text-red-400">{errors.agree}</p>
        )}
      </div>

      <ButtonEl type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "Creating your account…" : "Create Evermore account"}
      </ButtonEl>

      <p className="text-center text-xs text-white/45">
        By registering, your account details stay on this device only —
        no data is sent anywhere yet.
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
