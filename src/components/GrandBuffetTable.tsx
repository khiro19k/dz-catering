"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import {
  Sparkles,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
} from "lucide-react";

export interface BuffetDish {
  id: string;
  name: string;
  price: string;
  tier?: number;
  description: string;
  details: string[];
  image: string;
}

interface GrandBuffetTableProps {
  items: BuffetDish[];
  eyebrow?: string;
  heading?: string;
  onAddDish?: (dish: BuffetDish) => void;
  action?: React.ReactNode;
}

/**
 * GrandBuffetTable - Option 2: Le Grand Buffet Linéaire d'Apparat
 * A realistic, luxurious 5-star hotel banquet buffet counter.
 * Dishes are arranged physically along the velvet countertop with realistic
 * perspective depth, center spotlight, and signature FLIP zoom-in animation.
 */
export default function GrandBuffetTable({
  items,
  eyebrow = "DZ CATERING · HAUTE GASTRONOMIE",
  heading = "Vous pouvez demander une dégustation de nos meilleurs plats",
  onAddDish,
  action,
}: GrandBuffetTableProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const plateRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const [mounted, setMounted] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [modalDish, setModalDish] = React.useState<BuffetDish | null>(null);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [liftedIndex, setLiftedIndex] = React.useState<number | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  // Responsive width detection (mobile, tablet, desktop)
  const [screenWidth, setScreenWidth] = React.useState(1024);

  React.useEffect(() => {
    setMounted(true);
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth < 640;
  const isTablet = screenWidth >= 640 && screenWidth < 1024;

  // Navigation handlers
  const nextDish = React.useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevDish = React.useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToDish = React.useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  // Auto-cruise interval (subtle, pauses on hover or when modal is open)
  React.useEffect(() => {
    if (isPaused || modalDish !== null) return;
    const interval = setInterval(() => {
      nextDish();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, modalDish, nextDish]);

  // Pointer drag & touch swipe tracking
  const hasMovedRef = React.useRef(false);
  const dragTracker = React.useRef({
    isDown: false,
    startX: 0,
    startY: 0,
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    dragTracker.current.isDown = true;
    dragTracker.current.startX = e.clientX;
    dragTracker.current.startY = e.clientY;
    hasMovedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragTracker.current.isDown) return;
    const dx = e.clientX - dragTracker.current.startX;
    if (Math.abs(dx) > 8) {
      hasMovedRef.current = true;
    }
    const swipeThreshold = isMobile ? 35 : 45;
    if (Math.abs(dx) > swipeThreshold) {
      if (dx < 0) {
        nextDish();
      } else {
        prevDish();
      }
      dragTracker.current.startX = e.clientX;
    }
  };

  const handlePointerUp = () => {
    dragTracker.current.isDown = false;
    setTimeout(() => {
      hasMovedRef.current = false;
    }, 120);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalDish !== null) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        prevDish();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        nextDish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalDish, nextDish, prevDish]);

  // Open modal with signature FLIP animation
  const openPlateModal = React.useCallback((dish: BuffetDish, index: number) => {
    setOpenIndex(index);
    setModalDish(dish);
  }, []);

  const handleDialogClose = React.useCallback(() => {
    setModalDish(null);
    setOpenIndex(null);
    setLiftedIndex(null);
  }, []);

  const handleDialogLift = React.useCallback((isLifted: boolean) => {
    setLiftedIndex(isLifted ? openIndex : null);
  }, [openIndex]);

  const getSourceRect = React.useCallback(() => {
    if (openIndex === null) return null;
    const node = plateRefs.current[openIndex];
    return node ? node.getBoundingClientRect() : null;
  }, [openIndex]);

  const activeItem = items[activeIndex] || items[0];

  return (
    <div className="relative w-full">
      {/* Section Header */}
      <div className="mb-6 sm:mb-8 text-center px-4">
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-400 mb-2">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="mx-auto max-w-3xl font-serif text-2xl font-light tracking-tight text-white sm:text-3xl lg:text-4xl leading-snug">
            {heading}
          </h2>
        )}
      </div>

      {/* GRAND BUFFET LINÉAIRE - THE REALISTIC ROYAL BUFFET TABLE */}
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-5xl select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Top Chandelier Warm Downlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 sm:w-[40rem] h-56 bg-gold-400/15 rounded-full blur-[90px]"
        />

        {/* The Banquet Counter Frame */}
        <div
          className="relative w-full rounded-[1.8rem] sm:rounded-[2.8rem] border border-[#cab67f]/45 bg-[#120008] p-2.5 sm:p-6 pb-5 sm:pb-8 shadow-[0_35px_100px_rgba(0,0,0,0.98)] overflow-hidden"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Authentic 4K Palace Mahogany & Velvet Runner Banquet Table Background (Option 3) */}
          <img
            src="/images/table-bg-mahogany-palace.jpg"
            alt="Table Royale de Banquet DZ CATERING"
            draggable={false}
            className="absolute inset-0 size-full object-cover select-none pointer-events-none"
            style={{
              objectPosition: isMobile ? "center 48%" : "center 43%",
            }}
          />

          {/* Ambient Lighting Vignette blending with the burgundy background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e0006]/75 via-transparent to-[#0e0006]/35"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(235,220,169,0.18)_0%,transparent_70%)]"
          />

          {/* Center Spotlight Pool (Illuminates the active dish on the real table) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-72 sm:w-96 h-40 sm:h-52 rounded-[50%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(235,220,169,0.22)_0%,rgba(202,182,127,0.1)_45%,transparent_75%)] blur-lg"
          />

          {/* Gilded Bevel Trim Bar running horizontally along the table edge */}
          <div className="pointer-events-none absolute inset-x-8 top-2.5 h-[1.5px] bg-gradient-to-r from-transparent via-[#cab67f]/60 to-transparent" />

          {/* DISHES CAROUSEL STAGE */}
          <div className="relative w-full h-[230px] sm:h-[310px] flex items-center justify-center overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing">
            {items.map((dish, i) => {
              const count = items.length;
              let offset = i - activeIndex;
              if (offset > count / 2) offset -= count;
              if (offset < -count / 2) offset += count;

              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;

              // Responsive horizontal spacing tailored for mobile, tablet, and desktop
              const spacing = isMobile
                ? (screenWidth < 380 ? 100 : 110)
                : isTablet
                ? 175
                : 215;
              const x = offset * spacing;

              // Realistic scale & depth hierarchy
              const baseScale = isCenter
                ? (isMobile ? 1.18 : isTablet ? 1.22 : 1.28)
                : (isMobile ? 0.78 : isTablet ? 0.82 : 0.85);

              const scale = isCenter
                ? baseScale
                : Math.max(0.52, baseScale - (absOffset - 1) * (isMobile ? 0.22 : 0.16));

              // Opacity: center 100%, adjacent 82-85%, outer 32-42%
              const opacity = isCenter
                ? 1
                : absOffset === 1
                ? (isMobile ? 0.82 : 0.85)
                : (isMobile ? 0.32 : 0.42);

              // Z-Index: center is always on top
              const zIndex = isCenter ? 50 : 40 - absOffset * 10;

              // Y lift: center dish is pulled slightly forward onto the spotlight
              const liftY = isCenter ? (isMobile ? -6 : -12) : absOffset * (isMobile ? 4 : 8);

              return (
                <div
                  key={dish.id}
                  ref={(node) => {
                    plateRefs.current[i] = node;
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Sélectionner ${dish.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hasMovedRef.current) return;
                    if (isCenter) {
                      openPlateModal(dish, i);
                    } else {
                      goToDish(i);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (isCenter) openPlateModal(dish, i);
                      else goToDish(i);
                    }
                  }}
                  className="group absolute cursor-pointer will-change-transform transform-gpu select-none transition-all duration-500 ease-out w-[125px] sm:w-[170px] lg:w-[190px] aspect-square flex items-center justify-center"
                  style={{
                    transform: `translate3d(${x}px, ${liftY}px, 0) scale(${scale})`,
                    zIndex,
                    opacity,
                    visibility: liftedIndex === i ? "hidden" : "visible",
                  }}
                >
                  {/* Contact Ambient Occlusion Shadow */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-2 bottom-[-10%] top-[30%] rounded-[50%] bg-black/85 transition-opacity duration-300 ${
                      isCenter ? "blur-md opacity-100" : "blur-sm opacity-60"
                    }`}
                  />

                  {/* Charger Plate / Sous-plat d'orfèvrerie */}
                  <div
                    className={`pointer-events-none absolute -inset-[5%] rounded-full p-[3px] shadow-2xl transition-all duration-300 ${
                      isCenter ? "group-hover:scale-105 shadow-[0_18px_35px_rgba(0,0,0,0.95)]" : "shadow-md"
                    }`}
                    style={{
                      background:
                        "radial-gradient(circle at 45% 35%, #ebdca9 0%, #cab67f 40%, #876d33 75%, #4f3b15 100%)",
                      boxShadow: isCenter
                        ? "0 18px 36px rgba(0, 0, 0, 0.85), inset 0 2px 5px rgba(255, 255, 255, 0.6)"
                        : "0 8px 18px rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    <div className="size-full rounded-full border border-white/40" />
                  </div>

                  {/* High-Resolution Dish Image */}
                  <img
                    src={dish.image}
                    alt={dish.name}
                    draggable={false}
                    className="pointer-events-none relative z-10 size-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] select-none transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevDish();
            }}
            aria-label="Plat précédent"
            className="absolute left-1.5 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex size-8 sm:size-11 items-center justify-center rounded-full border border-[#cab67f]/40 bg-[#220010]/85 text-[#ebdca9] shadow-xl backdrop-blur-md transition-all hover:bg-[#cab67f] hover:text-[#20000e] active:scale-90"
          >
            <ChevronLeft className="size-4 sm:size-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextDish();
            }}
            aria-label="Plat suivant"
            className="absolute right-1.5 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex size-8 sm:size-11 items-center justify-center rounded-full border border-[#cab67f]/40 bg-[#220010]/85 text-[#ebdca9] shadow-xl backdrop-blur-md transition-all hover:bg-[#cab67f] hover:text-[#20000e] active:scale-90"
          >
            <ChevronRight className="size-4 sm:size-5" />
          </button>
        </div>

        {/* ACTIVE DISH DETAIL CARD & ACTIONS - OUTSIDE the table */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3.5 text-center px-4 max-w-2xl mx-auto">
          {/* Formula Tier Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-[#250012]/95 px-4 py-1.5 backdrop-blur-md shadow-md">
            <span className="size-1.5 rounded-full bg-gold-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-300">
              {activeItem.price}
            </span>
            <span className="text-gold-500/60">·</span>
            <span className="font-mono text-xs text-amber-100/70">
              {activeIndex + 1} / {items.length}
            </span>
          </div>

          {/* Dish Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-amber-100 tracking-tight leading-snug">
            {activeItem.name}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed max-w-xl">
            {activeItem.description}
          </p>

          {/* Interactive Navigation Dots */}
          <div className="flex items-center gap-2 mt-1">
            {items.map((dish, idx) => (
              <button
                key={dish.id}
                type="button"
                onClick={() => goToDish(idx)}
                aria-label={`Afficher ${dish.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-8 bg-gradient-to-r from-[#ebdca9] via-[#cab67f] to-[#b39855] shadow-[0_0_8px_rgba(235,220,169,0.7)]"
                    : "w-2 bg-[#cab67f]/30 hover:bg-[#cab67f]/60"
                }`}
              />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2 w-full">
            <button
              type="button"
              onClick={() => openPlateModal(activeItem, activeIndex)}
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-[#300016]/90 px-5 py-2.5 text-xs sm:text-sm font-semibold text-amber-100 shadow-md backdrop-blur-md transition-all hover:bg-gold-400 hover:text-[#20000e] active:scale-95"
            >
              <Sparkles className="size-4 text-gold-400 group-hover:text-[#20000e]" />
              <span>Voir les détails & Ingrédients</span>
            </button>

            {action}
          </div>
        </div>
      </div>

      {/* LUXURY FLIP DETAIL MODAL DIALOG */}
      {modalDish && mounted && (
        <GrandBuffetDialog
          dish={modalDish}
          index={openIndex ?? 0}
          total={items.length}
          source={getSourceRect}
          onLift={handleDialogLift}
          onClose={handleDialogClose}
          onAdd={(dish) => onAddDish?.(dish)}
        />
      )}
    </div>
  );
}

/**
 * GrandBuffetDialog
 * Implements the signature FLIP morph expansion animation:
 * On mount, the dish figure animates seamlessly from the plate's physical position
 * on the buffet table into the center dialog modal with a 3D arc trajectory.
 * On dismiss, it reverses smoothly back onto the table surface.
 */
function GrandBuffetDialog({
  dish,
  index,
  total,
  source,
  onLift,
  onClose,
  onAdd,
}: {
  dish: BuffetDish;
  index: number;
  total: number;
  source: () => DOMRect | null;
  onLift: (lifted: boolean) => void;
  onClose: () => void;
  onAdd: (dish: BuffetDish) => void;
}) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const figureRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const closing = React.useRef(false);
  const timer = React.useRef(0);
  const [shown, setShown] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  // FLIP Expansion animation on enter
  React.useLayoutEffect(() => {
    const figure = figureRef.current;
    const from = source();
    closeRef.current?.focus({ preventScroll: true });
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    onLift(true);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animation: Animation | null = null;

    if (figure && from && from.width > 0 && !prefersReduced) {
      const to = figure.getBoundingClientRect();
      const sx = from.width / to.width;
      const sy = from.height / to.height;
      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top + from.height / 2 - (to.top + to.height / 2);
      const rise = Math.min(130, Math.abs(dy) * 0.35 + 40);

      animation = figure.animate(
        [
          { transform: `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})` },
          {
            transform: `translate3d(${dx * 0.45}px, ${dy * 0.45 - rise}px, 0) scale(${((sx + 1) / 2) * 1.06}, ${((sy + 1) / 2) * 1.06}) rotate(${dx > 0 ? -5 : 5}deg)`,
            offset: 0.5,
          },
          { transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)" },
        ],
        { duration: 650, easing: "cubic-bezier(.22,.85,.3,1)", fill: "both" }
      );
    }

    const raf = requestAnimationFrame(() => setShown(true));
    return () => {
      cancelAnimationFrame(raf);
      animation?.cancel();
      window.clearTimeout(timer.current);
      document.body.style.overflow = overflow;
      onLift(false);
    };
  }, [source, onLift]);

  // Reverse FLIP animation on dismiss
  const dismiss = React.useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setShown(false);

    const figure = figureRef.current;
    const to = source();
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!figure || !to || to.width === 0 || prefersReduced) {
      onClose();
      return;
    }

    const from = figure.getBoundingClientRect();
    const sx = to.width / from.width;
    const sy = to.height / from.height;
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    const animation = figure.animate(
      [
        { transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)" },
        {
          transform: `translate3d(${dx * 0.55}px, ${dy * 0.55 - 32}px, 0) scale(${(sx + 1) / 2}, ${(sy + 1) / 2})`,
          offset: 0.55,
        },
        { transform: `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})` },
      ],
      { duration: 520, easing: "cubic-bezier(.45,0,.55,1)", fill: "forwards" }
    );

    animation.onfinish = () => {
      onClose();
    };
  }, [source, onClose]);

  const handleAdd = () => {
    if (added || closing.current) return;
    setAdded(true);
    onAdd(dish);
    timer.current = window.setTimeout(dismiss, 800);
  };

  // Keyboard accessibility
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dismiss]);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center overflow-y-auto p-4 sm:p-8 text-white select-none"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
        onClick={dismiss}
      />

      {/* Screen-level Floating Close Button */}
      <button
        ref={closeRef}
        type="button"
        onClick={dismiss}
        aria-label="Fermer"
        className={`fixed right-4 top-4 sm:right-6 sm:top-6 z-[120] flex size-11 items-center justify-center rounded-full border border-[#cab67f]/50 bg-[#2b0013]/95 text-[#ebdca9] shadow-2xl backdrop-blur-md transition-all hover:bg-[#cab67f] hover:text-[#20000e] active:scale-90 ${
          shown ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <X className="size-5" />
      </button>

      {/* Modal Card */}
      <div className="relative my-auto grid w-full max-w-[50rem] items-center gap-6 p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] sm:gap-10 sm:p-8">
        {/* Card Background Plate */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 rounded-[2rem] border border-[#cab67f]/35 bg-[#220010] shadow-[0_30px_90px_rgba(0,0,0,0.95)] transition-all duration-300 ${
            shown ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        />

        {/* Animated Dish Presentation Figure (Morphing target) */}
        <div
          ref={figureRef}
          className="relative z-10 mx-auto aspect-square w-full max-w-[min(26vh,13rem)] sm:max-w-[min(40vh,20rem)] flex items-center justify-center will-change-transform transform-gpu"
        >
          {/* Contact Shadow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-2 bottom-[-6%] top-[20%] rounded-[50%] bg-black/80 blur-xl"
          />

          {/* Charger Plate / Sous-plat d'orfèvrerie */}
          <div
            className="pointer-events-none absolute -inset-[4%] rounded-full p-[3px] shadow-2xl"
            style={{
              background:
                "radial-gradient(circle at 45% 35%, #ebdca9 0%, #cab67f 40%, #876d33 75%, #4f3b15 100%)",
            }}
          >
            <div className="size-full rounded-full border border-white/40" />
          </div>

          {/* High-Resolution Dish Image */}
          <img
            src={dish.image}
            alt={dish.name}
            draggable={false}
            className="relative z-10 size-full object-contain drop-shadow-xl select-none"
          />
        </div>

        {/* Dish Details */}
        <div
          className={`relative z-10 flex flex-col gap-3 text-center sm:text-left transition-all delay-100 duration-400 ${
            shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold tracking-wider text-gold-400 uppercase">
            <span>Prestation Gastronomique</span>
            <span className="text-gold-500/60">·</span>
            <span className="text-amber-100/70 font-mono text-[11px]">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <h3 className="font-serif text-2xl font-normal tracking-tight text-amber-100 sm:text-3xl leading-snug">
            {dish.name}
          </h3>

          <p className="text-sm leading-relaxed text-amber-100/80">
            {dish.description}
          </p>

          {dish.details && dish.details.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-2 sm:justify-start my-1">
              {dish.details.map((detail) => (
                <li
                  key={detail}
                  className="rounded-full border border-[#cab67f]/25 bg-[#300016]/80 px-3 py-1 text-xs text-amber-100/90 shadow-sm"
                >
                  {detail}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <p className="text-xl sm:text-2xl font-serif font-semibold tracking-tight text-gold-300">
              {dish.price}
            </p>

            <div className="flex w-full sm:w-auto items-center justify-center gap-2 mt-1">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ebdca9] via-[#cab67f] to-[#b39855] px-6 py-2.5 text-sm font-semibold text-[#20000e] shadow-lg shadow-gold-500/20 outline-none transition-all hover:brightness-110 active:scale-95"
              >
                {added ? (
                  <>
                    <Check className="size-4" />
                    <span>Ajouté avec succès</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    <span>Ajouter à ma sélection</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={dismiss}
                className="inline-flex items-center justify-center rounded-full border border-[#cab67f]/30 bg-[#350018]/80 px-5 py-2.5 text-sm font-medium text-amber-200 transition-all hover:bg-[#cab67f]/20 hover:text-white active:scale-95"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
