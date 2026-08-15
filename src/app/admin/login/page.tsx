import { AdminLoginForm } from "@/components/console/admin-login-form";

export default function AdminLoginPage() {
  return (
    <main className="bg-brand-gradient flex min-h-full items-center justify-center px-5 py-16">
      <div className="glass-card w-full max-w-sm rounded-3xl p-8">
        <h1 className="font-display text-xl font-semibold text-white">
          Evermore Admin
        </h1>
        <p className="mt-1 text-sm text-white/55">
          Sign in to manage invites and members.
        </p>
        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
