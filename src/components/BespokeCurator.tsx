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
    id: "gala",
    title: "Dîner de Gala & Réception Privée",
    subtitle: "Service à l'assiette haut standing",
    description: "Une chorégraphie culinaire millimétrée avec service à table synchronisé par une brigade en livrée d'apparat.",
    recommendedFor: "50 à 300 convives",
  },
  {
    id: "cocktail",
    title: "Cocktail Dînatoire d'Apparat",
    subtitle: "Pièces gastronomiques au plateau",
    description: "Assortiment raffiné de créations salées et sucrées servies au plateau dans une ambiance feutrée et dynamique.",
    recommendedFor: "30 à 400 convives",
  },
  {
    id: "buffet",
    title: "Buffet Royal & Découpe Noble",
    subtitle: "Stations chaudes & pièces rôties",
    description: "Générosité gastronomique avec postes de découpe en direct, viandes nobles rôties et assortiments d'entrées d'exception.",
    recommendedFor: "80 à 500+ convives",
  },
  {
    id: "corporate",
    title: "Banquet & Sommet Institutionnel",
    subtitle: "Restauration pour congrès & VIP",
    description: "Gestion logistique et protocole hôtelier rigoureux adapté aux exigences des délégations, ambassades et conférences.",
    recommendedFor: "100 à 600+ convives",
  },
];

interface HospitalityOption {
  id: string;
  title: string;
  detail: string;
}

const HOSPITALITY_OPTIONS: HospitalityOption[] = [
  {
    id: "brigade",
    title: "Brigade de Salle & Maîtres d'Hôtel Dédiés",
    detail: "Personnel hôtelier qualifié, maître d'hôtel coordinateur et service d'accueil en tenue de prestige.",
  },
  {
    id: "art-table",
    title: "Art de la Table, Porcelaine & Argenterie",
    detail: "Nappage noble en lin, assiettes bordées d'or, couverts d'apparat et verrerie en cristal taillé.",
  },
  {
    id: "live-cooking",
    title: "Atelier Culinaire en Direct (Live Cooking)",
    detail: "Animation culinaire par nos chefs : découpe de viandes nobles au feu de bois et cuisson à la minute.",
  },
  {
    id: "bar-artisan",
    title: "Bar à Mocktails Créatifs & Infusions Rares",
    detail: "Créations fraîches de fruits de saison pressés, cocktails signature sans alcool et café de dégustation.",
  },
  {
    id: "scenographie",
    title: "Scénographie Florale & Décoration de Salle",
    detail: "Centres de table sur-mesure, candélabres dorés et mise en ambiance raffinée de votre lieu de réception.",
  },
];

export default function BespokeCurator() {
  const [selectedFormat, setSelectedFormat] = useState<string>("gala");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "brigade",
    "art-table",
    "live-cooking",
  ]);
  const [guestCount, setGuestCount] = useState<number>(120);

  // Form State
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentFormat = RECEPTION_FORMATS.find((f) => f.id === selectedFormat) || RECEPTION_FORMATS[0];

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
          <div className="inline-block px-4 py-1 rounded-full bg-[#320017] border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-[0.25em] mb-4 shadow-md">
            CONCEPTION SUR-MESURE
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight leading-tight">
            Composez Votre Réception d'Exception
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream-100/80 leading-relaxed font-light">
            Définissez les contours de votre événement. Notre direction gastronomique et nos maîtres d'hôtel
            élaborent une proposition exclusive, accompagnée d'une dégustation privée de nos créations.
          </p>
        </div>

        {/* Main Curator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Interactive Event Builder (7 cols) */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            {/* Step 1: Format Selector */}
            <div className="bg-[#460021]/80 border border-gold-500/25 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center text-xs font-serif font-bold">
                  1
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white font-serif tracking-wide">
                  Format de la Réception
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {RECEPTION_FORMATS.map((format) => {
                  const isSelected = selectedFormat === format.id;
                  return (
                    <button
                      key={format.id}
                      type="button"
                      onClick={() => setSelectedFormat(format.id)}
                      className={`p-4 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between border ${
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
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-gold-400 text-burgundy-950 flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
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
                  min="30"
                  max="500"
                  step="10"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#2d0014] rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
                <div className="flex justify-between text-[11px] text-cream-200/50 uppercase tracking-wider">
                  <span>30 convives</span>
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
          </div>

          {/* Right Column: Synthesis & Private Tasting Request Form (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-gradient-to-b from-[#4e0025] to-[#340018] border border-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50">
              <div className="border-b border-gold-500/25 pb-5 mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-1">
                  RÉSUMÉ DU PROJET
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                  Votre Réception Sur-Mesure
                </h3>
                <div className="mt-3 text-xs text-cream-200/80 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-cream-200/60">Format :</span>
                    <span className="font-semibold text-gold-200">{currentFormat.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream-200/60">Envergure :</span>
                    <span className="font-semibold text-gold-200">{guestCount} convives</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream-200/60">Options retenues :</span>
                    <span className="font-semibold text-gold-200">{selectedOptions.length} prestation(s)</span>
                  </div>
                </div>
              </div>

              {/* Privilege Tasting Assurance Box */}
              <div className="p-4 rounded-2xl bg-[#2b0014]/80 border border-gold-500/30 mb-6 text-xs leading-relaxed text-cream-100/90">
                <span className="font-serif font-bold text-gold-300 block mb-1">
                  Séance de Dégustation Privée Offerte
                </span>
                Après étude de votre projet par notre Chef Exécutif, une séance de dégustation des mets
                sélectionnés vous est réservée pour valider l'harmonie des saveurs avant votre événement.
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
                    Événementielle étudie vos critères et vous contactera au{" "}
                    <span className="font-semibold text-gold-200">{clientPhone}</span> sous 24h pour organiser
                    votre consultation et séance de dégustation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <textarea
                      rows={2}
                      placeholder="Décrivez vos attentes gastronomiques et logistiques..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 hover:brightness-110 shadow-xl shadow-gold-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                  >
                    <span>Solliciter une Consultation & Dégustation</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Direct Phone Support */}
              <div className="mt-6 pt-5 border-t border-gold-500/20 text-center">
                <p className="text-[11px] text-cream-200/60 mb-2">
                  Besoin d'un échange immédiat avec notre direction ?
                </p>
                <a
                  href={`tel:${CONTACT_INFO.primaryPhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-gold-300 hover:text-white transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Ligne Directe : {CONTACT_INFO.primaryPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

