import Link from "next/link";
import { verifyAdminSession } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/console/admin-shell";
import { TicketIcon, UsersIcon, PlusIcon } from "@/components/console/icons";

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
    { label: "Awaiting activation", value: pendingMembers },
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
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-green to-brand-mint px-5 py-2.5 text-sm font-semibold text-brand-navy"
        >
          <TicketIcon className="h-4 w-4" />
          Create an invite
        </Link>
        <Link
          href="/members"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white"
        >
          <UsersIcon className="h-4 w-4" />
          Review members
        </Link>
      </div>

      <div className="mt-10 glass-card rounded-2xl p-6">
        <h2 className="font-display text-sm font-semibold text-white/85">Quick tips</h2>
        <ul className="mt-3 space-y-2 text-sm text-white/55">
          <li className="flex items-start gap-2">
            <PlusIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-mint" />
            Generate an invite link on the Invites page and send it directly to whoever you want to join.
          </li>
          <li className="flex items-start gap-2">
            <PlusIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-mint" />
            Once someone registers, set their activation date and mark them Active from Members.
          </li>
          <li className="flex items-start gap-2">
            <PlusIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-mint" />
            Export all member details to CSV anytime from the Members page.
          </li>
        </ul>
      </div>
    </AdminShell>
  );
}
