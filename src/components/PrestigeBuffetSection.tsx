"use client";

import * as React from "react";
import { Sparkles, UtensilsCrossed, CheckCircle2 } from "lucide-react";
import SushiConveyorMenu from "@/components/ui/sushi-conveyor-menu";
import type { ConveyorDish } from "@/components/ui/sushi-conveyor-menu";

export const PRESTIGE_BUFFET_DISHES: ConveyorDish[] = [
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
  const [selectedCount, setSelectedCount] = React.useState(0);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [justAdded, setJustAdded] = React.useState<string | null>(null);

  const handleAddDish = (dish: ConveyorDish) => {
    setSelectedCount((prev) => prev + 1);
    setSelectedItems((prev) => (prev.includes(dish.name) ? prev : [...prev, dish.name]));
    setJustAdded(dish.name);
    setTimeout(() => setJustAdded(null), 3000);
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
        {/* Top Floating Selection Pill */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-[#350018]/80 px-4 py-1.5 backdrop-blur-md">
            <span className="size-2 animate-pulse rounded-full bg-gold-400" />
            <span className="text-xs font-semibold tracking-wider text-gold-300 uppercase">
              Table de Dégustation Royale
            </span>
          </div>

          {/* Interactive Selection Counter */}
          <div className="flex items-center gap-3">
            {justAdded && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/80 px-3 py-1 text-xs text-emerald-200 shadow-md animate-in fade-in slide-in-from-right-3">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                <span>Ajouté : {justAdded}</span>
              </span>
            )}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-[#2d0014]/90 px-4 py-1.5 text-xs font-medium text-amber-100 shadow-lg">
              <UtensilsCrossed className="size-3.5 text-gold-400" />
              <span>Votre sélection :</span>
              <span className="rounded-full bg-gold-500/20 px-2 py-0.5 font-bold text-gold-300">
                {selectedCount}
              </span>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl lg:text-5xl">
            L&apos;Excellence Gastronomique en <span className="italic text-gold-400 font-serif">Mouvement</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-amber-100/70 sm:text-base">
            Faites pivoter la table de présentation, survolez pour admirer les créations artisanales du Chef,
            ou cliquez sur une pièce pour en découvrir la composition et l&apos;ajouter à votre demande de devis.
          </p>
        </div>

        {/* 3D Buffet Conveyor Table */}
        <div className="relative rounded-[2.5rem] border border-gold-500/25 bg-[#20000e]/80 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-8">
          <SushiConveyorMenu
            items={PRESTIGE_BUFFET_DISHES}
            legend={PRESTIGE_TIER_LEGEND}
            eyebrow="DZ CATERING · HAUTE GASTRONOMIE"
            heading="Table de Présentation Prestige"
            caption="Faites glisser ou survolez la table pour faire défiler les créations. Cliquez sur un plat pour afficher sa fiche détaillée."
            autoplay={true}
            speed={22}
            interval={3400}
            onAdd={handleAddDish}
            action={
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#ebdca9] via-[#cab67f] to-[#b39855] px-6 py-3 text-sm font-semibold text-[#20000e] shadow-xl shadow-gold-500/20 transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
              >
                <Sparkles className="size-4" />
                <span>Demander un Devis pour ce Menu</span>
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
              href="#contact"
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

