import { verifyAdminSession } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/console/admin-shell";
import { CopyLinkButton } from "@/components/console/copy-link-button";
import { createInvite, revokeInvite } from "@/app/admin/actions";
import { portalUrl } from "@/lib/site-config";

const statusStyles: Record<string, string> = {
  PENDING: "bg-brand-mint/15 text-brand-mint",
  USED: "bg-white/10 text-white/60",
  REVOKED: "bg-red-500/15 text-red-400",
  EXPIRED: "bg-white/10 text-white/40",
};

export default async function AdminInvitesPage() {
  const session = await verifyAdminSession();

  const invites = await prisma.invite.findMany({
    orderBy: { createdAt: "desc" },
    include: { member: { select: { name: true, email: true } } },
  });

  return (
    <AdminShell active="invites" username={session.username}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="glass-card w-full max-w-sm shrink-0 rounded-3xl p-6">
          <h2 className="font-display text-lg font-semibold text-white">
            Create an invite
          </h2>
          <p className="mt-1 text-sm text-white/55">
            Generates a unique link. Only people with this link can register.
          </p>
          <form action={createInvite} className="mt-5 space-y-4">
            <div>
              <label htmlFor="label" className="mb-1.5 block text-sm font-medium text-white/85">
                Note (optional)
              </label>
              <input
                id="label"
                name="label"
                type="text"
                placeholder="e.g. Ada Lovelace"
                className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-brand-green to-brand-mint px-6 py-3 text-sm font-semibold text-brand-navy"
            >
              Generate invite link
            </button>
          </form>
        </div>

        <div className="w-full flex-1">
          <h2 className="font-display text-lg font-semibold text-white">
            All invites ({invites.length})
          </h2>
          <div className="mt-4 space-y-3">
            {invites.length === 0 && (
              <p className="glass-card rounded-2xl p-6 text-sm text-white/55">
                No invites yet. Create one to get started.
              </p>
            )}
            {invites.map((invite) => (
              <div key={invite.id} className="glass-card rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusStyles[invite.status]}`}
                      >
                        {invite.status}
                      </span>
                      {invite.label && (
                        <span className="text-sm font-medium text-white">
                          {invite.label}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-xs text-white/45">
                      Created {invite.createdAt.toLocaleDateString()}
                      {invite.member &&
                        ` — registered as ${invite.member.name} (${invite.member.email})`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {invite.status === "PENDING" && (
                      <>
                        <CopyLinkButton link={portalUrl(`/join/${invite.token}`)} />
                        <form action={revokeInvite}>
                          <input type="hidden" name="id" value={invite.id} />
                          <button
                            type="submit"
                            className="rounded-full border border-red-500/25 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:border-red-500/50"
                          >
                            Revoke
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
