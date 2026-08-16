import { verifyMemberSession } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { PortalShell } from "@/components/console/portal-shell";
import { CopyLinkButton } from "@/components/console/copy-link-button";
import { CalendarIcon, KeyIcon, TelegramIcon, SparkleIcon } from "@/components/console/icons";
import { siteConfig } from "@/lib/site-config";

const statusCopy: Record<string, { title: string; body: string }> = {
  REGISTERED: {
    title: "You're registered",
    body: "Your Evermore account is set up. We'll let you know as soon as your membership is active.",
  },
  PENDING_PAYMENT: {
    title: "Almost there",
    body: "Your registration is complete and we're confirming your details. This page will update automatically once your membership is active.",
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

const planLabels: Record<string, string> = {
  MONTHLY: "Monthly",
  ANNUAL: "Annual",
  LIFETIME: "Lifetime",
};

function isInFuture(date: Date) {
  return date.getTime() > Date.now();
}

export default async function PortalDashboardPage() {
  const session = await verifyMemberSession();
  const member = await prisma.member.findUniqueOrThrow({
    where: { id: session.memberId },
  });

  const copy = statusCopy[member.status];
  const activationDate = member.activationDate;
  const isFutureActivation = activationDate ? isInFuture(activationDate) : false;

  return (
    <PortalShell>
      <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
        <div className="text-center">
          <span
            className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
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
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            {copy.body}
          </p>
          <p className="mt-5 text-xs text-white/40">
            Signed in as {member.name} (@{member.username})
            {member.paymentPlan && ` · ${planLabels[member.paymentPlan]} plan`}
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {activationDate && (
            <div className="glass-card flex items-start gap-4 rounded-2xl p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-mint">
                <CalendarIcon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-sm font-semibold text-white">
                  {isFutureActivation ? "Activation date" : "Activated on"}
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  {isFutureActivation
                    ? `Your account will be activated on ${activationDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}.`
                    : activationDate.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                </p>
              </div>
            </div>
          )}

          {member.loginDetails && (
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-mint">
                  <KeyIcon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <h2 className="font-display text-sm font-semibold text-white">
                    Your login details
                  </h2>
                  <p className="mt-1 whitespace-pre-line text-sm text-white/60">
                    {member.loginDetails}
                  </p>
                  <div className="mt-3">
                    <CopyLinkButton link={member.loginDetails} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {member.status === "ACTIVE" && (
            <div className="glass-card overflow-hidden rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-mint">
                  <SparkleIcon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <h2 className="font-display text-sm font-semibold text-white">
                    Join the VIP Telegram group
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    Active members get access to our private Telegram group for updates and
                    community.
                  </p>
                  <a
                    href={siteConfig.vipTelegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-green to-brand-mint px-5 py-2.5 text-sm font-semibold text-brand-navy"
                  >
                    <TelegramIcon className="h-4 w-4" />
                    Join VIP Telegram Group
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PortalShell>
  );
}
