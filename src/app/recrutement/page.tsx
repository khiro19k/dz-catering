import type { Metadata } from "next";
import RecrutementClient from "./RecrutementClient";

export const metadata: Metadata = {
  title: "Espace Recrutement & Carrières | Rejoignez Notre Brigade d'Excellence",
  description:
    "Postulez au sein de l'EURL DZ CATERING : postes ouverts pour Maîtres d'hôtel, Chefs cuisiniers, Chefs pâtissiers et serveurs pour nos réceptions de prestige et sommets d'État.",
  openGraph: {
    title: "Espace Recrutement & Carrières | EURL DZ CATERING",
    description:
      "Postulez au sein de l'EURL DZ CATERING : postes ouverts pour Maîtres d'hôtel, Chefs cuisiniers, pâtissiers et serveurs pour réceptions de prestige.",
    url: "https://dz-catering.com/recrutement",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function RecrutementPage() {
  return <RecrutementClient />;
}
