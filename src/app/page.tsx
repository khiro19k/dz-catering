import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustProofSection from "@/components/TrustProofSection";
import HomeFormulesOverview from "@/components/HomeFormulesOverview";
import PrestigeBuffetSection from "@/components/PrestigeBuffetSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Accueil | Traiteur d'Exception & Services Hôteliers de Prestige à Alger",
  description:
    "Maison traiteur d'exception et services hôteliers pour réceptions d'entreprises, sommets d'État et événements privés à Alger. Pauses café VIP, cocktails déjeunatoires et banquets.",
  openGraph: {
    title: "EURL DZ CATERING | Traiteur d'Exception & Services Hôteliers à Alger",
    description:
      "Maison traiteur d'exception et services hôteliers pour réceptions d'entreprises, sommets d'État et événements privés à Alger.",
    url: "https://dz-catering.com",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#63002e] text-white selection:bg-gold-500/30 selection:text-gold-200">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustProofSection />
        <HomeFormulesOverview />
        <PrestigeBuffetSection />
      </main>
      <Footer />
    </div>
  );
}
