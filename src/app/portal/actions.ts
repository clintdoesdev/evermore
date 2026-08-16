"use server";

import * as z from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createMemberSession, deleteMemberSession } from "@/lib/auth/session";

const USERNAME_PATTERN = /^[a-zA-Z0-9_.]{3,32}$/;

const RegisterSchema = z.object({
  token: z.string().min(1),
  name: z.string().trim().min(2, "Enter your full name."),
  username: z
    .string()
    .trim()
    .regex(USERNAME_PATTERN, "Username must be 3-32 characters: letters, numbers, _ or ."),
  email: z.email("Enter a valid email address."),
  phone: z.string().trim().min(6, "Enter a valid phone number."),
  country: z.string().trim().min(1, "Select your country."),
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
    username: formData.get("username"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details and try again." };
  }

  const { token, name, username, email, phone, country, password } = parsed.data;

  const invite = await prisma.invite.findUnique({ where: { token } });

  if (!invite || invite.status !== "PENDING") {
    return { error: "This invite link is no longer valid." };
  }
  if (invite.expiresAt && invite.expiresAt < new Date()) {
    await prisma.invite.update({ where: { id: invite.id }, data: { status: "EXPIRED" } });
    return { error: "This invite link has expired." };
  }

  const [existingEmail, existingUsername] = await Promise.all([
    prisma.member.findUnique({ where: { email } }),
    prisma.member.findUnique({ where: { username } }),
  ]);
  if (existingEmail) {
    return { error: "An account with this email already exists. Try logging in instead." };
  }
  if (existingUsername) {
    return { error: "That username is already taken. Choose another." };
  }

  const passwordHash = await hashPassword(password);

  const member = await prisma.$transaction(async (tx) => {
    const created = await tx.member.create({
      data: {
        name,
        username,
        email,
        phone,
        country,
        passwordHash,
        status: "PENDING_PAYMENT",
        paymentPlan: invite.paymentPlan ?? undefined,
        inviteId: invite.id,
      },
    });
    await tx.invite.update({
      where: { id: invite.id },
      data: { status: "USED", usedAt: new Date() },
    });
    return created;
  });

  await createMemberSession({ memberId: member.id, username: member.username });
  redirect("/dashboard");
}

const LoginSchema = z.object({
  username: z.string().trim().min(1, "Enter your username."),
  password: z.string().min(1, "Enter your password."),
});

export type MemberLoginState = { error?: string } | undefined;

export async function memberLogin(
  _prevState: MemberLoginState,
  formData: FormData,
): Promise<MemberLoginState> {
  const parsed = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter your username and password." };
  }

  const member = await prisma.member.findUnique({ where: { username: parsed.data.username } });
  if (!member) {
    return { error: "Invalid username or password." };
  }

  const valid = await verifyPassword(parsed.data.password, member.passwordHash);
  if (!valid) {
    return { error: "Invalid username or password." };
  }

  await createMemberSession({ memberId: member.id, username: member.username });
  redirect("/dashboard");
}

export async function memberLogout() {
  await deleteMemberSession();
  redirect("/login");
}
