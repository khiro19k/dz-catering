"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { CONTACT_INFO, SITE_NAVIGATION, CLIENT_REFERENCES } from "@/data/cateringData";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#320017] border-t border-gold-500/25 pt-16 pb-12 text-cream-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Slogan */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-300 shadow-md shadow-gold-500/20 shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-burgundy-900 relative">
                  <Image
                    src="/images/dz-catering-plate.png"
                    alt="DZ Catering Logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-white">
                  DZ <span className="text-gold-400">CATERING</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gold-300/80 -mt-0.5">
                  {CONTACT_INFO.companyName}
                </span>
              </div>
            </Link>

            <p className="text-xs text-cream-200/70 leading-relaxed font-light">
              « {CONTACT_INFO.slogan} »
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-burgundy-900/60 border border-gold-500/30 text-gold-300 text-[11px] font-sans">
              <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>{CONTACT_INFO.responsePromise}</span>
            </div>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-gold-400/80 block mb-2 font-semibold">
                Réseaux Professionnels
              </span>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-burgundy-900 border border-gold-500/30 flex items-center justify-center text-cream-100 hover:text-gold-300 hover:border-gold-400 transition-all hover:scale-105"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-burgundy-900 border border-gold-500/30 flex items-center justify-center text-cream-100 hover:text-gold-300 hover:border-gold-400 transition-all hover:scale-105"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-burgundy-900 border border-gold-500/30 flex items-center justify-center text-cream-100 hover:text-gold-300 hover:border-gold-400 transition-all hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Globale (Strict 6 Pages) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-300 mb-4 font-sans">
              Plan du Site
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {SITE_NAVIGATION.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-gold-300 transition-colors flex items-center gap-2 text-cream-200/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400/60" />
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Références Clients de Prestige */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-300 mb-4 font-sans">
              Références Grands Comptes
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-200/75">
              {CLIENT_REFERENCES.map((ref, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">{ref.name}</span>
                    <span className="text-[10px] text-gold-300/60 uppercase tracking-wider">
                      {ref.category}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Direct & Implantations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-300 mb-4 font-sans">
              Siège & Permanences
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">{CONTACT_INFO.companyName}</span>
                  <span className="text-cream-200/70 text-xs">{CONTACT_INFO.locations}</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`tel:${CONTACT_INFO.primaryPhone.replace(/\s+/g, "")}`}
                  className="hover:text-gold-300 text-white font-medium"
                >
                  {CONTACT_INFO.primaryPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`tel:${CONTACT_INFO.secondaryPhone.replace(/\s+/g, "")}`}
                  className="hover:text-gold-300 text-white font-medium"
                >
                  {CONTACT_INFO.secondaryPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-gold-300 text-cream-200/80"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-gold-500/15 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-200/50 gap-4">
          <p>© {year} {CONTACT_INFO.companyName} — {CONTACT_INFO.locations}. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/a-propos" className="hover:text-gold-300">
              Engagements Qualité
            </Link>
            <Link href="/recrutement" className="hover:text-gold-300">
              Recrutement
            </Link>
            <Link href="/devis-contact" className="hover:text-gold-300">
              Devis en ligne
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
