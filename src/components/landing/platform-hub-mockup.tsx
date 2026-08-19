"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// Blob shapes for the liquid backdrop — each keyframe is an 8-value border-radius shorthand
// (same value count/order every time, which is what lets Motion's complex-value interpolator
// morph smoothly between them rather than snapping).
const BLOB_A = [
  "62% 38% 55% 45% / 45% 55% 45% 55%",
  "40% 60% 65% 35% / 55% 40% 60% 45%",
  "55% 45% 40% 60% / 40% 60% 40% 60%",
  "62% 38% 55% 45% / 45% 55% 45% 55%",
];
const BLOB_B = [
  "45% 55% 60% 40% / 60% 45% 55% 40%",
  "60% 40% 45% 55% / 40% 60% 40% 60%",
  "50% 50% 65% 35% / 55% 45% 60% 40%",
  "45% 55% 60% 40% / 60% 45% 55% 40%",
];
const BLOB_C = [
  "50% 50% 45% 55% / 55% 45% 60% 40%",
  "65% 35% 55% 45% / 45% 60% 40% 55%",
  "40% 60% 50% 50% / 60% 40% 55% 45%",
  "50% 50% 45% 55% / 55% 45% 60% 40%",
];

type Tile = { id: string; label: string; meta: string; icon: ReactNode };

const TILES: Tile[] = [
  {
    id: "train",
    label: "Train EverAI",
    meta: "12 tasks today",
    icon: <path d="M4 20V10m8 10V4m8 16v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  },
  {
    id: "jobs",
    label: "Remote jobs",
    meta: "3 new alerts",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: "mentor",
    label: "Mentor",
    meta: "New message",
    icon: (
      <path
        d="M12 3l7 3v6c0 4.6-3 7.9-7 9-4-1.1-7-4.4-7-9V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: "predict",
    label: "Predictions",
    meta: "2 live now",
    icon: (
      <>
        <path d="M5 20h14M7 20V11l5-6 5 6v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: "academy",
    label: "Academy",
    meta: "4 courses",
    icon: (
      <path
        d="M2 8l10-4 10 4-10 4-10-4Zm4 2.4V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    ),
  },
  {
    id: "rewards",
    label: "Rewards",
    meta: "$482.40",
    icon: <path d="M6 18 18 6M18 6H9M18 6v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

const CYCLE_MS = 1700;

/**
 * The /evermore-platform hero visual — a browser-window preview of the member dashboard's six
 * pillars, in the "liquid glass" material iOS/visionOS popularized: heavily blurred, saturated,
 * slowly morphing color blobs behind a frosted panel, a drifting specular highlight, and a
 * spotlight that glides + reshapes (via layout animation, not manual position math) from tile to
 * tile — selling "everything, together" rather than any single feature. Every value shown is a
 * placeholder, not real account data. Reduced motion freezes on the Train tile, blobs and all.
 */
export function PlatformHubMockup() {
  const reduceMotion = Boolean(useReducedMotion());
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => setPhase((p) => (p + 1) % TILES.length), CYCLE_MS);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div
        aria-hidden="true"
        className="animate-glow-pulse absolute inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-green/25 via-transparent to-brand-blue-light/20 blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[22px] border border-white/15 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)]">
        {/* ---- liquid backdrop: morphing color blobs behind a frosted glass layer ---- */}
        <div className="absolute inset-0 bg-surface-1">
          {!reduceMotion ? (
            <>
              <motion.div
                aria-hidden="true"
                animate={{
                  borderRadius: BLOB_A,
                  x: [-14, 24, -8, -14],
                  y: [-8, 14, -16, -8],
                  scale: [1, 1.18, 0.94, 1],
                }}
                transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 -top-12 h-60 w-60 bg-brand-green/70 mix-blend-screen blur-3xl"
              />
              <motion.div
                aria-hidden="true"
                animate={{
                  borderRadius: BLOB_B,
                  x: [16, -22, 10, 16],
                  y: [10, -14, 18, 10],
                  scale: [1, 0.88, 1.16, 1],
                }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute -right-14 top-4 h-56 w-56 bg-brand-mint/60 mix-blend-screen blur-3xl"
              />
              <motion.div
                aria-hidden="true"
                animate={{
                  borderRadius: BLOB_C,
                  x: [-10, 18, -16, -10],
                  y: [12, -10, 8, 12],
                  scale: [1, 1.12, 0.9, 1],
                }}
                transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
                className="absolute bottom-[-3.5rem] left-1/3 h-56 w-56 bg-brand-blue-light/65 mix-blend-screen blur-3xl"
              />
              {/* a drifting specular highlight — an elongated glare smear, like light catching a
                  curved liquid surface, independent of the blobs' own motion */}
              <motion.div
                aria-hidden="true"
                animate={{
                  left: ["6%", "58%", "22%", "6%"],
                  top: ["4%", "20%", "36%", "4%"],
                  rotate: [-18, 10, -24, -18],
                  opacity: [0.55, 0.85, 0.45, 0.55],
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute h-14 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 blur-xl"
              />
            </>
          ) : (
            <div className="absolute -left-10 -top-10 h-52 w-52 rounded-full bg-brand-green/45 mix-blend-screen blur-3xl" />
          )}
        </div>

        {/* glossy top rim — the bright edge highlight liquid/frosted glass catches from above */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-white/25 to-transparent"
        />

        {/* ---- frosted glass layer + content ---- */}
        <div className="relative z-10 bg-white/[0.04] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] backdrop-blur-2xl backdrop-saturate-[180%]">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            </span>
            <span className="mx-auto flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] text-white/55">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              app.evermorewebsite.com.ng
            </span>
          </div>

          <div className="p-3.5 sm:p-4">
            <div className="mb-3 flex items-center justify-between px-0.5">
              <span className="font-display text-[12px] font-semibold text-white">Member dashboard</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-mint font-display text-[10px] font-bold text-brand-navy">
                A
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {TILES.map((tile, index) => {
                const active = phase === index;
                return (
                  <div
                    key={tile.id}
                    className={`relative overflow-hidden rounded-xl border p-2.5 transition-colors duration-300 ${
                      active ? "border-brand-mint/50 bg-white/[0.07]" : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    {active && !reduceMotion && (
                      <motion.div
                        layoutId="hub-spotlight"
                        transition={{ type: "spring", stiffness: 190, damping: 20 }}
                        className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-brand-green/20 to-brand-mint/10 shadow-[inset_0_0_0_1.5px_rgba(110,231,183,0.55),0_0_24px_-4px_rgba(110,231,183,0.5)]"
                      />
                    )}
                    <div className="relative z-10">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                          active ? "bg-brand-green/20 text-brand-mint" : "bg-white/8 text-white/60"
                        }`}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          {tile.icon}
                        </svg>
                      </span>
                      <div className="mt-1.5 text-[10px] font-semibold text-white/90">{tile.label}</div>
                      <div className="text-[9px] text-white/45">{tile.meta}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
