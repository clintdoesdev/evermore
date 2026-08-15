import { verifyMemberSession } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { memberLogout } from "@/app/portal/actions";

const statusCopy: Record<string, { title: string; body: string }> = {
  REGISTERED: {
    title: "You're registered",
    body: "Your Evermore account is set up. We'll let you know as soon as your membership is active.",
  },
  PENDING_PAYMENT: {
    title: "Almost there",
    body: "Your registration is complete and we're confirming your payment. This page will update once your membership is active — check back soon.",
  },
  ACTIVE: {
    title: "You're an active Evermore member",
    body: "Welcome in. You now have full access to your Evermore membership.",
  },
  SUSPENDED: {
    title: "Your membership is suspended",
    body: "Please contact support to resolve this and restore your access.",
  },
};

export default async function PortalDashboardPage() {
  const session = await verifyMemberSession();
  const member = await prisma.member.findUniqueOrThrow({
    where: { id: session.memberId },
  });

  const copy = statusCopy[member.status];

  return (
    <main className="mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center px-5 py-16 text-center">
      <span
        className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
          member.status === "ACTIVE"
            ? "bg-brand-mint/15 text-brand-mint"
            : member.status === "SUSPENDED"
              ? "bg-red-500/15 text-red-400"
              : "bg-amber-500/15 text-amber-300"
        }`}
      >
        {member.status.replace("_", " ")}
      </span>
      <h1 className="font-display mt-4 text-2xl font-semibold text-white sm:text-3xl">
        {copy.title}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
        {copy.body}
      </p>
      <p className="mt-6 text-xs text-white/40">
        Signed in as {member.name} ({member.email})
      </p>
      <form action={memberLogout} className="mt-8">
        <button
          type="submit"
          className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
        >
          Log Out
        </button>
      </form>
    </main>
  );
}
