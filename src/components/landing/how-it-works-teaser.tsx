import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

const steps = [
  {
    number: "01",
    title: "Visit the Sign Up page",
    description:
      "Head to the Evermore sign up page and enter your name, email, and a secure password.",
  },
  {
    number: "02",
    title: "Get matched with a mentor",
    description:
      "As soon as you're in, a personal mentor is assigned to guide you through EverAI training, jobs, and every earning opportunity.",
  },
  {
    number: "03",
    title: "Choose your membership",
    description:
      "Pick the Evermore plan that fits you on the membership page and complete secure checkout.",
  },
  {
    number: "04",
    title: "Start earning with EverAI",
    description:
      "Log in anytime to train EverAI, browse remote job alerts, join predictions, and access Evermore Academy from your dashboard.",
  },
];

export function HowItWorksTeaser() {
  return (
    <section className="bg-surface-0 py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Getting Started"
              title="How to register on Evermore"
              align="left"
              description="Creating an Evermore account takes less than five minutes — and puts you on the path to earning with EverAI. Here's exactly what happens when you register."
            />
            <Reveal delay={0.15} className="mt-8">
              <Button href="/how-to-register" variant="secondary">
                Read the full registration guide
              </Button>
            </Reveal>
          </div>

          <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {steps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="glass-card group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-mint/30">
                  <span className="font-display text-2xl font-semibold text-brand-mint">
                    {step.number}
                  </span>
                  <h3 className="font-display mt-3 text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
