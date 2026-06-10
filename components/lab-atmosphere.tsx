"use client"

import { useMemo } from 'react'

/**
 * LabAtmosphere
 * -------------
 * A lightweight, CSS-driven background layer that gives the whole site a
 * "futuristic research facility" feel: a faint lab grid, soft teal/cyan glow
 * blooms, and a few slow-drifting glowing particles.
 *
 * It is intentionally subtle so page text stays perfectly readable, and it is
 * purely decorative (pointer-events: none) so it never interferes with the
 * existing cybersecurity challenge interactions.
 */
export function LabAtmosphere() {
  // Pre-compute particle positions/timing once so they don't jump on re-render.
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: `${Math.round((i * 67 + 8) % 100)}%`,
        size: 4 + ((i * 3) % 5),
        duration: 9 + ((i * 2) % 8),
        delay: (i % 7) * 1.3,
        opacity: 0.4 + ((i % 4) * 0.12),
      })),
    []
  )

  return (
    <div className="lab-atmosphere" aria-hidden="true">
      {/* Futuristic measurement grid */}
      <div className="lab-grid" />

      {/* Slow glowing particles drifting upward */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="lab-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
