import { MemberLoginForm } from "@/components/console/member-login-form";

export default function PortalLoginPage() {
  return (
    <main className="bg-brand-gradient flex min-h-full items-center justify-center px-5 py-16">
      <div className="glass-card w-full max-w-sm rounded-3xl p-8">
        <h1 className="font-display text-xl font-semibold text-white">
          Log In to Evermore
        </h1>
        <p className="mt-1 text-sm text-white/55">
          Enter your email and password to access your dashboard.
        </p>
        <div className="mt-6">
          <MemberLoginForm />
        </div>
      </div>
    </main>
  );
}
