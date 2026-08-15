import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { SignUpForm } from "@/components/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up for Evermore",
  description:
    "Create your free Evermore account. Sign up with your name, email, and password to start your Evermore membership today.",
  alternates: {
    canonical: "/sign-up",
  },
  openGraph: {
    title: "Sign Up for Evermore",
    description:
      "Create your free Evermore account. Sign up with your name, email, and password to start your Evermore membership today.",
    url: "/sign-up",
  },
};

const benefits = [
  "Instant access to your Evermore member dashboard",
  "Flexible monthly, annual, or lifetime plans",
  "Cancel or change your plan anytime",
  "Secure, straightforward checkout",
];

export default function SignUpPage() {
  return (
    <>
      <PageHeader
        eyebrow="Create Your Account"
        title="Sign Up for Evermore"
        description="Enter your details below to create your Evermore account. It takes less than two minutes."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Sign Up", href: "/sign-up" },
        ]}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="order-2 lg:order-1">
            <div className="rounded-3xl border border-black/8 bg-brand-cloud/60 p-7 sm:p-8">
              <h2 className="font-display text-lg font-semibold text-brand-ink">
                What you get with Evermore
              </h2>
              <ul className="mt-5 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-brand-ink/70">
                    <CheckIcon />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl bg-white p-5 text-sm text-brand-ink/60">
                New to Evermore?{" "}
                <Link
                  href="/how-to-register"
                  className="font-semibold text-brand-blue hover:underline"
                >
                  Read the full registration guide
                </Link>{" "}
                for a step-by-step walkthrough.
              </div>
            </div>
          </div>

          <div className="order-1 rounded-3xl border border-black/8 p-7 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)] sm:p-9 lg:order-2">
            <SignUpForm />
          </div>
        </Container>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green-dark">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M2 6.2 4.8 9 10 3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
