"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserCheck, CheckCircle2, ChevronRight, Briefcase, FileText, Send, PhoneCall, UploadCloud, X } from "lucide-react";
import { RECRUITMENT_STEPS, CONTACT_INFO } from "@/data/cateringData";

export default function RecrutementPage() {
  const [candidateName, setCandidateName] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [jobRole, setJobRole] = useState("maitre-hotel");
  const [experienceYears, setExperienceYears] = useState("1-3");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCvFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidatePhone) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#63002e] text-white">
      <Navbar />

      <main className="flex-1 pt-48 sm:pt-52 lg:pt-60 pb-20">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            Espace Recrutement
          </h1>
        </div>

        {/* 4 Steps Recruitment Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">

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
                  {cvFile && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500/10 border border-gold-400/40 text-gold-200 text-xs">
                      <FileText className="w-4 h-4 text-gold-400" />
                      <span>CV joint : <strong className="text-white">{cvFile.name}</strong> ({(cvFile.size / 1024).toFixed(0)} Ko)</span>
                    </div>
                  )}
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

                  {/* CV Upload Field */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-cream-100/80 mb-1.5 flex items-center justify-between">
                      <span>Curriculum Vitae (CV)</span>
                      <span className="text-[10px] text-gold-300/80 font-normal lowercase tracking-normal">
                        PDF, DOC, DOCX (Max 10 Mo)
                      </span>
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="cv-upload-input"
                    />

                    {!cvFile ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleFileDrop}
                        className="group w-full p-4 sm:p-5 rounded-2xl bg-burgundy-950/60 hover:bg-burgundy-950/85 border-2 border-dashed border-gold-500/30 hover:border-gold-400/80 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2"
                      >
                        <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center group-hover:scale-110 group-hover:border-gold-400 transition-all">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-cream-100 group-hover:text-gold-300 transition-colors">
                            Cliquez pour importer votre CV ou glissez-déposez le fichier
                          </p>
                          <p className="text-[10px] text-cream-200/50 mt-0.5">
                            Formats acceptés : PDF, Word (.docx, .doc)
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-[#360018] border border-gold-400/60 flex items-center justify-between gap-3 shadow-md animate-fade-in">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-gold-500/20 text-gold-300 border border-gold-500/40 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 text-left">
                            <p className="text-xs font-bold text-cream-50 truncate">
                              {cvFile.name}
                            </p>
                            <p className="text-[10px] text-gold-300/80 font-mono">
                              {(cvFile.size / 1024).toFixed(0)} Ko • Fichier prêt à l&apos;envoi
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCvFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cream-200 hover:text-white transition-colors shrink-0"
                          title="Supprimer le fichier"
                          aria-label="Supprimer le fichier"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
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

