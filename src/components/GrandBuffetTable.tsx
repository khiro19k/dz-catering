"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Sparkles, Check, X, UtensilsCrossed } from "lucide-react";

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

export default function GrandBuffetTable({
  items,
  eyebrow = "DZ CATERING · HAUTE GASTRONOMIE",
  heading = "Vous pouvez demander une dégustation de nos meilleurs plats",
  onAddDish,
  action,
}: GrandBuffetTableProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const orbitRef = React.useRef<HTMLDivElement>(null);
  const plateRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Animation state (kept in refs to avoid React state re-rendering lag during 60/120fps loop)
  const animRef = React.useRef({
    angle: 0,
    velocity: 0.0035, // default gentle cruise speed
    isDragging: false,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    isHovered: false,
    hoveredIndex: null as number | null,
    activeModalIndex: null as number | null,
  });

  const [mounted, setMounted] = React.useState(false);
  const [activeDish, setActiveDish] = React.useState<BuffetDish | null>(null);
  const [modalDish, setModalDish] = React.useState<BuffetDish | null>(null);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [liftedIndex, setLiftedIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 60/120 FPS requestAnimationFrame Loop with 3D depth perspective
  React.useEffect(() => {
    let rafId: number;

    const tick = () => {
      const anim = animRef.current;
      const container = orbitRef.current;

      if (container && plateRefs.current.length === items.length) {
        // Only advance angle if not dragging and not hovered and no modal open
        if (!anim.isDragging) {
          if (!anim.isHovered && anim.activeModalIndex === null) {
            anim.angle += anim.velocity;
          }
        }

        const rect = container.getBoundingClientRect();
        const isMobile = rect.width < 600;
        // Radii for oval table surface with mobile breathing room
        const rx = rect.width * (isMobile ? 0.35 : 0.38);
        const ry = rect.height * (isMobile ? 0.31 : 0.36);
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        let closestToFrontIdx = 0;
        let maxDepth = -Infinity;

        items.forEach((dish, i) => {
          const plate = plateRefs.current[i];
          if (!plate) return;

          const dishAngle = anim.angle + (i * (Math.PI * 2 / items.length));
          const cos = Math.cos(dishAngle);
          const sin = Math.sin(dishAngle);

          const x = cx + cos * rx;
          const y = cy + sin * ry;

          // Depth: 0 (furthest back) to 1 (closest front)
          const depth = (sin + 1) / 2;
          if (depth > maxDepth) {
            maxDepth = depth;
            closestToFrontIdx = i;
          }

          // Scale: tuned on mobile (0.78 to 0.98) to prevent dish collisions
          const isHovered = anim.hoveredIndex === i;
          const scaleMultiplier = isMobile ? 0.20 : 0.38;
          const baseScale = isMobile ? (0.78 + depth * scaleMultiplier) : (0.76 + depth * scaleMultiplier);
          const scale = isHovered ? baseScale * 1.08 : baseScale;
          const zIndex = isHovered ? 500 : Math.round(depth * 100);
          const opacity = 0.72 + (depth * 0.28);
          const liftY = isHovered ? (isMobile ? -6 : -12) : 0;

          const nodeWidth = plate.offsetWidth || (isMobile ? 75 : 110);
          plate.style.transform = `translate3d(${x - nodeWidth / 2}px, ${y - nodeWidth / 2 + liftY}px, 0) scale(${scale})`;
          plate.style.zIndex = String(zIndex);
          plate.style.opacity = String(opacity);
        });

        // Set active dish in caption if not hovered
        if (anim.hoveredIndex === null && items[closestToFrontIdx]) {
          setActiveDish((prev) => (prev?.id === items[closestToFrontIdx].id ? prev : items[closestToFrontIdx]));
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [items]);

  // Pointer / Drag interactions for table rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    const anim = animRef.current;
    anim.isDragging = true;
    anim.startX = e.clientX;
    anim.lastX = e.clientX;
    anim.lastTime = performance.now();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const anim = animRef.current;
    if (!anim.isDragging) return;

    const dx = e.clientX - anim.lastX;
    const now = performance.now();

    // Update angle based on drag delta
    anim.angle += (dx / 350);
    anim.lastX = e.clientX;
    anim.lastTime = now;
  };

  const handlePointerUp = () => {
    const anim = animRef.current;
    anim.isDragging = false;
  };

  // Open plate modal and initiate FLIP animation
  const openPlateModal = (dish: BuffetDish, index: number) => {
    animRef.current.activeModalIndex = index;
    setOpenIndex(index);
    setModalDish(dish);
  };

  const handleDialogClose = React.useCallback(() => {
    animRef.current.activeModalIndex = null;
    setModalDish(null);
    setOpenIndex(null);
    setLiftedIndex(null);
  }, []);

  const handleDialogLift = React.useCallback((isLifted: boolean) => {
    setLiftedIndex(isLifted ? animRef.current.activeModalIndex : null);
  }, []);

  const getSourceRect = React.useCallback(() => {
    const idx = animRef.current.activeModalIndex;
    if (idx === null) return null;
    const node = plateRefs.current[idx];
    return node ? node.getBoundingClientRect() : null;
  }, []);

  return (
    <div className="relative w-full">
      {/* Section Header */}
      <div className="mb-8 text-center px-4">
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

      {/* The Grand Royal Banquet Table (Continuous Velvet Surface) */}
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-5xl aspect-[4/3] sm:aspect-[16/9] min-h-[290px] sm:min-h-[460px] max-h-[580px] p-2 sm:p-6 flex items-center justify-center select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Ambient Top Chandelier Lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-80 sm:w-[32rem] h-64 bg-gold-400/15 rounded-full blur-[90px]"
        />

        {/* Outer Banquet Table Shadow & Edge */}
        <div
          className="relative w-full h-full rounded-[50%] flex items-center justify-center transition-all duration-300"
          style={{
            background: "radial-gradient(ellipse 75% 60% at 50% 45%, #3d081e 0%, #240011 48%, #140009 85%, #0d0006 100%)",
            boxShadow: "inset 0 0 60px rgba(0, 0, 0, 0.85), inset 0 2px 4px rgba(235, 220, 169, 0.4), 0 35px 80px rgba(0, 0, 0, 0.95)",
            border: "4px solid #cab67f",
          }}
        >
          {/* Ornate Table Rim Details */}
          <div className="pointer-events-none absolute inset-[3px] rounded-[50%] border border-[#ebdca9]/50" />
          <div className="pointer-events-none absolute inset-[7px] rounded-[50%] border border-[#876d33]/60" />
          <div className="pointer-events-none absolute inset-[12px] rounded-[50%] border border-[#2b0013]/90" />

          {/* Tablecloth Velvet Weave Soft Lighting Accent */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[50%] opacity-40 mix-blend-soft-light"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(202, 182, 127, 0.3) 0%, transparent 65%)",
            }}
          />

          {/* ROYAL CENTERPIECE (سنتربيس ملكي في قلب المائدة) */}
          <div
            className="relative z-10 w-[29%] sm:w-[38%] h-[27%] sm:h-[36%] rounded-[50%] flex items-center justify-center p-2 sm:p-3 text-center pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 40%, #3e0420 0%, #20000e 65%, #120008 100%)",
              border: "2px solid rgba(202, 182, 127, 0.65)",
              boxShadow: "0 15px 45px rgba(0, 0, 0, 0.9), inset 0 2px 5px rgba(235, 220, 169, 0.3)",
            }}
          >
            {/* Mirror Inlay Effect */}
            <div className="absolute inset-1.5 sm:inset-2 rounded-[50%] border border-[#cab67f]/30 bg-gradient-to-tr from-[#1f000e] via-[#480827]/70 to-[#1b000c] opacity-95" />

            {/* Candlelight Ambience Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(235,220,169,0.3),transparent_70%)]" />

            {/* Floral / Crest Center Visual */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="mb-0.5 sm:mb-1 flex size-7 sm:size-11 items-center justify-center rounded-full border border-gold-400/50 bg-[#350018]/90 shadow-md">
                <UtensilsCrossed className="size-3.5 sm:size-5 text-gold-300" />
              </div>
              <span className="font-serif text-[9px] sm:text-xs font-semibold tracking-[0.22em] sm:tracking-[0.26em] text-amber-100 uppercase">
                DZ CATERING
              </span>
              <span className="text-[7px] sm:text-[9px] tracking-widest text-gold-400/80 uppercase mt-0.5 hidden xs:block">
                Scénographie
              </span>
            </div>
          </div>

          {/* ORBITING PLATES (أطباق تدور فوق صحون تقديم مذهبة مع ظلال حقيقية) */}
          <div ref={orbitRef} className="absolute inset-0 pointer-events-none">
            {items.map((dish, i) => (
              <div
                key={dish.id}
                ref={(node) => {
                  plateRefs.current[i] = node;
                }}
                role="button"
                tabIndex={0}
                aria-label={`Voir les détails de ${dish.name}`}
                className="absolute pointer-events-auto cursor-pointer will-change-transform transform-gpu select-none transition-shadow duration-300 w-[21%] sm:w-[25%] max-w-[85px] sm:max-w-[185px] aspect-square"
                style={{
                  transformOrigin: "center center",
                  visibility: liftedIndex === i ? "hidden" : "visible",
                }}
                onMouseEnter={() => {
                  animRef.current.isHovered = true;
                  animRef.current.hoveredIndex = i;
                  setActiveDish(dish);
                }}
                onMouseLeave={() => {
                  animRef.current.isHovered = false;
                  animRef.current.hoveredIndex = null;
                }}
                onClick={() => openPlateModal(dish, i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openPlateModal(dish, i);
                  }
                }}
              >
                {/* Contact Ambient Occlusion Shadow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-2 bottom-[-10%] top-[30%] rounded-[50%] bg-black/85 blur-md"
                />

                {/* Charger Plate / Sous-plat d'orfèvrerie */}
                <div
                  className="pointer-events-none absolute -inset-[5%] rounded-full p-[3px] shadow-2xl transition-transform duration-300"
                  style={{
                    background: "radial-gradient(circle at 45% 35%, #ebdca9 0%, #cab67f 40%, #876d33 75%, #4f3b15 100%)",
                    boxShadow: "0 14px 30px rgba(0, 0, 0, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.6), inset 0 -2px 4px rgba(0, 0, 0, 0.7)",
                  }}
                >
                  <div className="size-full rounded-full border border-white/40" />
                </div>

                {/* High-Resolution Dish Image */}
                <img
                  src={dish.image}
                  alt={dish.name}
                  draggable={false}
                  className="relative z-10 size-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] select-none"
                />

                {/* Floating Plate Name Chip on Hover (Desktop) */}
                <div
                  className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold-500/40 bg-[#220010]/95 px-3 py-1 text-[10px] font-medium text-amber-100 shadow-xl opacity-0 transition-opacity duration-300 sm:block hidden"
                >
                  <span>{dish.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Ambient Caption & Action - OUTSIDE the table container so plates NEVER collide */}
      <div className="mt-6 sm:mt-10 flex flex-col items-center gap-4 text-center px-4">
        {activeDish && (
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-[#250012]/95 px-4 py-1.5 backdrop-blur-md shadow-lg max-w-[92vw] overflow-hidden">
            <span className="size-1.5 shrink-0 rounded-full bg-gold-400" />
            <span className="font-serif text-xs sm:text-sm font-medium text-amber-100 truncate">
              {activeDish.name}
            </span>
            <span className="text-xs text-gold-400 font-semibold shrink-0">· {activeDish.price}</span>
          </div>
        )}

        {action && <div className="mt-1 w-full sm:w-auto flex justify-center">{action}</div>}
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
 * on the revolving table into the center dialog modal with a 3D arc trajectory.
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
              background: "radial-gradient(circle at 45% 35%, #ebdca9 0%, #cab67f 40%, #876d33 75%, #4f3b15 100%)",
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
                className="sm:hidden inline-flex items-center justify-center rounded-full border border-[#cab67f]/30 bg-[#350018]/80 px-4 py-2.5 text-sm font-medium text-amber-200 transition-colors hover:bg-[#cab67f]/20"
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
