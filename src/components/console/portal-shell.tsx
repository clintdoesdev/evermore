import { Logo } from "@/components/logo";
import { memberLogout } from "@/app/portal/actions";
import { LogOutIcon } from "./icons";

export function PortalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-white/10 bg-surface-1">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Logo />
          <form action={memberLogout}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              <LogOutIcon className="h-3.5 w-3.5" />
              Log Out
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
