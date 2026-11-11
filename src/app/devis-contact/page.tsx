"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PhoneCall, Mail, MapPin, Clock, CheckCircle2, ChevronRight, FileText, Send } from "lucide-react";
import { CONTACT_INFO } from "@/data/cateringData";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function DevisContactPage() {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [prestationType, setPrestationType] = useState("Pause café");
  const [formulaSelected, setFormulaSelected] = useState("Formule VIP");
  const [guestCountGroup, setGuestCountGroup] = useState("50 à 150");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [budgetGuideline, setBudgetGuideline] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !phone) return;
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappPhone}?text=${encodeURIComponent(
    `Bonjour EURL DZ CATERING, je souhaite obtenir un devis express pour : ${prestationType} (${formulaSelected}) pour environ ${guestCountGroup} convives.`
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#63002e] text-white">
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-40 lg:pt-44 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-[#460021] border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-[0.25em] mb-4 shadow-md">
            RÉACTIVITÉ & TARIFICATION SUR-MESURE
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            Devis & Contact
          </h1>
          <p className="mt-4 text-base sm:text-lg text-cream-100/80 max-w-3xl mx-auto font-light leading-relaxed">
            Formulaire interactif de devis sur-mesure pour réceptions et entreprises. Coordonnées directes de nos bureaux
            à Douaouda et El Biar, et permanence WhatsApp 7j/7.
          </p>

          {/* Rapid Response Promise Badge */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-gold-400 text-burgundy-950 font-bold text-xs uppercase tracking-wider shadow-lg">
            <Clock className="w-4 h-4" />
            <span>Engagement : {CONTACT_INFO.responsePromise}</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Contact Info & WhatsApp */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp VIP Direct Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#25D366]/10 border border-[#25D366]/35 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-serif text-white">
                      Demande Express via WhatsApp
                    </h3>
                    <p className="text-xs text-cream-200/70">
                      Échangez directement avec notre direction événementielle
                    </p>
                  </div>
                </div>

                <p className="text-xs text-cream-100/90 leading-relaxed font-light">
                  Pour les demandes d'urgence (préavis de 4 heures) ou les précisions rapides, notre équipe vous répond en direct.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all shadow-lg shadow-[#25D366]/20"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Ouvrir WhatsApp (+213 770 86 89 74)</span>
                </a>
              </div>

              {/* Direct Phones & Addresses */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#440020]/80 border border-gold-500/30 shadow-xl space-y-6">
                <h3 className="text-lg font-bold font-serif text-white border-b border-gold-500/20 pb-3">
                  Permanences & Coordonnées Directes
                </h3>

                <ul className="space-y-4 text-xs sm:text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">EURL DZ CATERING</span>
                      <span className="text-cream-200/70 text-xs">
                        Implantations à Douaouda (Laboratoire central) & El Biar (Alger)
                      </span>
                    </div>
                  </li>

                  <li className="flex items-center gap-3">
                    <PhoneCall className="w-5 h-5 text-gold-400 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gold-300/70 block">Ligne Principale</span>
                      <a href={`tel:${CONTACT_INFO.primaryPhone.replace(/\s+/g, "")}`} className="font-bold text-white hover:text-gold-300">
                        {CONTACT_INFO.primaryPhone}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-center gap-3">
                    <PhoneCall className="w-5 h-5 text-gold-400 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gold-300/70 block">Ligne Secondaire</span>
                      <a href={`tel:${CONTACT_INFO.secondaryPhone.replace(/\s+/g, "")}`} className="font-bold text-white hover:text-gold-300">
                        {CONTACT_INFO.secondaryPhone}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gold-300/70 block">E-mail Officiel</span>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="font-medium text-cream-100 hover:text-gold-300">
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Exact Comprehensive Quote Form */}
            <div className="lg:col-span-7 bg-[#480023]/95 border border-gold-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-1">
                  CAHIER DES CHARGES CLIENT
                </span>
                <h3 className="text-2xl font-bold font-serif text-white">
                  Formulaire Interactif de Devis Sur Mesure
                </h3>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-white/5 border border-gold-400/50 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-white">
                    Votre Demande a été Transmise
                  </h4>
                  <p className="text-xs sm:text-sm text-cream-100/90 leading-relaxed font-light">
                    Merci pour votre confiance. Notre équipe étudie immédiatement les paramètres de votre réception pour
                    <span className="font-semibold text-gold-200"> {companyName}</span>. Votre devis personnalisé vous
                    sera envoyé par email et téléphone sous <strong>2 à 4 heures ouvrées</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Entity & Responsible */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                        Entreprise / Institution *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nom de l'entité"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400"
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
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400"
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
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400"
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
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  {/* Prestation Type & Formula */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                        Type de Prestation
                      </label>
                      <select
                        value={prestationType}
                        onChange={(e) => setPrestationType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/90 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                      >
                        <option value="Pause café">Pause Café</option>
                        <option value="Cocktail déjeunatoire / dînatoire">Cocktail Déjeunatoire / Dînatoire</option>
                        <option value="Déjeuner assis servi à table">Déjeuner Assis (Service à table)</option>
                        <option value="Box repas individuelle">Box Repas Individuelle (Lunch Box)</option>
                        <option value="Scénographie & Décoration">Scénographie & Décoration Seule</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                        Formule Retenue
                      </label>
                      <select
                        value={formulaSelected}
                        onChange={(e) => setFormulaSelected(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/90 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                      >
                        <option value="Formule Ordinaire">Formule Ordinaire</option>
                        <option value="Formule Améliorée">Formule Améliorée</option>
                        <option value="Formule VIP">Formule VIP</option>
                        <option value="Formule VVIP">Formule VVIP</option>
                        <option value="Formule 100% Sur Mesure">Formule 100% Sur Mesure</option>
                      </select>
                    </div>
                  </div>

                  {/* Convives & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                        Nombre Estimé de Convives
                      </label>
                      <select
                        value={guestCountGroup}
                        onChange={(e) => setGuestCountGroup(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/90 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                      >
                        <option value="10 à 50">10 à 50 convives (Éligible commande 4h)</option>
                        <option value="50 à 150">50 à 150 convives</option>
                        <option value="150 à 300">150 à 300 convives</option>
                        <option value="300 à 600+">300 à 600+ convives (Grand sommet)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                        Budget Indicatif / Enveloppe Allouée
                      </label>
                      <input
                        type="text"
                        placeholder="Ex : Budget fixe par personne ou global"
                        value={budgetGuideline}
                        onChange={(e) => setBudgetGuideline(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  {/* Date & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                        Date & Créneau Horaire Envisagés
                      </label>
                      <input
                        type="text"
                        placeholder="Ex : 15 Décembre, 10h00"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                        Lieu Prévu de la Réception
                      </label>
                      <input
                        type="text"
                        placeholder="Ex : Alger, Siège social, Salle..."
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  {/* Special Requirements */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                      Précisions Particulières (Régimes, exigences scénographiques...)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Indiquez vos besoins spécifiques : vaisselle d'apparat, live cooking, végétarien..."
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 hover:brightness-110 shadow-xl transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Transmettre ma demande de devis express</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

