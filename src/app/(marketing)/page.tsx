import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { ValueProps } from "@/components/landing/value-props";
import { HowItWorksTeaser } from "@/components/landing/how-it-works-teaser";
import { MembershipTeaser } from "@/components/landing/membership-teaser";
import { Testimonials } from "@/components/landing/testimonials";
import { LandingFaq } from "@/components/landing/landing-faq";
import { FinalCta } from "@/components/landing/final-cta";

export const metadata: Metadata = {
  title: "Evermore Website | Exist Beyond the Moment",
  description:
    "Welcome to the official Evermore website. Discover what Evermore is, explore membership plans, and join the platform built to help you exist beyond the moment.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Evermore Website | Exist Beyond the Moment",
    description:
      "Welcome to the official Evermore website. Discover what Evermore is, explore membership plans, and join the platform built to help you exist beyond the moment.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <HowItWorksTeaser />
      <MembershipTeaser />
      <Testimonials />
      <LandingFaq />
      <FinalCta />
    </>
  );
}
