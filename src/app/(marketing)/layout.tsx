import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Evermore | Get Paid to Train EverAI, Remote Jobs & Mentorship",
    template: "%s | Evermore",
  },
  description:
    "Evermore is the technology ecosystem behind EverAI. Get paid to help train our AI, unlock global remote job alerts, get a personal mentor from day one, join free prediction games, and learn income-generating skills at Evermore Academy.",
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: "Evermore" }],
  creator: "Evermore",
  publisher: "Evermore",
  category: "Artificial Intelligence",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Evermore | Get Paid to Train EverAI, Remote Jobs & Mentorship",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Evermore — Turning Possibilities Into Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evermore | Turning Possibilities Into Experiences",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: "Evermore",
      url: siteConfig.url,
      logo: `${siteConfig.url}/images/icon-512.png`,
      description:
        "Evermore is a technology-driven company building EverAI, a Generative AI assistant, and a rewards ecosystem where people get paid to train it.",
      sameAs: [
        siteConfig.social.twitter,
        siteConfig.social.instagram,
        siteConfig.social.facebook,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: "Evermore",
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteConfig.url}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-surface-0 text-brand-ink">
        <Script
          id="evermore-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-green focus:px-4 focus:py-2 focus:text-brand-navy"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
