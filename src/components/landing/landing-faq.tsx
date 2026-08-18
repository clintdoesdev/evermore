import Script from "next/script";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { Reveal } from "@/components/motion/reveal";

export const landingFaqItems: FaqItem[] = [
  {
    question: "What is Evermore?",
    answer:
      "Evermore is a technology-driven ecosystem built around EverAI, our Generative AI assistant. Members get paid to help train EverAI, plus get access to remote job alerts, personal mentorship, free prediction games, and Evermore Academy.",
  },
  {
    question: "What is EverAI?",
    answer:
      "EverAI is Evermore's flagship AI assistant — a Generative AI system built to understand prompts and generate intelligent, human-like responses. Like any advanced AI, it improves through real human feedback, which is where members come in.",
  },
  {
    question: "How do I get paid to train EverAI?",
    answer:
      "After you register, you'll get access to simple training tasks — helping EverAI understand prompts, correcting responses, and improving its language comprehension. Evermore rewards members hourly based on the quality and quantity of completed tasks.",
  },
  {
    question: "What remote job opportunities does Evermore offer?",
    answer:
      "EverAI automatically sources and filters remote work from around the world and notifies you when a suitable role opens up. Many roles pay up to $18.60/hour and require little or no prior experience.",
  },
  {
    question: "Do I get a mentor when I join?",
    answer:
      "Yes. Every subscriber is assigned a personal mentor immediately after joining, who helps you navigate AI training tasks, remote jobs, predictions, and every other feature on Evermore.",
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
    <section className="bg-surface-0 py-20 sm:py-24">
      <Script
        id="landing-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Evermore, answered"
          description="Common questions about Evermore, EverAI, and how the earning ecosystem works."
        />
        <Reveal delay={0.1} className="mt-12">
          <FaqAccordion items={landingFaqItems} />
        </Reveal>
      </Container>
    </section>
  );
}
