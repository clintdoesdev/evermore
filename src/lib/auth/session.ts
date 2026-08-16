import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("SESSION_SECRET environment variable is not set.");
}
const encodedKey = new TextEncoder().encode(secretKey);

export type AdminSessionPayload = {
  role: "admin";
  adminId: string;
  username: string;
};

export type MemberSessionPayload = {
  role: "member";
  memberId: string;
  username: string;
};

const ADMIN_COOKIE = "evm_admin_session";
const MEMBER_COOKIE = "evm_member_session";
const ADMIN_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours
const MEMBER_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

async function encrypt(payload: AdminSessionPayload | MemberSessionPayload, expires: Date) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(encodedKey);
}

async function decrypt<T>(token: string | undefined): Promise<T | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as T;
  } catch {
    return null;
  }
}

const isProd = process.env.NODE_ENV === "production";

export async function createAdminSession(payload: Omit<AdminSessionPayload, "role">) {
  const expires = new Date(Date.now() + ADMIN_MAX_AGE_SECONDS * 1000);
  const session = await encrypt({ role: "admin", ...payload }, expires);
  const store = await cookies();
  store.set(ADMIN_COOKIE, session, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    expires,
    path: "/",
  });
}

export async function createMemberSession(payload: Omit<MemberSessionPayload, "role">) {
  const expires = new Date(Date.now() + MEMBER_MAX_AGE_SECONDS * 1000);
  const session = await encrypt({ role: "member", ...payload }, expires);
  const store = await cookies();
  store.set(MEMBER_COOKIE, session, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    expires,
    path: "/",
  });
}

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const store = await cookies();
  return decrypt<AdminSessionPayload>(store.get(ADMIN_COOKIE)?.value);
}

export async function getMemberSession(): Promise<MemberSessionPayload | null> {
  const store = await cookies();
  return decrypt<MemberSessionPayload>(store.get(MEMBER_COOKIE)?.value);
}

/** Pure token verifiers (no `cookies()` dependency) for use in proxy.ts. */
export function verifyAdminToken(token: string | undefined) {
  return decrypt<AdminSessionPayload>(token);
}

export function verifyMemberToken(token: string | undefined) {
  return decrypt<MemberSessionPayload>(token);
}

export async function deleteAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export async function deleteMemberSession() {
  const store = await cookies();
  store.delete(MEMBER_COOKIE);
}

export { ADMIN_COOKIE, MEMBER_COOKIE };
