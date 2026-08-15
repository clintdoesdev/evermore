import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist on the Evermore website.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-brand-gradient flex flex-1 items-center py-24 text-white">
      <Container className="flex flex-col items-center text-center">
        <span className="font-display text-7xl font-semibold text-brand-mint sm:text-8xl">
          404
        </span>
        <h1 className="font-display mt-4 text-2xl font-semibold sm:text-3xl">
          This moment doesn&apos;t exist on Evermore
        </h1>
        <p className="mt-3 max-w-md text-white/70">
          The page you&apos;re looking for may have moved. Head back home or
          jump straight to registration.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Back to Home
          </Button>
          <Button href="/how-to-register" variant="outline" size="lg">
            How to Register
          </Button>
        </div>
      </Container>
    </section>
  );
}
