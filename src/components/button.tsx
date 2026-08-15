import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-green disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-brand-green text-brand-navy hover:bg-brand-mint shadow-[0_8px_30px_-8px_rgba(34,197,94,0.6)] hover:shadow-[0_10px_36px_-6px_rgba(34,197,94,0.75)] hover:-translate-y-0.5",
  secondary:
    "bg-white text-brand-navy border border-black/10 hover:border-brand-blue/40 hover:-translate-y-0.5",
  outline:
    "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10",
  ghost: "bg-transparent text-brand-navy hover:bg-brand-navy/5",
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
