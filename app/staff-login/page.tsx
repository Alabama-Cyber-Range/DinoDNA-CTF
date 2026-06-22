"use client"

import { ClientLayout } from '@/components/client-layout'
import { useFlags } from '@/lib/flag-context'
import { useState } from 'react'
import { Lock, User, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react'

type LoginErrorResponse = {
  message?: string
}

function StaffLoginPage() {
  const { addFlag, checkFlag } = useFlags()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Intentionally insecure training flow: failed logins leak password data from the API.
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/staff-login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        setSuccess(true)
        addFlag('DINO{weak_passwords_stink}')
        return
      }

      const data = (await response.json()) as LoginErrorResponse
      setError(data.message || 'Invalid credentials. Think about what a lazy scientist might use...')
    } catch {
      setError('Login service unavailable. Try again in a moment.')
    }
  }

  const flagFound = checkFlag('DINO{weak_passwords_stink}')

  const handleLogout = () => {
    setSuccess(false)
    setUsername('')
    setPassword('')
    setError('')
    setShowPassword(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Staff Login Portal</h1>
        <p className="text-muted-foreground">
          Access restricted to authorized DinoDNA Research Lab personnel only.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Login Form */}
        <div className="glass-card rounded-2xl p-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">Employee Sign In</h2>
          
          {success ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">Access Granted!</h3>
              <p className="text-muted-foreground mb-4">
                Welcome back, Administrator. You&apos;ve discovered a security vulnerability!
              </p>
              <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                <p className="text-sm text-muted-foreground mb-2">DNA Fragment Recovered:</p>
                <code className="text-lg font-mono font-bold text-primary">
                  DINO&#123;weak_passwords_stink&#125;
                </code>
              </div>
              <div className="mt-6 p-4 bg-secondary rounded-xl text-left">
                <h4 className="font-semibold text-foreground mb-2">🎓 What You Learned:</h4>
                <p className="text-sm text-muted-foreground">
                  Using simple, guessable passwords like &quot;admin/dinosaur123&quot; makes it easy for 
                  attackers to break into systems. Always use strong, unique passwords!
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                    placeholder="Enter username"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-destructive bg-destructive/10 px-4 py-3 rounded-xl">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Sign In
              </button>

              {flagFound && (
                <p className="text-xs text-primary text-center">
                  ✓ Weak password flag already recovered. You can still test login behavior.
                </p>
              )}
            </form>
          )}
        </div>

        {/* Hints and Clues Section */}
        <div className="space-y-4">
          {/* Notice Board */}
          <div className="glass-card rounded-2xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">📋 Lab Notice Board</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="font-medium text-foreground">Reminder from IT:</p>
                <p className="text-muted-foreground">
                  Please stop using simple passwords! We&apos;ve seen too many accounts using 
                  obvious combinations like the lab name + numbers...
                </p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="font-medium text-foreground">Staff Meeting Notes:</p>
                <p className="text-muted-foreground">
                  Dr. Hammond mentioned the <strong>admin</strong> account still uses the 
                  default password. Someone should fix that!
                </p>
                <p className="text-muted-foreground mt-2">
                  Also disable debug mode on failed logins - responses should not leak
                  internal password lists.
                </p>
              </div>
              {/* Hidden clue in a seemingly innocent note */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="font-medium text-amber-800">🦖 Fun Fact of the Day:</p>
                <p className="text-amber-700">
                  Did you know? The word &quot;dinosaur&quot; combined with &quot;123&quot; is one of the 
                  most commonly used passwords in paleontology labs!
                </p>
              </div>
            </div>
          </div>

          {/* Security Concept */}
          <div className="glass-card rounded-2xl p-6 border border-accent/20">
            <h3 className="font-semibold text-foreground mb-3">🔐 About Password Security</h3>
            <p className="text-sm text-muted-foreground">
              Weak passwords are one of the most common security vulnerabilities. 
              Attackers often try common passwords like &quot;password&quot;, &quot;123456&quot;, or 
              words related to the organization they&apos;re targeting.
            </p>
            <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground font-medium">
                CYBER TIP: A strong password should be at least 12 characters long 
                and include uppercase, lowercase, numbers, and symbols!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <ClientLayout>
      <StaffLoginPage />
    </ClientLayout>
  )
}
