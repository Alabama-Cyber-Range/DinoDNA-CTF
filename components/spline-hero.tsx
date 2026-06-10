"use client";

import { useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import { FlaskConical, Scan, Sparkles } from "lucide-react";

/* ====================================================================
   SPLINE MODEL CONFIG
   --------------------------------------------------------------------
   Published runtime scene (Liquid Dino specimen vial + skull hologram).
   To swap the model, open your scene in Spline → Export → "Code"/"Web"
   and paste the new .splinecode URL below.

   Leave blank to show the scan-ring loader permanently.
   ==================================================================== */
const SPLINE_SCENE_URL =
  "https://prod.spline.design/kZUSz9Tlafsl6Bnf/scene.splinecode";

/**
 * Minimal holographic loader — scan rings + "Loading..." while Spline streams in.
 */
function SpecimenLoader() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {/* Scan rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[72%] w-[72%] rounded-full border border-primary/20 animate-pulse" />
        <div
          className="absolute h-[58%] w-[58%] rounded-full border border-dashed border-accent/25 animate-spin"
          style={{ animationDuration: "12s" }}
        />
      </div>

      <p className="relative z-10 text-sm font-medium text-primary/70 tracking-wide">
        Loading...
      </p>
    </div>
  );
}

export function SplineHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const hasModel = SPLINE_SCENE_URL.trim().length > 0;
  const showModel = hasModel && inView && !errored;
  const showLoader = !loaded || errored;

  // Lazy-load: only mount the heavy 3D model once the hero nears the viewport.
  useEffect(() => {
    if (!hasModel) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasModel]);

  return (
    <div
      ref={containerRef}
      className="hologram scanline glow-ring aspect-square w-full max-w-[520px] mx-auto lg:mx-0 p-4 sm:p-6"
    >
      <CornerBrackets />
      {/* Floating lab badges — match the Liquid Dino vial model */}
      <div className="absolute top-4 right-4 z-20 animate-float-slow">
        <div className="glass-panel rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-medium text-[rgb(15_42_56)]">
          <FlaskConical className="h-4 w-4 text-primary" />
          Liquid Dino vial
        </div>
      </div>
      <div className="absolute bottom-5 left-4 z-20 animate-float">
        <div className="glass-panel rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-medium text-[rgb(15_42_56)]">
          <Sparkles className="h-4 w-4 text-accent" />
          Specimen #TR-001
        </div>
      </div>

      {/* Visual content */}
      <div className="relative z-10 h-full w-full rounded-2xl overflow-hidden bg-white/30">
        {/* Skeleton/vial loader — visible until the 3D model is ready */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            showLoader ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <SpecimenLoader />
        </div>

        {showModel && (
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <Spline
              scene={SPLINE_SCENE_URL}
              onLoad={() => setLoaded(true)}
              onError={() => setErrored(true)}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
      </div>

      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-2/3 hologram-base rounded-full" />
    </div>
  );
}

/** Decorative corner brackets for the hologram viewport. */
function CornerBrackets() {
  const base = "absolute h-6 w-6 border-primary/40 pointer-events-none z-20";
  return (
    <>
      <span
        className={`${base} top-2 left-2 border-t-2 border-l-2 rounded-tl-lg`}
      />
      <span
        className={`${base} top-2 right-2 border-t-2 border-r-2 rounded-tr-lg`}
      />
      <span
        className={`${base} bottom-2 left-2 border-b-2 border-l-2 rounded-bl-lg`}
      />
      <span
        className={`${base} bottom-2 right-2 border-b-2 border-r-2 rounded-br-lg`}
      />
    </>
  );
}
