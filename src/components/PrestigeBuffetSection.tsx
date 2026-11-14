"use client";

import * as React from "react";
import GrandBuffetTable, { type BuffetDish } from "@/components/GrandBuffetTable";

export const PRESTIGE_BUFFET_DISHES: BuffetDish[] = [
  {
    id: "patisseries-orientales",
    name: "Pâtisseries Orientales Prestigieuses",
    price: "Formule VIP & VVIP",
    tier: 5,
    description:
      "Assortiment d'apparat composé de baklawas royales aux amandes, mignardises aux pistaches d'Iran et noix de cajou, et douceurs traditionnelles dorées au miel pur d'Algérie.",
    details: [
      "Amandes d'Algérie & Pistaches",
      "Miel Pur Naturel",
      "Fait Main par Maître Pâtissier",
      "Idéal Pauses Café d'État",
    ],
    image: "/images/dishes/patisseries-orientales.png",
  },
  {
    id: "mignardises-tartelettes",
    name: "Mignardises & Tartelettes Fines",
    price: "Cocktails & Réceptions",
    tier: 4,
    description:
      "Sélection haute pâtisserie sur plateau de verre : mini-tartelettes aux fraises fraîches et fruits du verger, mini-éclairs pur cacao et pistache, et tartelettes au citron meringuées.",
    details: [
      "Fruits Frais de Saison",
      "Chocolat Noir Grand Cru",
      "Pâte Sablée Pur Beurre",
      "Présentation Cristalline",
    ],
    image: "/images/dishes/mignardises-tartelettes.png",
  },
  {
    id: "plat-mijote-chef",
    name: "Mijoté du Chef & Pomme Mousseline",
    price: "Déjeuners à l'Assiette",
    tier: 5,
    description:
      "Pièce de viande mijotée lentement dans son jus corsé aux champignons de Paris, accompagnée d'une mousseline onctueuse à la ciboulette fraîche et bouquet de légumes glacés.",
    details: [
      "Viande Tendre Sélectionnée",
      "Sauce Forestière Maison",
      "Légumes Glacés au Beurre",
      "Service Chaud d'Apparat",
    ],
    image: "/images/dishes/plat-mijote-chef.png",
  },
  {
    id: "roti-prestige-gratin",
    name: "Suprême Rôti & Gratin Dauphinois",
    price: "Banquets & Dîners d'Affaires",
    tier: 4,
    description:
      "Médaillons de volaille rôtie en croûte dorée, nappés d'une réduction crémeuse parfumée, servis avec un gratin dauphinois fondant et courgettes braisées à l'huile d'olive.",
    details: [
      "Cuisson Basse Température",
      "Gratin Dauphinois Traditionnel",
      "Service à l'Assiette",
      "Maîtres d'Hôtel Dédiés",
    ],
    image: "/images/dishes/roti-prestige-gratin.png",
  },
  {
    id: "lunch-box-prestige",
    name: "Déjeuner en Box Affaires",
    price: "Séminaires & Sessions d'Études",
    tier: 3,
    description:
      "Coffret repas d'affaires chaud et équilibré : riz safrané parfumé aux petits légumes, ragoût traditionnel mijoté aux amandes et pois chiches, accompagné de son feuilleté doré croustillant.",
    details: [
      "Format Lunch Box Hermétique",
      "Maintien au Chaud Garanti",
      "Pain Artisanal & Couverts Inclus",
      "Livraison Express Entreprise",
    ],
    image: "/images/dishes/lunch-box-prestige.png",
  },
];

export const PRESTIGE_TIER_LEGEND = {
  3: "Séminaires",
  4: "Cocktails & Affaires",
  5: "VIP & Réceptions d'État",
};

export default function PrestigeBuffetSection() {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleAddDish = (dish: BuffetDish) => {
    setSelectedItems((prev) => (prev.includes(dish.name) ? prev : [...prev, dish.name]));
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#350018] via-[#240010] to-[#1a000b] py-20 text-white">
      {/* Ambient Lighting & Royal Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(202,182,127,0.12),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 3D Royal Banquet Table */}
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] border border-gold-500/25 bg-[#20000e] p-3 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
          <GrandBuffetTable
            items={PRESTIGE_BUFFET_DISHES}
            heading="Vous pouvez demander une dégustation de nos meilleurs plats"
            onAddDish={handleAddDish}
            action={
              <a
                href="/devis-contact?mode=degustation"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ebdca9] via-[#cab67f] to-[#b39855] px-7 py-3 text-sm font-semibold text-[#20000e] shadow-xl shadow-gold-500/20 transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
              >
                <span>Réserver une Dégustation</span>
              </a>
            }
          />
        </div>

        {/* Selected Dishes Drawer / Recap Footer */}
        {selectedItems.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold-500/20 bg-[#2b0013]/70 px-6 py-4 backdrop-blur-md animate-in fade-in duration-500">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gold-300 uppercase tracking-wider">
                Pièces retenues :
              </span>
              {selectedItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gold-500/30 bg-[#3a021b] px-3 py-1 text-xs text-amber-100"
                >
                  {item}
                </span>
              ))}
            </div>
            <a
              href="/devis-contact?mode=degustation"
              className="text-xs font-semibold text-gold-400 underline underline-offset-4 hover:text-gold-200 transition-colors"
            >
              Finaliser le devis avec ces pièces &rarr;
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

