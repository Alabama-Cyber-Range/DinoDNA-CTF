"use client";

import { ClientLayout } from "@/components/client-layout";
import { DNAHashPuzzle } from "@/components/dna-hash-puzzle";
import Link from "next/link";
import { Fingerprint, ArrowLeft } from "lucide-react";

function DnaFingerprintPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-4">
          <Fingerprint className="h-8 w-8 text-accent" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          DNA Fingerprint Lab
        </h1>
        <p className="text-muted-foreground">
          Hash text, match fingerprints, unlock the fragment.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-border mb-6">
        <DNAHashPuzzle />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ClientLayout>
      <DnaFingerprintPage />
    </ClientLayout>
  );
}
