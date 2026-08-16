import { notFound } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/console/admin-shell";
import { MemberEditForm } from "@/components/console/member-edit-form";

function toDateInputValue(date: Date | null) {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

function customFieldsToText(customFields: unknown) {
  if (!customFields || typeof customFields !== "object") return "";
  return Object.entries(customFields as Record<string, unknown>)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await verifyAdminSession();
  const { id } = await params;

  const member = await prisma.member.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <AdminShell active="members" username={session.username}>
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-2xl font-semibold text-white">Edit member</h1>
        <p className="mt-1 text-sm text-white/55">
          Update {member.name}&apos;s details, activation date, and login information.
        </p>

        <div className="glass-card mt-6 rounded-3xl p-7 sm:p-8">
          <MemberEditForm
            member={{
              id: member.id,
              name: member.name,
              username: member.username,
              email: member.email,
              phone: member.phone,
              country: member.country,
              paymentPlan: member.paymentPlan,
              activationDate: toDateInputValue(member.activationDate),
              loginDetails: member.loginDetails ?? "",
              customFieldsText: customFieldsToText(member.customFields),
            }}
          />
        </div>
      </div>
    </AdminShell>
  );
}
