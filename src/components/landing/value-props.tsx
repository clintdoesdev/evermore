import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

const props = [
  {
    title: "Train EverAI & Earn",
    description:
      "Help EverAI understand prompts, correct responses, and improve language comprehension. Every completed training task earns you hourly rewards.",
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
    title: "Global Remote Jobs",
    description:
      "EverAI sources and filters remote work from around the world for you. Many roles pay up to $18.60/hour and need no prior experience.",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Personal Mentorship",
    description:
      "Every subscriber is assigned a personal mentor immediately after joining — guiding you through every feature and earning opportunity.",
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
    title: "Predictions & Rewards",
    description:
      "Make free predictions on trending reality TV, sports, and major events for a chance to win real prizes — while staying part of the conversation.",
    icon: (
      <>
        <path d="M5 20h14M7 20V11l5-6 5 6v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Evermore Academy",
    description:
      "Learn Financial Market Trading, AI Automation, Copywriting, and Content Creation from experienced professionals — and earn certifications that stick.",
    icon: (
      <path
        d="M2 8l10-4 10 4-10 4-10-4Zm4 2.4V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Ever More Community",
    description:
      "Join a growing circle of Evermore members exchanging wins, strategies, and momentum — together, beyond the moment.",
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
    <section className="relative bg-surface-1 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <Container>
        <SectionHeading
          eyebrow="The Evermore Ecosystem"
          title="One membership. Ever more ways to earn."
          description="Evermore combines Artificial Intelligence, remote work, education, mentorship, and rewards into one ecosystem — everything you need to learn, earn, and grow."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {props.map((prop) => (
            <StaggerItem key={prop.title}>
              <div className="glass-card group h-full rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-green/30 hover:shadow-[0_24px_50px_-24px_rgba(34,197,94,0.35)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-mint transition-colors group-hover:bg-brand-green/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {prop.icon}
                  </svg>
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold text-white">
                  {prop.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {prop.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
