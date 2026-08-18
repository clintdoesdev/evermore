import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { SignUpForm } from "@/components/sign-up-form";
import { Reveal } from "@/components/motion/reveal";

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
  "Earn hourly rewards training EverAI",
  "Global remote job alerts, up to $18.60/hour",
  "A personal mentor from day one",
  "Free predictions and Evermore Academy access",
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

      <section className="bg-surface-0 py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <Reveal className="order-2 lg:order-1">
            <div className="glass-card rounded-3xl p-7 sm:p-8">
              <h2 className="font-display text-lg font-semibold text-white">
                What you get with Evermore
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Everything you need to earn training EverAI and beyond, in
                one membership.
              </p>
              <ul className="mt-5 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-white/70">
                    <CheckIcon />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-sm text-white/60">
                New to Evermore?{" "}
                <Link
                  href="/how-to-register"
                  className="font-semibold text-brand-mint hover:underline"
                >
                  Read the full registration guide
                </Link>{" "}
                for a step-by-step walkthrough.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="glass-card rounded-3xl p-7 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] sm:p-9">
              <SignUpForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-mint">
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
