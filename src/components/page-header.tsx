import { Container } from "@/components/container";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
}) {
  return (
    <section className="bg-brand-gradient relative overflow-hidden pb-16 pt-10 text-white sm:pb-20 sm:pt-14">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="animate-glow-pulse pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-green/20 blur-3xl"
      />
      <Container className="relative">
        <Breadcrumbs items={breadcrumbs} />
        <Reveal delay={0.05}>
          {eyebrow && (
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-mint">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display mt-5 max-w-3xl text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
