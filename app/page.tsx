"use client";

import { ClientLayout } from "@/components/client-layout";
import { SplineHero } from "@/components/spline-hero";
import { useFlags, ALL_FLAGS } from "@/lib/flag-context";
import { useEffect } from "react";
import Link from "next/link";
import {
  FlaskConical,
  Shield,
  Search,
  Lock,
  FileText,
  Database,
  BookOpen,
  ClipboardList,
  CheckCircle2,
  Dna,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Radar,
  Activity,
  Fingerprint,
  Vault,
} from "lucide-react";

/* Each investigation area gets its own identity: code name, accent color,
   mission-style action label and a status. Hrefs/hints preserved from the
   original challenge so all navigation + clue logic keeps working. */
const missions = [
  {
    code: "SYS-01",
    title: "Staff Login Portal",
    description: "Probe the lab login system for weak credentials.",
    action: "Breach the portal",
    href: "/staff-login",
    icon: Lock,
    hint: "Some passwords are too easy to guess...",
    accent: "rgb(16 185 129)", // emerald
  },
  {
    code: "SYS-02",
    title: "Research Files",
    description: "Comb dinosaur research archives for buried clues.",
    action: "Inspect the files",
    href: "/research-files",
    icon: FileText,
    hint: "Look closely at everything - images and notes can hide URL paths",
    accent: "rgb(20 184 166)", // teal
  },
  {
    code: "SYS-03",
    title: "Specimen Database",
    description: "Query recovered specimen records and access logs.",
    action: "Access specimens",
    href: "/specimens",
    icon: Database,
    hint: "URLs sometimes reveal more than they should",
    accent: "rgb(56 189 248)", // cyan
  },
  {
    code: "SYS-04",
    title: "Lab Notes",
    description: "Read the scientists' notes — and what's hidden in them.",
    action: "Decode the notes",
    href: "/lab-notes",
    icon: BookOpen,
    hint: "Sometimes what you see isn't everything...",
    accent: "rgb(94 234 212)", // mint
  },
  {
    code: "SYS-05",
    title: "Security Audit",
    description: "Log your findings and track the lab lockdown.",
    action: "Submit fragments",
    href: "/security-audit",
    icon: ClipboardList,
    hint: "Enter the DNA fragments you discover",
    accent: "rgb(245 191 80)", // amber
  },
];

