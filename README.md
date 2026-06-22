# 🦖 DinoDNA Research Lab — Cyber Intern Challenge

A beginner-friendly, **capture-the-flag (CTF) style cybersecurity game** for middle-school students (grades 6–9). Players become "Cyber Interns" at a futuristic dinosaur-DNA research facility and hunt down **13 hidden DNA Fragments** (flags) by exploring weak security practices — guessable passwords, source-code leaks, URL tampering, encoding vs. encryption, cookies, and more.

The look and feel: **Jurassic Park research lab + clean Apple-style interface + beginner cyber investigation game.** Clean white/teal/green/cyan biotech palette, glassy "lab terminal" cards, soft glows, a subtle DNA/grid atmosphere, and a holographic 3D T-Rex model in the hero.

---

## ✨ Features

- **Holographic hero** — a 3D Spline T-Rex model presented as a "live hologram" with scanlines, corner brackets, and an animated DNA-helix fallback while it loads.
- **Genome recovery progress** — 13 DNA "sample vial" tiles with sealed/recovered states, an animated shimmer progress bar, and a system-status panel.
- **5 investigation areas** — each styled uniquely with mission-style language, hover-reveal hints, and a "Genesis Vault" that becomes dramatic at 100%.
- **13 flags / 12 cybersecurity concepts** taught through hands-on discovery.
- **Progress persistence** via `localStorage` (survives refreshes; resettable in the Security Audit page).
- **Responsive** — works on laptops and projected classroom screens; the hero stacks gracefully on mobile.
- **Accessible motion** — animations respect `prefers-reduced-motion`.

---

## 🧰 Tech Stack

