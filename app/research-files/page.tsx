"use client";

import { ClientLayout } from "@/components/client-layout";
import { useFlags } from "@/lib/flag-context";
import { useState } from "react";
import {
  FileText,
  Search,
  ChevronDown,
  ChevronUp,
  Dna,
  Bone,
  FlaskConical,
  Microscope,
} from "lucide-react";

// Research data with hidden clues
const researchFiles = [
  {
    id: 1,
    title: "Tyrannosaurus Rex DNA Analysis",
    scientist: "Dr. Sarah Chen",
    date: "2026-03-15",
    category: "DNA Sequencing",
    icon: Dna,
    summary: "Complete genome mapping of T-Rex specimen #TR-001.",
    details:
      "The Tyrannosaurus Rex specimen showed remarkable DNA preservation due to amber encapsulation. Initial sequencing reveals approximately 3.2 billion base pairs with 94% recovery rate.",
    // Hidden clue: Image alt text contains a flag
    imageAlt: "T-Rex skull fossil - DINO{alt_text_discovery}",
    hasHiddenClue: "alt",
  },
  {
    id: 2,
    title: "Velociraptor Behavioral Patterns",
    scientist: "Dr. Marcus Webb",
    date: "2026-03-10",
    category: "Behavioral Study",
    icon: Bone,
    summary: "Analysis of pack hunting behaviors based on fossil evidence.",
    details:
      "Fossilized trackways suggest velociraptors hunted in coordinated packs of 3-5 individuals. Brain cavity analysis indicates high intelligence comparable to modern corvids.",
    imageAlt: "Velociraptor skeletal reconstruction",
    hasHiddenClue: null,
  },
  {
    id: 3,
    title: "Brachiosaurus Habitat Reconstruction",
    scientist: "Dr. Emily Foster",
    date: "2026-02-28",
    category: "Paleoenvironment",
    icon: FlaskConical,
    summary: "Environmental analysis of Late Jurassic ecosystems.",
    // Hidden clue in expandable details
    details:
      "The Brachiosaurus thrived in warm, humid environments with abundant vegetation. Isotope analysis of fossilized teeth reveals a diet primarily consisting of conifer needles and ferns. Note: For more classified research, check /restricted-lab",
    imageAlt: "Brachiosaurus in reconstructed habitat",
    hasHiddenClue: "text",
  },
  {
    id: 4,
    title: "Triceratops Horn Development",
    scientist: "Dr. James Park",
    date: "2026-02-20",
    category: "Morphology",
    icon: Microscope,
    summary: "Growth patterns in Triceratops horn structures.",
    details:
      "CT scanning of juvenile to adult specimens reveals horn growth rates of approximately 2.5cm per year. The frill bone density increased with age, suggesting defensive adaptation.",
    imageAlt: "Triceratops horn cross-section analysis",
    hasHiddenClue: null,
  },
  {
    id: 5,
    title: "Pteranodon Flight Mechanics",
    scientist: "Dr. Lisa Chang",
    date: "2026-02-15",
    category: "Biomechanics",
    icon: Dna,
    summary: "Aerodynamic analysis of pterosaur wing structures.",
    details:
      "Wing membrane preservation in specimen PT-007 allowed detailed analysis of flight capabilities. Estimated cruising speed: 35-45 km/h with maximum altitude of 4,500 meters.",
    imageAlt: "Pteranodon wing membrane analysis",
    hasHiddenClue: null,
  },
  {
    id: 6,
    title: "Stegosaurus Plate Function Study",
    scientist: "Dr. Robert Kim",
    date: "2026-01-30",
    category: "Thermoregulation",
    icon: FlaskConical,
    // Caption contains encoded message
    summary:
      "Investigation of dorsal plate thermoregulatory function. Caption: RElOT3tkbmFfaXNfZGF0YX0=",
    details:
      "Blood vessel impressions on plate surfaces support the thermoregulation hypothesis. Plates may have also served display functions for species recognition and mating.",
    imageAlt: "Stegosaurus plate thermal imaging",
    hasHiddenClue: "base64",
  },
];

