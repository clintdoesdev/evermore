"use client";

import { motion } from "motion/react";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { GlassCardMockup } from "./glass-card-mockup";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The /how-to-register page's own hero — same bg-brand-gradient / breadcrumb / eyebrow language
 * as the shared PageHeader (which this replaces on that page only), but two-column so the copy
 * sits next to a looping glass membership-card mockup (see GlassCardMockup) — the payoff the
 * page's six steps are building toward.
 */
export function RegisterHero({
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
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="animate-glow-pulse pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-brand-green/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-glow-pulse pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-mint/15 blur-3xl [animation-delay:1.5s]"
      />

      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <Breadcrumbs items={breadcrumbs} />
          <Reveal delay={0.05}>
            {eyebrow && (
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-mint">
                {eyebrow}
              </span>
            )}
            <h1 className="font-display mt-5 max-w-xl text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                {description}
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/sign-up" size="lg">
                Go to Sign Up
                <ArrowIcon />
              </Button>
              <Button href="#step-1" variant="outline" size="lg">
                Walk through the steps
              </Button>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="animate-glow-pulse absolute inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-green/30 via-transparent to-brand-mint/20 blur-2xl"
          />
          <GlassCardMockup />
        </motion.div>
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
