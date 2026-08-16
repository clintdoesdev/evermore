import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { RegisterForm } from "@/components/console/register-form";
import { AuthSplit } from "@/components/console/auth-split";

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
    <AuthSplit
      eyebrow="You're Invited"
      title="Exist Beyond the Moment"
      description="This invite link is yours alone. Complete your registration below to lock in your spot as an Evermore member."
    >
      {isValid ? (
        <>
          <h1 className="font-display text-2xl font-semibold text-white">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-white/55">
            A few details and you&apos;re in.
          </p>
          <div className="mt-7">
            <RegisterForm token={token} />
          </div>
        </>
      ) : (
        <div className="glass-card rounded-3xl p-7">
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
        </div>
      )}
    </AuthSplit>
  );
}
