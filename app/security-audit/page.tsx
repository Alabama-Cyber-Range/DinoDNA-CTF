"use client"

import { ClientLayout } from '@/components/client-layout'
import { useFlags, ALL_FLAGS } from '@/lib/flag-context'
import { useState } from 'react'
import { ClipboardList, CheckCircle2, XCircle, Send, Trophy, Dna, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { DNAHashPuzzle } from '@/components/dna-hash-puzzle'

function SecurityAuditPage() {
  const { foundFlags, addFlag, checkFlag, progress } = useFlags()
  const [flagInput, setFlagInput] = useState('')
  const [submitResult, setSubmitResult] = useState<'success' | 'duplicate' | 'invalid' | null>(null)
  const [lastSubmitted, setLastSubmitted] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = flagInput.trim()
    setLastSubmitted(trimmed)
    
    if (checkFlag(trimmed)) {
      setSubmitResult('duplicate')
    } else if (addFlag(trimmed)) {
      setSubmitResult('success')
      setFlagInput('')
    } else {
      setSubmitResult('invalid')
    }

    // Clear result after 5 seconds
    setTimeout(() => setSubmitResult(null), 5000)
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      localStorage.removeItem('dinodna_flags')
      window.location.reload()
    }
  }

  const allFlagsFound = checkFlag('DINO{lab_secured}')
  const vaultReady = foundFlags.length >= ALL_FLAGS.length - 1

  // Flag descriptions for educational value
  const flagDescriptions: Record<string, { concept: string; hint: string }> = {
    'DINO{inspect_the_lab}': {
      concept: 'Source Code Inspection',
      hint: 'Check the HTML source code on the Lab Notes page',
    },
    'DINO{weak_passwords_stink}': {
      concept: 'Weak Passwords',
      hint: 'Try logging in with common credentials on the Staff Login page',
    },
    'DINO{hidden_pages_are_not_security}': {
      concept: 'Security Through Obscurity',
      hint: 'Find the link to /restricted-lab in the Research Files',
    },
    'DINO{dna_is_data}': {
      concept: 'Base64 Encoding',
      hint: 'Decode the Base64 string in the Stegosaurus research caption',
    },
    'DINO{encoding_is_not_encryption}': {
      concept: 'Encoding vs Encryption',
      hint: 'Use the Caesar cipher decoder on the encrypted lab note',
    },
    'DINO{check_the_source}': {
      concept: 'HTML Comments',
      hint: 'View the source code of the homepage footer',
    },
    'DINO{url_clues_matter}': {
      concept: 'URL Manipulation',
      hint: 'Try changing the specimen ID to 000 in the URL',
    },
    'DINO{alt_text_discovery}': {
      concept: 'Alt Text Inspection',
      hint: 'Click on the T-Rex research image and check its alt text',
    },
    'DINO{cookie_clue_found}': {
      concept: 'Cookie Storage',
      hint: 'Check browser cookies in Developer Tools (F12 → Application → Cookies)',
    },
    'DINO{hashes_are_fingerprints}': {
      concept: 'Hash Functions',
      hint: 'Complete the DNA matching puzzle on the Security Audit page',
    },
    'DINO{access_control_required}': {
      concept: 'Access Control',
      hint: 'Find the restricted lab page through the Research Files',
    },
    'DINO{lab_secured}': {
      concept: 'Final Challenge',
      hint: 'Open the Genesis Vault on the Mission Briefing once you have 11 fragments',
    },
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <ClipboardList className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Security Audit Station</h1>
        <p className="text-muted-foreground">
          Submit the DNA fragments you&apos;ve discovered and track your progress.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Submit Form & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Card */}
          <div className="glass-card rounded-2xl p-6 border border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Dna className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">DNA Collection Progress</h2>
                  <p className="text-sm text-muted-foreground">
                    {foundFlags.length} of {ALL_FLAGS.length} fragments recovered
                  </p>
                </div>
              </div>
              <div className="text-3xl font-bold text-primary">{progress}%</div>
            </div>
            
            <div className="h-4 bg-secondary rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {vaultReady && (
              <div className="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-xl text-center">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-bold text-primary">
                  {allFlagsFound ? 'Lab Fully Secured!' : 'Genesis Vault Unlocked!'}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {allFlagsFound
                    ? "You've recovered every DNA fragment. View your certificate."
                    : "You've recovered enough fragments to access the Genesis Vault."}
                </p>
                <Link
                  href="/final-unlock"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Trophy className="h-4 w-4" />
                  {allFlagsFound ? 'View Certificate' : 'Open Genesis Vault'}
                </Link>
              </div>
            )}
          </div>

          {/* Submit Form */}
          <div className="glass-card rounded-2xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Submit DNA Fragment</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  placeholder="Enter flag (e.g., DINO{example_flag})"
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                <Send className="h-4 w-4" />
                Submit Flag
              </button>
            </form>

            {/* Submit Result */}
            {submitResult && (
              <div className={`mt-4 p-4 rounded-xl flex items-start gap-3 ${
                submitResult === 'success' 
                  ? 'bg-primary/10 border border-primary/30' 
                  : submitResult === 'duplicate'
                    ? 'bg-amber-50 border border-amber-300'
                    : 'bg-destructive/10 border border-destructive/30'
              }`}>
                {submitResult === 'success' ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-primary">DNA Fragment Verified!</h4>
                      <p className="text-sm text-muted-foreground">
                        Great work! You found: <code className="font-mono">{lastSubmitted}</code>
                      </p>
                    </div>
                  </>
                ) : submitResult === 'duplicate' ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-700">Already Found!</h4>
                      <p className="text-sm text-amber-600">
                        You&apos;ve already discovered this fragment. Keep looking for new ones!
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-destructive">Invalid Flag</h4>
                      <p className="text-sm text-destructive/80">
                        That doesn&apos;t match any known DNA fragment. Check your spelling!
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Found Flags List */}
          <div className="glass-card rounded-2xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Discovered Fragments</h3>
            {foundFlags.length > 0 ? (
              <div className="space-y-3">
                {foundFlags.map((flag, index) => {
                  const desc = flagDescriptions[flag]
                  return (
                    <div key={flag} className="flex items-start gap-3 p-3 bg-primary/5 rounded-xl border border-primary/20">
                      <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <code className="text-sm font-mono text-primary">{flag}</code>
                        {desc && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Concept: {desc.concept}
                          </p>
                        )}
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No fragments found yet. Start exploring the lab!
              </p>
            )}
          </div>

          {/* DNA Hash Puzzle */}
          <div className="glass-card rounded-2xl p-6 border border-border">
            <DNAHashPuzzle />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Genesis Vault — always visible so students know the endpoint exists */}
          <div className="glass-card rounded-2xl p-6 border border-primary/20">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              🔒 Genesis Vault
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              The lab&apos;s final archive opens after {ALL_FLAGS.length - 1} DNA fragments
              are recovered. You can attempt access anytime from the Mission Briefing.
            </p>
            <div className="text-xs text-muted-foreground mb-3">
              Vault clearance: {Math.min(foundFlags.length, ALL_FLAGS.length - 1)} /{' '}
              {ALL_FLAGS.length - 1} fragments
            </div>
            <Link
              href="/final-unlock"
              className={`inline-flex items-center gap-2 w-full justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                vaultReady
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {vaultReady ? 'Open Genesis Vault' : 'Attempt Vault Access'}
            </Link>
          </div>

          {/* Checklist */}
          <div className="glass-card rounded-2xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">📋 Vulnerability Checklist</h3>
            <div className="space-y-2">
              {ALL_FLAGS.map((flag) => {
                const found = checkFlag(flag)
                const desc = flagDescriptions[flag]
                return (
                  <div 
                    key={flag}
                    className={`flex items-center gap-2 text-sm p-2 rounded-lg transition-all ${
                      found ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {found ? (
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-current flex-shrink-0" />
                    )}
                    <span className={found ? '' : 'opacity-60'}>
                      {desc?.concept || 'Unknown'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Hints */}
          <div className="glass-card rounded-2xl p-6 border border-accent/20">
            <h3 className="font-semibold text-foreground mb-4">💡 Need Help?</h3>
            <div className="space-y-3 text-sm">
              {ALL_FLAGS.filter(f => !checkFlag(f)).slice(0, 3).map((flag) => {
                const desc = flagDescriptions[flag]
                return (
                  <div key={flag} className="p-3 bg-secondary/50 rounded-lg">
                    <p className="font-medium text-foreground text-xs mb-1">{desc?.concept}</p>
                    <p className="text-muted-foreground text-xs">{desc?.hint}</p>
                  </div>
                )
              })}
              {foundFlags.length === ALL_FLAGS.length && (
                <p className="text-primary text-center py-4">
                  🎉 You found them all!
                </p>
              )}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-muted-foreground py-3 rounded-xl text-sm transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <ClientLayout>
      <SecurityAuditPage />
    </ClientLayout>
  )
}
