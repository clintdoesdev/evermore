import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { LoginForm } from "@/components/login-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Log In to Evermore",
  description:
    "Log in to your Evermore account to access your member dashboard and manage your membership.",
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Log In to Evermore",
    description:
      "Log in to your Evermore account to access your member dashboard and manage your membership.",
    url: "/login",
  },
};

export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Welcome Back"
        title="Log In to Evermore"
        description="Enter your email and password to access your Evermore account."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Log In", href: "/login" },
        ]}
      />

      <section className="bg-surface-0 py-16 sm:py-24">
        <Container className="max-w-md">
          <Reveal>
            <div className="glass-card rounded-3xl p-7 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] sm:p-9">
              <LoginForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-6 text-center text-sm text-white/60">
            New to Evermore?{" "}
            <Link href="/sign-up" className="font-semibold text-brand-mint hover:underline">
              Create an account
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
