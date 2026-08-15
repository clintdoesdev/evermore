import Link from "next/link";
import { adminLogout } from "@/app/admin/actions";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/invites", label: "Invites" },
  { href: "/members", label: "Members" },
];

export function AdminShell({
  active,
  username,
  children,
}: {
  active: "dashboard" | "invites" | "members";
  username: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      <header className="border-b border-white/10 bg-surface-1">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <span className="font-display text-base font-semibold text-white">
              Evermore <span className="text-brand-mint">Admin</span>
            </span>
            <nav className="hidden items-center gap-6 sm:flex">
              {navItems.map((item) => {
                const key = item.label.toLowerCase();
                const isActive = key === active;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive ? "text-brand-mint" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-white/45 sm:inline">{username}</span>
            <form action={adminLogout}>
              <button
                type="submit"
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
              >
                Log Out
              </button>
            </form>
          </div>
        </div>
        <nav className="flex items-center gap-5 border-t border-white/5 px-6 py-2 sm:hidden">
          {navItems.map((item) => {
            const key = item.label.toLowerCase();
            const isActive = key === active;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-semibold ${
                  isActive ? "text-brand-mint" : "text-white/55"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
