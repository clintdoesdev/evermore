"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

type ActivityKind = "earn" | "job" | "mentor";

type ActivityRow = {
  id: number;
  kind: ActivityKind;
  title: string;
  time: string;
  amount: string;
};

type CycleTemplate = {
  kind: ActivityKind;
  title: string;
  delta: number;
  toastTitle: string;
  toastSub: string;
};

const INITIAL_FEED: ActivityRow[] = [
  { id: -1, kind: "earn", title: "EverAI training session", time: "Yesterday, 6:42 PM", amount: "+$18.60" },
  { id: -2, kind: "mentor", title: "Mentor call bonus", time: "Yesterday, 2:15 PM", amount: "+$12.00" },
  { id: -3, kind: "job", title: "Remote job match", time: "Mon, 9:00 AM", amount: "New" },
];

const CYCLE: CycleTemplate[] = [
  {
    kind: "earn",
    title: "EverAI training session",
    delta: 18.6,
    toastTitle: "Payment received",
    toastSub: "+$18.60 · just now",
  },
  {
    kind: "job",
    title: "Remote job match: Data Annotator",
    delta: 0,
    toastTitle: "New job match",
    toastSub: "Data Annotator · Remote",
  },
  {
    kind: "mentor",
    title: "Mentor session completed",
    delta: 12,
    toastTitle: "Mentor bonus added",
    toastSub: "+$12.00 · just now",
  },
];

const TRENDS = ["+24%", "+27%", "+29%", "+32%"];

function formatMoney(n: number): string {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Drives the earnings figure's count-up whenever `target` changes — skipped in favor of an
 * instant jump when the visitor prefers reduced motion. */
function useCountUp(target: number, reduceMotion: boolean): number {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const from = fromRef.current;
    if (from === target) return;
    const duration = 900;
    let start: number | null = null;

    function step(ts: number) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplay(from + (target - from) * easeOutCubic(progress));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        fromRef.current = target;
      }
    }
    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, reduceMotion]);

  // Reduced motion skips the rAF loop above entirely — mirror `target` straight through instead
  // of animating `display` toward it.
  return reduceMotion ? target : display;
}

