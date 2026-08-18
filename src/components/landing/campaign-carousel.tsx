"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";

type Campaign = {
  id: string;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
};

const campaigns: Campaign[] = [
  {
    id: "everai-trainers",
    image: "/images/campaigns/everai-trainers.jpg",
    eyebrow: "AI Trainers Wanted",
    title: "Africa, Meet EverAI",
    description:
      "EverAI needs AI trainers to teach it human language, context, and interaction for better prompt responses — and pays you to do it.",
    cta: "Join us now",
    href: "/sign-up",
  },
  {
    id: "mentorship",
    image: "/images/campaigns/mentorship.jpg",
    eyebrow: "From Day One",
    title: "A Personal Mentor, Instantly",
    description:
      "You're assigned a personal mentor the moment you sign up on Evermore. Our products, services, and interface are never out of your reach.",
    cta: "Join us now",
    href: "/sign-up",
  },
  {
    id: "remote-jobs",
    image: "/images/campaigns/remote-jobs.jpg",
    eyebrow: "EverAI Does More",
    title: "Earn Up to $18.60/Hour",
    description:
      "Be the first to get remote job offers outsourced by EverAI. Simple remote tasks — no skills or experience needed.",
    cta: "Join us now",
    href: "/sign-up",
  },
  {
    id: "predictions",
    image: "/images/campaigns/predictions.jpg",
    eyebrow: "Predictions & Rewards",
    title: "Who Will Leave Next?",
    description:
      "Make free predictions on trending reality TV and stand a chance to get rewarded. Don't just watch with your time — earn with it.",
    cta: "Place your votes",
    href: "/sign-up",
  },
  {
    id: "academy",
    image: "/images/campaigns/academy.jpg",
    eyebrow: "Evermore Academy",
    title: "Master High-Income Skills",
    description:
      "Financial Market Trading, AI Automation, Copywriting, and Content Creation — build skills that continuously generate income.",
    cta: "Coming soon",
    href: "/sign-up",
  },
  {
    id: "essence",
    image: "/images/campaigns/the-essence.jpg",
    eyebrow: "The Essence",
    title: "Turning Possibilities Into Experiences",
    description:
      "Evermore is the bridge between possibilities and experiences — connecting imagination to reality.",
    cta: "Coming soon",
    href: "/sign-up",
  },
];

const RADIUS_X = 280;
const RADIUS_Y = 46;
const AUTO_ROTATE_MS = 4200;

function getCardTransform(index: number, activeIndex: number, count: number) {
  let offset = index - activeIndex;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;

  const angle = offset * ((2 * Math.PI) / count);
  const depth = (Math.cos(angle) + 1) / 2;

  return {
    x: Math.sin(angle) * RADIUS_X,
    y: -(1 - depth) * RADIUS_Y,
    scale: 0.56 + depth * 0.44,
    opacity: 0.3 + depth * 0.7,
    blur: (1 - depth) * 5,
    zIndex: Math.round(depth * 100),
  };
}

export function CampaignCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const count = campaigns.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduceMotion || isPaused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, AUTO_ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduceMotion, isPaused, count]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % count) + count) % count);
  }, [count]);

  const active = campaigns[activeIndex];

  return (
    <section className="relative overflow-hidden bg-surface-1 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <Container>
        <SectionHeading
          eyebrow="See It In Action"
          title="Everything Evermore unlocks, in one orbit"
          description="Tap or hover a card to bring it forward — from training EverAI to remote jobs, mentorship, predictions, and Evermore Academy."
        />
      </Container>

      <Container className="relative mt-14">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-32 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-green/20 blur-[100px]"
        />

        <div
          className="relative mx-auto h-[300px] scale-[0.62] sm:h-[380px] sm:scale-[0.85] lg:h-[420px] lg:scale-100"
          style={{ perspective: 1200 }}
        >
        {campaigns.map((campaign, index) => {
          const { x, y, scale, opacity, blur, zIndex } = getCardTransform(
            index,
            activeIndex,
            count,
          );
          const isActive = index === activeIndex;

          return (
            <motion.button
              key={campaign.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${campaign.title}`}
              aria-current={isActive}
              className="absolute left-1/2 top-1/2 h-[340px] w-[260px] -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-[28px] border border-white/10 text-left shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-mint sm:h-[380px] sm:w-[290px]"
              style={{ zIndex }}
              animate={{
                x,
                y,
                scale,
                opacity,
                filter: `blur(${blur}px)`,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
            >
              <Image
                src={campaign.image}
                alt={campaign.title}
                fill
                sizes="(min-width: 640px) 290px, 260px"
                className="object-cover"
                priority={index === 0}
              />
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent transition-opacity duration-300 ${
                  isActive ? "opacity-40" : "opacity-70"
                }`}
              />
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {campaigns.map((campaign, index) => (
          <button
            key={campaign.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to ${campaign.title}`}
            aria-current={index === activeIndex}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-6 bg-brand-mint"
                : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      <div className="relative mx-auto mt-8 max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-3xl p-6 text-center sm:p-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-mint">
              {active.eyebrow}
            </span>
            <h3 className="font-display mt-3 text-xl font-semibold text-white sm:text-2xl">
              {active.title}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              {active.description}
            </p>
            <Button href={active.href} size="md" className="mt-5">
              {active.cta}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
        </div>
      </Container>
    </section>
  );
}
