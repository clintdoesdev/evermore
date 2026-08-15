import { Container } from "@/components/container";
import { Button } from "@/components/button";

export function FinalCta() {
  return (
    <section className="bg-brand-navy py-20 sm:py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="font-display max-w-2xl text-3xl font-semibold text-balance text-white sm:text-4xl">
          Ready to exist beyond the moment?
        </h2>
        <p className="max-w-xl text-base text-white/70 sm:text-lg">
          Register on Evermore today and turn this moment into ever more
          momentum.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/sign-up" size="lg">
            Join Evermore Now
          </Button>
          <Button href="/how-to-register" variant="outline" size="lg">
            How to Register
          </Button>
        </div>
      </Container>
    </section>
  );
}
