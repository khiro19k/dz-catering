"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, FileText } from "lucide-react";
import { CONTACT_INFO, SITE_NAVIGATION } from "@/data/cateringData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-[800ms] ease-out ${
        scrolled
          ? "bg-[#4e0024] backdrop-blur-md border-b border-gold-500/30 shadow-2xl shadow-black/50 py-2 sm:py-2.5"
          : "bg-gradient-to-b from-[#350018]/90 via-[#460020]/40 to-transparent py-3 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout: 3-Column Grid guarantees ZERO text overlap */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center w-full min-h-[52px]">
          {/* Column 1: Left Navigation Links (2 Links: Nos Formules & Services | Réalisations & Galerie) */}
          <nav aria-label="Navigation principale gauche" className="flex items-center justify-end gap-6 xl:gap-10 pr-8 xl:pr-12">
            <Link
              href="/formules-services"
              className={`text-xs xl:text-sm font-semibold tracking-wider transition-colors uppercase whitespace-nowrap ${
                pathname === "/formules-services" ? "text-gold-300 font-bold" : "text-cream-100/90 hover:text-gold-300"
              }`}
            >
              Nos Formules & Services
            </Link>
            <Link
              href="/realisations-galerie"
              className={`text-xs xl:text-sm font-semibold tracking-wider transition-colors uppercase whitespace-nowrap ${
                pathname === "/realisations-galerie" ? "text-gold-300 font-bold" : "text-cream-100/90 hover:text-gold-300"
              }`}
            >
              Réalisations & Galerie
            </Link>
          </nav>

          {/* Column 2: Center Brand Identity (Dedicated Column - No Overlap) */}
          <div className="relative flex justify-center items-center min-w-[200px] xl:min-w-[240px] px-2">
            <Link
              href="/"
              className="group block relative focus:outline-none"
              aria-label="DZ Catering Accueil"
            >
              {/* State A: Clean Brand Typography ONLY (When scrolled - pure elegant text) */}
              <div
                className={`flex flex-col items-center justify-center text-center py-1 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  scrolled
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-90 -translate-y-3 pointer-events-none"
                }`}
              >
                <span className="font-extrabold tracking-widest text-base xl:text-lg text-cream-50 font-serif leading-none whitespace-nowrap group-hover:text-gold-300 transition-colors">
                  DZ <span className="text-gold-400">CATERING</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold-300/80 font-sans mt-1 whitespace-nowrap">
                  {CONTACT_INFO.tagline}
                </span>
              </div>

              {/* State B: Royal Shield Tapestry (Unrolled at top of page, rolls up smoothly on scroll) */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-0 origin-top transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  scrolled
                    ? "-translate-y-full scale-y-0 opacity-0 pointer-events-none"
                    : "translate-y-0 scale-y-100 opacity-100 drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)] hover:scale-[1.02]"
                }`}
              >
                <div className="relative w-24 sm:w-26 lg:w-28 xl:w-32 h-[116px] sm:h-[126px] lg:h-[136px] xl:h-[155px]">
                  <Image
                    src="/images/dz-catering-shield.png"
                    alt="DZ Catering - Traiteur & Services hôteliers"
                    fill
                    className="object-contain object-top"
                    priority
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* Column 3: Right Navigation Links (2 Elements: À Propos & Engagements | Devis & Contact) */}
          <div className="flex items-center justify-start gap-6 xl:gap-10 pl-8 xl:pl-12">
            <Link
              href="/a-propos"
              className={`text-xs xl:text-sm font-semibold tracking-wider transition-colors uppercase whitespace-nowrap ${
                pathname === "/a-propos" ? "text-gold-300 font-bold" : "text-cream-100/90 hover:text-gold-300"
              }`}
            >
              À Propos & Engagements
            </Link>
            <Link
              href="/devis-contact"
              className="inline-flex items-center gap-2 px-5 xl:px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 hover:brightness-110 shadow-lg shadow-gold-500/25 transition-all hover:scale-105 active:scale-95 ml-auto whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Devis & Contact</span>
            </Link>
          </div>
        </div>

        {/* Mobile Header Layout (< lg) */}
        <div className="lg:hidden flex items-center justify-between min-h-[50px] relative">
          {/* Mobile Left: Hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-cream-100/90 hover:text-gold-300 hover:bg-white/10 transition-colors focus:outline-none z-10"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Mobile Center Brand */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
            <Link href="/" className="block focus:outline-none">
              {/* Scrolled Mobile Text */}
              <div
                className={`flex flex-col items-center justify-center text-center py-2 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  scrolled
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90 pointer-events-none"
                }`}
              >
                <span className="font-extrabold tracking-wider text-sm text-cream-50 font-serif leading-none">
                  DZ <span className="text-gold-400">CATERING</span>
                </span>
                <span className="text-[8px] uppercase tracking-widest text-gold-300/80 font-sans mt-0.5">
                  {CONTACT_INFO.tagline}
                </span>
              </div>

              {/* Unscrolled Mobile Shield */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-0 origin-top transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  scrolled
                    ? "-translate-y-full scale-y-0 opacity-0 pointer-events-none"
                    : "translate-y-0 scale-y-100 opacity-100 drop-shadow-[0_12px_20px_rgba(0,0,0,0.6)]"
                }`}
              >
                <div className="relative w-20 sm:w-22 h-[96px] sm:h-[106px]">
                  <Image
                    src="/images/dz-catering-shield.png"
                    alt="DZ Catering - Traiteur & Services hôteliers"
                    fill
                    className="object-contain object-top"
                    priority
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile Right: Direct Phone CTA */}
          <a
            href={`tel:${CONTACT_INFO.primaryPhone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-burgundy-950 shadow-md shadow-gold-500/20 active:scale-95 transition-all z-10"
            aria-label="Appeler DZ Catering"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Appeler</span>
          </a>
        </div>
      </div>

      {/* Mobile Drawer (All 6 Pages strictly named) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-burgundy-950/98 backdrop-blur-2xl border-b border-gold-500/30 px-5 pt-6 pb-8 mt-2 animate-fade-in shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-2 text-center">
            {SITE_NAVIGATION.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold py-3 border-b border-white/10 tracking-wide transition-colors ${
                    isActive
                      ? "text-gold-300 font-bold bg-white/5 rounded-xl border-gold-500/30"
                      : "text-cream-100 hover:text-gold-400"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/devis-contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 shadow-lg shadow-gold-500/25 flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Demander un devis express</span>
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${CONTACT_INFO.primaryPhone.replace(/\s+/g, "")}`}
                  className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold bg-white/5 text-cream-100 border border-gold-500/30"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
                  <span>{CONTACT_INFO.primaryPhone}</span>
                </a>
                <a
                  href={`tel:${CONTACT_INFO.secondaryPhone.replace(/\s+/g, "")}`}
                  className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold bg-white/5 text-cream-100 border border-gold-500/30"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
                  <span>{CONTACT_INFO.secondaryPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
