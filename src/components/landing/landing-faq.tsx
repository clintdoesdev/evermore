import Script from "next/script";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";

export const landingFaqItems: FaqItem[] = [
  {
    question: "What is Evermore?",
    answer:
      "Evermore is a membership platform designed to help you keep growing beyond a single moment. Once you register on the Evermore website, you get access to your member dashboard, tools, and everything included in your plan.",
  },
  {
    question: "Is this the official Evermore website?",
    answer:
      "Yes. This is the official Evermore website, home to the landing page, registration guide, sign up form, and membership plans.",
  },
  {
    question: "How do I register on Evermore?",
    answer:
      "Go to the Sign Up page, enter your name, email, and password, then submit the form. For a full walkthrough with screenshots and tips, visit our How to Register page.",
  },
  {
    question: "How much does Evermore membership cost?",
    answer:
      "Evermore offers monthly, annual, and lifetime plans. Visit the membership page to compare pricing and choose the plan that fits you.",
  },
  {
    question: "Can I cancel my Evermore membership anytime?",
    answer:
      "Yes. Evermore memberships can be upgraded, downgraded, or cancelled at any time from your account dashboard.",
  },
];

export function LandingFaq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landingFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-white py-20 sm:py-24">
      <Script
        id="landing-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Evermore, answered"
          description="Common questions about the Evermore website, registration, and membership."
        />
        <div className="mt-12">
          <FaqAccordion items={landingFaqItems} />
        </div>
      </Container>
    </section>
  );
}
