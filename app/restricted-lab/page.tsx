"use client"

import { ClientLayout } from '@/components/client-layout'
import { useFlags } from '@/lib/flag-context'
import { useEffect, useState } from 'react'
import { AlertTriangle, Lock, Shield, CheckCircle2, Dna } from 'lucide-react'
import Link from 'next/link'

function RestrictedLabPage() {
  const { addFlag, checkFlag } = useFlags()
  const [flagRevealed, setFlagRevealed] = useState(false)

  useEffect(() => {
    // Reveal the flag after a brief delay for dramatic effect
    const timer = setTimeout(() => {
      setFlagRevealed(true)
      addFlag('DINO{hidden_pages_are_not_security}')
    }, 1000)

    return () => clearTimeout(timer)
  }, [addFlag])

  const hiddenPageFlag = checkFlag('DINO{hidden_pages_are_not_security}')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Warning Banner */}
      <div className="bg-destructive/10 border-2 border-destructive/50 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
          <div>
            <h1 className="text-2xl font-bold text-destructive mb-2">⚠️ RESTRICTED AREA</h1>
            <p className="text-destructive/80">
              You have accessed a restricted section of the DinoDNA Research Lab. 
              This page was not meant to be publicly accessible!
            </p>
          </div>
        </div>
      </div>

      {/* Security Breach Notice */}
      <div className="glass-card rounded-2xl p-8 border border-border mb-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-4 bg-destructive/10 rounded-full mb-4">
            <Lock className="h-10 w-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Security Vulnerability Detected</h2>
          <p className="text-muted-foreground">
            This page demonstrates a common security flaw: <strong>Security Through Obscurity</strong>
          </p>
        </div>

        <div className="bg-secondary/50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-3">🎓 What You Learned:</h3>
          <p className="text-muted-foreground mb-4">
            Just because a page is not linked from the main website doesn&apos;t mean it&apos;s secure. 
            Attackers can discover &quot;hidden&quot; pages through:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 ml-4">
            <li>• Finding clues in other pages (like you did!)</li>
            <li>• Trying common page names (/admin, /secret, /backup)</li>
            <li>• Looking at JavaScript files and source code</li>
            <li>• Using automated tools to scan for pages</li>
          </ul>
        </div>

        <div className="bg-primary/5 rounded-xl p-6 border border-primary/20 mb-6">
          <h3 className="font-semibold text-primary mb-3">🔐 The Right Way to Secure Pages:</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• <strong>Authentication:</strong> Require users to log in with valid credentials</li>
            <li>• <strong>Authorization:</strong> Check if the logged-in user has permission to view the page</li>
            <li>• <strong>Access Control Lists:</strong> Define who can access what resources</li>
            <li>• <strong>Server-side Checks:</strong> Always verify permissions on the server, not just in the browser</li>
          </ul>
        </div>

        {/* Revealed Flags */}
        {flagRevealed && (
          <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="font-medium text-primary">DNA Fragment Found!</span>
            </div>
            <code className="text-sm font-mono text-primary">
              DINO&#123;hidden_pages_are_not_security&#125;
            </code>
          </div>
        )}
      </div>

      {/* Secret Project Info */}
      <div className="glass-card rounded-2xl p-6 border border-amber-500/30 bg-amber-50/20">
        <div className="flex items-start gap-4">
          <Dna className="h-6 w-6 text-amber-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-800 mb-2">🦖 Project Genesis - Classified</h3>
            <p className="text-sm text-amber-700 mb-4">
              This restricted area contains information about our experimental dinosaur cloning project. 
              The fact that you can see this without proper authentication is a serious security concern!
            </p>
            <div className="text-xs text-amber-600 font-mono bg-amber-100 p-3 rounded-lg space-y-1">
              <p>PROJECT STATUS: Active</p>
              <p>SECURITY LEVEL: Compromised</p>
              <p>RECOMMENDATION: Implement proper access control immediately</p>
              <p className="pt-1 border-t border-amber-200/80">
                GENESIS VAULT TERMINAL: /final-unlock
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/security-audit"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <Shield className="h-4 w-4" />
          Go to Security Audit
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-medium hover:bg-secondary/80 transition-colors"
        >
          Return to Lab
        </Link>
      </div>

      {/* Status */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Flag captured: {hiddenPageFlag ? '1/1' : '0/1'}</p>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <ClientLayout>
      <RestrictedLabPage />
    </ClientLayout>
  )
}
