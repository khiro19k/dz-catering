"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserCheck, CheckCircle2, ChevronRight, Briefcase, FileText, Send, PhoneCall } from "lucide-react";
import { RECRUITMENT_STEPS, CONTACT_INFO } from "@/data/cateringData";

export default function RecrutementPage() {
  const [candidateName, setCandidateName] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [jobRole, setJobRole] = useState("maitre-hotel");
  const [experienceYears, setExperienceYears] = useState("1-3");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidatePhone) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#63002e] text-white">
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-40 lg:pt-44 pb-20">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
          <div className="inline-block px-4 py-1 rounded-full bg-[#460021] border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-[0.25em] mb-4 shadow-md">
            CARRIÈRES & EXCELLENCE HÔTELIÈRE
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            Espace Recrutement
          </h1>
          <p className="mt-4 text-base sm:text-lg text-cream-100/80 max-w-3xl mx-auto font-light leading-relaxed">
            DZ CATERING recrute en continu les meilleurs talents de la gastronomie et de l'hôtellerie en Algérie :
            Chefs, Pâtissiers et Maîtres d'hôtel animés par le sens du détail et du service irréprochable.
          </p>
        </div>

        {/* 4 Steps Recruitment Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-2">
              MÉTHODOLOGIE DE SÉLECTION
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Notre Processus de Recrutement en 4 Étapes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECRUITMENT_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#440020]/80 border border-gold-500/30 flex flex-col justify-between shadow-xl relative"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                      {step.step}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/5 border border-gold-500/30 text-gold-300 flex items-center justify-center text-xs font-serif font-bold">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-serif text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form & Profiles */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left : Profiles sought */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
                PROFILS RECHERCHÉS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Postes Ouverts pour la Saison Événementielle
              </h2>
              <p className="text-xs sm:text-sm text-cream-100/80 leading-relaxed font-light">
                Nous constituons un vivier permanent de professionnels pour des missions régulières et des événements
                de prestige (CIC Alger, sommets diplomatiques et réceptions VIP).
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Chefs Cuisiniers & Seconds</h3>
                    <p className="text-xs text-cream-200/70 mt-0.5">Maîtrise des grands buffets et cuissons à la minute.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Chefs Pâtissiers</h3>
                    <p className="text-xs text-cream-200/70 mt-0.5">Excellence en douceurs orientales nobles et macarons.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Maîtres d'Hôtel & Chefs de Rang</h3>
                    <p className="text-xs text-cream-200/70 mt-0.5">Tenue parfaite, discrétion et protocole officiel.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Serveurs & Commis de Salle</h3>
                    <p className="text-xs text-cream-200/70 mt-0.5">Port de plateau maîtrisé et accueil chaleureux.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right : Candidate Form */}
            <div className="lg:col-span-7 bg-[#480023]/90 border border-gold-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mb-2">
                Déposer Votre Candidature en Ligne
              </h3>
              <p className="text-xs sm:text-sm text-cream-200/70 mb-6 font-light">
                Remplissez les informations ci-dessous. Notre service ressources humaines prendra contact avec vous
                pour l'entretien de présélection.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-white/5 border border-gold-400/50 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-white">
                    Candidature Enregistrée
                  </h4>
                  <p className="text-xs sm:text-sm text-cream-100/90 leading-relaxed font-light">
                    Merci <span className="font-semibold text-gold-200">{candidateName}</span>. Votre dossier a bien été
                    transmis à notre Direction des Ressources Humaines. Nous vous contacterons au{" "}
                    <span className="font-semibold text-gold-200">{candidatePhone}</span> pour planifier votre entretien.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                        Nom & Prénom
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Votre nom complet"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0770 00 00 00"
                        value={candidatePhone}
                        onChange={(e) => setCandidatePhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                        Adresse E-mail
                      </label>
                      <input
                        type="email"
                        placeholder="votre.email@domaine.com"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                        Poste Visé
                      </label>
                      <select
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-burgundy-950/90 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                      >
                        <option value="maitre-hotel">Maître d'Hôtel / Chef de Rang</option>
                        <option value="chef-cuisinier">Chef Cuisinier / Second</option>
                        <option value="chef-patissier">Chef Pâtissier</option>
                        <option value="serveur">Serveur / Commis de salle</option>
                        <option value="logistique">Chauffeur-Livreur Logistique</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                      Expérience en Restauration / Hôtellerie
                    </label>
                    <select
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/90 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="debutant">Débutant motivé (avec formation hôtelière)</option>
                      <option value="1-3">1 à 3 ans d'expérience</option>
                      <option value="3-5">3 à 5 ans d'expérience</option>
                      <option value="5+">Plus de 5 ans en établissement de prestige</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5">
                      Références & Établissements Précédents
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Précisez vos références, diplômes ou expériences significatives..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-white placeholder-cream-200/30 text-xs focus:outline-none focus:border-gold-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 hover:brightness-110 shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Envoyer ma candidature</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

