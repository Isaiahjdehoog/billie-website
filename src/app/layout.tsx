import type { Metadata } from "next";
import { Jost, Kalam } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { meta } from "@/lib/copy";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

// Wordmark only.
const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kalam",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://billie-website.vercel.app"),
  title: meta.title,
  description: meta.description,
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "/",
    siteName: "BiLLiE",
    locale: "en_AU",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: meta.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${jost.variable} ${kalam.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
