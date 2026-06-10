"use client"

import { ClientLayout } from '@/components/client-layout'
import { useFlags, ALL_FLAGS } from '@/lib/flag-context'
import { useEffect, useState } from 'react'
import { Trophy, Shield, Dna, CheckCircle2, Star, Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function FinalUnlockPage() {
  const { foundFlags, addFlag, checkFlag, progress } = useFlags()
  const [showConfetti, setShowConfetti] = useState(false)
  const allFlagsFound = foundFlags.length >= ALL_FLAGS.length - 1 // All except the final flag

  useEffect(() => {
    if (allFlagsFound && !checkFlag('DINO{lab_secured}')) {
      // Award the final flag
      addFlag('DINO{lab_secured}')
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }, [allFlagsFound, addFlag, checkFlag])

  const labSecuredFlag = checkFlag('DINO{lab_secured}')
  const totalFlags = foundFlags.length

  if (!allFlagsFound && !labSecuredFlag) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="glass-card rounded-2xl p-8 border border-border">
          <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-6">
            <Lock className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-2">
            VAULT-7 · Genesis Vault Terminal
          </p>
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You found the Genesis Vault — but your cyber intern clearance isn&apos;t high
            enough yet. Recover {ALL_FLAGS.length - 1} DNA fragments across the lab to
            unlock the final archive.
          </p>
          <div className="mb-6">
            <div className="text-sm text-muted-foreground mb-2">
              Current Progress: {totalFlags} / {ALL_FLAGS.length - 1} fragments
            </div>
            <div className="h-4 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(totalFlags / (ALL_FLAGS.length - 1)) * 100}%` }}
              />
            </div>
          </div>
          <Link
            href="/security-audit"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Investigation
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Star className={`h-6 w-6 ${
                ['text-primary', 'text-accent', 'text-amber-400', 'text-emerald-400'][Math.floor(Math.random() * 4)]
              }`} />
            </div>
          ))}
        </div>
      )}

      {/* Success Banner */}
      <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl p-8 mb-8 border border-primary/30 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-primary/20 rounded-full mb-6 animate-pulse-glow">
          <Trophy className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          🎉 Congratulations, Cyber Intern!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          You have successfully secured the DinoDNA Research Lab by identifying 
          all security vulnerabilities!
        </p>
      </div>

      {/* Final Flag */}
      <div className="glass-card rounded-2xl p-8 border border-primary/30 bg-primary/5 mb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-4">
          <Dna className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">Final DNA Fragment Recovered!</h2>
        <div className="bg-card rounded-xl p-4 border border-primary/30 inline-block mt-4">
          <code className="text-xl font-mono font-bold text-primary">
            DINO&#123;lab_secured&#125;
          </code>
        </div>
      </div>

      {/* Achievement Summary */}
      <div className="glass-card rounded-2xl p-6 border border-border mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Your Achievements</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-secondary/50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-1">{totalFlags}</div>
            <div className="text-sm text-muted-foreground">Flags Captured</div>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-accent mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Lab Secured</div>
          </div>
        </div>

        <h3 className="font-semibold text-foreground mb-4">Vulnerabilities Identified:</h3>
        <div className="grid md:grid-cols-2 gap-2">
          {[
            '🔐 Weak Password Authentication',
            '🔍 Source Code Information Leakage',
            '🖼️ Alt Text Data Exposure',
            '🔗 URL Parameter Manipulation',
            '📄 Hidden Page Discovery',
            '🍪 Cookie Information Leakage',
            '🔢 Base64 Encoding Misuse',
            '🔠 Simple Cipher Vulnerabilities',
            '🚫 Missing Access Controls',
            '🧬 Hash Verification Concepts',
            '💡 Security Through Obscurity',
            '✅ Complete Security Audit',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/30 rounded-lg p-2">
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate */}
      <div className="glass-card rounded-2xl p-8 border-2 border-primary/30 text-center bg-gradient-to-b from-primary/5 to-transparent">
        <div className="border-2 border-dashed border-primary/30 rounded-xl p-8">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Certificate of Achievement
          </h2>
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Junior Cyber Security Specialist
          </h3>
          <p className="text-muted-foreground mb-6">
            This certifies that the participant has successfully completed the<br />
            <strong className="text-foreground">DinoDNA Research Lab Security Challenge</strong>
          </p>
          <div className="flex justify-center gap-8 mb-6">
            <div>
              <Dna className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-xs text-muted-foreground">DNA Recovery</div>
            </div>
            <div>
              <Shield className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-xs text-muted-foreground">Security Audit</div>
            </div>
            <div>
              <Trophy className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <div className="text-xs text-muted-foreground">Challenge Complete</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            DinoDNA Research Lab • Cybersecurity Summer Camp 2026
          </div>
        </div>
      </div>

      {/* What You Learned */}
      <div className="mt-8 glass-card rounded-2xl p-6 border border-accent/20">
        <h3 className="font-semibold text-foreground mb-4">🎓 What You Learned</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              <strong className="text-foreground">Weak passwords</strong> are one of the most common 
              ways attackers gain access to systems.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Source code</strong> can reveal sensitive information 
              that developers accidentally leave behind.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Hidden pages</strong> are not secure - security through 
              obscurity is not real security.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground">
              <strong className="text-foreground">URL parameters</strong> can be manipulated to access 
              unauthorized resources.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Encoding is not encryption</strong> - Base64 and simple 
              ciphers don&apos;t provide real security.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Access controls</strong> must be enforced on the server, 
              not just hidden in the interface.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-medium hover:bg-secondary/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Lab Home
        </Link>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <ClientLayout>
      <FinalUnlockPage />
    </ClientLayout>
  )
}
