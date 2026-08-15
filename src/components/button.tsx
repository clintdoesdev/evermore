import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0 focus-visible:ring-brand-green disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "shine bg-gradient-to-r from-brand-green to-brand-mint text-brand-navy shadow-[0_8px_30px_-8px_rgba(34,197,94,0.55)] hover:shadow-[0_14px_44px_-8px_rgba(34,197,94,0.75)] hover:-translate-y-0.5",
  secondary:
    "glass-card text-white hover:border-brand-mint/40 hover:-translate-y-0.5",
  outline:
    "bg-transparent text-white border border-white/25 hover:border-brand-mint/60 hover:bg-white/5 hover:-translate-y-0.5",
  ghost: "bg-transparent text-white/80 hover:bg-white/5 hover:text-white",
};

const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-sm sm:text-base px-6 py-3",
  lg: "text-base sm:text-lg px-8 py-4",
};

type CommonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...props
}: CommonProps &
  ({ href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">)) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}

export function ButtonEl({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
