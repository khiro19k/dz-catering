"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Check,
  Users,
  Send,
} from "lucide-react";
import { CONTACT_INFO } from "@/data/cateringData";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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

function DevisContactContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const [selectedFormats, setSelectedFormats] = useState<string[]>(["pauses-cafe"]);
  const [guestCount, setGuestCount] = useState<number>(50);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "service-maitres",
    "scenographie-nappage",
    "vaisselle-materiel",
  ]);
  const [wantTasting, setWantTasting] = useState<boolean>(true);

  // Client info
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (mode === "degustation") {
      setWantTasting(true);
    }
  }, [mode]);

  const toggleFormat = (id: string) => {
    setSelectedFormats((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // keep at least one selected
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
    if (!companyName || !phone) return;
    setSubmitted(true);
  };

  // Build real-time customized WhatsApp message
  const selectedFormatTitles = selectedFormatsList
    .map((f) => `${f.title} (${f.subtitle})`)
    .join(" + ");

  const selectedOptionsTitles = selectedOptions
    .map((id) => HOSPITALITY_OPTIONS.find((opt) => opt.id === id)?.title)
    .filter(Boolean);

  const whatsappMessage = `Bonjour EURL DZ CATERING, je souhaite obtenir un devis personnalisé :
- Formats retenus : ${selectedFormatTitles}
- Convives : ${guestCount} personnes
- Prestations : ${selectedOptionsTitles.join(" / ")}
- Séance de Dégustation : ${wantTasting ? "Oui, souhaitée" : "Non requise"}${companyName ? `\n- Entreprise : ${companyName}` : ""}${contactName ? `\n- Responsable : ${contactName}` : ""}${phone ? `\n- Téléphone : ${phone}` : ""}${eventDate ? `\n- Date : ${eventDate}` : ""}${eventLocation ? `\n- Lieu : ${eventLocation}` : ""}`;

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappPhone}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#63002e] text-white selection:bg-gold-500/30 selection:text-gold-200">
      <Navbar />

      <main className="flex-1 pt-48 sm:pt-52 lg:pt-60 pb-20">
        {/* Header */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-tight">
            Composez Votre Prestation & Devis
          </h1>
        </div>

        {/* Content Container (Full Width Flow with Summary at Bottom) */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
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

            {/* Step 4: Company Details & Formal Specs */}
            <div className="bg-[#460021]/80 border border-gold-500/25 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center text-xs font-serif font-bold">
                  4
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white font-serif tracking-wide">
                  Coordonnées de l'Entreprise & Modalités
                </h3>
              </div>

              <div className="space-y-4">
                {/* Entity & Responsible */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                      Entreprise / Organisation *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Société, Institution, Ambassade..."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                      Nom & Prénom du Responsable *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="M. ou Mme"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                      Téléphone Direct *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0770 00 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                      E-mail Professionnel *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contact@entreprise.dz"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Date & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                      Date & Créneau Horaire
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : 15 Décembre, 10h00"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                      Lieu Prévu de la Réception
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : Alger, Siège, Palais des Congrès..."
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Tasting Session Special Toggle */}
                <div
                  onClick={() => setWantTasting(!wantTasting)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    wantTasting
                      ? "bg-gradient-to-r from-[#5a002b] to-[#3d001d] border-gold-400 ring-1 ring-gold-400/40 shadow-lg"
                      : "bg-white/5 border-white/10 hover:border-gold-500/30"
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold text-white font-serif">
                    Séance de Dégustation des Mets Souhaitée
                  </span>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ml-3 transition-colors ${
                      wantTasting
                        ? "bg-gold-500 border-gold-400 text-burgundy-950"
                        : "border-gold-500/40 bg-white/5"
                    }`}
                  >
                    {wantTasting && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Notes & Special Specs */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                    Précisions Particulières & Cahier des Charges
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Indiquez vos besoins spécifiques : régimes particuliers, protocole officiel, exigences scénographiques..."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* =========================================================================
                ✨ STEP 5: LE RÉSUMÉ DU PROJET EN BAS (AT THE BOTTOM ON DESKTOP & MOBILE)
                ========================================================================= */}
            <div className="bg-gradient-to-b from-[#4e0025] to-[#340018] border border-gold-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/50 space-y-6">
              <div className="border-b border-gold-500/25 pb-5">
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                  Récapitulatif de la Demande
                </h3>
              </div>

              {/* Summary Details in Responsive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#2b0014]/70 border border-gold-500/20 rounded-2xl p-5 sm:p-6 text-xs sm:text-sm">
                <div className="space-y-3">
                  <div>
                    <span className="text-cream-200/60 block text-xs uppercase tracking-wider mb-1">
                      Format(s) retenu(s) ({selectedFormats.length}) :
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFormatsList.map((f) => (
                        <span
                          key={f.id}
                          className="px-2.5 py-1 rounded-lg bg-burgundy-950 border border-gold-500/40 text-xs text-gold-200 font-medium"
                        >
                          {f.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-cream-200/60 block text-xs uppercase tracking-wider mb-0.5">
                      Envergure Estimée :
                    </span>
                    <span className="font-bold text-gold-300 font-serif text-base">
                      {guestCount} convives
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-cream-200/60 block text-xs uppercase tracking-wider mb-1">
                      Prestations & Protocole ({selectedOptions.length}) :
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedOptionsTitles.map((title) => (
                        <span
                          key={title}
                          className="px-2.5 py-1 rounded-lg bg-burgundy-950/70 border border-white/10 text-xs text-cream-100"
                        >
                          {title}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-cream-200/60 block text-xs uppercase tracking-wider mb-0.5">
                      Séance de Dégustation :
                    </span>
                    <span className="font-semibold text-gold-200">
                      {wantTasting ? "Demandée (Validée)" : "Non demandée"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Assurance Box */}
              <div className="p-4 rounded-2xl bg-[#20000e]/80 border border-gold-500/30 text-xs sm:text-sm leading-relaxed text-cream-100/90">
                <span className="font-serif font-bold text-gold-300 block mb-1">
                  Engagement Réactivité & Dégustation
                </span>
                Devis officiel personnalisé transmis sous 2 à 4 heures ouvrées. Séance de dégustation des mets organisée sur demande pour valider la composition gastronomique.
              </div>

              {/* Submit Action or Success Message */}
              {submitted ? (
                <div className="p-8 rounded-2xl bg-white/5 border border-gold-400/50 text-center animate-fade-in space-y-3">
                  <div className="w-14 h-14 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-white">
                    Demande Transmise avec Succès
                  </h4>
                  <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed font-light max-w-xl mx-auto">
                    Merci <span className="font-semibold text-gold-200">{companyName || contactName}</span>. Notre Direction
                    étudie vos paramètres et vous transmettra votre devis officiel sous <strong>2 à 4 heures ouvrées</strong> au{" "}
                    <span className="font-semibold text-gold-200">{phone}</span>.
                  </p>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-4 sm:py-5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 hover:brightness-110 shadow-2xl shadow-gold-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Transmettre ma Demande de Devis Express</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </form>

          {/* Direct Channels (WhatsApp Card & Permanent Addresses Below Form) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 sm:pt-14">
            {/* WhatsApp VIP Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#25D366]/10 border border-[#25D366]/35 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-serif text-white">
                      Demande Express via WhatsApp
                    </h3>
                    <p className="text-xs text-cream-200/70">
                      Transmettez votre sélection en un clic à notre direction
                    </p>
                  </div>
                </div>

                <p className="text-xs text-cream-100/90 leading-relaxed font-light">
                  Idéal pour les demandes d'intervention d'urgence sous 4 heures ou pour échanger instantanément sur les disponibilités.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all shadow-lg shadow-[#25D366]/20"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Envoyer ma Configuration sur WhatsApp</span>
              </a>
            </div>

            {/* Direct Contacts & Locations Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#440020]/80 border border-gold-500/30 shadow-xl space-y-4">
              <h3 className="text-base font-bold font-serif text-white border-b border-gold-500/20 pb-2.5">
                Permanences & Coordonnées Directes
              </h3>

              <ul className="space-y-3 text-xs sm:text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">EURL DZ CATERING</span>
                    <span className="text-cream-200/70 text-xs">
                      {CONTACT_INFO.locations}
                    </span>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-gold-400 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gold-300/70 block">
                      Ligne Principale
                    </span>
                    <a
                      href={`tel:${CONTACT_INFO.primaryPhone.replace(/\s+/g, "")}`}
                      className="font-bold text-white hover:text-gold-300 transition-colors"
                    >
                      {CONTACT_INFO.primaryPhone}
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-gold-400 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gold-300/70 block">
                      Ligne Secondaire
                    </span>
                    <a
                      href={`tel:${CONTACT_INFO.secondaryPhone.replace(/\s+/g, "")}`}
                      className="font-bold text-white hover:text-gold-300 transition-colors"
                    >
                      {CONTACT_INFO.secondaryPhone}
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gold-300/70 block">
                      E-mail Officiel
                    </span>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="font-medium text-cream-100 hover:text-gold-300 transition-colors"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function DevisContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#63002e] flex items-center justify-center text-gold-300">
          Chargement du configurateur...
        </div>
      }
    >
      <DevisContactContent />
    </Suspense>
  );
}
