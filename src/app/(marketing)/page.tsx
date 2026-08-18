import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { EverAiIntro } from "@/components/landing/everai-intro";
import { CampaignCarousel } from "@/components/landing/campaign-carousel";
import { ValueProps } from "@/components/landing/value-props";
import { HowItWorksTeaser } from "@/components/landing/how-it-works-teaser";
import { MembershipTeaser } from "@/components/landing/membership-teaser";
import { Testimonials } from "@/components/landing/testimonials";
import { LandingFaq } from "@/components/landing/landing-faq";
import { FinalCta } from "@/components/landing/final-cta";

export const metadata: Metadata = {
  title: "Evermore | Get Paid to Train EverAI, Remote Jobs & Mentorship",
  description:
    "Join Evermore and get paid to help train EverAI, our Generative AI assistant. Unlock global remote jobs, a personal mentor, free prediction games, and Evermore Academy skills training.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Evermore | Get Paid to Train EverAI, Remote Jobs & Mentorship",
    description:
      "Join Evermore and get paid to help train EverAI, our Generative AI assistant. Unlock global remote jobs, a personal mentor, free prediction games, and Evermore Academy skills training.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <EverAiIntro />
      <CampaignCarousel />
      <ValueProps />
      <HowItWorksTeaser />
      <MembershipTeaser />
      <Testimonials />
      <LandingFaq />
      <FinalCta />
    </>
  );
}
