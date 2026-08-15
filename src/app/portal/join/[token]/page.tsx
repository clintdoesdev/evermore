import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { RegisterForm } from "@/components/console/register-form";

export default async function JoinPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const invite = await prisma.invite.findUnique({ where: { token } });

  const isValid = Boolean(invite) && invite!.status === "PENDING" &&
    (!invite!.expiresAt || invite!.expiresAt > new Date());

  return (
    <main className="bg-brand-gradient flex min-h-full items-center justify-center px-5 py-16">
      <div className="glass-card w-full max-w-md rounded-3xl p-8">
        {isValid ? (
          <>
            <h1 className="font-display text-xl font-semibold text-white">
              You&apos;re invited to Evermore
            </h1>
            <p className="mt-1 text-sm text-white/55">
              Create your account below to get started.
            </p>
            <div className="mt-6">
              <RegisterForm token={token} />
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display text-xl font-semibold text-white">
              Invite link not valid
            </h1>
            <p className="mt-2 text-sm text-white/60">
              This invite link has already been used, revoked, or has
              expired. Contact the person who invited you for a new link, or
              log in if you already have an account.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-brand-green to-brand-mint px-6 py-3 text-sm font-semibold text-brand-navy"
            >
              Go to login
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
