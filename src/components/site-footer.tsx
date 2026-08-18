import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "./container";
import { siteConfig } from "@/lib/site-config";

const columns = [
  {
    title: "Evermore",
    links: [
      { href: "/", label: "Landing Page" },
      { href: "/evermore-platform", label: "The Evermore Platform" },
      { href: "/evermore-app", label: "The Evermore App" },
      { href: "/how-to-register", label: "How to Register" },
      { href: "/sign-up", label: "Sign Up" },
      { href: "/payment", label: "Membership Plans" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/how-to-register", label: "Registration Help" },
      { href: "mailto:support@evermorewebsite.com.ng", label: "Contact Support" },
      { href: "/payment", label: "Billing & Payments" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-brand-navy text-white">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-white/60">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <SocialIcon href={siteConfig.social.instagram} label="Instagram">
              <path d="M9 2.5h6a6.5 6.5 0 0 1 6.5 6.5v6A6.5 6.5 0 0 1 15 21.5H9A6.5 6.5 0 0 1 2.5 15V9A6.5 6.5 0 0 1 9 2.5Zm0 2A4.5 4.5 0 0 0 4.5 9v6A4.5 4.5 0 0 0 9 19.5h6a4.5 4.5 0 0 0 4.5-4.5V9A4.5 4.5 0 0 0 15 4.5H9Zm3 3.75A5.75 5.75 0 1 1 6.25 12 5.76 5.76 0 0 1 12 6.25Zm0 2a3.75 3.75 0 1 0 3.75 3.75A3.75 3.75 0 0 0 12 8.25Zm5.9-3.4a1.35 1.35 0 1 1-1.35 1.35 1.35 1.35 0 0 1 1.35-1.35Z" />
            </SocialIcon>
            <SocialIcon href={siteConfig.social.twitter} label="X (Twitter)">
              <path d="M3 3h4.9l4.2 5.9L17.4 3H21l-6.9 8.9L21.4 21h-4.9l-4.6-6.4L6.3 21H2.7l7.3-9.4Z" />
            </SocialIcon>
            <SocialIcon href={siteConfig.social.facebook} label="Facebook">
              <path d="M13.5 21.5v-8h2.7l.4-3.1h-3.1V8.4c0-.9.25-1.5 1.55-1.5h1.65V4.13A22 22 0 0 0 14.28 4c-2.4 0-4.05 1.47-4.05 4.16v2.23H7.5v3.1h2.73v8Z" />
            </SocialIcon>
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="font-display text-sm font-semibold tracking-wide text-white/90">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-brand-mint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Evermore. All rights reserved.
          </p>
          <p>Exist Beyond the Moment.</p>
        </Container>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-mint hover:text-brand-mint"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
