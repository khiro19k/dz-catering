"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, Eye } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "receptions" | "corporate" | "gastronomie" | "art-table";
  categoryLabel: string;
  image: string;
  subtitle: string;
  description: string;
  details: string[];
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gala-banquet",
    title: "Dîner de Gala & Réception Somptueuse",
    category: "receptions",
    categoryLabel: "Réceptions de Prestige",
    image: "/images/gallery/gala-banquet.jpg",
    subtitle: "Service à table haut standing pour réceptions privées",
    description:
      "Mise en scène majestueuse d'un dîner de gala avec candélabres dorés, composition florale d'envergure et service hôtelier synchronisé par nos maîtres d'hôtel.",
    details: [
      "Menu 5 services élaboré sur-mesure",
      "Brigade de salle en livrée d'apparat",
      "Verrerie en cristal et argenterie complète",
    ],
  },
  {
    id: "table-art",
    title: "L'Art de la Table Impérial",
    category: "art-table",
    categoryLabel: "Art de la Table",
    image: "/images/gallery/table-art.jpg",
    subtitle: "Raffinement gastronomique et porcelaine de prestige",
    description:
      "L'élégance poussée dans chaque détail : dressage minutieux des tables, nappage noble, verres taillés et harmonie subtile des teintes bordeaux et or.",
    details: [
      "Porcelaine fine bordée d'or",
      "Couverts et accessoires de service or mat",
      "Papeterie et menus calligraphiés personnalisés",
    ],
  },
  {
    id: "culinary-fine",
    title: "Haute Gastronomie & Pièces Nobles",
    category: "gastronomie",
    categoryLabel: "Haute Gastronomie",
    image: "/images/gallery/culinary-fine.jpg",
    subtitle: "Créations culinaires d'exception signées par notre Chef",
    description:
      "Une alliance parfaite entre tradition culinaire et modernité gastronomique. Découpe en direct, viandes nobles rôties et cuissons maîtrisées au feu de bois.",
    details: [
      "Produits frais rigoureusement sélectionnés",
      "Atelier culinaire chaud en direct (Live Cooking)",
      "Assaisonnements et sauces signature exclusives",
    ],
  },
  {
    id: "cocktail-reception",
    title: "Soirée Privée & Cocktail Événementiel",
    category: "receptions",
    categoryLabel: "Réceptions de Prestige",
    image: "/images/gallery/cocktail-reception.jpg",
    subtitle: "Atmosphère chaleureuse et service cocktail dînatoire",
    description:
      "Événement privé exclusif en plein air avec mise en lumière tamisée, service de canapés fins au plateau et bar à mocktails artisanaux.",
    details: [
      "Assortiment de 18 pièces salées et sucrées raffinées",
      "Maîtres d'hôtel dédiés au service au plateau",
      "Scénographie lumineuse et mobilier lounge",
    ],
  },
  {
    id: "dessert-buffet",
    title: "Farandole Sucrée & Pâtisserie Fine",
    category: "gastronomie",
    categoryLabel: "Haute Gastronomie",
    image: "/images/gallery/dessert-buffet.jpg",
    subtitle: "Buffet de desserts d'exception et fontaine de douceurs",
    description:
      "Un final somptueux pour émerveiller vos invités : créations pâtissières artisanales, macarons délicats, mignardises et pyramides de fruits de saison sculptés.",
    details: [
      "Pâtisseries fines préparées le jour de l'événement",
      "Pièces montées et entremets signature",
      "Service de café d'origine et infusions nobles",
    ],
  },
  {
    id: "buffet-gourmet",
    title: "Grand Banquet & Sommet d'Affaires",
    category: "corporate",
    categoryLabel: "Banquets Corporate",
    image: "/images/gallery/buffet-gourmet.jpg",
    subtitle: "Restauration d'envergure pour sommets et congrès VIP",
    description:
      "Organisation logistique sans faille pour conventions d'entreprises, réceptions d'ambassades et dîners institutionnels accueillant plusieurs centaines de convives.",
    details: [
      "Service fluide et cadencé adapté aux plannings stricts",
      "Buffet froid et chaud maintenu à température optimale",
      "Coordination logistique et protocole hôtelier",
    ],
  },
];