function ResearchFilesPage() {
  const { addFlag, checkFlag } = useFlags();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(researchFiles.map((f) => f.category))];

  const filteredFiles = researchFiles.filter((file) => {
    const matchesSearch =
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.scientist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleImageClick = (file: (typeof researchFiles)[0]) => {
    // Check if alt text contains a flag
    if (file.imageAlt.includes("DINO{")) {
      const match = file.imageAlt.match(/DINO\{[^}]+\}/);
      if (match) {
        addFlag(match[0]);
      }
    }
  };

  const altTextFlagFound = checkFlag("DINO{alt_text_discovery}");
  const dnaDataFlagFound = checkFlag("DINO{dna_is_data}");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Research Files
        </h1>
        <p className="text-muted-foreground">
          Browse our collection of dinosaur research documents and findings.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="glass-card rounded-2xl p-4 mb-8 border border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search research files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Research Cards */}
      <div className="space-y-4 mb-8">
        {filteredFiles.map((file) => {
          const Icon = file.icon;
          const isExpanded = expandedId === file.id;

          return (
            <div
              key={file.id}
              className="glass-card rounded-2xl border border-border overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-secondary/30 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : file.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {file.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {file.scientist} • {file.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground">
                          {file.category}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {file.summary}
                    </p>

                    {/* Base64 hint for Stegosaurus entry */}
                    {file.hasHiddenClue === "base64" && (
                      <p className="text-xs text-primary/60 mt-2 font-mono">
                        Encoded reference detected in caption...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-6 pb-6 border-t border-border pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Detailed Findings:
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {file.details}
                      </p>

                      {/* Hint for restricted lab */}
                      {file.hasHiddenClue === "text" && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                            URL clue found in notes. Next step: inspect the
                            disabled "Restricted Lab" button at the bottom of
                            this page in the Elements panel.
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      {/* Fake image placeholder with clickable alt text clue */}
                      <div
                        className="bg-secondary rounded-xl p-4 cursor-pointer hover:bg-secondary/80 transition-colors"
                        onClick={() => handleImageClick(file)}
                        title={file.imageAlt}
                      >
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-2">
                          <Icon className="h-12 w-12 text-primary/40" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          📷{" "}
                          {file.hasHiddenClue === "alt"
                            ? "Click image to view details (check alt text!)"
                            : "Research specimen photograph"}
                        </p>
                        {/* Show alt text on click for T-Rex */}
                        {file.hasHiddenClue === "alt" && altTextFlagFound && (
                          <p className="text-xs text-primary mt-2 font-mono bg-primary/10 p-2 rounded">
                            Alt text: {file.imageAlt}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Disabled route button challenge */}
      <div className="glass-card rounded-2xl p-6 mb-8 border border-amber-300/60 bg-amber-50/60 text-center">
        <h3 className="font-semibold text-foreground mb-2">🔒 Restricted File Section</h3>
        <button
          type="button"
          disabled
          data-route="/restricted-lab"
          data-clue="inspect-disabled-button"
          aria-label="Restricted lab route disabled"
          className="mx-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-muted-foreground border border-border cursor-not-allowed opacity-70"
        >
          Restricted Lab (Disabled)
        </button>
        <p className="text-xs text-amber-700 mt-3 font-mono">
          Tip: type the discovered route manually in the address bar.
        </p>
      </div>

      {/* Hints Section */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-3">
            🔍 Investigation Tips
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>
              • Images often have hidden &quot;alt text&quot; descriptions
            </li>
            <li>• Some text might be encoded in Base64 format</li>
            <li>• Pay attention to unusual notes in research summaries</li>
            <li>
              • Right-click and &quot;Inspect&quot; to see hidden attributes
            </li>
          </ul>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-accent/20">
          <h3 className="font-semibold text-foreground mb-3">
            🧬 Base64 Decoder
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Found an encoded string? Try decoding it here:
          </p>
          <Base64Decoder
            onDecode={(decoded) => {
              if (decoded.includes("DINO{")) {
                const match = decoded.match(/DINO\{[^}]+\}/);
                if (match) addFlag(match[0]);
              }
            }}
            dnaDataFlagFound={dnaDataFlagFound}
          />
        </div>
      </div>
    </div>
  );
}

function Base64Decoder({
  onDecode,
  dnaDataFlagFound,
}: {
  onDecode: (decoded: string) => void;
  dnaDataFlagFound: boolean;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const decode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      onDecode(decoded);
    } catch {
      setOutput("Invalid Base64 string!");
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Paste encoded text..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-mono"
      />
      <button
        onClick={decode}
        className="w-full bg-accent text-accent-foreground py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
      >
        Decode
      </button>
      {output && (
        <div
          className={`p-2 rounded-lg text-sm font-mono ${output.includes("DINO{") ? "bg-primary/10 text-primary" : "bg-secondary text-foreground"}`}
        >
          {output}
        </div>
      )}
      {dnaDataFlagFound && (
        <p className="text-xs text-primary">✓ DNA data flag discovered!</p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <ClientLayout>
      <ResearchFilesPage />
    </ClientLayout>
  );
}
