"use client";

import { useState } from "react";
import { CheckIcon, XIcon } from "./icons";

export function ConfirmButton({
  label,
  icon,
  confirmLabel = "Sure?",
  tone = "danger",
  className = "",
}: {
  label: string;
  icon?: React.ReactNode;
  confirmLabel?: string;
  tone?: "danger" | "default";
  className?: string;
}) {
  const [confirming, setConfirming] = useState(false);

  const toneClass =
    tone === "danger"
      ? "border-red-500/25 text-red-400 hover:border-red-500/50"
      : "border-white/15 text-white/70 hover:border-white/30 hover:text-white";

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="text-xs text-white/50">{confirmLabel}</span>
        <button
          type="submit"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/20 text-red-400 transition-colors hover:bg-red-500/30"
          aria-label="Confirm"
        >
          <CheckIcon className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:text-white"
          aria-label="Cancel"
        >
          <XIcon className="h-3.5 w-3.5" />
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${toneClass} ${className}`}
    >
      {icon}
      {label}
    </button>
  );
}
