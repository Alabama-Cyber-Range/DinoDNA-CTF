"use client"

import { useState } from 'react'
import { useFlags } from '@/lib/flag-context'
import { CheckCircle2, XCircle, Dna, RefreshCw } from 'lucide-react'

// DNA specimens with their "fingerprints" (simplified hashes)
const specimens = [
  { 
    id: 'A', 
    name: 'Tyrannosaurus Rex', 
    dna: 'ATCG-GCTA-TTAA-CGCG', 
    hash: 'TR-7X2K' 
  },
  { 
    id: 'B', 
    name: 'Velociraptor', 
    dna: 'GCTA-ATCG-CGCG-TTAA', 
    hash: 'VR-9M4P' 
  },
  { 
    id: 'C', 
    name: 'Triceratops', 
    dna: 'TTAA-CGCG-ATCG-GCTA', 
    hash: 'TC-3N8Q' 
  },
  { 
    id: 'D', 
    name: 'Stegosaurus', 
    dna: 'CGCG-TTAA-GCTA-ATCG', 
    hash: 'SG-5L1R' 
  },
]

// Shuffled hashes for the puzzle
const shuffledHashes = ['VR-9M4P', 'TC-3N8Q', 'TR-7X2K', 'SG-5L1R']

export function DNAHashPuzzle() {
  const { addFlag, checkFlag } = useFlags()
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleMatch = (specimenId: string, hash: string) => {
    setMatches(prev => ({ ...prev, [specimenId]: hash }))
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
  }

  const flagFound = checkFlag('DINO{hashes_are_fingerprints}')

  if (flagFound) {
    return (
      <div className="bg-primary/10 rounded-xl p-6 border border-primary/30">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          <h3 className="font-semibold text-primary">Puzzle Completed!</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          You successfully matched all DNA samples to their digital fingerprints!
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
        <p className="text-sm text-muted-foreground">
          Each DNA sample has a unique digital fingerprint (hash). Match each dinosaur&apos;s 
          DNA sequence to its correct fingerprint code!
        </p>
      </div>

      {/* Educational Note */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">💡 About Hashes:</strong> A hash is like a fingerprint for data. 
          Just like how your fingerprint is unique to you, a hash creates a unique code for any piece of data. 
          If the data changes even a tiny bit, the hash changes completely!
        </p>
      </div>

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
                <code className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                  {specimen.dna}
                </code>
              </div>
              
              <div className="flex items-center gap-2">
                <Dna className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">→</span>
                <select
                  value={matches[specimen.id] || ''}
                  onChange={(e) => handleMatch(specimen.id, e.target.value)}
                  disabled={submitted}
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
                    <option key={hash} value={hash}>{hash}</option>
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
            disabled={Object.keys(matches).length !== specimens.length}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle2 className="h-4 w-4" />
            Verify Matches
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
