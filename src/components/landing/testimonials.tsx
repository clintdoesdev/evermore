import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

const testimonials = [
  {
    quote:
      "Registering on Evermore took less time than making coffee. The dashboard is clean and I actually use it every day.",
    name: "Amara O.",
    role: "Evermore member",
    initials: "AO",
  },
  {
    quote:
      "I read the how-to-register guide, signed up, and picked the annual plan in one sitting. Genuinely the smoothest onboarding I've used.",
    name: "Daniel K.",
    role: "Evermore member",
    initials: "DK",
  },
  {
    quote:
      "What sold me was how transparent the membership page is — plans, pricing, everything laid out before I paid a cent.",
    name: "Priya S.",
    role: "Evermore member",
    initials: "PS",
  },
];

export function Testimonials() {
  return (
    <section className="relative bg-surface-1 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <Container>
        <SectionHeading
          eyebrow="Member Voices"
          title="People who registered on Evermore"
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="glass-card flex h-full flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <div aria-hidden="true" className="flex gap-1 text-brand-mint">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5Z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/70 sm:text-base">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-mint text-xs font-bold text-brand-navy">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {t.name}
                    </span>
                    <span className="block text-xs font-normal text-white/45">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
