import Image from "next/image";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import heroPoster from "../../../public/images/hero-poster.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 animate-float rounded-full bg-brand-green/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-10 h-80 w-80 animate-float rounded-full bg-brand-mint/20 blur-3xl [animation-delay:1.5s]"
      />

      <Container className="relative grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-10 lg:py-28">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-mint">
            The Official Evermore Website
          </span>

          <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
            Evermore — Exist Beyond the Moment
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            Evermore is the membership platform built for people who refuse
            to plateau. Register in minutes, unlock your dashboard, and turn
            every moment into momentum — ever more growth, ever more access,
            ever more you.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/sign-up" size="lg">
              Join Evermore
              <ArrowIcon />
            </Button>
            <Button href="/how-to-register" variant="outline" size="lg">
              How to Register
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              ["Simple", "Registration"],
              ["Secure", "Checkout"],
              ["Anytime", "Cancellation"],
            ].map(([kicker, label]) => (
              <div key={label}>
                <dt className="font-display text-lg font-semibold text-brand-mint sm:text-xl">
                  {kicker}
                </dt>
                <dd className="mt-1 text-xs text-white/60 sm:text-sm">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-green/30 via-transparent to-brand-mint/20 blur-2xl"
          />
          <div className="overflow-hidden rounded-[2.25rem] border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
            <Image
              src={heroPoster}
              alt="Evermore member holding the glowing Evermore infinity mark, representing the Evermore membership experience"
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 420px, 90vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8h9M8 3.5 12.5 8 8 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
