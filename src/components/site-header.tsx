"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "./container";
import { Button } from "./button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-to-register", label: "How to Register" },
  { href: "/payment", label: "Membership" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-navy/95 backdrop-blur supports-[backdrop-filter]:bg-brand-navy/80">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Logo priority />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-brand-mint"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="/sign-up" variant="outline" size="sm">
            Log In
          </Button>
          <Button href="/sign-up" variant="primary" size="sm">
            Join Evermore
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white md:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/10 bg-brand-navy md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-white/85 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 px-3 pb-2">
              <Button href="/sign-up" variant="outline" size="sm">
                Log In
              </Button>
              <Button href="/sign-up" variant="primary" size="sm">
                Join Evermore
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
