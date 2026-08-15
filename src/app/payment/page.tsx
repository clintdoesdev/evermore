import type { Metadata } from "next";
import Script from "next/script";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PaymentFlow } from "@/components/payment/payment-flow";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { plans } from "@/lib/plans";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Evermore Membership Plans & Payment",
  description:
    "Compare Evermore membership plans and complete secure checkout. Choose monthly, annual, or lifetime access and start your Evermore membership today.",
  alternates: {
    canonical: "/payment",
  },
  openGraph: {
    title: "Evermore Membership Plans & Payment",
    description:
      "Compare Evermore membership plans and complete secure checkout. Choose monthly, annual, or lifetime access and start your Evermore membership today.",
    url: "/payment",
  },
};

const billingFaq: FaqItem[] = [
  {
    question: "What payment methods does Evermore accept?",
    answer:
      "Evermore is built to support major debit and credit cards through a secure payment processor. Card payment processing is being finalized and will go live soon.",
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
    price: plan.price.replace(/[^0-9.]/g, ""),
    priceCurrency: "USD",
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
        description="Compare plans, pick what fits, and complete checkout below. Secure card payment processing is being finalized — this page shows exactly how checkout will work."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Membership", href: "/payment" },
        ]}
      />

      <section className="bg-brand-cloud py-16 sm:py-20">
        <Container>
          <PaymentFlow />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-brand-ink/50">
          <TrustBadge label="256-bit SSL encryption" />
          <TrustBadge label="PCI-compliant checkout" />
          <TrustBadge label="7-day money-back guarantee" />
          <TrustBadge label="Cancel anytime" />
        </Container>
      </section>

      <section className="bg-brand-cloud py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-center text-3xl font-semibold text-balance text-brand-ink sm:text-4xl">
            Billing questions
          </h2>
          <div className="mt-12">
            <FaqAccordion items={billingFaq} />
          </div>
        </Container>
      </section>
    </>
  );
}

function TrustBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium sm:text-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