function ActivityIcon({ kind }: { kind: ActivityKind }) {
  if (kind === "earn") {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 18 18 6M18 6H9M18 6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "mentor") {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l7 3v6c0 4.6-3 7.9-7 9-4-1.1-7-4.4-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * A tastefully restrained recreation of the "animated finance app phone" pattern — adapted to
 * Evermore's own dashboard (training earnings, job alerts, mentorship, predictions) rather than
 * a bank balance, and reined in from the reference's gyroscope/permission machinery down to a
 * single pointer-driven tilt with a spring for smoothness. Every number and row is decorative
 * (not real user data) — this only ever renders on the marketing site.
 */
export function PhoneMockup() {
  const reduceMotion = Boolean(useReducedMotion());

  const [earned, setEarned] = useState(482.4);
  const [feed, setFeed] = useState<ActivityRow[]>(INITIAL_FEED);
  const [trendIndex, setTrendIndex] = useState(0);
  const [toast, setToast] = useState<{ title: string; sub: string } | null>(null);
  const [pulseTrain, setPulseTrain] = useState(false);
  const nextId = useRef(1);
  const cycleIndex = useRef(0);
  const displayEarned = useCountUp(earned, reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      const template = CYCLE[cycleIndex.current % CYCLE.length];
      cycleIndex.current += 1;

      if (template.delta > 0) setEarned((prev) => prev + template.delta);
      setFeed((prev) => [
        {
          id: nextId.current++,
          kind: template.kind,
          title: template.title,
          time: "Just now",
          amount: template.delta > 0 ? `+${formatMoney(template.delta)}` : "New",
        },
        ...prev,
      ].slice(0, 3));

      setPulseTrain(true);
      setTimeout(() => setPulseTrain(false), 700);

      setToast({ title: template.toastTitle, sub: template.toastSub });
      setTimeout(() => setToast(null), 2600);

      setTrendIndex((i) => (i + 1) % TRENDS.length);
    }, 5200);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  // ---- pointer-driven tilt, springed for a smooth trailing feel ----
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18, mass: 0.6 });
  const sheenX = useTransform(springY, [-10, 10], [15, 85]);
  const sheenY = useTransform(springX, [-10, 10], [85, 15]);
  const sheenBackground = useMotionTemplate`radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.26), rgba(255,255,255,0) 45%)`;

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 12);
    rotateX.set(-py * 12);
  }
  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex justify-center"
      style={{ perspective: 1400 }}
    >
      <motion.div
        style={reduceMotion ? undefined : { rotateX: springX, rotateY: springY }}
        className="relative w-[248px] shrink-0 rounded-[46px] bg-gradient-to-br from-zinc-500 via-zinc-700 to-zinc-900 p-[3px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.75),0_16px_40px_-16px_rgba(0,0,0,0.6)] ring-1 ring-white/10 sm:w-[272px]"
      >
        {/* side buttons */}
        <span className="absolute -left-[2px] top-[92px] h-6 w-[3px] rounded-l-sm bg-zinc-800" />
        <span className="absolute -left-[2px] top-[130px] h-10 w-[3px] rounded-l-sm bg-zinc-800" />
        <span className="absolute -left-[2px] top-[176px] h-10 w-[3px] rounded-l-sm bg-zinc-800" />
        <span className="absolute -right-[2px] top-[140px] h-14 w-[3px] rounded-r-sm bg-zinc-800" />

        <div className="relative isolate aspect-[9/19.4] overflow-hidden rounded-[42px] bg-surface-0">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(120% 90% at 22% 0%, rgba(34,197,94,0.16), transparent 55%), radial-gradient(90% 70% at 100% 100%, rgba(110,231,183,0.12), transparent 60%)",
            }}
          />

          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              style={{ background: sheenBackground }}
              className="pointer-events-none absolute inset-0 z-30 [mix-blend-mode:overlay]"
            />
          )}

          <div aria-hidden="true" className="absolute left-1/2 top-2.5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          <div className="relative z-10 flex h-full flex-col text-white">
            <div className="flex items-center justify-between px-5 pb-1 pt-4 font-mono text-[10px] font-semibold tracking-wide">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <svg width="13" height="9" viewBox="0 0 18 12" fill="none" aria-hidden="true">
                  <rect x="0" y="7" width="3" height="5" rx="0.6" fill="currentColor" />
                  <rect x="5" y="5" width="3" height="7" rx="0.6" fill="currentColor" />
                  <rect x="10" y="3" width="3" height="9" rx="0.6" fill="currentColor" />
                  <rect x="15" y="0" width="3" height="12" rx="0.6" fill="currentColor" opacity="0.35" />
                </svg>
                <svg width="15" height="10" viewBox="0 0 24 16" fill="none" aria-hidden="true">
                  <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor" />
                  <rect x="2" y="2" width="14" height="8" rx="1.2" fill="currentColor" />
                  <rect x="21.5" y="4" width="2" height="4" rx="1" fill="currentColor" />
                </svg>
              </span>
            </div>

            <div className="flex items-start justify-between px-5 pb-1 pt-2">
              <div>
                <div className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-white/45">Good afternoon</div>
                <div className="font-display mt-0.5 text-[15px] font-semibold">Jordan</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-white/12 bg-white/6">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-brand-mint ring-2 ring-surface-0" />
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-mint font-display text-[11px] font-bold text-brand-navy">
                  J
                </span>
              </div>
            </div>

            <div className="glass-card relative mx-4 mt-2 overflow-hidden rounded-2xl p-3.5">
              <div className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-white/45">
                This month&rsquo;s earnings
              </div>
              <div className="font-display mt-1 text-[22px] font-bold tabular-nums">{formatMoney(displayEarned)}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-mint">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 19 19 5M19 5H9M19 5v10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {TRENDS[trendIndex]} this month
                </span>
                <svg width="58" height="20" viewBox="0 0 70 24" fill="none" aria-hidden="true">
                  <polyline
                    points="0,20 12,16 24,18 36,10 48,12 58,4 70,2"
                    stroke="url(#sparkGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="sparkGradient" x1="0" y1="0" x2="70" y2="0">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#6ee7b7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-1 px-4">
              {[
                { label: "Train", primary: true, icon: <path d="M4 20V10m8 10V4m8 16v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> },
                {
                  label: "Jobs",
                  primary: false,
                  icon: (
                    <>
                      <rect x="5" y="3" width="14" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </>
                  ),
                },
                {
                  label: "Mentor",
                  primary: false,
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
                  label: "Predict",
                  primary: false,
                  icon: (
                    <>
                      <path d="M5 20h14M7 20V11l5-6 5 6v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </>
                  ),
                },
              ].map((action) => (
                <div key={action.label} className="flex flex-col items-center gap-1">
                  <motion.span
                    animate={action.primary && pulseTrain && !reduceMotion ? { scale: [1, 1.12, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      action.primary
                        ? "bg-gradient-to-br from-brand-green to-brand-mint text-brand-navy shadow-[0_0_16px_rgba(34,197,94,0.45)]"
                        : "border border-white/12 bg-white/6 text-white/80"
                    }`}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      {action.icon}
                    </svg>
                  </motion.span>
                  <span className="text-[8.5px] font-semibold uppercase tracking-wide text-white/45">{action.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex-1 overflow-hidden px-4 pb-1">
              <div className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-white/45">Recent activity</div>
              <div className="mt-2 flex flex-col gap-2.5">
                <AnimatePresence initial={false}>
                  {feed.map((row) => (
                    <motion.div
                      key={row.id}
                      layout={!reduceMotion}
                      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center gap-2.5"
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          row.kind === "job" ? "bg-white/8 text-white/70" : "bg-brand-green/15 text-brand-mint"
                        }`}
                      >
                        <ActivityIcon kind={row.kind} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <div className="truncate text-[10.5px] font-semibold">{row.title}</div>
                        <div className="text-[9px] text-white/40">{row.time}</div>
                      </span>
                      <span
                        className={`shrink-0 text-[10.5px] font-semibold tabular-nums ${
                          row.kind === "job" ? "rounded-full bg-brand-mint/15 px-1.5 py-0.5 text-[8.5px] text-brand-mint" : "text-brand-mint"
                        }`}
                      >
                        {row.amount}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mx-auto mb-2 mt-auto h-1 w-24 rounded-full bg-white/25" />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card absolute -left-[6%] top-2 z-40 flex w-[188px] items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-[0_20px_44px_-14px_rgba(0,0,0,0.6)]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-mint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="min-w-0">
              <div className="truncate text-[11px] font-semibold text-white">{toast.title}</div>
              <div className="truncate text-[10px] text-white/50">{toast.sub}</div>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="animate-float pointer-events-none absolute -bottom-3 right-[2%] z-40 hidden sm:block">
        <div className="glass-card flex flex-col items-start gap-0.5 rounded-2xl px-3.5 py-2.5 shadow-[0_20px_44px_-14px_rgba(0,0,0,0.6)]">
          <span className="text-[9px] font-semibold uppercase tracking-wide text-white/45">This month</span>
          <span className="font-display text-[15px] font-bold text-brand-mint">{TRENDS[trendIndex]}</span>
        </div>
      </div>
    </div>
  );
}
