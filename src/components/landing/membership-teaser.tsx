import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { plans } from "@/lib/plans";

export function MembershipTeaser() {
  return (
    <section className="bg-brand-gradient relative overflow-hidden py-20 text-white sm:py-24">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal className="max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-mint">
              Membership
            </span>
            <h2 className="font-display mt-4 text-3xl font-semibold text-balance sm:text-4xl">
              Plans built to grow with you
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Every Evermore plan unlocks the full platform. Pay monthly,
              save with annual billing, or go lifetime — cancel or change
              anytime from your dashboard. All prices in Nigerian Naira.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/payment" size="lg">
                View membership plans
              </Button>
              <Button href="/sign-up" variant="outline" size="lg">
                Join Evermore
              </Button>
            </div>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
            {plans.map((plan) => (
              <StaggerItem key={plan.id}>
                <div
                  className={`h-full rounded-3xl border p-6 text-center transition-transform duration-300 hover:-translate-y-1.5 ${
                    plan.highlighted
                      ? "border-brand-green bg-gradient-to-b from-brand-green/15 to-transparent shadow-[0_24px_60px_-20px_rgba(34,197,94,0.5)]"
                      : "glass-card"
                  }`}
                >
                  {plan.highlighted && (
                    <span className="inline-block rounded-full bg-brand-green px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-navy">
                      Best Value
                    </span>
                  )}
                  <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-white/60">
                    {plan.name}
                  </p>
                  <p className="font-display mt-2 text-2xl font-semibold text-white sm:text-3xl">
                    {plan.price}
                    <span className="text-sm font-medium text-white/45">
                      {plan.period}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-white/45">{plan.billedAs}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
