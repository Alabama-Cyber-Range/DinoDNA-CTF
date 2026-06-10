"use client";

import { useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import { Dna, Sparkles, Scan } from "lucide-react";

/* ====================================================================
   SPLINE MODEL CONFIG
   --------------------------------------------------------------------
   Published runtime scene (T-Rex skull hologram). To swap the model,
   open your scene in Spline → Export → "Code"/"Web" and paste the new
   .splinecode URL below.

   Source model:
     https://community.spline.design/file/14c9d423-2887-4acd-8ed5-0d4c328476e6

   Leave this blank to fall back to the animated holographic DNA helix.
   ==================================================================== */
const SPLINE_SCENE_URL =
  "https://prod.spline.design/kZUSz9Tlafsl6Bnf/scene.splinecode";

/**
 * Animated holographic DNA double-helix.
 * Pure SVG/CSS, no dependencies — shown while the Spline model streams in,
 * if loading fails, or if no scene URL is configured.
 */
function HolographicDNA() {
  // Round all derived coordinates so the server- and client-rendered SVG
  // strings match exactly (avoids React hydration mismatches from float noise).
  const r3 = (n: number) => Math.round(n * 1000) / 1000;
  const segments = 26;
  const rungs = Array.from({ length: segments }).map((_, i) => {
    const t = (i / segments) * Math.PI * 4;
    const x1 = r3(50 + Math.sin(t) * 34);
    const x2 = r3(50 + Math.sin(t + Math.PI) * 34);
    const y = r3((i / (segments - 1)) * 100);
    const front = Math.sin(t) >= 0;
    return { i, x1, x2, y, front };
  });

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div
        className="animate-dna-rotate"
        style={{ width: "62%", height: "82%", transformStyle: "preserve-3d" }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id="strandA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(16 185 129)" />
              <stop offset="100%" stopColor="rgb(56 189 248)" />
            </linearGradient>
            <linearGradient id="strandB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(20 184 166)" />
              <stop offset="100%" stopColor="rgb(94 234 212)" />
            </linearGradient>
          </defs>

          {rungs.map((r) => (
            <line
              key={`rung-${r.i}`}
              x1={r.x1}
              y1={r.y}
              x2={r.x2}
              y2={r.y}
              stroke="rgb(56 189 248)"
              strokeWidth={0.8}
              strokeOpacity={r.front ? 0.5 : 0.2}
            />
          ))}

          {rungs.map((r) => (
            <g key={`node-${r.i}`}>
              <circle
                cx={r.x1}
                cy={r.y}
                r={r.front ? 2.6 : 1.8}
                fill="url(#strandA)"
                opacity={r.front ? 1 : 0.55}
              />
              <circle
                cx={r.x2}
                cy={r.y}
                r={r.front ? 2.6 : 1.8}
                fill="url(#strandB)"
                opacity={r.front ? 1 : 0.55}
              />
            </g>
          ))}
        </svg>
      </div>
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
      {/* Corner brackets — "lab instrument viewport" look */}
      <CornerBrackets />
      {/* Floating lab badges */}
      <div className="absolute top-4 right-4 z-20 animate-float-slow">
        <div className="glass-panel rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-medium text-[rgb(15_42_56)]">
          <Dna className="h-4 w-4 text-primary" />
          T-Rex genome
        </div>
      </div>
      <div className="absolute bottom-5 left-4 z-20 animate-float">
        <div className="glass-panel rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-medium text-[rgb(15_42_56)]">
          <Sparkles className="h-4 w-4 text-accent" />
          Specimen #TR-001
        </div>
      </div>

      {/* Visual content */}
      <div className="relative z-10 h-full w-full rounded-2xl overflow-hidden">
        {/* Holographic DNA shows as the backdrop until the model is ready
            (and stays if loading errors out). */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            loaded && !errored ? "opacity-0" : "opacity-100"
          }`}
        >
          <HolographicDNA />
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

      {/* Glowing emitter base under the hologram */}
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
