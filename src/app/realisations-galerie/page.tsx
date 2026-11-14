"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, Eye, Film, Play } from "lucide-react";

interface GalleryPhoto {
  id: string;
  title: string;
  category: "tous" | "pauses-cafe" | "cocktails" | "dejeuners" | "decors";
  categoryLabel: string;
  image: string;
  subtitle: string;
  description: string;
  specs: string[];
}

const REALISATIONS_DATA: GalleryPhoto[] = [
  {
    id: "pause-cafe-1",
    title: "Pause Café VIP & Pâtisseries Fines",
    category: "pauses-cafe",
    categoryLabel: "Pauses Café",
    image: "/images/gallery/dessert-buffet.jpg",
    subtitle: "Séminaire de direction au Centre International des Conférences",
    description:
      "Dressage soigné comprenant macarons parisiens, gâteaux traditionnels orientaux fins, café d'origine supérieure et jus de fruits frais pressés du jour.",
    specs: ["80 participants", "Service en 2 temps", "Porcelaine et verrerie complète"],
  },
  {
    id: "cocktail-1",
    title: "Cocktail Dînatoire & Verrines Gourmandes",
    category: "cocktails",
    categoryLabel: "Cocktails Prestige",
    image: "/images/gallery/cocktail-reception.jpg",
    subtitle: "Soirée d'inauguration pour institution financière à Alger",
    description:
      "Verrines fraîches de saumon fumé et crevettes royales, déclinaison de canapés salés d'apparat et service discret au plateau par nos maîtres d'hôtel.",
    specs: ["250 convives", "18 pièces par personne", "Brigade de salle en tenue officielle"],
  },
  {
    id: "dejeuner-1",
    title: "Banquet Corporate & Déjeuner Servi à Table",
    category: "dejeuners",
    categoryLabel: "Déjeuners Corporate",
    image: "/images/gallery/gala-banquet.jpg",
    subtitle: "Rencontre ministérielle et délégations d'affaires",
    description:
      "Menu 4 services avec viandes nobles rôties au feu de bois, service synchronisé à l'assiette et coordination logistique millimétrée.",
    specs: ["140 délégués", "Service à l'assiette synchronisé", "Maintien strict de la chaîne du chaud"],
  },
  {
    id: "decor-1",
    title: "Mise en Scène & Scénographie de Table d'Honneur",
    category: "decors",
    categoryLabel: "Mise en Scène & Décors",
    image: "/images/gallery/table-art.jpg",
    subtitle: "Arrangement floral et art de la table de prestige",
    description:
      "Nappage noble, candélabres dorés, assiettes bordées d'or et verres en cristal taillé pour une ambiance protocolaire chaleureuse et raffinée.",
    specs: ["Table présidentielle", "Fleurs fraîches de saison", "Argenterie et papeterie calligraphiée"],
  },
  {
    id: "dejeuner-2",
    title: "Buffet Chaud & Découpe de Viandes Nobles",
    category: "dejeuners",
    categoryLabel: "Déjeuners Corporate",
    image: "/images/gallery/culinary-fine.jpg",
    subtitle: "Convention annuelle d'entreprise à El Biar",
    description:
      "Atelier de découpe en direct assuré par notre chef, assortiment de salades composées nobles et plats chauds en chafing dishes dorés.",
    specs: ["320 personnes", "Atelier Live Cooking", "Approvisionnement ultrafrais le matin même"],
  },
  {
    id: "cocktail-2",
    title: "Buffet d'Accueil & Pièces Salées Nobles",
    category: "cocktails",
    categoryLabel: "Cocktails Prestige",
    image: "/images/gallery/buffet-gourmet.jpg",
    subtitle: "Symposium médical et rencontre d'experts",
    description:
      "Assortiments de brochettes gourmandes, feuilletés croustillants, mini-burgers gastronomiques et fontaine de mocktails artisanaux.",
    specs: ["180 professionnels", "Formule cocktail fluide", "Service express en 45 minutes"],
  },
];

type FilterTab = "tous" | "pauses-cafe" | "cocktails" | "dejeuners" | "decors";

