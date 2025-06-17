// src/app/layout.tsx
import "../styles/base.css";
import "../styles/theme.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HamburgerMenu from "@/components/HamburgerMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Herb Aurora – 100% Natural Tamil Herbal Skincare",
  description:
    "Explore Herb Aurora's traditional Paatti remedies – handcrafted skincare powders for glowing, chemical-free skin.",
  keywords: [
    "Herb Aurora",
    "Tamil herbal skincare",
    "Paatti remedies",
    "natural beauty products",
    "chemical-free skincare",
    "bridal glow powder",
    "tan removal powder",
    "baby-safe powder",
  ],
  authors: [{ name: "Herb Aurora Team", url: "https://herbaurora.in" }],
  creator: "Herb Aurora",
  metadataBase: new URL("https://herbaurora.in"),
  openGraph: {
    title: "Herb Aurora – Tamil Herbal Skincare",
    description:
      "Handmade herbal powders rooted in tradition for healthy, glowing skin.",
    url: "https://herbaurora.in",
    siteName: "Herb Aurora",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Herb Aurora – Tamil Herbal Skincare",
    description:
      "Chemical-free skincare handmade from Tamil tradition. Shop Herb Aurora today!",
    site: "@herbaurora",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HamburgerMenu />
        {children}
      </body>
    </html>
  );
}
