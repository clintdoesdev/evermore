import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

const pillars = [
  {
    title: "Generative AI, built with people",
    description:
      "EverAI is designed to understand human language, generate intelligent responses, and hold natural, human-like conversations — trained by real people, not just data.",
    icon: (
      <>
        <rect x="4" y="7" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="9" cy="13" r="1.2" fill="currentColor" />
        <circle cx="15" cy="13" r="1.2" fill="currentColor" />
      </>
    ),
  },
  {
    title: "A rewarding digital ecosystem",
    description:
      "Every AI training task you complete is combined with remote job access, mentorship, prediction games, and skills training — so contributing to AI also grows your income.",
    icon: (
      <path
        d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    ),
  },
];

export function EverAiIntro() {
  return (
    <section className="relative bg-surface-0 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <Container>
        <SectionHeading
          eyebrow="Who We Are"
          title="Evermore builds EverAI — and pays you to help"
          description="Evermore is a technology-driven company bridging the digital world and real-world opportunity. Our flagship product, EverAI, is a Generative AI assistant that gets smarter every time a member helps train it — and we share the reward."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <div className="glass-card h-full rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-mint/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-mint">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {pillar.icon}
                  </svg>
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {pillar.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.15} className="mt-8">
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-white/50">
            Our vision is simple: turn possibilities into experiences, and
            build what exists beyond the moment.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
