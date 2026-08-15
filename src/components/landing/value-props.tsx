import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";

const props = [
  {
    title: "Ever Growing",
    description:
      "Evermore membership is built around continuous progress — tools, drops, and resources that evolve with you instead of expiring after one moment.",
    icon: (
      <path
        d="M4 20V10m8 10V4m8 16v-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
  },
  {
    title: "Ever Accessible",
    description:
      "Your Evermore account travels with you. Register once and access your membership from any device, anywhere, anytime.",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Ever Secure",
    description:
      "From sign up to checkout, every step of the Evermore experience is designed with clear, transparent, and secure flows.",
    icon: (
      <path
        d="M12 3l7 3v6c0 4.6-3 7.9-7 9-4-1.1-7-4.4-7-9V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Ever More Community",
    description:
      "Join a growing circle of Evermore members exchanging wins, resources, and momentum — together, beyond the moment.",
    icon: (
      <>
        <circle cx="8" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M2.5 20c.7-3 3-5 5.5-5s4.8 2 5.5 5M10.5 20c.7-3 3-5 5.5-5s4.8 2 5.5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </>
    ),
  },
];

export function ValueProps() {
  return (
    <section className="bg-brand-cloud py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why Evermore"
          title="One membership. Ever more ways to grow."
          description="Evermore was built on a simple idea: a single moment of momentum shouldn't fade. Every feature on the Evermore website is designed to keep you moving forward."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {props.map((prop) => (
            <div
              key={prop.title}
              className="group rounded-3xl border border-black/8 bg-white p-7 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-[0_20px_40px_-24px_rgba(24,61,142,0.35)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/8 text-brand-blue transition-colors group-hover:bg-brand-green/15 group-hover:text-brand-green-dark">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {prop.icon}
                </svg>
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold text-brand-ink">
                {prop.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink/60">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
