import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustProofSection from "@/components/TrustProofSection";
import HomeFormulesOverview from "@/components/HomeFormulesOverview";
import GallerySection from "@/components/GallerySection";
import BespokeCurator from "@/components/BespokeCurator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#63002e] text-white selection:bg-gold-500/30 selection:text-gold-200">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustProofSection />
        <HomeFormulesOverview />
        <GallerySection />
        <BespokeCurator />
      </main>
      <Footer />
    </div>
  );
}
