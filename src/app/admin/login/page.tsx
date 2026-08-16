import { AdminLoginForm } from "@/components/console/admin-login-form";
import { AuthSplit } from "@/components/console/auth-split";

export default function AdminLoginPage() {
  return (
    <AuthSplit
      eyebrow="Admin Console"
      title="Run the Evermore member pipeline"
      description="Generate invite links, review registrations, and manage member access from one place."
    >
      <h1 className="font-display text-2xl font-semibold text-white">
        Evermore Admin
      </h1>
      <p className="mt-1.5 text-sm text-white/55">
        Sign in to manage invites and members.
      </p>
      <div className="mt-7">
        <AdminLoginForm />
      </div>
    </AuthSplit>
  );
}
