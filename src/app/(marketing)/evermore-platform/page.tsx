import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/button";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "The Evermore Platform: AI Training, Jobs & Mentorship",
  description:
    "The Evermore platform is where members get paid to train EverAI, unlock remote job alerts, get personal mentorship, join free predictions, and learn at Evermore Academy — all in one place.",
  alternates: {
    canonical: "/evermore-platform",
  },
  openGraph: {
    title: "The Evermore Platform: AI Training, Jobs & Mentorship",
    description:
      "The Evermore platform is where members get paid to train EverAI, unlock remote job alerts, get personal mentorship, join free predictions, and learn at Evermore Academy — all in one place.",
    url: "/evermore-platform",
  },
};

const pillars = [
  {
    title: "EverAI training tasks",
    description:
      "Complete simple AI training tasks on the Evermore platform — correcting responses, improving comprehension — and earn hourly rewards.",
  },
  {
    title: "Remote job alerts",
    description:
      "The platform surfaces global remote job opportunities sourced by EverAI, many paying up to $18.60/hour with no experience required.",
  },
  {
    title: "Personal mentorship",
    description:
      "Every member of the Evermore platform is assigned a personal mentor immediately after joining to guide them through every feature.",
  },
  {
    title: "Predictions & rewards",
    description:
      "Make free predictions on trending entertainment and events directly on the platform for a chance to win real prizes.",
  },
  {
    title: "Evermore Academy",
    description:
      "Access paid skills training in Financial Market Trading, AI Automation, Copywriting, and Content Creation from the same platform.",
  },
  {
    title: "Member dashboard",
    description:
      "Track your activation status, login details, and rewards from a single member dashboard once you're part of the platform.",
  },
];

const steps = [
  {
    number: "01",
    title: "Get an invite",
    description:
      "Access to the Evermore platform starts with an invite link from an admin or an existing member.",
  },
  {
    number: "02",
    title: "Register your account",
    description:
      "Create your account with your full name, username, email, phone number, and country.",
  },
  {
    number: "03",
    title: "Meet your mentor",
    description:
      "A personal mentor is assigned to walk you through the platform's features and earning opportunities.",
  },
  {
    number: "04",
    title: "Start earning",
    description:
      "Train EverAI, browse remote jobs, join predictions, and learn at Evermore Academy from your dashboard.",
  },
];

const platformFaq: FaqItem[] = [
  {
    question: "What is the Evermore platform?",
    answer:
      "The Evermore platform is the technology ecosystem behind EverAI, our Generative AI assistant. It lets members get paid to help train EverAI, access global remote job alerts, receive personal mentorship, join free prediction games, and learn income-generating skills at Evermore Academy — all from one account.",
  },
  {
    question: "Is the Evermore platform free to join?",
    answer:
      "Creating an Evermore platform account is free. A membership plan unlocks full access to EverAI training tasks, remote job alerts, mentorship, predictions, and Evermore Academy.",
  },
  {
    question: "How do I access the Evermore platform?",
    answer:
      "You'll need an invite link from an Evermore admin or existing member. Once you register, you can log back into the platform anytime with your username and password.",
  },
  {
    question: "Is the Evermore platform legit?",
    answer:
      "Yes. Evermore is an official, invite-based platform. Every member gets a personal mentor and a dashboard where account activation and rewards are tracked transparently.",
  },
  {
    question: "What devices does the Evermore platform work on?",
    answer:
      "The Evermore platform runs entirely in your browser and works on any phone, tablet, or computer — no separate app download is required.",
  },
];

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "The Evermore Platform",
  url: `${siteConfig.url}/evermore-platform`,
  description:
    "The Evermore platform is where members get paid to train EverAI, unlock remote job alerts, get personal mentorship, join free predictions, and learn at Evermore Academy.",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: { "@id": `${siteConfig.url}/#organization` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: platformFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function EvermorePlatformPage() {
  return (
    <>
      <Script
        id="platform-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <Script
        id="platform-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHeader
        eyebrow="The Evermore Platform"
        title="The Evermore Platform: One Account, Ever More Ways to Earn"
        description="The Evermore platform brings EverAI training rewards, remote job alerts, personal mentorship, predictions, and Evermore Academy together in one place."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Evermore Platform", href: "/evermore-platform" },
        ]}
      />

      <section className="bg-surface-0 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              What is the Evermore platform?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              The Evermore platform is the technology ecosystem built around{" "}
              <strong className="text-white">EverAI</strong>, our Generative
              AI assistant. Instead of scattering AI training, remote work,
              mentorship, entertainment predictions, and skills education
              across separate tools, the Evermore platform brings them into a
              single member account.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Every feature on the platform is designed around one idea:
              members shouldn&rsquo;t just use AI — they should be able to help
              build it, and get rewarded for doing so.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative bg-surface-1 py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-mint">
              Platform Features
            </span>
            <h2 className="font-display mt-4 text-3xl font-semibold text-balance text-white sm:text-4xl">
              Everything included on the Evermore platform
            </h2>
          </Reveal>

          <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div className="glass-card h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-mint/30">
                  <h3 className="font-display text-base font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {pillar.description}
                  </p>
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
              How the Evermore platform works
            </h2>
          </Reveal>
          <StaggerGroup className="mt-10 space-y-5">
            {steps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="glass-card flex items-start gap-5 rounded-2xl p-6">
                  <span className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-mint text-base font-semibold text-brand-navy">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/65 sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1} className="mt-10 text-center">
            <Button href="/sign-up" size="lg">
              Join the Evermore Platform
            </Button>
            <p className="mt-4 text-sm text-white/50">
              Looking to use Evermore on your phone?{" "}
              <Link href="/evermore-app" className="font-semibold text-brand-mint hover:underline">
                See the Evermore app
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
              Evermore platform FAQ
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <FaqAccordion items={platformFaq} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
