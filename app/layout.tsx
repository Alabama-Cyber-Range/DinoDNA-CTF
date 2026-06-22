import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { HiddenHtmlComment } from '@/components/hidden-html-comment'
import './globals.css'

/* Sleek, modern UI sans — clean biotech-lab feel, very readable at camp sizes */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700'],
})

/* Lab-instrument monospace for flags, DNA codes, and terminal-style UI */
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'DinoDNA Research Lab | Cyber Security Challenge',
  description: 'Help secure the DinoDNA Research Lab! A middle-school cybersecurity challenge where you become a cyber intern and find hidden DNA fragments.',
  keywords: ['cybersecurity', 'education', 'middle school', 'STEM', 'dinosaur', 'DNA'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${plusJakarta.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        <HiddenHtmlComment
          text={`SECRET FLAG FOR SOURCE CODE INSPECTION: DINO{inspect_the_lab}
Congratulations! You found the hidden comment.
This teaches that HTML source code can reveal secrets!`}
        />
        <Script src="/genesis-vault-clues.js" strategy="afterInteractive" />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
