import { verifyAdminSession } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

function csvCell(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function customFieldsToText(customFields: unknown) {
  if (!customFields || typeof customFields !== "object") return "";
  return Object.entries(customFields as Record<string, unknown>)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
}

const HEADERS = [
  "Full Name",
  "Username",
  "Email",
  "Phone",
  "Country",
  "Status",
  "Payment Plan",
  "Activation Date",
  "Activated At",
  "Login Details",
  "Custom Fields",
  "Invite Label",
  "Registered At",
];

export async function GET() {
  await verifyAdminSession();

  const members = await prisma.member.findMany({
    orderBy: { createdAt: "desc" },
    include: { invite: { select: { label: true } } },
  });

  const rows = members.map((m) =>
    [
      m.name,
      m.username,
      m.email,
      m.phone,
      m.country,
      m.status,
      m.paymentPlan ?? "",
      m.activationDate ? m.activationDate.toISOString().slice(0, 10) : "",
      m.activatedAt ? m.activatedAt.toISOString() : "",
      m.loginDetails ?? "",
      customFieldsToText(m.customFields),
      m.invite.label ?? "",
      m.createdAt.toISOString(),
    ]
      .map(csvCell)
      .join(","),
  );

  const csv = [HEADERS.join(","), ...rows].join("\n");
  const filename = `evermore-members-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
