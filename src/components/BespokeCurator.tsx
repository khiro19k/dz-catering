"use client";

import { useState } from "react";
import { Check, Calendar, Users, PhoneCall, ChevronRight, CheckCircle2 } from "lucide-react";
import { CONTACT_INFO } from "@/data/cateringData";

interface ReceptionFormat {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  recommendedFor: string;
}

const RECEPTION_FORMATS: ReceptionFormat[] = [
  {
    id: "pauses-cafe",
    title: "Formules Pause Café",
    subtitle: "Ordinaire · Améliorée · VIP · VVIP",
    description: "Assortiments salés et sucrés, gâteaux traditionnels orientaux, macarons parisiens, café de qualité, thé et jus frais.",
    recommendedFor: "10 à 300+ convives",
  },
  {
    id: "cocktails",
    title: "Cocktails Déjeunatoires & Dînatoires",
    subtitle: "Service au plateau & buffets d'apparat",
    description: "Verrines fraîches (saumon fumé, crevettes), canapés salés, brochettes gourmandes, fromages affinés et corbeilles de fruits de saison.",
    recommendedFor: "30 à 400+ convives",
  },
  {
    id: "lunch-box",
    title: "Déjeuners en Box (Lunch Box)",
    subtitle: "Formule pratique & hermétique scellée",
    description: "Coffrets repas chauds complets conçus pour sessions de formation et séminaires d'entreprises rythmés, avec pain et couverts.",
    recommendedFor: "10 à 250+ convives",
  },
  {
    id: "dejeuners-assis",
    title: "Déjeuners Assis & Banquets à l'Assiette",
    subtitle: "Repas complet avec maîtres d'hôtel",
    description: "Repas complet assis en 3 ou 4 services pour comités de direction, réceptions institutionnelles et dîners d'affaires.",
    recommendedFor: "20 à 500+ convives",
  },
];

interface HospitalityOption {
  id: string;
  title: string;
  detail: string;
}

const HOSPITALITY_OPTIONS: HospitalityOption[] = [
  {
    id: "service-maitres",
    title: "Service par Maîtres d'Hôtel Dédiés",
    detail: "Personnel hôtelier qualifié en tenue d'apparat, maître d'hôtel coordinateur, service discret et attentif en salle et au plateau.",
  },
  {
    id: "scenographie-nappage",
    title: "Scénographie, Nappage Élégant & Décoration Florale",
    detail: "Prise en charge intégrale de la mise en place : nappage noble, centres de table floraux et disposition esthétique des buffets.",
  },
  {
    id: "vaisselle-materiel",
    title: "Vaisselle Complète, Verrerie & Maintien au Chaud",
    detail: "Fourniture des assiettes de présentation, couverts inox, verres et matériel de maintien au chaud (chafing dishes professionnels).",
  },
  {
    id: "intervention-express",
    title: "Option Intervention Express (Délai 4 Heures)",
    detail: "Capacité éprouvée de prise en charge réactive pour 10 à 50 convives avec un préavis d'urgence de 4 heures seulement.",
  },
  {
    id: "haccp-hygiene",
    title: "Garantie Sanitaire & Chaîne du Froid HACCP",
    detail: "Contrôles stricts des approvisionnements, respect rigoureux des règles sanitaires et logistique en transport réfrigéré.",
  },
];

