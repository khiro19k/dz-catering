import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, Clock, Award, Users, CheckCircle2, MapPin, ArrowRight, PhoneCall } from "lucide-react";
import { CONTACT_INFO, CLIENT_REFERENCES, ENGAGEMENT_PILLARS } from "@/data/cateringData";

export const metadata = {
  title: "À Propos & Engagements | EURL DZ CATERING",
  description: "Présentation de l'EURL DZ CATERING, implantée à Douaouda et El Biar. Nos 4 engagements majeurs : hygiène HACCP, réactivité 4h et flexibilité.",
};

export default function AProposPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#63002e] text-white">
      <Navbar />

      <main className="flex-1 pt-48 sm:pt-52 lg:pt-60 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            À Propos & Engagements
          </h1>
        </div>

        {/* Corporate Presentation & Double Implantation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white leading-tight">
                EURL DZ CATERING : Une Organisation Hôtelière au Service de Vos Réceptions
              </h2>
              <p className="text-sm sm:text-base text-cream-100/85 leading-relaxed font-light">
                Implantée stratégiquement à <strong>Douaouda</strong> et <strong>El Biar (Alger)</strong>,
                l'EURL DZ CATERING s'est imposée comme le partenaire privilégié des institutions publiques,
                multinationales et organisateurs d'événements majeurs en Algérie.
              </p>
              <p className="text-sm sm:text-base text-cream-100/85 leading-relaxed font-light">
                Notre mission : concilier l'excellence culinaire d'un grand chef avec la ponctualité rigoureuse
                d'un service logistique rodé. Chaque prestation est pensée comme une vitrine du savoir-faire algérien,
                alliant tradition raffinée et modernité internationale.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Laboratoire Central</h3>
                    <p className="text-xs text-cream-200/70 mt-0.5">Douaouda, Tipaza / Grand Alger</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Bureau de Liaison VIP</h3>
                    <p className="text-xs text-cream-200/70 mt-0.5">El Biar, Alger Centre</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-b from-[#4d0025] to-[#340018] border border-gold-500/40 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
              <h3 className="text-xl font-bold font-serif text-white border-b border-gold-500/20 pb-4">
                La Charte DZ CATERING
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-cream-100/90 leading-relaxed font-light">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>Traçabilité intégrale des viandes nobles et produits maraîchers.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>Personnel de salle exclusivement formé aux codes de l'hôtellerie 5 étoiles.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>Flotte de véhicules isothermes respectant la chaîne du froid en continu.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>Engagement de réponse chiffrée sous 2 à 4 heures ouvrées.</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gold-500/20">
                <Link
                  href="/devis-contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-burgundy-950 hover:brightness-110 shadow-lg"
                >
                  <span>Demander un devis officiel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The 4 Fundamental Pillars (from Cahier des Charges) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Nos 4 Engagements Fondamentaux
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-[#440020]/80 border border-gold-500/30 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-400 text-gold-300 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-serif text-white mb-2">
                  Normes d'Hygiène & Chaîne du Froid
                </h3>
                <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed font-light">
                  Contrôles stricts des approvisionnements, respect rigoureux des règles sanitaires HACCP et sélection de produits ultrafrais préparés le jour même.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[10px] text-gold-300/80 uppercase tracking-widest">
                Sécurité Sanitaire Garantie
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-[#440020]/80 border border-gold-500/30 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-400 text-gold-300 flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-serif text-white mb-2">
                  Réactivité d'Urgence (Délai 4 Heures)
                </h3>
                <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed font-light">
                  Capacité éprouvée à organiser, cuisiner et livrer un événement de 10 à 50 convives avec un préavis de 4 heures seulement sur Alger.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[10px] text-gold-300/80 uppercase tracking-widest">
                Permanence Opérationnelle 7j/7
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-[#440020]/80 border border-gold-500/30 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-400 text-gold-300 flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-serif text-white mb-2">
                  Flexibilité & Respect du Budget Client
                </h3>
                <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed font-light">
                  Volonté constante de moduler les compositions pour garantir un rendu haut de gamme sans dépasser l'enveloppe allouée par vos services achats.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[10px] text-gold-300/80 uppercase tracking-widest">
                Devis Ajusté au Dinar Près
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-[#440020]/80 border border-gold-500/30 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-400 text-gold-300 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-serif text-white mb-2">
                  Équipe Professionnelle Dédiée
                </h3>
                <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed font-light">
                  Cuisiniers expérimentés, chefs pâtissiers formés aux douceurs orientales et françaises, et maîtres d'hôtel attentifs et discrets.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[10px] text-gold-300/80 uppercase tracking-widest">
                Encadrement Hôtelier Qualifié
              </div>
            </div>
          </div>
        </section>

        {/* References */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#3c001c]/80 border border-gold-500/30">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mb-2">
              Des Références de Premier Plan
            </h3>
            <p className="text-xs sm:text-sm text-cream-200/70 mb-8 max-w-2xl mx-auto font-light">
              Nous intervenons régulièrement pour les plus grands noms de l'hôtellerie, de l'industrie et des institutions en Algérie.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {CLIENT_REFERENCES.map((ref, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.98] border border-gold-400/40 hover:border-gold-400 text-center flex flex-col items-center justify-between min-h-[175px] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="h-16 w-full flex items-center justify-center">
                    {ref.logo ? (
                      <img
                        src={ref.logo}
                        alt={ref.name}
                        className="max-h-14 max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <span className="font-serif font-bold text-base text-burgundy-950">
                        {ref.initials}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 w-full">
                    <span className="text-xs text-burgundy-950 block font-semibold leading-tight line-clamp-2">
                      {ref.name}
                    </span>
                    <span className="text-[10px] text-burgundy-800/70 block mt-1 font-medium line-clamp-1">
                      {ref.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

