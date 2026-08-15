import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { Reveal } from "@/components/motion/reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-surface-1 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/15 blur-3xl"
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <Reveal>
          <h2 className="font-display max-w-2xl text-3xl font-semibold text-balance text-white sm:text-4xl">
            Ready to exist beyond the moment?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-base text-white/65 sm:text-lg">
            Register on Evermore today and turn this moment into ever more
            momentum.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/sign-up" size="lg">
            Join Evermore Now
          </Button>
          <Button href="/how-to-register" variant="outline" size="lg">
            How to Register
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
