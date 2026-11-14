"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { UtensilsCrossed, Clock, ShieldCheck, Award } from "lucide-react";
import { CLIENT_REFERENCES } from "@/data/cateringData";

function CountUpMetric({
  target,
  displayValue,
  format,
  duration = 2.0,
}: {
  target: number;
  displayValue: string;
  format: (val: number) => string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(displayValue);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(displayValue);
      setHasAnimated(true);
      return;
    }

    let startTime: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Luxury easeOutExpo deceleration curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = target * easeProgress;
      setValue(format(current));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setValue(displayValue);
        setHasAnimated(true);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, hasAnimated, target, displayValue, duration, format]);

  return (
    <span ref={ref} className="tabular-nums font-serif">
      {value}
    </span>
  );
}

const PRESTIGE_METRICS = [
  {
    icon: UtensilsCrossed,
    value: "+25 000",
    target: 25000,
    duration: 2.3,
    format: (val: number) =>
      `+${Math.round(val)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`,
    label: "Repas & Prestations Servis",
    detail: "Couverts et pauses servis auprès de nos clients et ministères",
  },
  {
    icon: Clock,
    value: "4 Heures",
    target: 4,
    duration: 1.6,
    format: (val: number) => `${Math.max(1, Math.round(val))} Heures`,
    label: "Intervention Express",
    detail: "Prise en charge de 10 à 50 personnes sous 4h de préavis seulement",
  },
  {
    icon: ShieldCheck,
    value: "100 %",
    target: 100,
    duration: 1.9,
    format: (val: number) => `${Math.round(val)} %`,
    label: "Adaptation Budgétaire",
    detail: "100 % des devis ajustés aux capacités financières et aux besoins",
  },
  {
    icon: Award,
    value: "2 à 4h",
    target: 4,
    duration: 1.7,
    format: (val: number) =>
      `${Math.round(val * 0.5)} à ${Math.max(1, Math.round(val))}h`,
    label: "Réponse Rapide Devis",
    detail: "Proposition de devis transmise sous 2 à 4 heures ouvrées",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function TrustProofSection() {
  // Seamless infinite loop: exactly 2 complete sets for 50% keyframe translation
  const marqueeItems = [
    ...CLIENT_REFERENCES,
    ...CLIENT_REFERENCES,
  ];

  return (
    <section
      id="prestations"
      aria-label="Garanties d'excellence et chiffres clés"
      className="relative bg-gradient-to-b from-[#240011] via-[#2d0015] to-[#3a001b] py-16 sm:py-24 border-t border-gold-500/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Soft Fade & Slide Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            L'Excellence en Chiffres
          </h2>
        </motion.div>

        {/* =========================================================================
            🌟 4 LUXURY PRESTIGE CARDS (STAGGERED CASCADING ENTRANCE)
            ========================================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          {PRESTIGE_METRICS.map((metric, i) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="relative p-4 sm:p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-gold-500/20 hover:border-gold-400/50 transition-colors duration-300 backdrop-blur-md shadow-xl hover:shadow-[0_12px_32px_rgba(202,182,127,0.15)] group flex flex-col items-center text-center justify-between"
              >
                {/* Ambient Top Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-8 sm:h-12 bg-gold-500/10 blur-xl rounded-full pointer-events-none group-hover:bg-gold-500/25 transition-all" />

                {/* Circular Illuminated Icon Badge */}
                <motion.div
                  whileHover={{ rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 0.4 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400 mb-3 sm:mb-4 group-hover:scale-110 group-hover:border-gold-400/60 group-hover:bg-gold-500/20 transition-all shadow-inner"
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" />
                </motion.div>

                {/* Metric Value with Live Count-Up */}
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gold-300 font-serif tracking-tight drop-shadow-sm min-h-[1.25em] flex items-center justify-center">
                  <CountUpMetric
                    target={metric.target}
                    displayValue={metric.value}
                    format={metric.format}
                    duration={metric.duration}
                  />
                </span>

                {/* Metric Label */}
                <span className="text-[11px] sm:text-xs font-bold text-cream-100 mt-2 uppercase tracking-[0.14em] line-clamp-1">
                  {metric.label}
                </span>

                {/* Metric Detail */}
                <span className="text-[10px] sm:text-xs text-cream-200/70 mt-1.5 font-light leading-relaxed">
                  {metric.detail}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Client References Header with Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-white/10 text-center"
        >
          <span className="text-gold-400 font-serif text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold block mb-2">
            Ils Nous Font Confiance
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            Nos Références Clients
          </h2>
          <p className="text-xs sm:text-sm text-cream-200/70 mt-2 max-w-xl mx-auto font-light">
            Institutions souveraines, organisations internationales et fleurons industriels
          </p>
        </motion.div>
      </div>

      {/* =========================================================================
          🌟 INFINITE SEAMLESS MARQUEE CAROUSEL (LUXURY ADAPTIVE FRAMES)
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 sm:mt-10 w-full overflow-hidden mask-marquee-fade py-5"
      >
        <div className="animate-marquee-infinite flex items-center gap-5 sm:gap-7">
          {marqueeItems.map((ref, idx) => (
            <div
              key={idx}
              title={`${ref.name} — ${ref.category || ""}`}
              className={`${ref.frameWidth || "w-[220px] sm:w-[260px]"} h-[120px] sm:h-[135px] shrink-0 px-4 sm:px-6 py-3 rounded-2xl bg-white/[0.98] hover:bg-white border-2 border-gold-400/40 hover:border-gold-400 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_36px_rgba(202,182,127,0.35)] hover:-translate-y-1 hover:scale-[1.03] group cursor-default flex items-center justify-center text-center relative overflow-hidden`}
            >
              {/* Ambient subtle warm gold reflection on card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {ref.logo ? (
                <img
                  src={ref.logo}
                  alt={ref.name || ref.initials}
                  className={`${ref.logoSize || "max-h-[75px] max-w-[88%]"} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
                  loading="lazy"
                />
              ) : (
                <span className="font-serif font-extrabold text-base sm:text-lg text-burgundy-950 tracking-widest drop-shadow-sm">
                  {ref.initials}
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
