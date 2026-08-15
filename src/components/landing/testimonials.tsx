import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";

const testimonials = [
  {
    quote:
      "Registering on Evermore took less time than making coffee. The dashboard is clean and I actually use it every day.",
    name: "Amara O.",
    role: "Evermore member",
  },
  {
    quote:
      "I read the how-to-register guide, signed up, and picked the annual plan in one sitting. Genuinely the smoothest onboarding I've used.",
    name: "Daniel K.",
    role: "Evermore member",
  },
  {
    quote:
      "What sold me was how transparent the membership page is — plans, pricing, everything laid out before I paid a cent.",
    name: "Priya S.",
    role: "Evermore member",
  },
];

export function Testimonials() {
  return (
    <section className="bg-brand-cloud py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Member Voices"
          title="People who registered on Evermore"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-3xl border border-black/8 bg-white p-7"
            >
              <div aria-hidden="true" className="flex gap-1 text-brand-green">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5Z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-brand-ink/70 sm:text-base">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-brand-ink">
                {t.name}
                <span className="block text-xs font-normal text-brand-ink/50">
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
