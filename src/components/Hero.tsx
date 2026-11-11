"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  HERO_SETTINGS,
  HERO_MEDIA_CONFIG,
  type HeroSettings,
  type HeroMediaConfig,
} from "@/data/cateringData";

interface HeroProps {
  settings?: Partial<HeroSettings>;
  media?: Partial<HeroMediaConfig>;
}

export default function Hero({ settings: customSettings, media: customMedia }: HeroProps) {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Desktop configuration (Completely decoupled from Mobile)
  const desktop = {
    video:
      customSettings?.desktop?.video ??
      customMedia?.hero_desktop_video ??
      HERO_SETTINGS.desktop.video,
    image:
      customSettings?.desktop?.image ??
      customMedia?.hero_desktop_image ??
      HERO_SETTINGS.desktop.image,
    titlePrimary:
      customSettings?.desktop?.titlePrimary ?? HERO_SETTINGS.desktop.titlePrimary,
    titleAccent:
      customSettings?.desktop?.titleAccent ?? HERO_SETTINGS.desktop.titleAccent,
    subtitle:
      customSettings?.desktop?.subtitle ?? HERO_SETTINGS.desktop.subtitle,
    primaryCtaText:
      customSettings?.desktop?.primaryCtaText ?? HERO_SETTINGS.desktop.primaryCtaText,
    primaryCtaHref:
      customSettings?.desktop?.primaryCtaHref ?? HERO_SETTINGS.desktop.primaryCtaHref,
    secondaryCtaText:
      customSettings?.desktop?.secondaryCtaText ?? HERO_SETTINGS.desktop.secondaryCtaText,
    secondaryCtaHref:
      customSettings?.desktop?.secondaryCtaHref ?? HERO_SETTINGS.desktop.secondaryCtaHref,
  };

  // Mobile configuration (Completely decoupled from Desktop)
  const mobile = {
    video:
      customSettings?.mobile?.video ??
      customMedia?.hero_mobile_video ??
      HERO_SETTINGS.mobile.video,
    image:
      customSettings?.mobile?.image ??
      customMedia?.hero_mobile_image ??
      HERO_SETTINGS.mobile.image,
    titlePrimary:
      customSettings?.mobile?.titlePrimary ?? HERO_SETTINGS.mobile.titlePrimary,
    titleAccent:
      customSettings?.mobile?.titleAccent ?? HERO_SETTINGS.mobile.titleAccent,
    subtitle:
      customSettings?.mobile?.subtitle ?? HERO_SETTINGS.mobile.subtitle,
    primaryCtaText:
      customSettings?.mobile?.primaryCtaText ?? HERO_SETTINGS.mobile.primaryCtaText,
    primaryCtaHref:
      customSettings?.mobile?.primaryCtaHref ?? HERO_SETTINGS.mobile.primaryCtaHref,
    secondaryCtaText:
      customSettings?.mobile?.secondaryCtaText ?? HERO_SETTINGS.mobile.secondaryCtaText,
    secondaryCtaHref:
      customSettings?.mobile?.secondaryCtaHref ?? HERO_SETTINGS.mobile.secondaryCtaHref,
  };

  // Safe autoplay handlers
  useEffect(() => {
    if (desktopVideoRef.current && desktop.video) {
      desktopVideoRef.current.play().catch(() => {});
    }
  }, [desktop.video]);

  useEffect(() => {
    if (mobileVideoRef.current && mobile.video) {
      mobileVideoRef.current.play().catch(() => {});
    }
  }, [mobile.video]);

  return (
    <section
      aria-label="Section d'accueil DZ CATERING"
      className="relative w-full overflow-hidden bg-[#240011]"
    >
      {/* =========================================================================
          💻 1. DESKTOP HERO VIEW (Screens >= 768px / md: and above)
          - Full 100svh landscape (16:9)
          - Dedicated top clearance (pt-52) so text NEVER collides with hanging shield
          - Side-by-side horizontal action buttons (Zero bottom cut-off)
          - Balanced two-line Playfair serif typography
          ========================================================================= */}
      <div className="hidden md:flex relative h-[100svh] min-h-[680px] w-full flex-col justify-between overflow-hidden">
        {/* Desktop Media Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          {desktop.video ? (
            <video
              ref={desktopVideoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={desktop.image}
              className="w-full h-full object-cover object-center"
              aria-hidden="true"
            >
              <source src={desktop.video} type="video/mp4" />
              <img
                src={desktop.image}
                alt="DZ CATERING - Service de prestige"
                className="w-full h-full object-cover object-center"
              />
            </video>
          ) : (
            <img
              src={desktop.image}
              alt="DZ CATERING - Service de prestige"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
            />
          )}

          {/* Desktop Light Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#240011]/85 via-black/25 to-[#1a000c]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_0%,_rgba(20,0,9,0.45)_100%)] pointer-events-none" />
        </div>

        {/* Desktop Top Clearance for the Hanging Shield (Leaves ~50px breath space below shield tip) */}
        <div className="w-full h-44 lg:h-52 xl:h-56 shrink-0 relative z-10" />

        {/* Desktop Minimalist Centerpiece */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-8 max-w-5xl mx-auto my-auto">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-serif text-white tracking-tight leading-[1.18] drop-shadow-2xl">
            {desktop.titlePrimary}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600">
              {desktop.titleAccent}
            </span>
          </h1>
        </div>

        {/* Desktop Bottom Docked Action Buttons (Horizontal Row - Always Visible & Fits inside 100svh) */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-6 lg:pb-8 flex flex-col items-center gap-4">
          <div className="flex flex-row items-center justify-center gap-5 w-full">
            <Link
              href={desktop.primaryCtaHref}
              className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-[0.18em] bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 text-center shadow-xl shadow-gold-500/25 hover:brightness-110 hover:scale-105 active:scale-95 transition-all min-w-[240px]"
            >
              {desktop.primaryCtaText}
            </Link>

            <Link
              href={desktop.secondaryCtaHref}
              className="px-8 py-3.5 rounded-full font-semibold text-xs uppercase tracking-[0.18em] bg-black/45 hover:bg-black/65 border border-gold-400/40 hover:border-gold-300 text-cream-100 text-center backdrop-blur-md active:scale-95 transition-all min-w-[240px]"
            >
              {desktop.secondaryCtaText}
            </Link>
          </div>

          <a
            href="#prestations"
            aria-label="Défiler vers le contenu"
            className="text-gold-400/70 hover:text-gold-300 transition-colors pt-1"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>

      {/* =========================================================================
          📱 2. MOBILE HERO VIEW (Screens < 768px / max-md)
          - Full 100svh portrait (9:16)
          - Mobile-tailored clearance for compact header (pt-24)
          - Thumb-friendly vertical stacked buttons at the bottom
          - Clean centered typography
          ========================================================================= */}
      <div className="flex md:hidden relative h-[100svh] w-full flex-col justify-between overflow-hidden">
        {/* Mobile Media Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          {mobile.video ? (
            <video
              ref={mobileVideoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={mobile.image}
              className="w-full h-full object-cover object-center"
              aria-hidden="true"
            >
              <source src={mobile.video} type="video/mp4" />
              <img
                src={mobile.image}
                alt="DZ CATERING - Service traiteur"
                className="w-full h-full object-cover object-center"
              />
            </video>
          ) : (
            <img
              src={mobile.image}
              alt="DZ CATERING - Service traiteur"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
            />
          )}

          {/* Mobile Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#240011]/80 via-black/30 to-[#1a000c]/90 pointer-events-none" />
        </div>

        {/* Mobile Top Clearance */}
        <div className="w-full h-24 shrink-0 relative z-10" />

        {/* Mobile Minimalist Centerpiece */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-sm mx-auto my-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-serif text-white tracking-wide leading-snug drop-shadow-xl">
            {mobile.titlePrimary}
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600">
              {mobile.titleAccent}
            </span>
          </h1>
        </div>

        {/* Mobile Bottom Docked Buttons (Vertical Stack within thumb reach) */}
        <div className="relative z-10 w-full max-w-xs mx-auto px-4 pb-6 flex flex-col items-center gap-2.5">
          <Link
            href={mobile.primaryCtaHref}
            className="w-full py-3.5 px-4 rounded-lg font-bold text-xs uppercase tracking-[0.15em] bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-burgundy-950 text-center shadow-lg shadow-gold-500/25 active:scale-95 transition-all"
          >
            {mobile.primaryCtaText}
          </Link>

          <Link
            href={mobile.secondaryCtaHref}
            className="w-full py-3.5 px-4 rounded-lg font-semibold text-xs uppercase tracking-[0.15em] bg-black/50 border border-gold-400/40 text-cream-100 text-center backdrop-blur-md active:scale-95 transition-all"
          >
            {mobile.secondaryCtaText}
          </Link>

          <a
            href="#prestations"
            aria-label="Défiler vers le contenu"
            className="text-gold-400/70 py-1"
          >
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
