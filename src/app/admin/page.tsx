import Link from "next/link";
import { verifyAdminSession } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/console/admin-shell";

export default async function AdminDashboardPage() {
  const session = await verifyAdminSession();

  const [pendingInvites, usedInvites, totalMembers, activeMembers, pendingMembers] =
    await Promise.all([
      prisma.invite.count({ where: { status: "PENDING" } }),
      prisma.invite.count({ where: { status: "USED" } }),
      prisma.member.count(),
      prisma.member.count({ where: { status: "ACTIVE" } }),
      prisma.member.count({ where: { status: "PENDING_PAYMENT" } }),
    ]);

  const stats = [
    { label: "Pending invites", value: pendingInvites },
    { label: "Invites used", value: usedInvites },
    { label: "Total members", value: totalMembers },
    { label: "Active members", value: activeMembers },
    { label: "Awaiting payment", value: pendingMembers },
  ];

  return (
    <AdminShell active="dashboard" username={session.username}>
      <h1 className="font-display text-2xl font-semibold text-white">
        Welcome back, {session.username}
      </h1>
      <p className="mt-1 text-sm text-white/55">
        Overview of your Evermore invites and members.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-5">
            <p className="font-display text-2xl font-semibold text-brand-mint">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-white/55">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/invites"
          className="rounded-full bg-gradient-to-r from-brand-green to-brand-mint px-5 py-2.5 text-sm font-semibold text-brand-navy"
        >
          Create an invite
        </Link>
        <Link
          href="/members"
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white"
        >
          Review members
        </Link>
      </div>
    </AdminShell>
  );
}
