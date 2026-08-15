export type Plan = {
  id: "monthly" | "annual" | "lifetime";
  name: string;
  price: string;
  period: string;
  billedAs: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$19",
    period: "/month",
    billedAs: "Billed monthly",
    description: "Flexible access, cancel whenever you like.",
    features: [
      "Full Evermore platform access",
      "Member dashboard",
      "Email support",
      "Cancel anytime",
    ],
  },
  {
    id: "annual",
    name: "Annual",
    price: "$15",
    period: "/month",
    billedAs: "Billed $180 yearly",
    description: "Our most popular plan — save 21% vs monthly.",
    features: [
      "Everything in Monthly",
      "2 months free vs. monthly billing",
      "Priority support",
      "Early access to new features",
    ],
    highlighted: true,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$499",
    period: " once",
    billedAs: "One-time payment",
    description: "Pay once, keep your Evermore membership forever.",
    features: [
      "Everything in Annual",
      "Lifetime access, no renewals",
      "VIP support",
      "All future updates included",
    ],
  },
];