export default function RealisationsGaleriePage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("tous");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredPhotos =
    activeFilter === "tous"
      ? REALISATIONS_DATA
      : REALISATIONS_DATA.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#63002e] text-white">
      <Navbar />

      <main className="flex-1 pt-48 sm:pt-52 lg:pt-60 pb-20">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            Réalisations & Galerie
          </h1>
        </div>

        {/* Video Immersion Banner (from Cahier des Charges) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#4d0025] via-[#3a001b] to-[#4d0025] border border-gold-500/35 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-400 text-gold-300 flex items-center justify-center shrink-0">
                <Film className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif text-white">
                  Vidéos Courtes Immersives (15 à 30 secondes)
                </h3>
                <p className="text-xs sm:text-sm text-cream-200/70 font-light mt-0.5">
                  Vivez la préparation minutieuse des chefs en coulisses et l'entrée en salle des maîtres d'hôtel.
                </p>
              </div>
            </div>
            <Link
              href="/devis-contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-400 text-burgundy-950 hover:bg-gold-300 transition-all shrink-0 shadow-md"
            >
              <span>Organiser un événement similaire</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Official Interactive Filter Buttons (Exact terms from Cahier des Charges) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setActiveFilter("tous")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeFilter === "tous"
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-burgundy-950 font-bold shadow-lg scale-105"
                  : "bg-white/5 hover:bg-white/10 text-cream-100 border border-gold-500/20"
              }`}
            >
              Tous
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("pauses-cafe")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeFilter === "pauses-cafe"
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-burgundy-950 font-bold shadow-lg scale-105"
                  : "bg-white/5 hover:bg-white/10 text-cream-100 border border-gold-500/20"
              }`}
            >
              Pauses Café
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("cocktails")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeFilter === "cocktails"
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-burgundy-950 font-bold shadow-lg scale-105"
                  : "bg-white/5 hover:bg-white/10 text-cream-100 border border-gold-500/20"
              }`}
            >
              Cocktails Prestige
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("dejeuners")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeFilter === "dejeuners"
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-burgundy-950 font-bold shadow-lg scale-105"
                  : "bg-white/5 hover:bg-white/10 text-cream-100 border border-gold-500/20"
              }`}
            >
              Déjeuners Corporate
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("decors")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeFilter === "decors"
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-burgundy-950 font-bold shadow-lg scale-105"
                  : "bg-white/5 hover:bg-white/10 text-cream-100 border border-gold-500/20"
              }`}
            >
              Mise en Scène & Décors
            </button>
          </div>
        </div>

        {/* Gallery Photos Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-[#38001a] border border-gold-500/25 hover:border-gold-400 transition-all duration-500 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-burgundy-950">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#38001a] via-[#38001a]/20 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-burgundy-950/90 border border-gold-500/30 text-[10px] uppercase tracking-widest text-gold-300 font-semibold">
                    {photo.categoryLabel}
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-burgundy-950/80 border border-gold-500/40 text-gold-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white font-serif group-hover:text-gold-300 transition-colors leading-tight">
                      {photo.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-cream-200/70 font-light leading-relaxed">
                      {photo.subtitle}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gold-500/20 flex items-center justify-between text-xs font-semibold text-gold-300 group-hover:text-gold-200 uppercase tracking-wider">
                    <span>Agrandir & Détails</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Lightbox */}
        {selectedPhoto && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-gradient-to-b from-[#460020] to-[#2d0014] border border-gold-500/40 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-burgundy-950/80 border border-gold-500/40 text-gold-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 sm:h-96 w-full bg-burgundy-950 shrink-0">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#460020] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 px-3.5 py-1 rounded-full bg-burgundy-950/90 border border-gold-500/40 text-xs font-semibold uppercase tracking-wider text-gold-300">
                  {selectedPhoto.categoryLabel}
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                  {selectedPhoto.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-cream-100/90 leading-relaxed font-light">
                  {selectedPhoto.description}
                </p>

                <div className="mt-6 pt-6 border-t border-gold-500/20">
                  <h4 className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-3">
                    Fiche Technique de l'Événement
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedPhoto.specs.map((spec, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-cream-100">
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-cream-200/70">
                    Configuration adaptable selon votre effectif et vos locaux.
                  </span>
                  <Link
                    href={`/devis-contact?realisation=${selectedPhoto.id}`}
                    onClick={() => setSelectedPhoto(null)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-burgundy-950 hover:brightness-110 shadow-lg font-bold"
                  >
                    <span>Demander un devis similaire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

