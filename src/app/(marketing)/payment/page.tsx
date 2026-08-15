import type { Metadata } from "next";
import Script from "next/script";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PaymentFlow } from "@/components/payment/payment-flow";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { plans } from "@/lib/plans";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Evermore Membership Plans & Payment (Naira Pricing)",
  description:
    "Compare Evermore membership plans priced in Naira and complete secure checkout. Choose monthly, annual, or lifetime access and start your Evermore membership today.",
  alternates: {
    canonical: "/payment",
  },
  openGraph: {
    title: "Evermore Membership Plans & Payment (Naira Pricing)",
    description:
      "Compare Evermore membership plans priced in Naira and complete secure checkout. Choose monthly, annual, or lifetime access and start your Evermore membership today.",
    url: "/payment",
  },
};

const billingFaq: FaqItem[] = [
  {
    question: "What payment methods does Evermore accept?",
    answer:
      "Evermore is built to support Nigerian debit and credit cards and bank transfers through Paystack. Live payment processing is being finalized and will go live soon.",
  },
  {
    question: "Are Evermore plans priced in Naira?",
    answer:
      "Yes. All Evermore membership plans are priced and billed in Nigerian Naira (₦) only.",
  },
  {
    question: "When will I be charged for my Evermore membership?",
    answer:
      "You're charged immediately after completing checkout for monthly and annual plans. Lifetime plans are a single one-time charge with no renewals.",
  },
  {
    question: "Can I switch Evermore plans later?",
    answer:
      "Yes. You can upgrade or downgrade your Evermore membership plan at any time from your account dashboard.",
  },
  {
    question: "Does Evermore offer refunds?",
    answer:
      "Evermore membership plans include a 7-day money-back guarantee. If you're not satisfied, contact support within 7 days of your purchase.",
  },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Evermore Membership",
  description: siteConfig.description,
  brand: { "@type": "Brand", name: "Evermore" },
  offers: plans.map((plan) => ({
    "@type": "Offer",
    name: `Evermore ${plan.name} Membership`,
    price: plan.priceValue,
    priceCurrency: "NGN",
    url: `${siteConfig.url}/payment`,
    availability: "https://schema.org/InStock",
  })),
};

export default function PaymentPage() {
  return (
    <>
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <PageHeader
        eyebrow="Membership & Payment"
        title="Choose your Evermore membership"
        description="Compare plans, pick what fits, and complete checkout below. All prices are in Naira (₦). Secure Paystack payment processing is being finalized — this page shows exactly how checkout will work."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Membership", href: "/payment" },
        ]}
      />

      <section className="bg-surface-0 py-16 sm:py-20">
        <Container>
          <PaymentFlow />
        </Container>
      </section>

      <section className="relative bg-surface-1 py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
        <Container>
          <StaggerGroup className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-white/50">
            <StaggerItem>
              <TrustBadge label="256-bit SSL encryption" />
            </StaggerItem>
            <StaggerItem>
              <TrustBadge label="PCI-compliant checkout" />
            </StaggerItem>
            <StaggerItem>
              <TrustBadge label="7-day money-back guarantee" />
            </StaggerItem>
            <StaggerItem>
              <TrustBadge label="Cancel anytime" />
            </StaggerItem>
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-surface-0 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-center text-3xl font-semibold text-balance text-white sm:text-4xl">
              Billing questions
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <FaqAccordion items={billingFaq} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function TrustBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium sm:text-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-brand-mint">
        <path
          d="M12 3l7 3v6c0 4.6-3 7.9-7 9-4-1.1-7-4.4-7-9V6l7-3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </div>
  );
}