type FilterType = "all" | "receptions" | "corporate" | "gastronomie" | "art-table";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter items
  const filteredItems =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#4b0024]/50 relative border-t border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-[#3e001d] border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-[0.25em] mb-4 shadow-md">
            RÉALISATIONS D'EXCEPTION
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight leading-tight">
            L'Art de la Réception en Images
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream-100/80 leading-relaxed font-light">
            Chaque événement est conçu comme une œuvre unique. Explorez nos réceptions privées
            somptueuses, dîners de gala prestigieux et créations gastronomiques signées DZ Catering.
          </p>
        </div>

        {/* Filter Tabs (Clean, elegant, no emojis) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeFilter === "all"
                ? "bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 shadow-lg shadow-gold-500/20 font-bold scale-105"
                : "bg-white/5 hover:bg-white/10 text-cream-100 border border-gold-500/20 hover:border-gold-500/40"
            }`}
          >
            Toutes nos Créations
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("receptions")}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeFilter === "receptions"
                ? "bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 shadow-lg shadow-gold-500/20 font-bold scale-105"
                : "bg-white/5 hover:bg-white/10 text-cream-100 border border-gold-500/20 hover:border-gold-500/40"
            }`}
          >
            Réceptions de Prestige
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("gastronomie")}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeFilter === "gastronomie"
                ? "bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 shadow-lg shadow-gold-500/20 font-bold scale-105"
                : "bg-white/5 hover:bg-white/10 text-cream-100 border border-gold-500/20 hover:border-gold-500/40"
            }`}
          >
            Haute Gastronomie
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("corporate")}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeFilter === "corporate"
                ? "bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 shadow-lg shadow-gold-500/20 font-bold scale-105"
                : "bg-white/5 hover:bg-white/10 text-cream-100 border border-gold-500/20 hover:border-gold-500/40"
            }`}
          >
            Banquets Corporate & VIP
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("art-table")}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeFilter === "art-table"
                ? "bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 shadow-lg shadow-gold-500/20 font-bold scale-105"
                : "bg-white/5 hover:bg-white/10 text-cream-100 border border-gold-500/20 hover:border-gold-500/40"
            }`}
          >
            Art de la Table
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#38001a] border border-gold-500/25 hover:border-gold-400 transition-all duration-500 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-black/40 flex flex-col justify-between"
            >
              {/* Photo Container */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-burgundy-950">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 brightness-95 group-hover:brightness-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#38001a] via-[#38001a]/20 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-burgundy-950/85 backdrop-blur-md border border-gold-500/30 text-[10px] uppercase tracking-widest text-gold-300 font-semibold">
                  {item.categoryLabel}
                </div>

                {/* View Details Icon Hover */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-burgundy-950/80 border border-gold-500/40 text-gold-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white font-serif group-hover:text-gold-300 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-cream-200/70 font-light leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gold-500/20 flex items-center justify-between text-xs font-semibold text-gold-300 group-hover:text-gold-200 uppercase tracking-wider">
                  <span>Découvrir la prestation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Dedicated Page 3 */}
        <div className="text-center mt-14">
          <Link
            href="/realisations-galerie"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-gold-500/30 text-white hover:text-gold-300 transition-all shadow-md"
          >
            <span>Explorer toutes les réalisations & vidéos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal (Full details & Zoom) */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-gradient-to-b from-[#460020] to-[#2d0014] border border-gold-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-burgundy-950/80 border border-gold-500/40 text-gold-300 hover:text-white hover:bg-burgundy-900 flex items-center justify-center transition-all focus:outline-none"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 sm:h-96 w-full bg-burgundy-950 shrink-0">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#460020] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 px-3.5 py-1 rounded-full bg-burgundy-950/90 border border-gold-500/40 text-xs font-semibold uppercase tracking-wider text-gold-300">
                {selectedItem.categoryLabel}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                {selectedItem.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-cream-100/90 leading-relaxed font-light">
                {selectedItem.description}
              </p>

              {/* Service Highlights */}
              <div className="mt-6 pt-6 border-t border-gold-500/20">
                <h4 className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-3">
                  Prestations incluses dans cette formule
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedItem.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-cream-200/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="mt-8 pt-6 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-cream-200/70">
                  Prestation 100% personnalisable selon vos souhaits.
                </span>
                <a
                  href="#atelier"
                  onClick={() => setSelectedItem(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 hover:brightness-110 shadow-lg shadow-gold-500/25 transition-all hover:scale-105"
                >
                  <span>Demander un devis pour ce format</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

