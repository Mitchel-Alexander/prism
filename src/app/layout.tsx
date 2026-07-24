import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Open_Sans } from "next/font/google";
import { SITE_URL, BASE_PATH } from "@/lib/site";
import "./globals.css";

// Analytics carried over from the Squarespace site so tracking survives the
// domain migration — same GA4 property + Ads tag already on the old site.
const GA4_ID = "G-E5XPRWE50C";
const ADS_ID = "AW-17158899995";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Headline / display face. Keep the CSS variable name stable (--font-head) so
// swapping the typeface only touches this file, never globals.css.
const headFont = Open_Sans({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_TITLE =
  "PRISM — Partnership for Research Into Sentient Machines";
const SITE_DESCRIPTION =
  "A non-profit fostering responsible research into AI consciousness, moral status, and digital minds.";
// Social share card (Open Graph / Twitter). Absolute URL — crawlers don't resolve relative paths.
// ?v=2: tagline removed 2026-07-24 — the version bump makes share-platform
// scrapers treat it as a new image instead of serving their cached card.
const OG_IMAGE = `${SITE_URL}/og.png?v=2`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    // ?v=2 busts browsers' sticky favicon cache after the icon was changed.
    icon: `${BASE_PATH}/favicon.png?v=2`,
  },
  openGraph: {
    type: "website",
    siteName: "PRISM",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    locale: "en_GB",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${headFont.variable} antialiased`}
    >
      <body>{children}</body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');
gtag('config', '${ADS_ID}');`}
      </Script>
    </html>
  );
}
