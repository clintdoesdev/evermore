"use client";

import { motion, useReducedMotion, type Easing } from "motion/react";

// A hand-keyed (pose-to-pose, not procedural) wobble — 8 poses shared by every animated property
// so they stay perfectly in phase, walking through as many of the 12 animation principles as a
// static card mockup can plausibly carry:
//   anticipation  – pose 1 leans the *opposite* way first, winding up before the main swing
//   arcs          – rotate/rotateY/y move together rather than on independent axes, so the card
//                   traces a curved path instead of snapping straight back and forth
//   squash&stretch– scaleX/scaleY flex opposite each other at the extremes (a plastic card
//                   doesn't rotate as a rigid body)
//   slow in/out   – every segment eases, never linear; timing below is deliberately uneven so
//                   the card lingers at the extremes and rushes through the middle
//   follow-through/
//   overshoot     – pose 4 swings past center to the *other* side before poses 5–6 settle back,
//                   rather than returning straight to rest
//   secondary action – the shine sweep and the contact shadow run on their own independent
//                   loops (see below), not locked to the card's own timing
const WOBBLE_TIMES = [0, 0.09, 0.3, 0.45, 0.6, 0.76, 0.9, 1];
const WOBBLE_EASE: Easing[] = ["easeIn", "easeOut", "easeInOut", "easeOut", "easeInOut", "easeOut", "easeInOut"];
const WOBBLE_TRANSITION = {
  duration: 6.4,
  times: WOBBLE_TIMES,
  ease: WOBBLE_EASE,
  repeat: Infinity,
  repeatDelay: 0.6,
};

const ROTATE = [0, -2, 7, 5.5, -3.5, 1.6, -0.5, 0];
const ROTATE_Y = [0, -3, 10, 8, -5.5, 2, -0.7, 0];
const Y = [0, 2, -8, -6, 3, -1, 0.3, 0];
const SCALE_X = [1, 0.995, 1.02, 1.012, 0.99, 1.005, 1, 1];
const SCALE_Y = [1, 1.008, 0.985, 0.99, 1.012, 0.996, 1, 1];
// Shadow breathes opposite the card's lift (y) — grounds it and sells the depth (staging).
const SHADOW_SCALE = [1, 0.98, 0.82, 0.86, 1.04, 1.01, 1, 1];
const SHADOW_OPACITY = [0.55, 0.52, 0.32, 0.36, 0.6, 0.57, 0.55, 0.55];

function InfinityMark({ className }: { className?: string }) {
  return (
    <svg width="26" height="16" viewBox="0 0 32 18" fill="none" className={className} aria-hidden="true">
      <circle cx="9" cy="9" r="7.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="21.5" cy="9" r="7.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ChipIcon() {
  return (
    <svg width="30" height="22" viewBox="0 0 30 22" fill="none" aria-hidden="true">
      <rect x="0.75" y="0.75" width="28.5" height="20.5" rx="4" fill="url(#chipGrad)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.75" />
      <path d="M10 0.75V21.25M20 0.75V21.25M0.75 8H10M20 8H29.25M0.75 14H10M20 14H29.25" stroke="rgba(4,18,12,0.35)" strokeWidth="0.75" />
      <defs>
        <linearGradient id="chipGrad" x1="0" y1="0" x2="30" y2="22">
          <stop offset="0%" stopColor="#e9d9a8" />
          <stop offset="100%" stopColor="#c9ad6f" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ContactlessIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11 5.5a9 9 0 0 1 0 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 2.5a13 13 0 0 1 0 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * A looping, glassmorphic membership-card mockup for the registration page's last step
 * ("choose your Evermore membership plan") — every value shown (name, number, expiry) is a
 * placeholder. The wobble is keyframed by hand rather than a simple sine loop (see WOBBLE_*
 * above) specifically to carry weight, anticipation, and follow-through instead of reading as a
 * generic CSS hover-tilt; reduced motion gets one calm, permanently-settled pose instead.
 */
export function GlassCardMockup() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div className="relative mx-auto flex w-full max-w-sm justify-center" style={{ perspective: 1200 }}>
      {/* contact shadow — breathes opposite the card's own lift */}
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { scale: SHADOW_SCALE, opacity: SHADOW_OPACITY }}
        transition={reduceMotion ? undefined : WOBBLE_TRANSITION}
        className="absolute bottom-2 h-8 w-[86%] rounded-full bg-black/50 blur-2xl"
      />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : { rotate: ROTATE, rotateY: ROTATE_Y, y: Y, scaleX: SCALE_X, scaleY: SCALE_Y }
        }
        initial={reduceMotion ? { rotate: -3, rotateY: -4 } : undefined}
        transition={reduceMotion ? undefined : WOBBLE_TRANSITION}
        className="glass-card relative isolate aspect-[85.6/54] w-[300px] overflow-hidden rounded-[20px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.65)] sm:w-[340px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(155deg, rgba(34,197,94,0.28) 0%, rgba(110,231,183,0.10) 45%, rgba(11,26,61,0.4) 100%)",
          }}
        />
        <InfinityMark className="pointer-events-none absolute -bottom-3 -right-3 text-white/[0.06]" />
        {/* secondary action: a shine sweep on its own independent loop, out of phase with the wobble */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            animate={{ x: ["-60%", "160%"] }}
            transition={{ duration: 4.6, repeat: Infinity, repeatDelay: 2.1, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />
        )}

        <div className="relative z-10 flex h-full flex-col justify-between p-4 text-white sm:p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1.5">
              <InfinityMark className="text-brand-mint" />
              <span className="font-display text-[13px] font-bold tracking-wide">EVERMORE</span>
            </div>
            <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[8.5px] font-semibold uppercase tracking-[0.12em] text-white/75">
              Member
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ChipIcon />
            <span className="text-white/70">
              <ContactlessIcon />
            </span>
          </div>

          <div>
            <div className="font-mono text-[13.5px] font-medium tracking-[0.18em] text-white/90 sm:text-[15px]">
              •••• •••• •••• 4478
            </div>
            <div className="mt-2.5 flex items-end justify-between">
              <div>
                <div className="text-[8px] font-semibold uppercase tracking-[0.1em] text-white/40">Cardholder</div>
                <div className="font-display mt-0.5 text-[11.5px] font-semibold tracking-wide">ADA LOVELACE</div>
              </div>
              <div className="text-right">
                <div className="text-[8px] font-semibold uppercase tracking-[0.1em] text-white/40">Valid thru</div>
                <div className="font-mono mt-0.5 text-[11.5px] font-semibold">12/29</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
