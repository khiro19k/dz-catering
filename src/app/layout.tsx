import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MobileBottomBar from "@/components/MobileBottomBar";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://dz-catering.com"),
  title: {
    default: "EURL DZ CATERING | Traiteur d'Exception & Services Hôteliers à Alger",
    template: "%s | EURL DZ CATERING",
  },
  description:
    "Maison traiteur d'exception et services hôteliers de prestige à Alger (Douaouda & El Biar). Pauses café VIP, cocktails déjeunatoires, buffets d'apparat et déjeuners d'affaires pour réceptions officielles et d'entreprises.",
  keywords: [
    "traiteur alger",
    "dz catering",
    "pause café alger",
    "cocktail dinatoire alger",
    "service traiteur entreprise algerie",
    "traiteur cic alger",
    "lunch box alger",
    "traiteur mariage alger",
    "buffet prestige alger",
  ],
  authors: [{ name: "EURL DZ CATERING" }],
  creator: "EURL DZ CATERING",
  publisher: "EURL DZ CATERING",
  openGraph: {
    type: "website",
    locale: "fr_DZ",
    url: "https://dz-catering.com",
    siteName: "EURL DZ CATERING",
    title: "EURL DZ CATERING | Traiteur d'Exception & Services Hôteliers à Alger",
    description:
      "Maison traiteur d'exception et services hôteliers de prestige à Alger. Pauses café VIP, cocktails déjeunatoires, buffets d'apparat et déjeuners d'affaires.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EURL DZ CATERING - Traiteur d'Exception",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EURL DZ CATERING | Traiteur d'Exception à Alger",
    description:
      "Maison traiteur d'exception et services hôteliers de prestige à Alger. Pauses café VIP, cocktails et banquets d'apparat.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#63002e] text-white selection:bg-gold-500/30 selection:text-gold-200">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <MobileBottomBar />
        <Analytics />
      </body>
    </html>
  );
}
