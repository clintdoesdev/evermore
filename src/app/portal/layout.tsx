import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import "@/app/globals.css";
import { Logo } from "@/components/logo";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Evermore Member Portal",
  description: "Sign in or register to access your Evermore membership.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
};

export default function PortalRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased dark`} style={{ colorScheme: "dark" }} data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col bg-surface-0 text-brand-ink">
        <header className="border-b border-white/10 bg-surface-1 px-6 py-4">
          <Link href="/" className="inline-flex">
            <Logo />
          </Link>
        </header>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