function HomePage() {
  const { mainFlagCount, progress } = useFlags();
  const totalMainFlags = ALL_FLAGS.length;
  const remaining = ALL_FLAGS.length - mainFlagCount;
  const vaultFragmentsNeeded = ALL_FLAGS.length - 1;
  const vaultReady = mainFlagCount >= vaultFragmentsNeeded;
  const vaultFragmentsRemaining = Math.max(
    0,
    vaultFragmentsNeeded - mainFlagCount,
  );

  useEffect(() => {
    console.log(
      "%c[LAB DEBUG] Mr. Speak here line 104, WHY WONT MY CODE WORK: DINO{debug_logs_expose_secrets}",
      "color:#0f766e;font-weight:700;",
    );
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* ============================================================
          HERO — two column: mission briefing (left) + hologram (right)
          ============================================================ */}
      <section className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center mb-14 sm:mb-20">
        {/* Left: briefing */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-primary/20">
            <Shield className="h-4 w-4" />
            Cyber Intern Security Clearance: ACTIVE
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-foreground mb-4 leading-[1.05] tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[rgb(16_185_129)] via-[rgb(20_184_166)] to-[rgb(56_189_248)] bg-clip-text text-transparent">
              DinoDNA
            </span>{" "}
            Research Lab
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6">
            We found major security gaps before the Dinosaur DNA Showcase. As
            our <strong className="text-foreground">Cyber Intern</strong>,
            investigate the lab, recover <strong className="text-primary">DNA
            Fragments</strong>, and help secure every system.
          </p>

          {/* Classified-style security alert */}
          <div className="glass-panel rounded-xl p-4 max-w-xl mx-auto lg:mx-0 mb-6 text-left relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400" />
            <div className="flex items-start gap-3 pl-1">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-amber-800 text-sm uppercase tracking-wide">
                    Security Alert
                  </h3>
                  <span className="text-[10px] font-mono bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                    CLASSIFIED
                  </span>
                </div>
                <p className="text-sm text-amber-700 mt-1">
                  Multiple vulnerabilities detected across lab systems. Recover
                  all {totalMainFlags} fragments in the format{" "}
                  <code className="bg-amber-100 px-2 py-0.5 rounded font-mono text-xs">
                    {"DINO{example_flag}"}
                  </code>
                </p>
              </div>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Link
              href="/staff-login"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              <Radar className="h-4 w-4" />
              Begin Investigation
            </Link>
            <Link
              href="/security-audit"
              className="inline-flex items-center gap-2 glass-card text-foreground px-5 py-3 rounded-xl font-semibold hover:border-primary/50 transition-all"
            >
              <ClipboardList className="h-4 w-4 text-primary" />
              Security Audit
            </Link>
          </div>
        </div>

        {/* Right: holographic Spline model */}
        <div className="order-1 lg:order-2 flex justify-center">
          <SplineHero />
        </div>
      </section>

      {/* ============================================================
          PROGRESS TRACKER — DNA specimen tiles
          ============================================================ */}
      <section className="glass-card rounded-2xl p-6 mb-14 border border-primary/20 glow-ring">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <Dna className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Genome Recovery Progress
              </h2>
              <p className="text-sm text-muted-foreground">
                {mainFlagCount} of {totalMainFlags} DNA fragments recovered
                {remaining > 0 && (
                  <span className="text-primary"> · {remaining} remaining</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-[rgb(16_185_129)] to-[rgb(56_189_248)] bg-clip-text text-transparent">
              {progress}%
            </div>
          </div>
        </div>

        {/* Animated genome progress bar */}
        <div className="h-4 bg-secondary rounded-full overflow-hidden mb-5 relative">
          <div
            className="h-full rounded-full transition-all duration-700 dna-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Fragment tiles styled like DNA sample vials */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: totalMainFlags }).map((_, i) => {
            const found = i < mainFlagCount;
            return (
              <div
                key={i}
                className={`specimen-tile rounded-xl px-3 py-3 border flex items-center gap-3 ${
                  found
                    ? "specimen-tile--found bg-primary/10 border-primary/30 animate-fragment-pop"
                    : "bg-secondary/60 border-border"
                }`}
              >
                {/* Vial icon */}
                <div
                  className={`flex items-center justify-center h-9 w-9 rounded-lg flex-shrink-0 ${
                    found
                      ? "bg-primary/20 text-primary"
                      : "bg-background/60 text-muted-foreground"
                  }`}
                >
                  {found ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <FlaskConical className="h-5 w-5 opacity-60" />
                  )}
                </div>
                <div className="min-w-0">
                  <div
                    className={`text-xs font-mono ${
                      found ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    DNA-{String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className={`text-xs font-medium truncate ${
                      found ? "text-foreground" : "text-muted-foreground/70"
                    }`}
                  >
                    {found ? "Recovered" : "Sealed"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          SYSTEM STATUS MINI PANEL
          ============================================================ */}
      <section className="grid sm:grid-cols-3 gap-4 mb-14">
        <StatusStat
          icon={Activity}
          label="Lab Systems"
          value={progress === 100 ? "Secured" : "Vulnerable"}
          tone={progress === 100 ? "good" : "warn"}
        />
        <StatusStat
          icon={Fingerprint}
          label="Fragments Recovered"
          value={`${mainFlagCount} / ${totalMainFlags}`}
          tone="info"
        />
        <StatusStat
          icon={Shield}
          label="Clearance Level"
          value={
            progress === 100
              ? "Specialist"
              : mainFlagCount >= 6
                ? "Field Agent"
                : "Intern"
          }
          tone="info"
        />
      </section>

      {/* ============================================================
          INVESTIGATION AREAS — unique cards
          ============================================================ */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-2">
          <Search className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            Investigation Areas
          </h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Explore each lab system. Every area hides clues and DNA fragments
          waiting to be recovered.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <Link
                key={mission.href}
                href={mission.href}
                className="group relative glass-card rounded-2xl p-6 border border-border hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                style={{ ["--accent" as string]: mission.accent }}
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-x-0 -top-px h-1 opacity-70"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${mission.accent}, transparent)`,
                  }}
                />
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"
                  style={{ background: mission.accent }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-3 rounded-xl transition-transform group-hover:scale-110"
                    style={{ background: `${mission.accent}1f` }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: mission.accent }}
                    />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                    {mission.code}
                  </span>
                </div>

                <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                  {mission.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {mission.description}
                </p>

                {/* Hover-reveal clue */}
                <div className="mt-3 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <p className="text-xs text-primary/80 italic flex items-start gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                    Hint: {mission.hint}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {mission.action}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}

          {/* Genesis Vault — links to /final-unlock so students can discover and try access */}
          <Link
            href="/final-unlock"
            className={`group relative rounded-2xl p-6 border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
              vaultReady
                ? "border-primary/50 bg-gradient-to-br from-primary/15 to-accent/10 animate-pulse-glow"
                : "glass-card border-dashed border-primary/30"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${
                  vaultReady
                    ? "bg-primary/25 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <Vault className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                VAULT-7
              </span>
            </div>
            <h3 className="font-bold text-foreground text-lg">Genesis Vault</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {vaultReady
                ? "Clearance granted. The vault is ready to open!"
                : `Final lab archive — sealed until ${vaultFragmentsNeeded} DNA fragments are recovered.`}
            </p>
            {!vaultReady && (
              <p className="text-xs text-primary/70 mt-2 italic">
                {vaultFragmentsRemaining} fragment
                {vaultFragmentsRemaining === 1 ? "" : "s"} until vault access ·
                linked to Specimen Vault 7
              </p>
            )}
            <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary">
              {vaultReady ? "Open Genesis Vault" : "Attempt vault access"}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>
          DinoDNA Research Lab &copy; 2026 | Educational Cybersecurity Challenge
        </p>
        <p className="mt-2">
          <FlaskConical className="h-4 w-4 inline-block mr-1" />
          Remember: This is a simulated environment for learning!
        </p>
      </footer>
    </div>
  );
}

/** Small "system status" stat tile. */
function StatusStat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone: "good" | "warn" | "info";
}) {
  const toneClasses = {
    good: "text-emerald-600 bg-emerald-500/10",
    warn: "text-amber-600 bg-amber-500/10",
    info: "text-primary bg-primary/10",
  }[tone];

  return (
    <div className="glass-card rounded-xl p-4 border border-border flex items-center gap-3">
      <div className={`p-2.5 rounded-lg ${toneClasses}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          {label}
        </div>
        <div className="font-bold text-foreground">{value}</div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ClientLayout>
      <HomePage />
    </ClientLayout>
  );
}
