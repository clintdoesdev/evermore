"use server";

import * as z from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import {
  createAdminSession,
  deleteAdminSession,
} from "@/lib/auth/session";
import { verifyAdminSession } from "@/lib/auth/dal";
import { generateInviteToken } from "@/lib/auth/tokens";

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

const CreateInviteSchema = z.object({
  label: z.string().trim().max(120).optional(),
});

export async function createInvite(formData: FormData) {
  const session = await verifyAdminSession();
  const parsed = CreateInviteSchema.safeParse({
    label: formData.get("label") || undefined,
  });

  await prisma.invite.create({
    data: {
      token: generateInviteToken(),
      label: parsed.success ? parsed.data.label : undefined,
      createdById: session.adminId,
    },
  });

  redirect("/invites");
}

export async function revokeInvite(formData: FormData) {
  await verifyAdminSession();
  const id = String(formData.get("id"));
  await prisma.invite.updateMany({
    where: { id, status: "PENDING" },
    data: { status: "REVOKED" },
  });
  redirect("/invites");
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
  redirect("/members");
}
