import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Kalam } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { meta } from "@/lib/copy";
import "./globals.css";

// Headlines only. Variable, with SOFT/WONK dialled in via font-variation-settings
// (see globals.css .u-serif) so it reads warm at display sizes. wght via
// font-weight. Never body, never a numeral.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
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
  weight: ["400", "700"],
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
      className={`${fraunces.variable} ${jetbrainsMono.variable} ${kalam.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
