export const siteConfig = {
  name: "Evermore",
  tagline: "Exist Beyond the Moment",
  url: "https://evermorewebsite.com.ng",
  description:
    "Evermore is the membership platform built for people who want more than a moment — more growth, more access, more momentum. Join Evermore today and exist beyond the moment.",
  ogImage: "/og-image.jpg",
  keywords: [
    "Evermore",
    "Evermore website",
    "Evermore official website",
    "what is Evermore",
    "join Evermore",
    "Evermore membership",
    "Evermore sign up",
    "Evermore login",
    "Evermore platform",
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
} as const;

export type SiteConfig = typeof siteConfig;

/** Builds an absolute URL on the member portal subdomain (dashboard.<root domain>). */
export function portalUrl(path = "/") {
  const rootUrl = new URL(siteConfig.url);
  return `${rootUrl.protocol}//dashboard.${rootUrl.host}${path}`;
}
