import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MobileBottomBar from "@/components/MobileBottomBar";

export const metadata: Metadata = {
  title: "EURL DZ CATERING | Traiteur & Services Hôteliers | Douaouda & El Biar, Alger",
  description: "Maison traiteur d'exception et services hôteliers. Pauses café, cocktails, déjeuners et réceptions de prestige à Alger.",
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
      </body>
    </html>
  );
}
