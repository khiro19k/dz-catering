import type { Metadata } from "next";
import DevisContactClient from "./DevisContactClient";

export const metadata: Metadata = {
  title: "Demandez Votre Devis Express en Ligne | Réponse sous 2 à 4h",
  description:
    "Composez votre prestation traiteur sur-mesure à Alger : sélectionnez vos formules, l'agenda de votre événement et vos options d'apparat. Devis officiel transmis sous 2 à 4 heures ouvrées.",
  openGraph: {
    title: "Demandez Votre Devis Express en Ligne | EURL DZ CATERING",
    description:
      "Composez votre prestation traiteur sur-mesure à Alger : sélection des formules, agenda et options de service. Devis officiel transmis sous 2 à 4 heures ouvrées.",
    url: "https://dz-catering.com/devis-contact",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function DevisContactPage() {
  return <DevisContactClient />;
}
