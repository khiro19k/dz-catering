import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Check, Users, Coffee, UtensilsCrossed, Box, Sparkles } from "lucide-react";
import { COFFEE_BREAK_PACKAGES, SERVICE_OFFERS, CONTACT_INFO } from "@/data/cateringData";

export const metadata = {
  title: "Nos Formules & Services | EURL DZ CATERING",
  description: "Découvrez nos pauses café (Ordinaire, Améliorée, VIP, VVIP), cocktails déjeunatoires, lunch boxes et déjeuners assis à Alger.",
};

export default function FormulesServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#63002e] text-white">
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-40 lg:pt-44 pb-20">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
          <div className="inline-block px-4 py-1 rounded-full bg-[#460021] border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-[0.25em] mb-4 shadow-md">
            OFFRE GASTRONOMIQUE & LOGISTIQUE
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            Nos Formules & Services
          </h1>
          <p className="mt-4 text-base sm:text-lg text-cream-100/80 max-w-3xl mx-auto font-light leading-relaxed">
            Des prestations calibrées pour chaque format d'événement : de la pause café d'étude au grand banquet
            institutionnel, avec l'engagement d'une qualité hôtelière irréprochable.
          </p>
        </div>

        {/* Section 1: Formules Pause Café */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gold-500/25">
            <Coffee className="w-5 h-5 text-gold-400" />
            <div>
              <h2 className="text-xl sm:text-3xl font-bold font-serif text-white">
                Les Formules Pause Café
              </h2>
              <p className="text-xs sm:text-sm text-gold-300/80 mt-0.5">
                Quatre niveaux de prestations adaptés à vos réunions, séminaires et sommets officiels.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {COFFEE_BREAK_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border ${
                  pkg.highlight
                    ? "bg-gradient-to-b from-[#550028] to-[#3a001b] border-gold-400 shadow-2xl ring-1 ring-gold-400/40"
                    : "bg-[#43001f]/70 border-white/10 hover:border-gold-500/30"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                      {pkg.name}
                    </h3>
                    {pkg.highlight && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-400 text-burgundy-950">
                        Populaire
                      </span>
                    )}
                  </div>

                  <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-gold-300/90 pb-3 border-b border-white/10">
                    Contenu & Composition
                  </div>
                  <p className="text-xs sm:text-sm text-cream-100/90 leading-relaxed font-light mb-6">
                    {pkg.content}
                  </p>

                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-cream-200/50">
                    Public & Occasion Recommandés
                  </div>
                  <p className="text-xs text-gold-200/80 leading-relaxed font-light">
                    {pkg.audience}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10">
                  <Link
                    href={`/devis-contact?formule=${pkg.id}`}
                    className={`w-full py-2.5 rounded-xl text-center text-xs font-semibold uppercase tracking-wider block transition-all ${
                      pkg.highlight
                        ? "bg-gradient-to-r from-gold-500 to-gold-600 text-burgundy-950 font-bold hover:brightness-110 shadow-md"
                        : "bg-white/5 hover:bg-white/15 text-cream-100 border border-gold-500/30"
                    }`}
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Cocktails, Déjeuners & Scénographie */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-gold-500/25">
            <UtensilsCrossed className="w-5 h-5 text-gold-400" />
            <div>
              <h2 className="text-xl sm:text-3xl font-bold font-serif text-white">
                Offres Cocktails & Repas d'Ateliers
              </h2>
              <p className="text-xs sm:text-sm text-gold-300/80 mt-0.5">
                Une restauration mobile d'envergure, servie à l'assiette, au buffet ou en formule nomade scellée.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SERVICE_OFFERS.map((service) => (
              <div
                key={service.id}
                className="rounded-3xl p-7 sm:p-8 bg-[#440020]/80 border border-gold-500/30 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold font-serif text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gold-300 font-medium mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-cream-100/80 leading-relaxed font-light mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    <span className="text-[11px] uppercase tracking-wider text-gold-400 font-semibold block mb-2">
                      Points Forts de la Prestation :
                    </span>
                    {service.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-cream-200/85">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gold-500/20">
                  <Link
                    href={`/devis-contact?prestation=${service.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-burgundy-950 hover:brightness-110 transition-all"
                  >
                    <span>Personnaliser cette offre</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Engagement de Réactivité */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#4d0025] to-[#340018] border border-gold-500/40 shadow-2xl">
            <h3 className="text-xl sm:text-3xl font-bold font-serif text-white mb-3">
              Besoin d'une Commande d'Urgence sous 4 Heures ?
            </h3>
            <p className="text-xs sm:text-sm text-cream-100/85 max-w-2xl mx-auto font-light leading-relaxed mb-6">
              DZ CATERING dispose d'une brigade dédiée aux imprévus : prise en charge express de 10 à 50 convives
              avec un préavis de 4 heures sur Alger et ses environs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${CONTACT_INFO.primaryPhone.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-burgundy-950 hover:brightness-110 shadow-lg shadow-gold-500/25 transition-all"
              >
                Appeler la Permanence : {CONTACT_INFO.primaryPhone}
              </a>
              <Link
                href="/devis-contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
              >
                Demander un devis en ligne
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

