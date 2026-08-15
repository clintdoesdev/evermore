import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";

const steps = [
  {
    number: "01",
    title: "Visit the Sign Up page",
    description:
      "Head to the Evermore sign up page and enter your name, email, and a secure password.",
  },
  {
    number: "02",
    title: "Confirm your details",
    description:
      "Double-check your information, agree to the terms, and submit your Evermore registration.",
  },
  {
    number: "03",
    title: "Choose your membership",
    description:
      "Pick the Evermore plan that fits you on the membership page and complete secure checkout.",
  },
  {
    number: "04",
    title: "Exist beyond the moment",
    description:
      "You're in. Log in anytime to access your Evermore dashboard and everything your membership unlocks.",
  },
];

export function HowItWorksTeaser() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Getting Started"
              title="How to register on Evermore"
              align="left"
              description="Creating an Evermore account takes less than five minutes. Here's exactly what happens when you register."
            />
            <div className="mt-8">
              <Button href="/how-to-register" variant="secondary">
                Read the full registration guide
              </Button>
            </div>
          </div>

          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {steps.map((step) => (
              <li
                key={step.number}
                className="rounded-2xl border border-black/8 bg-brand-cloud/60 p-6"
              >
                <span className="font-display text-2xl font-semibold text-brand-green-dark">
                  {step.number}
                </span>
                <h3 className="font-display mt-3 text-base font-semibold text-brand-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink/60">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
