import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.png`,
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
    </html>
  );
}
