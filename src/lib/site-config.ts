export const siteConfig = {
  name: "Evermore",
  tagline: "Turning Possibilities Into Experiences",
  url: "https://evermorewebsite.com.ng",
  description:
    "The official Evermore website — home of EverAI. Get paid to help train our AI, unlock global remote job alerts, get a personal mentor from day one, join free prediction games, and learn income-generating skills at Evermore Academy.",
  ogImage: "/og-image.jpg",
  keywords: [
    "Evermore",
    "EverAI",
    "Evermore website",
    "Evermore official website",
    "what is Evermore",
    "join Evermore",
    "train AI and get paid",
    "get paid to train AI",
    "AI training jobs",
    "remote jobs Evermore",
    "Evermore Academy",
    "Evermore membership",
    "Evermore sign up",
    "Evermore login",
    "Evermore platform",
    "Evermore app",
    "Evermore app download",
  ],
  links: {
    signUp: "/sign-up",
    howToRegister: "/how-to-register",
    payment: "/payment",
    home: "/",
  },
  contact: {
    email: "support@evermorewebsite.com.ng",
  },
  social: {
    twitter: "https://twitter.com/evermore",
    instagram: "https://instagram.com/evermore",
    facebook: "https://facebook.com/evermore",
  },
  // TODO: replace with the real VIP Telegram group invite link before launch.
  vipTelegramUrl: "https://t.me/+evermore-vip-placeholder",
} as const;

export type SiteConfig = typeof siteConfig;

/** Builds an absolute URL on the member portal subdomain (dashboard.<root domain>). */
export function portalUrl(path = "/") {
  const rootUrl = new URL(siteConfig.url);
  return `${rootUrl.protocol}//dashboard.${rootUrl.host}${path}`;
}
