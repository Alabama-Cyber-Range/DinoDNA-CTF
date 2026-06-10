"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react'

// Core challenge — 12 DNA fragments (progress bar + Genesis Vault)
export const ALL_FLAGS = [
  'DINO{inspect_the_lab}',
  'DINO{weak_passwords_stink}',
  'DINO{hidden_pages_are_not_security}',
  'DINO{dna_is_data}',
  'DINO{encoding_is_not_encryption}',
  'DINO{check_the_source}',
  'DINO{url_clues_matter}',
  'DINO{alt_text_discovery}',
  'DINO{cookie_clue_found}',
  'DINO{hashes_are_fingerprints}',
  'DINO{access_control_required}',
  'DINO{lab_secured}',
]

// Bonus / classified fragments — not required for vault or main progress
export const HIDDEN_FLAGS = ['DINO{under_vial}']

export const VALID_FLAGS = [...ALL_FLAGS, ...HIDDEN_FLAGS]

export function isMainFlag(flag: string) {
  return ALL_FLAGS.includes(flag.trim())
}

export function isHiddenFlag(flag: string) {
  return HIDDEN_FLAGS.includes(flag.trim())
}

interface FlagContextType {
  foundFlags: string[]
  foundMainFlags: string[]
  foundHiddenFlags: string[]
  mainFlagCount: number
  hiddenFlagCount: number
  addFlag: (flag: string) => boolean
  checkFlag: (flag: string) => boolean
  isValidFlag: (flag: string) => boolean
  /** Progress toward the 12-fragment challenge (hidden flags excluded) */
  progress: number
}

const FlagContext = createContext<FlagContextType | null>(null)

export function FlagProvider({ children }: { children: ReactNode }) {
  const [foundFlags, setFoundFlags] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('dinodna_flags')
    if (saved) {
      try {
        setFoundFlags(JSON.parse(saved))
      } catch {
        setFoundFlags([])
      }
    }

    document.cookie = "lab_access=restricted; path=/"
    document.cookie = "secret_specimen=DINO{cookie_clue_found}; path=/"
  }, [])

  useEffect(() => {
    localStorage.setItem('dinodna_flags', JSON.stringify(foundFlags))
  }, [foundFlags])

  const foundMainFlags = useMemo(
    () => foundFlags.filter((f) => isMainFlag(f)),
    [foundFlags],
  )

  const foundHiddenFlags = useMemo(
    () => foundFlags.filter((f) => isHiddenFlag(f)),
    [foundFlags],
  )

  const progress = Math.round((foundMainFlags.length / ALL_FLAGS.length) * 100)

  const isValidFlag = (flag: string): boolean => {
    return VALID_FLAGS.includes(flag.trim())
  }

  const checkFlag = (flag: string): boolean => {
    return foundFlags.includes(flag.trim())
  }

  const addFlag = (flag: string): boolean => {
    const trimmed = flag.trim()
    if (isValidFlag(trimmed) && !foundFlags.includes(trimmed)) {
      setFoundFlags((prev) => [...prev, trimmed])
      return true
    }
    return false
  }

  return (
    <FlagContext.Provider
      value={{
        foundFlags,
        foundMainFlags,
        foundHiddenFlags,
        mainFlagCount: foundMainFlags.length,
        hiddenFlagCount: foundHiddenFlags.length,
        addFlag,
        checkFlag,
        isValidFlag,
        progress,
      }}
    >
      {children}
    </FlagContext.Provider>
  )
}

export function useFlags() {
  const context = useContext(FlagContext)
  if (!context) {
    throw new Error('useFlags must be used within a FlagProvider')
  }
  return context
}
