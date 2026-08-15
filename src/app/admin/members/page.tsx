import { verifyAdminSession } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/console/admin-shell";
import { setMemberStatus } from "@/app/admin/actions";

const statusStyles: Record<string, string> = {
  REGISTERED: "bg-white/10 text-white/60",
  PENDING_PAYMENT: "bg-amber-500/15 text-amber-300",
  ACTIVE: "bg-brand-mint/15 text-brand-mint",
  SUSPENDED: "bg-red-500/15 text-red-400",
};

export default async function AdminMembersPage() {
  const session = await verifyAdminSession();

  const members = await prisma.member.findMany({
    orderBy: { createdAt: "desc" },
    include: { invite: { select: { label: true } } },
  });

  return (
    <AdminShell active="members" username={session.username}>
      <h1 className="font-display text-2xl font-semibold text-white">
        Members ({members.length})
      </h1>
      <p className="mt-1 text-sm text-white/55">
        People who registered through an invite link. Mark a member active
        once their payment is confirmed.
      </p>

      <div className="mt-6 space-y-3">
        {members.length === 0 && (
          <p className="glass-card rounded-2xl p-6 text-sm text-white/55">
            No members yet.
          </p>
        )}
        {members.map((member) => (
          <div key={member.id} className="glass-card rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusStyles[member.status]}`}
                  >
                    {member.status.replace("_", " ")}
                  </span>
                  <span className="text-sm font-medium text-white">{member.name}</span>
                </div>
                <p className="mt-1.5 text-xs text-white/45">
                  {member.email} · joined {member.createdAt.toLocaleDateString()}
                  {member.invite.label && ` · invite: ${member.invite.label}`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {member.status !== "ACTIVE" && (
                  <form action={setMemberStatus}>
                    <input type="hidden" name="id" value={member.id} />
                    <input type="hidden" name="status" value="ACTIVE" />
                    <button
                      type="submit"
                      className="rounded-full bg-gradient-to-r from-brand-green to-brand-mint px-3.5 py-1.5 text-xs font-semibold text-brand-navy"
                    >
                      Mark Active
                    </button>
                  </form>
                )}
                {member.status === "ACTIVE" && (
                  <form action={setMemberStatus}>
                    <input type="hidden" name="id" value={member.id} />
                    <input type="hidden" name="status" value="SUSPENDED" />
                    <button
                      type="submit"
                      className="rounded-full border border-red-500/25 px-3.5 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:border-red-500/50"
                    >
                      Suspend
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
