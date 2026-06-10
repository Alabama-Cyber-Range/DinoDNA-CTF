"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useFlags } from '@/lib/flag-context'
import { 
  FlaskConical, 
  Home, 
  FileText, 
  Database, 
  ClipboardList, 
  Lock, 
  BookOpen,
  Menu,
  X,
  Dna
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Mission Briefing', icon: Home },
  { href: '/staff-login', label: 'Staff Login', icon: Lock },
  { href: '/research-files', label: 'Research Files', icon: FileText },
  { href: '/specimens', label: 'Specimen Database', icon: Database },
  { href: '/lab-notes', label: 'Lab Notes', icon: BookOpen },
  { href: '/security-audit', label: 'Security Audit', icon: ClipboardList },
]

export function Navigation() {
  const pathname = usePathname()
  const { mainFlagCount, hiddenFlagCount, progress } = useFlags()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <FlaskConical className="h-8 w-8 text-primary" />
              <Dna className="h-4 w-4 text-accent absolute -bottom-1 -right-1" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground leading-tight">DinoDNA</span>
              <span className="text-xs text-muted-foreground leading-tight">Research Lab</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Progress Badge — segmented genome tracker */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-secondary/80 px-3 py-1.5 rounded-full border border-primary/20">
              <Dna className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                {mainFlagCount}/12
              </span>
              {hiddenFlagCount > 0 && (
                <span className="text-xs text-accent font-medium">
                  +{hiddenFlagCount}★
                </span>
              )}
              <span className="text-xs text-muted-foreground hidden lg:inline">
                DNA Fragments
              </span>
            </div>
            {/* 12 genome segments that light up as fragments are recovered */}
            <div className="flex items-center gap-0.5" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-3 w-1 rounded-full transition-all duration-500 ${
                    i < mainFlagCount
                      ? 'bg-primary shadow-[0_0_6px_rgb(20_184_166)]'
                      : 'bg-secondary-foreground/15'
                  }`}
                  style={{ transitionDelay: `${i * 30}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                      ${isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between px-4">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">{mainFlagCount}/12 Fragments</span>
              </div>
              <div className="mx-4 mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
