"use client"

import { useEffect, useMemo, useState } from 'react'
import { useFlags } from '@/lib/flag-context'
import { CheckCircle2, XCircle, Dna, RefreshCw } from 'lucide-react'

const specimenNames = [
  { id: 'A', name: 'Tyrannosaurus Rex' },
  { id: 'B', name: 'Velociraptor' },
  { id: 'C', name: 'Triceratops' },
  { id: 'D', name: 'Stegosaurus' },
]

type PuzzleSpecimen = {
  id: string
  name: string
  hash: string
}

async function sha256Hex(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  const bytes = new Uint8Array(digest)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function shortenHash(hash: string): string {
  return `${hash.slice(0, 12)}...${hash.slice(-10)}`
}

export function DNAHashPuzzle() {
  const { addFlag, checkFlag } = useFlags()
  const [specimens, setSpecimens] = useState<PuzzleSpecimen[]>([])
  const [shuffledHashes, setShuffledHashes] = useState<string[]>([])
  const [isLoadingPuzzle, setIsLoadingPuzzle] = useState(true)

  const [playgroundInput, setPlaygroundInput] = useState('')
  const [playgroundHash, setPlaygroundHash] = useState('')
  const [isHashing, setIsHashing] = useState(false)

  const [matches, setMatches] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [justUnlocked, setJustUnlocked] = useState(false)

  useEffect(() => {
    let active = true

    const buildPuzzle = async () => {
      const computed = await Promise.all(
        specimenNames.map(async (specimen) => ({
          ...specimen,
          hash: await sha256Hex(specimen.name),
        }))
      )

      if (!active) {
        return
      }

      setSpecimens(computed)
      setShuffledHashes(
        computed
          .map((s) => s.hash)
          .sort(() => Math.random() - 0.5)
      )
      setIsLoadingPuzzle(false)
    }

    buildPuzzle()

    return () => {
      active = false
    }
  }, [])

  const exampleNames = useMemo(() => specimenNames.map((s) => s.name), [])
  const flagFound = checkFlag('DINO{hashes_are_fingerprints}')

  useEffect(() => {
    if (isLoadingPuzzle || submitted || specimens.length === 0) {
      return
    }

    if (Object.keys(matches).length !== specimens.length) {
      return
    }

    const allCorrect = specimens.every((s) => matches[s.id] === s.hash)
    if (!allCorrect) {
      return
    }

    const hadFlagAlready = checkFlag('DINO{hashes_are_fingerprints}')
    setIsCorrect(true)
    setSubmitted(true)

    if (!hadFlagAlready) {
      addFlag('DINO{hashes_are_fingerprints}')
      setJustUnlocked(true)
    }
  }, [
    matches,
    specimens,
    isLoadingPuzzle,
    submitted,
    addFlag,
    checkFlag,
  ])

  const handleMatch = (specimenId: string, hash: string) => {
    setMatches(prev => ({ ...prev, [specimenId]: hash }))
  }

  const handleHashText = async () => {
    setIsHashing(true)
    try {
      const result = await sha256Hex(playgroundInput)
      setPlaygroundHash(result)
    } finally {
      setIsHashing(false)
    }
  }

  const handleSubmit = () => {
    // Check if all matches are correct
    const allCorrect = specimens.every(s => matches[s.id] === s.hash)
    setIsCorrect(allCorrect)
    setSubmitted(true)

    if (allCorrect) {
      addFlag('DINO{hashes_are_fingerprints}')
    }
  }

  const handleReset = () => {
    setMatches({})
    setSubmitted(false)
    setIsCorrect(false)
    setJustUnlocked(false)
  }

  if (flagFound) {
    return (
      <div className="bg-primary/10 rounded-xl p-6 border border-primary/30">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          <h3 className="font-semibold text-primary">
            {justUnlocked ? 'Flag Unlocked!' : 'Already Unlocked'}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {justUnlocked
            ? 'Perfect match. Credit was added automatically for this challenge.'
            : 'You already completed this puzzle. Credit is already on your Security Audit progress.'}
        </p>
        <code className="text-sm font-mono text-primary">
          DINO&#123;hashes_are_fingerprints&#125;
        </code>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-2">🧬 DNA Fingerprint Matching</h3>
      </div>

      {/* Single learning section */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
        <h4 className="font-medium text-foreground mb-2">How Hashing Works</h4>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>SHA-256 returns the same hash for the exact same input every time.</li>
          <li>Changing one character (or one space) creates a very different hash.</li>
          <li>Use the playground to hash dinosaur names, then match the fingerprints below.</li>
        </ul>
      </div>

      {/* Hash Playground */}
      <div className="glass-card rounded-xl p-4 border border-accent/30 bg-accent/5 space-y-3">
        <h4 className="font-medium text-foreground">Hash Playground (Real SHA-256)</h4>

        <div className="flex flex-wrap gap-2">
          {exampleNames.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setPlaygroundInput(name)}
              className="px-2.5 py-1 rounded-md text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {name}
            </button>
          ))}
        </div>

        <textarea
          value={playgroundInput}
          onChange={(e) => setPlaygroundInput(e.target.value)}
          rows={3}
          placeholder="Type anything to hash..."
          className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-mono text-sm"
        />

        <button
          type="button"
          onClick={handleHashText}
          disabled={isHashing}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Dna className="h-4 w-4" />
          {isHashing ? 'Hashing...' : 'Generate SHA-256'}
        </button>

        {playgroundHash && (
          <div className="p-3 rounded-lg bg-background border border-border">
            <p className="text-xs text-muted-foreground mb-1">SHA-256 Output</p>
            <code className="block text-xs md:text-sm break-all text-primary font-mono">
              {playgroundHash}
            </code>
          </div>
        )}
      </div>

      {isLoadingPuzzle && (
        <div className="glass-card rounded-xl p-4 border border-border text-sm text-muted-foreground">
          Generating real dinosaur hashes...
        </div>
      )}

      {/* Puzzle Grid */}
      <div className="space-y-4">
        {specimens.map((specimen) => (
          <div 
            key={specimen.id}
            className="glass-card rounded-xl p-4 border border-border"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                    {specimen.id}
                  </span>
                  <span className="font-medium text-foreground">{specimen.name}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Dna className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">→</span>
                <select
                  value={matches[specimen.id] || ''}
                  onChange={(e) => handleMatch(specimen.id, e.target.value)}
                  disabled={submitted || isLoadingPuzzle}
                  className={`px-3 py-2 bg-input border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    submitted 
                      ? matches[specimen.id] === specimen.hash 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-destructive bg-destructive/10 text-destructive'
                      : 'border-border text-foreground'
                  }`}
                >
                  <option value="">Select hash...</option>
                  {shuffledHashes.map((hash) => (
                    <option key={hash} value={hash}>{shortenHash(hash)}</option>
                  ))}
                </select>
                
                {submitted && (
                  matches[specimen.id] === specimen.hash 
                    ? <CheckCircle2 className="h-5 w-5 text-primary" />
                    : <XCircle className="h-5 w-5 text-destructive" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit/Reset Buttons */}
      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={isLoadingPuzzle || Object.keys(matches).length !== specimens.length}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle2 className="h-4 w-4" />
            Verify Matches (or auto-unlock on perfect match)
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-3 rounded-xl font-medium hover:bg-secondary/80 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}
      </div>

      {/* Result */}
      {submitted && (
        <div className={`p-4 rounded-xl ${
          isCorrect 
            ? 'bg-primary/10 border border-primary/30' 
            : 'bg-destructive/10 border border-destructive/30'
        }`}>
          {isCorrect ? (
            <div className="text-center">
              <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-primary mb-2">Perfect Match!</h4>
              <p className="text-sm text-muted-foreground mb-3">
                You correctly matched all DNA samples to their fingerprints!
              </p>
              <code className="font-mono text-primary">DINO&#123;hashes_are_fingerprints&#125;</code>
            </div>
          ) : (
            <div className="text-center">
              <XCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
              <h4 className="font-semibold text-destructive mb-2">Not Quite Right</h4>
              <p className="text-sm text-destructive/80">
                Some matches are incorrect. Look at the DNA patterns carefully and try again!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
