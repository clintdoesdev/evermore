import Link from "next/link";
import { adminLogout } from "@/app/admin/actions";
import { Logo } from "@/components/logo";
import { DashboardIcon, TicketIcon, UsersIcon, LogOutIcon } from "./icons";

const navItems = [
  { href: "/", label: "Dashboard", key: "dashboard", icon: DashboardIcon },
  { href: "/invites", label: "Invites", key: "invites", icon: TicketIcon },
  { href: "/members", label: "Members", key: "members", icon: UsersIcon },
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
    <div className="lg:flex lg:min-h-full">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-surface-1 lg:flex">
        <div className="px-6 py-6">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = item.key === active;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-green/10 text-brand-mint"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="truncate px-2 text-xs text-white/40">{username}</p>
          <form action={adminLogout} className="mt-2">
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogOutIcon className="h-4 w-4" />
              Log Out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-white/10 bg-surface-1 px-5 py-4 lg:hidden">
          <Logo />
          <form action={adminLogout}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/70"
            >
              <LogOutIcon className="h-3.5 w-3.5" />
              Log Out
            </button>
          </form>
        </header>
        <nav className="flex items-center gap-5 overflow-x-auto border-b border-white/10 bg-surface-1 px-5 py-2.5 lg:hidden">
          {navItems.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 text-xs font-semibold ${
                  isActive ? "text-brand-mint" : "text-white/55"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
