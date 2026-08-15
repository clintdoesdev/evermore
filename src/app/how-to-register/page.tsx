import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/button";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "How to Register on Evermore (Step-by-Step Guide)",
  description:
    "Learn how to register on Evermore in minutes. Follow this step-by-step guide covering sign up, account confirmation, and choosing your Evermore membership plan.",
  alternates: {
    canonical: "/how-to-register",
  },
  openGraph: {
    title: "How to Register on Evermore (Step-by-Step Guide)",
    description:
      "Learn how to register on Evermore in minutes. Follow this step-by-step guide covering sign up, account confirmation, and choosing your Evermore membership plan.",
    url: "/how-to-register",
  },
};

const steps = [
  {
    title: "Go to the Evermore Sign Up page",
    description:
      "From the Evermore website, click “Join Evermore” or “Sign Up” in the navigation menu. This takes you to the official Evermore registration form.",
  },
  {
    title: "Enter your name and email address",
    description:
      "Fill in your full name and a valid email address. Use an email you check regularly — it becomes your Evermore login.",
  },
  {
    title: "Create a secure password",
    description:
      "Choose a strong password for your Evermore account. We recommend at least 8 characters with a mix of letters, numbers, and symbols.",
  },
  {
    title: "Review your details and accept the terms",
    description:
      "Double-check your name and email, then check the box to agree to Evermore's Terms of Service and Privacy Policy.",
  },
  {
    title: "Submit your registration",
    description:
      "Click “Create Account.” Your Evermore registration is submitted instantly — no waiting, no manual approval.",
  },
  {
    title: "Choose your Evermore membership plan",
    description:
      "After registering, you'll be taken to the membership page to select a plan and complete secure checkout, unlocking full access to Evermore.",
  },
];

const registrationFaq: FaqItem[] = [
  {
    question: "Is it free to register on Evermore?",
    answer:
      "Creating your Evermore account is free. A paid membership plan is required to unlock full platform access, and you'll choose one right after registering.",
  },
  {
    question: "What if my email is already registered on Evermore?",
    answer:
      "If you see an “already registered” message during sign up, try logging in instead, or use the password reset option to regain access to your existing Evermore account.",
  },
  {
    question: "Can I register on Evermore from my phone?",
    answer:
      "Yes. The Evermore sign up form is fully responsive, so you can register from a phone, tablet, or desktop browser.",
  },
  {
    question: "How long does Evermore registration take?",
    answer:
      "Most people complete Evermore registration in under two minutes — it's just a name, email, and password.",
  },
  {
    question: "Can I change my details after registering on Evermore?",
    answer:
      "Yes, you can update your name, email, and password anytime from your Evermore account settings after logging in.",
  },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Register on Evermore",
  description:
    "A step-by-step guide to creating your Evermore account and choosing a membership plan.",
  totalTime: "PT3M",
  step: steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.description,
    url: `${siteConfig.url}/how-to-register#step-${index + 1}`,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: registrationFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HowToRegisterPage() {
  return (
    <>
      <Script
        id="howto-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Script
        id="howto-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHeader
        eyebrow="Registration Guide"
        title="How to Register on Evermore"
        description="Follow these six simple steps to create your Evermore account and start your membership — most people finish in under three minutes."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "How to Register", href: "/how-to-register" },
        ]}
      />

      <section className="bg-surface-0 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <StaggerGroup className="space-y-6">
            {steps.map((step, index) => (
              <StaggerItem key={step.title}>
                <div
                  id={`step-${index + 1}`}
                  className="glass-card scroll-mt-24 rounded-3xl p-6 transition-all duration-300 hover:border-brand-mint/30 sm:p-8"
                >
                  <div className="flex items-start gap-5">
                    <span className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-mint text-base font-semibold text-brand-navy">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="font-display text-lg font-semibold text-white sm:text-xl">
                        {step.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1} className="mt-10">
            <div className="rounded-3xl border border-brand-green/25 bg-brand-green/[0.06] p-8 text-center">
              <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">
                Ready to create your account?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/65 sm:text-base">
                Start your Evermore registration now — it only takes a
                couple of minutes.
              </p>
              <Button href="/sign-up" size="lg" className="mt-6">
                Go to Sign Up
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative bg-surface-1 py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
        <Container className="max-w-3xl">
          <h2 className="font-display text-center text-3xl font-semibold text-balance text-white sm:text-4xl">
            Registration FAQ
          </h2>
          <p className="mt-4 text-center text-base leading-relaxed text-white/65 sm:text-lg">
            Answers to common questions about registering on Evermore.
          </p>
          <Reveal delay={0.1} className="mt-12">
            <FaqAccordion items={registrationFaq} />
          </Reveal>
          <p className="mt-8 text-center text-sm text-white/50">
            Still have questions? Head back to the{" "}
            <Link href="/" className="font-semibold text-brand-mint hover:underline">
              Evermore homepage
            </Link>{" "}
            or explore{" "}
            <Link href="/payment" className="font-semibold text-brand-mint hover:underline">
              membership plans
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
