"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// All 12 flags for the challenge
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

interface FlagContextType {
  foundFlags: string[]
  addFlag: (flag: string) => boolean
  checkFlag: (flag: string) => boolean
  isValidFlag: (flag: string) => boolean
  progress: number
}

const FlagContext = createContext<FlagContextType | null>(null)

export function FlagProvider({ children }: { children: ReactNode }) {
  const [foundFlags, setFoundFlags] = useState<string[]>([])

  useEffect(() => {
    // Load saved flags from localStorage on mount
    const saved = localStorage.getItem('dinodna_flags')
    if (saved) {
      try {
        setFoundFlags(JSON.parse(saved))
      } catch {
        setFoundFlags([])
      }
    }
    
    // Easter egg: Set a cookie clue
    document.cookie = "lab_access=restricted; path=/"
    document.cookie = "secret_specimen=DINO{cookie_clue_found}; path=/"
  }, [])

  useEffect(() => {
    // Save flags to localStorage whenever they change
    localStorage.setItem('dinodna_flags', JSON.stringify(foundFlags))
  }, [foundFlags])

  const isValidFlag = (flag: string): boolean => {
    return ALL_FLAGS.includes(flag.trim())
  }

  const checkFlag = (flag: string): boolean => {
    return foundFlags.includes(flag.trim())
  }

  const addFlag = (flag: string): boolean => {
    const trimmed = flag.trim()
    if (isValidFlag(trimmed) && !foundFlags.includes(trimmed)) {
      setFoundFlags(prev => [...prev, trimmed])
      return true
    }
    return false
  }

  const progress = Math.round((foundFlags.length / ALL_FLAGS.length) * 100)

  return (
    <FlagContext.Provider value={{ foundFlags, addFlag, checkFlag, isValidFlag, progress }}>
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
