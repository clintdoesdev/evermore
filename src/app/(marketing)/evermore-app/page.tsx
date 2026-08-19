import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/container";
import { AppHero } from "@/components/landing/app-hero";
import { Button } from "@/components/button";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "The Evermore App — Install on Any Phone or Computer",
  description:
    "Get the Evermore app on iPhone, Android, or desktop. No app store required — install Evermore straight from your browser to train EverAI, track jobs, and manage rewards from your home screen.",
  alternates: {
    canonical: "/evermore-app",
  },
  openGraph: {
    title: "The Evermore App — Install on Any Phone or Computer",
    description:
      "Get the Evermore app on iPhone, Android, or desktop. No app store required — install Evermore straight from your browser to train EverAI, track jobs, and manage rewards from your home screen.",
    url: "/evermore-app",
  },
};

const installSteps = [
  {
    device: "iPhone / iPad (Safari)",
    steps: [
      "Open evermorewebsite.com.ng in Safari.",
      "Tap the Share icon at the bottom of the screen.",
      "Scroll down and tap \"Add to Home Screen.\"",
      "Tap \"Add\" — the Evermore app icon now appears on your home screen.",
    ],
  },
  {
    device: "Android (Chrome)",
    steps: [
      "Open evermorewebsite.com.ng in Chrome.",
      "Tap the three-dot menu in the top-right corner.",
      "Tap \"Install app\" or \"Add to Home screen.\"",
      "Confirm — the Evermore app now launches like any other app on your phone.",
    ],
  },
  {
    device: "Desktop (Chrome / Edge)",
    steps: [
      "Open evermorewebsite.com.ng in Chrome or Edge.",
      "Click the install icon in the address bar (or the browser menu).",
      "Click \"Install\" — Evermore opens in its own app window.",
    ],
  },
];

const appFeatures = [
  "Train EverAI and track your rewards",
  "Get remote job alerts as they open up",
  "Message your personal mentor",
  "Join free prediction games",
  "Access Evermore Academy lessons",
  "Works offline-friendly, straight from your home screen",
];

const appFaq: FaqItem[] = [
  {
    question: "Is there an Evermore app on the App Store or Google Play?",
    answer:
      "Evermore is currently a web app — you install it directly from your browser rather than an app store. It works exactly like a native app once added to your home screen, with no separate download required.",
  },
  {
    question: "How do I install the Evermore app?",
    answer:
      "On iPhone, open Evermore in Safari, tap Share, then \"Add to Home Screen.\" On Android, open Evermore in Chrome, tap the menu, then \"Install app.\" On desktop, click the install icon in your browser's address bar.",
  },
  {
    question: "Is the Evermore app free?",
    answer:
      "Yes, installing and creating an Evermore account is free. A membership plan unlocks full access to EverAI training, remote job alerts, mentorship, predictions, and Evermore Academy.",
  },
  {
    question: "Does the Evermore app work on both iPhone and Android?",
    answer:
      "Yes. The Evermore app works on iPhone, Android, and desktop computers, since it runs in your browser and installs directly to your home screen or desktop.",
  },
  {
    question: "Is the Evermore app safe to install?",
    answer:
      "Yes. The Evermore app is served securely over HTTPS directly from the official Evermore website, with no third-party app store installer required.",
  },
];

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Evermore",
  url: `${siteConfig.url}/evermore-app`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description:
    "The Evermore app lets members train EverAI, track remote job alerts, connect with a personal mentor, join predictions, and access Evermore Academy from any device.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: appFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function EvermoreAppPage() {
  return (
    <>
      <Script
        id="app-webapplication-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <Script
        id="app-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <AppHero
        eyebrow="The Evermore App"
        title="The Evermore App: Install on Any Device, No App Store Needed"
        description="Add Evermore to your home screen in a few taps and use it like a native app on your phone, tablet, or computer."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Evermore App", href: "/evermore-app" },
        ]}
      />

      <section className="bg-surface-0 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              What is the Evermore app?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              The Evermore app is a web app — you install it straight from
              your browser, with no App Store or Google Play download
              required. Once added to your home screen, it opens full-screen
              like any other app and gives you the same EverAI training,
              remote job alerts, mentorship, predictions, and Evermore
              Academy access as the full platform.
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="install-guide" className="relative scroll-mt-28 bg-surface-1 py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-mint">
              Install Guide
            </span>
            <h2 className="font-display mt-4 text-3xl font-semibold text-balance text-white sm:text-4xl">
              How to install the Evermore app
            </h2>
          </Reveal>

          <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {installSteps.map((group) => (
              <StaggerItem key={group.device}>
                <div className="glass-card h-full rounded-3xl p-6">
                  <h3 className="font-display text-base font-semibold text-white">
                    {group.device}
                  </h3>
                  <ol className="mt-4 space-y-3">
                    {group.steps.map((step, index) => (
                      <li key={step} className="flex items-start gap-3 text-sm text-white/65">
                        <span className="font-display flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-xs font-semibold text-brand-mint">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-surface-0 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              What you can do in the Evermore app
            </h2>
          </Reveal>
          <StaggerGroup className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {appFeatures.map((feature) => (
              <StaggerItem key={feature}>
                <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-mint">
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
                  <span className="text-sm text-white/75">{feature}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1} className="mt-10 text-center">
            <Button href="/sign-up" size="lg">
              Join Evermore Now
            </Button>
            <p className="mt-4 text-sm text-white/50">
              Prefer to read about everything the platform includes first?{" "}
              <Link href="/evermore-platform" className="font-semibold text-brand-mint hover:underline">
                See the Evermore platform
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative bg-surface-1 py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-center text-3xl font-semibold text-balance text-white sm:text-4xl">
              Evermore app FAQ
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <FaqAccordion items={appFaq} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
