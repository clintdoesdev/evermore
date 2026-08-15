"use server";

import * as z from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createMemberSession, deleteMemberSession } from "@/lib/auth/session";

const RegisterSchema = z.object({
  token: z.string().min(1),
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type RegisterState = { error?: string } | undefined;

export async function registerFromInvite(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = RegisterSchema.safeParse({
    token: formData.get("token"),
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details and try again." };
  }

  const { token, name, email, password } = parsed.data;

  const invite = await prisma.invite.findUnique({ where: { token } });

  if (!invite || invite.status !== "PENDING") {
    return { error: "This invite link is no longer valid." };
  }
  if (invite.expiresAt && invite.expiresAt < new Date()) {
    await prisma.invite.update({ where: { id: invite.id }, data: { status: "EXPIRED" } });
    return { error: "This invite link has expired." };
  }

  const existing = await prisma.member.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists. Try logging in instead." };
  }

  const passwordHash = await hashPassword(password);

  const member = await prisma.$transaction(async (tx) => {
    const created = await tx.member.create({
      data: {
        name,
        email,
        passwordHash,
        status: "PENDING_PAYMENT",
        inviteId: invite.id,
      },
    });
    await tx.invite.update({
      where: { id: invite.id },
      data: { status: "USED", usedAt: new Date() },
    });
    return created;
  });

  await createMemberSession({ memberId: member.id, email: member.email });
  redirect("/dashboard");
}

const LoginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export type MemberLoginState = { error?: string } | undefined;

export async function memberLogin(
  _prevState: MemberLoginState,
  formData: FormData,
): Promise<MemberLoginState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  const member = await prisma.member.findUnique({ where: { email: parsed.data.email } });
  if (!member) {
    return { error: "Invalid email or password." };
  }

  const valid = await verifyPassword(parsed.data.password, member.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  await createMemberSession({ memberId: member.id, email: member.email });
  redirect("/dashboard");
}

export async function memberLogout() {
  await deleteMemberSession();
  redirect("/login");
}
