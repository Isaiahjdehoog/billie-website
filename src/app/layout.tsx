import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Kalam } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { meta } from "@/lib/copy";
import "./globals.css";

// Body (Helvetica) is a system stack - no webfont. Three faces download.

// Serif headlines only. Weight 400 at every size - lighter weights go weedy at
// headline size and break up on a phone, so 400 is used throughout (no step).
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cormorant",
  display: "swap",
});

// Label voice: eyebrows, form labels, status bar, step numbers.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Wordmark only.
const kalam = Kalam({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-kalam",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getbillie.com.au"),
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
    <html
      lang="en-AU"
      className={`${cormorant.variable} ${jetbrainsMono.variable} ${kalam.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
