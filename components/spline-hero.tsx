"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import { useFlags } from "@/lib/flag-context";
import { FlaskConical, Scan, Sparkles, CheckCircle2 } from "lucide-react";

/* ====================================================================
   SPLINE MODEL CONFIG
   ==================================================================== */
const SPLINE_SCENE_URL =
  "https://prod.spline.design/kZUSz9Tlafsl6Bnf/scene.splinecode";

/** Hidden flag revealed by inspecting / clicking the 3D vial scene */
const VIAL_HIDDEN_FLAG = "DINO{under_vial}";

/**
 * Spline object names that trigger the hidden flag (match your scene object).
 * In Spline, name the clickable/hidden object "under_vial" or similar.
 */
const VIAL_TRIGGER_NAMES = ["under_vial", "under vial", "undervial"];

function matchesVialTrigger(objectName: string | undefined) {
  if (!objectName) return false;
  const normalized = objectName.toLowerCase().replace(/[\s_-]+/g, "");
  return (
    normalized.includes("undervial") ||
    VIAL_TRIGGER_NAMES.some(
      (n) => objectName.toLowerCase() === n.toLowerCase(),
    )
  );
}

function SpecimenLoader() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
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
  const { addFlag, checkFlag } = useFlags();
  const containerRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<Application | null>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [showDiscovery, setShowDiscovery] = useState(false);

  const vialFlagFound = checkFlag(VIAL_HIDDEN_FLAG);

  const hasModel = SPLINE_SCENE_URL.trim().length > 0;
  const showModel = hasModel && inView && !errored;
  const showLoader = !loaded || errored;

  const handleSplineLoad = useCallback(
    (spline: Application) => {
      splineRef.current = spline;
      setLoaded(true);

      spline.addEventListener("mouseDown", (event) => {
        const targetName = event.target?.name;
        if (!matchesVialTrigger(targetName)) return;

        if (addFlag(VIAL_HIDDEN_FLAG)) {
          setShowDiscovery(true);
          setTimeout(() => setShowDiscovery(false), 8000);
        }
      });
    },
    [addFlag],
  );

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

      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-[11px] font-semibold text-primary border border-primary/20">
        <Scan className="h-3.5 w-3.5" />
        LIVE HOLOGRAM
        <span className="ml-1 inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

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

      {/* Hidden fragment discovery toast */}
      {(showDiscovery || vialFlagFound) && (
        <div className="absolute bottom-16 left-1/2 z-30 w-[90%] max-w-xs -translate-x-1/2 animate-fragment-pop">
          <div className="glass-panel rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-center shadow-lg">
            <CheckCircle2 className="h-5 w-5 text-accent mx-auto mb-1" />
            <p className="text-xs font-semibold text-foreground">
              Classified fragment found!
            </p>
            <code className="text-xs font-mono text-primary mt-1 block">
              {VIAL_HIDDEN_FLAG}
            </code>
            <p className="text-[10px] text-muted-foreground mt-1">
              Submit at Security Audit
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 h-full w-full rounded-2xl overflow-hidden bg-white/30">
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
              onLoad={handleSplineLoad}
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
