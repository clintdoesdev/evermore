import Link from "next/link";
import { verifyAdminSession } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/console/admin-shell";
import { ConfirmButton } from "@/components/console/confirm-button";
import { FlashBanner } from "@/components/console/flash-banner";
import { DownloadIcon, EditIcon, TrashIcon } from "@/components/console/icons";
import { setMemberStatus, deleteMember } from "@/app/admin/actions";

const statusStyles: Record<string, string> = {
  REGISTERED: "bg-white/10 text-white/60",
  PENDING_PAYMENT: "bg-amber-500/15 text-amber-300",
  ACTIVE: "bg-brand-mint/15 text-brand-mint",
  SUSPENDED: "bg-red-500/15 text-red-400",
};

const planLabels: Record<string, string> = {
  MONTHLY: "Monthly",
  ANNUAL: "Annual",
  LIFETIME: "Lifetime",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function AdminMembersPage({
  searchParams,
}: {
  searchParams: Promise<{ flash?: string; tone?: "success" | "error" }>;
}) {
  const session = await verifyAdminSession();
  const { flash, tone } = await searchParams;

  const members = await prisma.member.findMany({
    orderBy: { createdAt: "desc" },
    include: { invite: { select: { label: true } } },
  });

  return (
    <AdminShell active="members" username={session.username}>
      <FlashBanner message={flash} tone={tone} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">
            Members ({members.length})
          </h1>
          <p className="mt-1 text-sm text-white/55">
            People who registered through an invite link.
          </p>
        </div>
        <a
          href="/members/export"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:border-brand-mint/40 hover:text-brand-mint"
        >
          <DownloadIcon className="h-4 w-4" />
          Export CSV
        </a>
      </div>

      <div className="mt-6 space-y-3">
        {members.length === 0 && (
          <p className="glass-card rounded-2xl p-6 text-sm text-white/55">
            No members yet.
          </p>
        )}
        {members.map((member) => (
          <div key={member.id} className="glass-card rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-mint text-xs font-bold text-brand-navy">
                  {initials(member.name)}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-white">{member.name}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusStyles[member.status]}`}
                    >
                      {member.status.replace("_", " ")}
                    </span>
                    {member.paymentPlan && (
                      <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/60">
                        {planLabels[member.paymentPlan]}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-white/45">
                    @{member.username} · {member.email} · {member.phone} · {member.country}
                  </p>
                  <p className="mt-0.5 text-xs text-white/35">
                    Joined {member.createdAt.toLocaleDateString()}
                    {member.activationDate &&
                      ` · activates ${member.activationDate.toLocaleDateString()}`}
                    {member.invite.label && ` · invite: ${member.invite.label}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/members/${member.id}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  <EditIcon className="h-3.5 w-3.5" />
                  Edit
                </Link>
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
                    <ConfirmButton label="Suspend" confirmLabel="Suspend?" />
                  </form>
                )}
                <form action={deleteMember}>
                  <input type="hidden" name="id" value={member.id} />
                  <ConfirmButton
                    label="Delete"
                    confirmLabel="Delete?"
                    icon={<TrashIcon className="h-3.5 w-3.5" />}
                  />
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