export default function BespokeCurator() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["pauses-cafe"]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "service-maitres",
    "scenographie-nappage",
    "vaisselle-materiel",
  ]);
  const [guestCount, setGuestCount] = useState<number>(50);

  // Form State
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleFormat = (id: string) => {
    setSelectedFormats((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedFormatsList = RECEPTION_FORMATS.filter((f) =>
    selectedFormats.includes(f.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    setSubmitted(true);
  };

  return (
    <section id="atelier" className="py-20 sm:py-28 relative overflow-hidden bg-[#3a001b]/60 border-t border-gold-500/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#63002e]/30 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight leading-tight">
            Composez Votre Événement Sur-Mesure
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream-100/80 leading-relaxed font-light">
            Pauses café, cocktails déjeunatoires, lunch boxes ou banquets servis à table : configurez votre prestation selon votre cahier des charges et recevez votre devis personnalisé sous 2 à 4 heures ouvrées.
          </p>
        </div>

        {/* Main Curator Container */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Step 1: Format Selector */}
          <div className="bg-[#460021]/80 border border-gold-500/25 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center text-xs font-serif font-bold">
                  1
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white font-serif tracking-wide">
                  Format de la Réception
                </h3>
              </div>
              <span className="text-[11px] px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/35 text-gold-300 font-medium">
                Choix multiple possible
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {RECEPTION_FORMATS.map((format) => {
                const isSelected = selectedFormats.includes(format.id);
                return (
                  <button
                    key={format.id}
                    type="button"
                    onClick={() => toggleFormat(format.id)}
                    className={`p-4 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between border cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-b from-[#5c002c] to-[#460021] border-gold-400 ring-1 ring-gold-400/40 shadow-lg shadow-black/30"
                        : "bg-white/5 border-white/10 hover:border-gold-500/30 hover:bg-white/[0.08]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-sm font-bold font-serif text-white leading-tight">
                          {format.title}
                        </h4>
                        <span
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-gold-500 border-gold-400 text-burgundy-950"
                              : "border-gold-500/40 bg-white/5"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </span>
                      </div>
                      <p className="text-[11px] text-gold-300/90 font-medium">
                        {format.subtitle}
                      </p>
                      <p className="mt-2 text-xs text-cream-200/70 font-light leading-relaxed">
                        {format.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-white/10 text-[10px] text-cream-200/50 uppercase tracking-wider">
                      Recommandé pour : {format.recommendedFor}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Guest Scale Slider */}
          <div className="bg-[#460021]/80 border border-gold-500/25 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center text-xs font-serif font-bold">
                  2
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white font-serif tracking-wide">
                  Envergure Estimée
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-bold text-gold-300 font-serif">
                  {guestCount}
                </span>
                <span className="text-xs text-cream-200/70 ml-1.5 uppercase tracking-wider">
                  Convives
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2.5 bg-[#2d0014] rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between text-[11px] text-cream-200/50 uppercase tracking-wider">
                <span>10 (Express 4h)</span>
                <span>50 convives</span>
                <span>150 convives</span>
                <span>300 convives</span>
                <span>500+ convives</span>
              </div>
            </div>
          </div>

          {/* Step 3: Hospitality Options */}
          <div className="bg-[#460021]/80 border border-gold-500/25 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center text-xs font-serif font-bold">
                3
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-serif tracking-wide">
                Prestations & Protocole Hôtelier
              </h3>
            </div>

            <div className="space-y-3">
              {HOSPITALITY_OPTIONS.map((opt) => {
                const isChecked = selectedOptions.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    onClick={() => toggleOption(opt.id)}
                    className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      isChecked
                        ? "bg-gradient-to-r from-[#550028] to-[#40001e] border-gold-500/50 shadow-md"
                        : "bg-white/5 border-white/10 hover:border-gold-500/30"
                    }`}
                  >
                    <div className="pr-4">
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        {opt.title}
                      </div>
                      <p className="text-xs text-cream-200/70 font-light mt-1 leading-relaxed">
                        {opt.detail}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked
                          ? "bg-gold-500 border-gold-400 text-burgundy-950"
                          : "border-gold-500/40 bg-white/5"
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 4: Summary & Inquiry at the Bottom */}
          <div className="bg-gradient-to-b from-[#4e0025] to-[#340018] border border-gold-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/50 space-y-6">
            <div className="border-b border-gold-500/25 pb-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                Récapitulatif de la Demande
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#2b0014]/70 border border-gold-500/20 rounded-2xl p-5 text-xs sm:text-sm">
              <div className="space-y-2">
                <div>
                  <span className="text-cream-200/60 block text-xs uppercase tracking-wider mb-1">
                    Format(s) retenu(s) :
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedFormatsList.map((f) => (
                      <span
                        key={f.id}
                        className="px-2 py-0.5 rounded-md bg-burgundy-950 border border-gold-500/30 text-xs text-gold-200 font-medium"
                      >
                        {f.title}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-cream-200/60 block text-xs uppercase tracking-wider mb-0.5">
                    Envergure :
                  </span>
                  <span className="font-bold text-gold-300 text-sm">
                    {guestCount} convives
                  </span>
                </div>
              </div>

              <div>
                <span className="text-cream-200/60 block text-xs uppercase tracking-wider mb-1">
                  Prestations retenues ({selectedOptions.length}) :
                </span>
                <span className="font-semibold text-gold-200">
                  {selectedOptions.length} prestation(s) sélectionnée(s)
                </span>
              </div>
            </div>

            {/* Privilege Tasting Assurance Box */}
            <div className="p-4 rounded-2xl bg-[#20000e]/80 border border-gold-500/30 text-xs sm:text-sm leading-relaxed text-cream-100/90">
              <span className="font-serif font-bold text-gold-300 block mb-1">
                Engagement Réactivité & Dégustation
              </span>
              Devis sur-mesure transmis sous 2 à 4 heures ouvrées. Séance de dégustation organisée sur demande pour valider la composition de votre menu avant l'événement.
            </div>

            {/* Inquiry Form or Success State */}
            {submitted ? (
              <div className="p-6 rounded-2xl bg-white/5 border border-gold-400/50 text-center animate-fade-in space-y-3">
                <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold text-white">
                  Demande Transmise avec Succès
                </h4>
                <p className="text-xs text-cream-200/80 leading-relaxed font-light">
                  Merci <span className="font-semibold text-gold-200">{clientName}</span>. Notre Direction
                  étudie vos critères et vous transmettra votre devis officiel sous 2 à 4 heures ouvrées au{" "}
                  <span className="font-semibold text-gold-200">{clientPhone}</span> (séance de dégustation organisée sur demande).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                      Nom complet ou Organisation
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="M. ou Mme / Entité"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                      Téléphone de contact
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+213 770 00 00 00"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                      Date envisagée de la réception
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Mois, saison ou date précise"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                      Précisions particulières (Lieu, souhaits spécifiques)
                    </label>
                    <input
                      type="text"
                      placeholder="Décrivez vos attentes gastronomiques et logistiques..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 hover:brightness-110 shadow-xl shadow-gold-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Demander un Devis Express & Dégustation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Direct Phone Support */}
            <div className="pt-4 border-t border-gold-500/20 text-center space-y-2">
              <p className="text-[11px] text-cream-200/60">
                Besoin d'un devis urgent sous 4 heures ?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-gold-300">
                <a
                  href={`tel:${CONTACT_INFO.primaryPhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{CONTACT_INFO.primaryPhone}</span>
                </a>
                <span className="text-gold-500/40">·</span>
                <a
                  href={`tel:${CONTACT_INFO.secondaryPhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{CONTACT_INFO.secondaryPhone}</span>
                </a>
              </div>
              <p className="text-[10px] text-cream-200/40">
                {CONTACT_INFO.locations}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

