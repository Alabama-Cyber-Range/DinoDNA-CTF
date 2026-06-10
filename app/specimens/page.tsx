"use client";

import { ClientLayout } from "@/components/client-layout";
import { useFlags } from "@/lib/flag-context";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import {
  Database,
  Search,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

// Specimen data
const specimens = [
  {
    id: "001",
    name: "Tyrannosaurus Rex",
    status: "Public",
    location: "Hall A",
    dnaIntegrity: "94%",
    discoveryYear: 1990,
  },
  {
    id: "002",
    name: "Velociraptor",
    status: "Public",
    location: "Hall B",
    dnaIntegrity: "87%",
    discoveryYear: 1995,
  },
  {
    id: "003",
    name: "Triceratops",
    status: "Public",
    location: "Hall A",
    dnaIntegrity: "91%",
    discoveryYear: 1988,
  },
  {
    id: "004",
    name: "Brachiosaurus",
    status: "Public",
    location: "Hall C",
    dnaIntegrity: "78%",
    discoveryYear: 2001,
  },
  {
    id: "005",
    name: "Stegosaurus",
    status: "Public",
    location: "Hall B",
    dnaIntegrity: "82%",
    discoveryYear: 1999,
  },
];

// Secret specimen - accessible via URL manipulation
const secretSpecimen = {
  id: "000",
  name: "CLASSIFIED - Project Genesis",
  status: "RESTRICTED",
  location: "Vault 7",
  dnaIntegrity: "99.7%",
  discoveryYear: 2026,
  flag: "DINO{url_clues_matter}",
  secretNote:
    "This specimen should not be publicly accessible. If you can see this, there is a security vulnerability in our access control system!",
};

function SpecimenDatabaseContent() {
  const { addFlag, checkFlag } = useFlags();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecimen, setSelectedSpecimen] = useState<
    (typeof specimens)[0] | typeof secretSpecimen | null
  >(null);
  const [showAccessWarning, setShowAccessWarning] = useState(false);

  // Check URL for specimen ID
  useEffect(() => {
    const id = searchParams.get("id");
    if (id === "000") {
      setSelectedSpecimen(secretSpecimen);
      setShowAccessWarning(true);
      addFlag(secretSpecimen.flag);
    } else if (id) {
      const found = specimens.find((s) => s.id === id);
      if (found) {
        setSelectedSpecimen(found);
        setShowAccessWarning(false);
      }
    }
  }, [searchParams, addFlag]);

  const filteredSpecimens = specimens.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.includes(searchTerm),
  );

  const handleSpecimenClick = (specimen: (typeof specimens)[0]) => {
    setSelectedSpecimen(specimen);
    setShowAccessWarning(false);
    router.push(`/specimens?id=${specimen.id}`);
  };

  const urlFlagFound = checkFlag("DINO{url_clues_matter}");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <Database className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Specimen Database
        </h1>
        <p className="text-muted-foreground">
          Access our catalog of recovered dinosaur specimens and DNA samples.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Specimen List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <div className="glass-card rounded-xl p-4 border border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search specimens by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              />
            </div>
          </div>

          {/* Specimen Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredSpecimens.map((specimen) => (
              <div
                key={specimen.id}
                onClick={() => handleSpecimenClick(specimen)}
                className={`glass-card rounded-xl p-4 border cursor-pointer transition-all hover:shadow-lg
                  ${
                    selectedSpecimen?.id === specimen.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs font-mono text-muted-foreground">
                      ID: {specimen.id}
                    </span>
                    <h3 className="font-semibold text-foreground">
                      {specimen.name}
                    </h3>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {specimen.status}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>📍 {specimen.location}</p>
                  <p>🧬 DNA Integrity: {specimen.dnaIntegrity}</p>
                  <p>📅 Discovered: {specimen.discoveryYear}</p>
                </div>
              </div>
            ))}
          </div>

          {/* URL Hint */}
          <div className="glass-card rounded-xl p-4 border border-amber-500/30 bg-amber-50/50">
            <div className="flex items-start gap-3">
              <ExternalLink className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">Notice the URL?</h4>
                <p className="text-sm text-amber-700">
                  When you click a specimen, look at the address bar. The URL
                  changes to include
                  <code className="bg-amber-100 px-1 rounded mx-1">
                    ?id=001
                  </code>
                  ,
                  <code className="bg-amber-100 px-1 rounded mx-1">
                    ?id=002
                  </code>
                  , etc. What happens if you try a different ID number...?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Specimen Detail */}
        <div className="space-y-4">
          {selectedSpecimen ? (
            <>
              {showAccessWarning && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-destructive">
                        Unauthorized Access!
                      </h4>
                      <p className="text-sm text-destructive/80">
                        You accessed a restricted specimen by manipulating the
                        URL. This is a security vulnerability!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div
                className={`glass-card rounded-xl p-6 border ${
                  showAccessWarning
                    ? "border-destructive/50"
                    : "border-primary/30"
                }`}
              >
                <div className="text-center mb-4">
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded-full ${
                      showAccessWarning
                        ? "bg-destructive/10 text-destructive"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    Specimen #{selectedSpecimen.id}
                  </span>
                  <h2 className="text-xl font-bold text-foreground mt-2">
                    {selectedSpecimen.name}
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Status</span>
                    <span
                      className={`font-medium ${
                        selectedSpecimen.status === "RESTRICTED"
                          ? "text-destructive"
                          : "text-foreground"
                      }`}
                    >
                      {selectedSpecimen.status}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium text-foreground">
                      {selectedSpecimen.location}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">DNA Integrity</span>
                    <span className="font-medium text-primary">
                      {selectedSpecimen.dnaIntegrity}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">
                      Discovery Year
                    </span>
                    <span className="font-medium text-foreground">
                      {selectedSpecimen.discoveryYear}
                    </span>
                  </div>
                </div>

                {/* Show flag if secret specimen */}
                {"flag" in selectedSpecimen && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/30">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="font-medium text-primary">
                        DNA Fragment Found!
                      </span>
                    </div>
                    <code className="text-sm font-mono text-primary">
                      {selectedSpecimen.flag}
                    </code>
                    <p className="text-xs text-muted-foreground mt-2">
                      {selectedSpecimen.secretNote}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="glass-card rounded-xl p-6 border border-border text-center">
              <Database className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Select a specimen to view details
              </p>
            </div>
          )}

          {/* Learning Box */}
          <div className="glass-card rounded-xl p-6 border border-accent/20">
            <h3 className="font-semibold text-foreground mb-3">
              🔐 About URL Security
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              URLs often contain parameters that identify resources. If a
              website doesn&apos;t properly check permissions, users might
              access restricted content by simply changing the URL.
            </p>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground font-medium">
                CYBER TIP: Always verify user permissions on the server side,
                not just by hiding links!
              </p>
            </div>
            {urlFlagFound && (
              <p className="text-xs text-primary mt-3">
                ✓ URL manipulation flag discovered!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecimenDatabasePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">Loading specimen database...</p>
        </div>
      }
    >
      <SpecimenDatabaseContent />
    </Suspense>
  );
}

export default function Page() {
  return (
    <ClientLayout>
      <SpecimenDatabasePage />
    </ClientLayout>
  );
}
