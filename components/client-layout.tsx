"use client"

import { FlagProvider } from '@/lib/flag-context'
import { Navigation } from '@/components/navigation'
import { DNABackground } from '@/components/dna-background'
import { LabAtmosphere } from '@/components/lab-atmosphere'
import { ReactNode } from 'react'

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <FlagProvider>
      <div className="min-h-screen relative">
        {/* Decorative atmosphere layers (grid + glow + particles, then DNA helices) */}
        <LabAtmosphere />
        <DNABackground />
        <div className="relative z-10">
          <Navigation />
          <main>{children}</main>
        </div>
      </div>
    </FlagProvider>
  )
}
