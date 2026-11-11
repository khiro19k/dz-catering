"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Coffee, Wine, Utensils, Sparkles } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const PRESTIGE_OFFERS = [
  {
    id: "pauses-cafe",
    title: "Formule Pause Café",
    subtitle: "Formule Ordinaire, Améliorée, VIP, VVIP",
    tag: "Pauses Café",
    icon: Coffee,
    image: "/images/gallery/buffet-gourmet.jpg",
    description:
      "2 à 3 pièces salées, 2 à 3 sucrées, gâteaux traditionnels orientaux, macarons parisiens, boissons chaudes et fraîches.",
  },
  {
    id: "cocktails",
    title: "Cocktails Déjeunatoires & Dînatoires",
    subtitle: "Prestations au plateau & buffets d'apparat",
    tag: "Cocktails",
    icon: Wine,
    image: "/images/gallery/cocktail-reception.jpg",
    description:
      "Verrines fraîches (crevettes et saumon fumé), déclinaison de canapés salés, brochettes gourmandes, fromages affinés et fruits découpés.",
  },
  {
    id: "dejeuners",
    title: "Déjeuners en Box ou Servis à l'Assiette",
    subtitle: "Du déjeuner d'affaires au grand dîner assis",
    tag: "Déjeuners & Formules Box",
    icon: Utensils,
    image: "/images/gallery/gala-banquet.jpg",
    description:
      "Formule pratique 'Lunch Box' conçue pour les sessions de formation rythmées ou repas complet assis avec service à table par maîtres d'hôtel.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function HomeFormulesOverview() {
  return (
    <section
      id="formules"
      aria-label="Aperçu des formules et services"
      className="py-20 sm:py-28 relative bg-gradient-to-b from-[#240011] via-[#350018] to-[#240011] border-t border-gold-500/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#350017] border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-[0.25em] mb-4 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>OFFRE GASTRONOMIQUE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight leading-tight">
            Nos Formules & Services
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream-100/80 leading-relaxed font-light max-w-2xl mx-auto">
            Présentation claire de nos prestations pour faciliter votre choix : pauses café, cocktails, déjeuners en box ou servis à l'assiette.
          </p>
        </motion.div>

        {/* =========================================================================
            🌟 3 PRESTIGE VISUAL SHOWCASE CARDS (RICH PHOTOGRAPHY & CLEAN TEASER)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14 sm:mb-16">
          {PRESTIGE_OFFERS.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group relative h-[440px] sm:h-[480px] rounded-3xl overflow-hidden border border-gold-500/20 hover:border-gold-400/60 transition-all duration-500 shadow-2xl flex flex-col justify-between p-6 sm:p-8"
              >
                {/* Background Image with Cinematic Zoom on Hover */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  {/* Luxury Multi-layer Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b000d] via-[#240011]/80 to-black/40 group-hover:via-[#240011]/70 transition-all duration-500" />
                </div>

                {/* Top Badge & Icon */}
                <div className="relative z-10 flex items-center justify-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] bg-[#240011]/85 border border-gold-500/30 text-gold-300 backdrop-blur-md shadow-md">
                    <Icon className="w-3.5 h-3.5 text-gold-400" />
                    <span>{offer.tag}</span>
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white group-hover:text-gold-200 transition-colors leading-snug">
                    {offer.title}
                  </h3>

                  <p className="text-xs text-gold-300/90 font-medium mt-1 mb-2.5">
                    {offer.subtitle}
                  </p>

                  <p className="text-xs text-cream-200/80 font-light leading-relaxed line-clamp-2 mb-5">
                    {offer.description}
                  </p>

                  <Link
                    href={`/formules-services#${offer.id}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold text-gold-400 group-hover:text-white transition-colors"
                  >
                    <span>Consulter les détails</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================================
            🌟 BOTTOM CENTER CALL TO ACTION BUTTON (LINKS TO FULL CATALOG PAGE)
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/formules-services"
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 hover:brightness-110 shadow-2xl shadow-gold-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Découvrir l'ensemble de nos formules & services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