> Note: although the original brief described a "static HTML/CSS/JS" site, this project is built on **Next.js + React**. No backend is required — all pages are statically prerendered.

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com/) primitives
- **Icons:** [lucide-react](https://lucide.dev/)
- **3D model:** [`@splinetool/react-spline`](https://github.com/splinetool/react-spline)
- **Language:** TypeScript

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ (or 20+)
- npm (or pnpm — a `pnpm-lock.yaml` is included)

### Install & run

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

### Other scripts

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

> If `npm run dev` warns that "Another next dev server is already running" and falls back to port 3001, an old server is still holding port 3000. Stop it (the warning prints the exact `taskkill /PID <id> /F` command on Windows) and re-run.

---

## 📁 Project Structure

```
app/
  page.tsx              # Home / Mission Briefing (hero, progress, investigation areas)
  staff-login/          # Weak-password login challenge
  research-files/       # Alt-text + Base64 challenges
  specimens/            # URL/IDOR challenge (?id=000)
  lab-notes/            # Source-comment, cookie, Caesar-cipher challenges
  security-audit/       # Flag submission, checklist, DNA hash puzzle
  restricted-lab/       # "Hidden page" / access-control challenge
  final-unlock/         # Final reward + certificate (needs 12 flags)
  globals.css           # Theme tokens + lab UI utilities/animations
  layout.tsx            # Root layout, fonts, metadata

components/
  spline-hero.tsx       # 3D Spline hologram + DNA-helix fallback  ← model URL lives here
  lab-atmosphere.tsx    # Background grid + glow + particles
  dna-background.tsx    # Animated DNA-helix canvas
  navigation.tsx        # Top nav + segmented genome progress
  client-layout.tsx     # Wraps pages with provider + atmosphere + nav
  dna-hash-puzzle.tsx   # DNA "fingerprint" matching mini-game
  ui/                   # shadcn/ui components

lib/
  flag-context.tsx      # All 13 flags + progress state (localStorage)
```

---

## 🧬 The Spline 3D Model

The hero model is configured in **`components/spline-hero.tsx`** via a single constant:

```ts
const SPLINE_SCENE_URL =
  'https://prod.spline.design/OqE9D6qrHWWnZeZ8/scene.splinecode'
```

To swap in a different model:
1. Open/remix your scene in [Spline](https://spline.design/).
2. **Export → Code / Web** and copy the published `…/scene.splinecode` URL.
3. Paste it into `SPLINE_SCENE_URL`.

If the value is left blank (or the model fails to load), the hero automatically falls back to an animated holographic DNA helix, so the page never breaks. The model is **lazy-loaded** (only initialised when the hero scrolls near the viewport) to keep the rest of the page fast.

---

## 🎓 Instructor Answer Key (13 Flags)

> **Spoilers below — for teachers/facilitators only.** Flags use the format `DINO{...}`. Players submit them on the **Security Audit** page. Progress is saved in the browser.

| # | Flag | Concept | Where / How to find it |
|---|------|---------|------------------------|
| 1 | `DINO{inspect_the_lab}` | Source-code inspection | View page source / Inspect on **Lab Notes** — hidden in an HTML comment |
| 2 | `DINO{weak_passwords_stink}` | Weak passwords | **Staff Login** — sign in with `admin` / `dinosaur123` |
| 3 | `DINO{network_traces_reveal_truth}` | Network response leakage | **Staff Login** — submit credentials (wrong or correct), then inspect the `/api/staff-login` response in DevTools Network (it insecurely returns known passwords) |
| 4 | `DINO{hidden_pages_are_not_security}` | Security through obscurity | Visit **/restricted-lab** (linked from a Research File) |
| 5 | `DINO{dna_is_data}` | Base64 encoding | Decode the Base64 caption on the **Stegosaurus** research file (`RElOT3tkbmFfaXNfZGF0YX0=`) |
| 6 | `DINO{encoding_is_not_encryption}` | Encoding vs. encryption | **Lab Notes** — decode the Caesar cipher (`GLQR{...}`, shift 3) |
| 7 | `DINO{check_the_source}` | HTML comments | View source of the **Home** page footer |
| 8 | `DINO{url_clues_matter}` | URL / IDOR tampering | **Specimens** — change the URL to `?id=000` |
| 9 | `DINO{alt_text_discovery}` | Alt-text data exposure | **Research Files** — click the T-Rex image / read its alt text |
| 10 | `DINO{cookie_clue_found}` | Cookie storage | DevTools → Application → Cookies (`secret_specimen`) |
| 11 | `DINO{debug_logs_expose_secrets}` | Console log leakage | Open DevTools **Console** on **Mission Briefing**. A leftover developer debug log accidentally prints this flag. |
| 12 | `DINO{hashes_are_fingerprints}` | Hash functions | Solve the DNA fingerprint matching puzzle on **Security Audit** |
| 13 | `DINO{lab_secured}` | Final challenge | Auto-awarded on **/final-unlock** once the other 12 are found |

### Classified / hidden flags (optional bonus)

These are **not** part of the main progress bar or Genesis Vault requirement. They appear under **Classified Discoveries** on Security Audit.

| Flag | Concept | Where / How to find it |
|------|---------|------------------------|
| `DINO{under_vial}` | 3D scene inspection | Hidden in the **Mission Briefing hologram** (Spline vial). This is the "dino under vial" flag. Students read/click beneath the vial; clicking a Spline object named `under_vial` auto-recovers the flag. |

To wire the click trigger in Spline, name the hidden object **`under_vial`** (see `components/spline-hero.tsx`).

The full answer key also lives in source comments inside `app/lab-notes/page.tsx` and `app/security-audit/page.tsx`.

### Resetting progress
On the **Security Audit** page, use **Reset Progress** (clears `localStorage`). To reset manually, clear the `dinodna_flags` key in DevTools → Application → Local Storage.

---

## 🎨 Design System

Theme tokens and reusable lab UI utilities are defined in `app/globals.css`:

- **Palette (RGB vars):** `--lab-emerald`, `--lab-teal`, `--lab-cyan`, `--lab-mint`, `--lab-ink`
- **Surfaces:** `.glass-card`, `.glass-panel`, `.glow-ring`
- **Atmosphere:** `.lab-atmosphere`, `.lab-grid`, `.lab-particle`, `.scanline`
- **Hologram:** `.hologram`, `.hologram-base`
- **DNA/specimen UI:** `.dna-progress-fill`, `.specimen-tile`
- **Animations:** `dna-rotate`, `float`, `float-slow`, `pulse-glow`, `scan`, `shimmer`, `particle-drift`, `fragment-pop` (all disabled under `prefers-reduced-motion`)

---

## 🚢 Deployment

This is a static-friendly Next.js app and deploys cleanly to any Next.js host (e.g. **Vercel**):

```bash
npm run build
npm run start
```

The Spline model is fetched at runtime from `prod.spline.design`, so the deployment environment needs outbound internet access for the 3D model (the DNA-helix fallback covers offline/blocked cases).

---

## ⚠️ Disclaimer

This is a **simulated, educational environment**. The "vulnerabilities" are intentional teaching tools. The lessons (use strong passwords, don't rely on hidden pages, enforce access control server-side, encoding ≠ encryption) apply to real systems — but please only practice security testing on systems you own or are authorized to test.

---

*DinoDNA Research Lab © 2024 · Educational Cybersecurity Challenge*
