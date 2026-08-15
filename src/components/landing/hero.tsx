"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import heroPoster from "../../../public/images/hero-poster.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  return (
    <section className="bg-brand-gradient relative overflow-hidden text-white">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="animate-glow-pulse pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-brand-green/25 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="animate-glow-pulse pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-brand-mint/20 blur-3xl [animation-delay:1.5s]"
      />

      <Container className="relative grid grid-cols-1 items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-10 lg:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-mint backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-green" />
            </span>
            The Official Evermore Website
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display mt-6 text-4xl font-semibold leading-[1.08] text-balance sm:text-5xl lg:text-6xl"
          >
            <span className="text-gradient">Evermore</span> — Exist Beyond
            the Moment
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Evermore is the membership platform built for people who refuse
            to plateau. Register in minutes, unlock your dashboard, and turn
            every moment into momentum — ever more growth, ever more access,
            ever more you.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="/sign-up" size="lg">
              Join Evermore
              <ArrowIcon />
            </Button>
            <Button href="/how-to-register" variant="outline" size="lg">
              How to Register
            </Button>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {[
              ["Simple", "Registration"],
              ["Secure", "Checkout"],
              ["Anytime", "Cancellation"],
            ].map(([kicker, label]) => (
              <div key={label}>
                <dt className="font-display text-lg font-semibold text-brand-mint sm:text-xl">
                  {kicker}
                </dt>
                <dd className="mt-1 text-xs text-white/55 sm:text-sm">
                  {label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="animate-glow-pulse absolute inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-green/30 via-transparent to-brand-mint/20 blur-2xl"
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="overflow-hidden rounded-[2.25rem] border border-white/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]"
          >
            <Image
              src={heroPoster}
              alt="Evermore member holding the glowing Evermore infinity mark, representing the Evermore membership experience"
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 420px, 90vw"
              className="h-auto w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </Container>

      <div className="relative border-t border-white/8 py-6">
        <div className="animate-marquee flex w-max gap-16 whitespace-nowrap text-sm font-medium uppercase tracking-[0.2em] text-white/35">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              {["Ever Growing", "Ever Accessible", "Ever Secure", "Ever More Community", "Exist Beyond the Moment"].map(
                (word) => (
                  <span key={word} className="flex items-center gap-16">
                    {word}
                    <span className="h-1 w-1 rounded-full bg-brand-green/60" />
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
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
