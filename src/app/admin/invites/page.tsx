import { verifyAdminSession } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/console/admin-shell";
import { CopyLinkButton } from "@/components/console/copy-link-button";
import { ConfirmButton } from "@/components/console/confirm-button";
import { FlashBanner } from "@/components/console/flash-banner";
import { TicketIcon, TrashIcon } from "@/components/console/icons";
import { createInvite, revokeInvite } from "@/app/admin/actions";
import { portalUrl } from "@/lib/site-config";

const statusStyles: Record<string, string> = {
  PENDING: "bg-brand-mint/15 text-brand-mint",
  USED: "bg-white/10 text-white/60",
  REVOKED: "bg-red-500/15 text-red-400",
  EXPIRED: "bg-white/10 text-white/40",
};

const planLabels: Record<string, string> = {
  MONTHLY: "Monthly",
  ANNUAL: "Annual",
  LIFETIME: "Lifetime",
};

export default async function AdminInvitesPage({
  searchParams,
}: {
  searchParams: Promise<{ flash?: string; tone?: "success" | "error" }>;
}) {
  const session = await verifyAdminSession();
  const { flash, tone } = await searchParams;

  const invites = await prisma.invite.findMany({
    orderBy: { createdAt: "desc" },
    include: { member: { select: { name: true, email: true } } },
  });

  return (
    <AdminShell active="invites" username={session.username}>
      <FlashBanner message={flash} tone={tone} />

      <h1 className="font-display text-2xl font-semibold text-white">Invites</h1>
      <p className="mt-1 text-sm text-white/55">
        Generate single-use links. Only people holding a valid link can register.
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="glass-card w-full max-w-sm shrink-0 rounded-3xl p-6">
          <h2 className="font-display text-lg font-semibold text-white">
            Create an invite
          </h2>
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
            <div>
              <label htmlFor="paymentPlan" className="mb-1.5 block text-sm font-medium text-white/85">
                Payment plan (optional)
              </label>
              <select
                id="paymentPlan"
                name="paymentPlan"
                defaultValue=""
                className="glass-input w-full appearance-none rounded-xl px-4 py-3 text-sm outline-none"
              >
                <option value="" className="bg-surface-1 text-white">
                  Not set
                </option>
                <option value="MONTHLY" className="bg-surface-1 text-white">
                  Monthly
                </option>
                <option value="ANNUAL" className="bg-surface-1 text-white">
                  Annual
                </option>
                <option value="LIFETIME" className="bg-surface-1 text-white">
                  Lifetime
                </option>
              </select>
              <p className="mt-1.5 text-xs text-white/40">
                Pre-assigns a plan to whoever registers with this link.
              </p>
            </div>
            <div>
              <label htmlFor="expiresInDays" className="mb-1.5 block text-sm font-medium text-white/85">
                Expires after (days)
              </label>
              <input
                id="expiresInDays"
                name="expiresInDays"
                type="number"
                min={0}
                max={365}
                placeholder="Never expires"
                className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-green to-brand-mint px-6 py-3 text-sm font-semibold text-brand-navy"
            >
              <TicketIcon className="h-4 w-4" />
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
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusStyles[invite.status]}`}
                      >
                        {invite.status}
                      </span>
                      {invite.paymentPlan && (
                        <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/60">
                          {planLabels[invite.paymentPlan]}
                        </span>
                      )}
                      {invite.label && (
                        <span className="text-sm font-medium text-white">
                          {invite.label}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-xs text-white/45">
                      Created {invite.createdAt.toLocaleDateString()}
                      {invite.expiresAt && ` · expires ${invite.expiresAt.toLocaleDateString()}`}
                      {invite.member &&
                        ` — registered as ${invite.member.name} (${invite.member.email})`}
                    </p>
                  </div>

                  {invite.status === "PENDING" && (
                    <div className="flex items-center gap-2">
                      <CopyLinkButton link={portalUrl(`/join/${invite.token}`)} />
                      <form action={revokeInvite}>
                        <input type="hidden" name="id" value={invite.id} />
                        <ConfirmButton label="Revoke" icon={<TrashIcon className="h-3.5 w-3.5" />} />
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
