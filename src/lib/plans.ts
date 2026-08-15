export type Plan = {
  id: "monthly" | "annual" | "lifetime";
  name: string;
  price: string;
  priceValue: number;
  period: string;
  billedAs: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const currency = {
  code: "NGN",
  symbol: "₦",
};

export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export const plans: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: formatNaira(9500),
    priceValue: 9500,
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
    price: formatNaira(7500),
    priceValue: 7500,
    period: "/month",
    billedAs: `Billed ${formatNaira(90000)} yearly`,
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
    price: formatNaira(249000),
    priceValue: 249000,
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
