import { Container } from "@/components/container";
import { Button } from "@/components/button";

const plans = [
  { name: "Monthly", price: "$19", period: "/mo" },
  { name: "Annual", price: "$15", period: "/mo", highlighted: true, note: "Billed yearly" },
  { name: "Lifetime", price: "$499", period: " once" },
];

export function MembershipTeaser() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient py-20 text-white sm:py-24">
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-mint">
              Membership
            </span>
            <h2 className="font-display mt-4 text-3xl font-semibold text-balance sm:text-4xl">
              Plans built to grow with you
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Every Evermore plan unlocks the full platform. Pay monthly,
              save with annual billing, or go lifetime — cancel or change
              anytime from your dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/payment" size="lg">
                View membership plans
              </Button>
              <Button href="/sign-up" variant="outline" size="lg">
                Join Evermore
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl border p-6 text-center transition-transform hover:-translate-y-1 ${
                  plan.highlighted
                    ? "border-brand-green bg-white text-brand-navy shadow-[0_20px_50px_-15px_rgba(34,197,94,0.5)]"
                    : "border-white/15 bg-white/5 text-white"
                }`}
              >
                {plan.highlighted && (
                  <span className="inline-block rounded-full bg-brand-green px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-navy">
                    Best Value
                  </span>
                )}
                <p
                  className={`mt-3 text-sm font-semibold uppercase tracking-wide ${
                    plan.highlighted ? "text-brand-blue-dark" : "text-white/70"
                  }`}
                >
                  {plan.name}
                </p>
                <p className="font-display mt-2 text-3xl font-semibold">
                  {plan.price}
                  <span
                    className={`text-sm font-medium ${
                      plan.highlighted ? "text-brand-navy/60" : "text-white/50"
                    }`}
                  >
                    {plan.period}
                  </span>
                </p>
                {plan.note && (
                  <p
                    className={`mt-1 text-xs ${
                      plan.highlighted ? "text-brand-navy/50" : "text-white/50"
                    }`}
                  >
                    {plan.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
