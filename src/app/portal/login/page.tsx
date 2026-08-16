import { MemberLoginForm } from "@/components/console/member-login-form";
import { AuthSplit } from "@/components/console/auth-split";

export default function PortalLoginPage() {
  return (
    <AuthSplit
      eyebrow="Member Portal"
      title="Welcome back to Evermore"
      description="Log in with the username and password you created when you registered through your invite link."
    >
      <h1 className="font-display text-2xl font-semibold text-white">Log In</h1>
      <p className="mt-1.5 text-sm text-white/55">
        Enter your username and password to access your dashboard.
      </p>
      <div className="mt-7">
        <MemberLoginForm />
      </div>
    </AuthSplit>
  );
}
