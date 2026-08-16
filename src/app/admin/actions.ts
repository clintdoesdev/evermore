"use server";

import * as z from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { verifyPassword } from "@/lib/auth/password";
import { createAdminSession, deleteAdminSession } from "@/lib/auth/session";
import { verifyAdminSession } from "@/lib/auth/dal";
import { generateInviteToken } from "@/lib/auth/tokens";
import { withFlash } from "@/lib/flash";

const LoginSchema = z.object({
  username: z.string().trim().min(1, "Enter your username."),
  password: z.string().min(1, "Enter your password."),
});

export type AdminLoginState = { error?: string } | undefined;

export async function adminLogin(
  _prevState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const parsed = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid username and password." };
  }

  const admin = await prisma.adminUser.findUnique({
    where: { username: parsed.data.username },
  });

  if (!admin) {
    return { error: "Invalid username or password." };
  }

  const valid = await verifyPassword(parsed.data.password, admin.passwordHash);
  if (!valid) {
    return { error: "Invalid username or password." };
  }

  await createAdminSession({ adminId: admin.id, username: admin.username });
  redirect("/");
}

export async function adminLogout() {
  await deleteAdminSession();
  redirect("/login");
}

const PLAN_VALUES = ["MONTHLY", "ANNUAL", "LIFETIME"] as const;

const CreateInviteSchema = z.object({
  label: z.string().trim().max(120).optional(),
  paymentPlan: z.enum(PLAN_VALUES).optional(),
  expiresInDays: z.coerce.number().int().min(0).max(365).optional(),
});

export async function createInvite(formData: FormData) {
  const session = await verifyAdminSession();
  const raw = {
    label: formData.get("label") || undefined,
    paymentPlan: formData.get("paymentPlan") || undefined,
    expiresInDays: formData.get("expiresInDays") || undefined,
  };
  const parsed = CreateInviteSchema.safeParse(raw);
  if (!parsed.success) {
    redirect(withFlash("/invites", "Couldn't create invite — check the form.", "error"));
  }

  const expiresAt =
    parsed.data.expiresInDays && parsed.data.expiresInDays > 0
      ? new Date(Date.now() + parsed.data.expiresInDays * 24 * 60 * 60 * 1000)
      : undefined;

  await prisma.invite.create({
    data: {
      token: generateInviteToken(),
      label: parsed.data.label,
      paymentPlan: parsed.data.paymentPlan,
      expiresAt,
      createdById: session.adminId,
    },
  });

  redirect(withFlash("/invites", "Invite link created."));
}

export async function revokeInvite(formData: FormData) {
  await verifyAdminSession();
  const id = String(formData.get("id"));
  await prisma.invite.updateMany({
    where: { id, status: "PENDING" },
    data: { status: "REVOKED" },
  });
  redirect(withFlash("/invites", "Invite revoked."));
}

export async function setMemberStatus(formData: FormData) {
  await verifyAdminSession();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));

  if (status !== "ACTIVE" && status !== "SUSPENDED") {
    throw new Error("Invalid member status.");
  }

  await prisma.member.update({
    where: { id },
    data: {
      status,
      activatedAt: status === "ACTIVE" ? new Date() : undefined,
    },
  });
  redirect(
    withFlash("/members", status === "ACTIVE" ? "Member marked active." : "Member suspended."),
  );
}

export async function deleteMember(formData: FormData) {
  await verifyAdminSession();
  const id = String(formData.get("id"));

  await prisma.$transaction(async (tx) => {
    const member = await tx.member.findUnique({ where: { id } });
    if (!member) return;
    await tx.member.delete({ where: { id } });
    await tx.invite.update({
      where: { id: member.inviteId },
      data: { status: "REVOKED" },
    });
  });

  redirect(withFlash("/members", "Member deleted."));
}

/** Parses "Label: Value" lines (one per row) into a plain object. */
function parseCustomFields(text: string | null): Record<string, string> | undefined {
  if (!text || !text.trim()) return undefined;
  const entries: [string, string][] = [];
  for (const line of text.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) entries.push([key, value]);
  }
  return entries.length ? Object.fromEntries(entries) : undefined;
}

const UpdateMemberSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(2, "Enter a full name."),
  username: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9_.]{3,32}$/, "Username must be 3-32 characters."),
  email: z.email("Enter a valid email."),
  phone: z.string().trim().min(6, "Enter a valid phone number."),
  country: z.string().trim().min(1, "Select a country."),
  paymentPlan: z.enum(PLAN_VALUES).optional(),
  activationDate: z.string().optional(),
  loginDetails: z.string().optional(),
  customFieldsText: z.string().optional(),
});

export type UpdateMemberState = { error?: string } | undefined;

export async function updateMember(
  _prevState: UpdateMemberState,
  formData: FormData,
): Promise<UpdateMemberState> {
  await verifyAdminSession();

  const parsed = UpdateMemberSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    paymentPlan: formData.get("paymentPlan") || undefined,
    activationDate: formData.get("activationDate") || undefined,
    loginDetails: formData.get("loginDetails") || undefined,
    customFieldsText: formData.get("customFieldsText") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const { id, name, username, email, phone, country, paymentPlan, activationDate, loginDetails, customFieldsText } =
    parsed.data;

  const conflict = await prisma.member.findFirst({
    where: {
      id: { not: id },
      OR: [{ username }, { email }],
    },
  });
  if (conflict) {
    return { error: "That username or email is already used by another member." };
  }

  const customFields = parseCustomFields(customFieldsText ?? null);

  await prisma.member.update({
    where: { id },
    data: {
      name,
      username,
      email,
      phone,
      country,
      paymentPlan: paymentPlan ?? null,
      activationDate: activationDate ? new Date(activationDate) : null,
      loginDetails: loginDetails?.trim() || null,
      customFields: customFields ?? Prisma.JsonNull,
    },
  });

  redirect(withFlash("/members", "Member updated."));
}
