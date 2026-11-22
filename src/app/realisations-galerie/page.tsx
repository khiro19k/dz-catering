import type { Metadata } from "next";
import RealisationsGalerieClient from "./RealisationsGalerieClient";

export const metadata: Metadata = {
  title: "Galerie de Nos Réalisations de Prestige | Événements d'Exception",
  description:
    "Immersion visuelle dans nos réceptions d'apparat, buffets de sommets d'État et dîners de gala à Alger (CIC Alger, Sheraton, institutions internationales et ministères).",
  openGraph: {
    title: "Galerie de Nos Réalisations de Prestige | EURL DZ CATERING",
    description:
      "Immersion visuelle dans nos réceptions d'apparat, buffets de sommets d'État et dîners de gala à Alger (CIC Alger, Sheraton, diplomatie).",
    url: "https://dz-catering.com/realisations-galerie",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function RealisationsGaleriePage() {
  return <RealisationsGalerieClient />;
}
