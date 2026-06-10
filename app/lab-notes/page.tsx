"use client";

import { ClientLayout } from "@/components/client-layout";
import { useFlags } from "@/lib/flag-context";
import { useState } from "react";
import {
  BookOpen,
  Calendar,
  User,
  Lock,
  Unlock,
  Lightbulb,
} from "lucide-react";

{
  /* 
  ============================================
  TEACHER'S ANSWER KEY - DO NOT SHOW STUDENTS
  ============================================
  
  Flags hidden on this page:
  1. DINO{inspect_the_lab} - Hidden in HTML comment below
  2. DINO{cookie_clue_found} - In browser cookies (set by flag-context)
  
  To find these flags, students should:
  - Right-click -> "Inspect" or "View Page Source"
  - Look for HTML comments <!-- -->
  - Check browser Developer Tools -> Application -> Cookies
  
  ============================================
*/
}

const labNotes = [
  {
    id: 1,
    date: "2026-03-20",
    author: "Dr. Sarah Chen",
    title: "T-Rex DNA Extraction Progress",
    content:
      "Successfully extracted DNA from amber-preserved mosquito sample. Sequence analysis shows 94% genome recovery. Proceeding with gap-filling protocols using frog DNA.",
    isLocked: false,
  },
  {
    id: 2,
    date: "2026-03-18",
    author: "Dr. Marcus Webb",
    title: "Velociraptor Behavior Study",
    content:
      "Observed pack hunting patterns in simulated environment. Intelligence levels exceed initial projections. Recommend enhanced containment protocols.",
    isLocked: false,
  },
  {
    id: 3,
    date: "2026-03-15",
    author: "Dr. Emily Foster",
    title: "Security Protocol Update",
    content:
      "Reminder to all staff: Please check your browser cookies and local storage regularly. Some sensitive data might be stored there accidentally. Also, always inspect your code before publishing!",
    isLocked: false,
    hasHint: true,
  },
  {
    id: 4,
    date: "2026-03-10",
    author: "Dr. James Park",
    title: "Specimen Transport Log",
    content:
      "Transferred specimens TR-001 through TR-005 to new containment facility. All DNA integrity levels maintained during transport.",
    isLocked: false,
  },
  {
    id: 5,
    date: "2026-03-05",
    author: "SYSTEM",
    title: "[ENCRYPTED] Project Genesis Notes",
    content: "This note is encrypted. Access requires Level 5 clearance.",
    isLocked: true,
    encryptedContent: "Caesar cipher: GLQR{hqfrglqj_lv_qrw_hqfubswlrq}",
  },
  {
    id: 6,
    date: "2026-02-28",
    author: "Dr. Lisa Chang",
    title: "DNA Hash Verification System",
    content:
      "Implemented new hash-based verification for DNA samples. Each specimen now has a unique digital fingerprint. This helps us detect any unauthorized modifications to genetic data.",
    isLocked: false,
  },
];

function LabNotesPage() {
  const { checkFlag } = useFlags();
  const [selectedNote, setSelectedNote] = useState<(typeof labNotes)[0] | null>(
    null,
  );
  const [showCipherHelper, setShowCipherHelper] = useState(false);
  const [cipherInput, setCipherInput] = useState("");
  const [cipherOutput, setCipherOutput] = useState("");
  const [cipherShift, setCipherShift] = useState(3);

  // Caesar cipher decoder
  const decodeCaesar = (text: string, shift: number) => {
    return text.replace(/[A-Za-z]/g, (char) => {
      const base = char >= "a" ? 97 : 65;
      return String.fromCharCode(
        ((char.charCodeAt(0) - base - shift + 26) % 26) + base,
      );
    });
  };

  const handleDecode = () => {
    setCipherOutput(decodeCaesar(cipherInput, cipherShift));
  };

  const inspectFlagFound = checkFlag("DINO{inspect_the_lab}");
  const cookieFlagFound = checkFlag("DINO{cookie_clue_found}");
  const encodingFlagFound = checkFlag("DINO{encoding_is_not_encryption}");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 
        =============================================
        SECRET FLAG FOR SOURCE CODE INSPECTION:
        DINO{inspect_the_lab}
        
        Congratulations! You found the hidden comment.
        This teaches that HTML source code can reveal secrets!
        =============================================
      */}

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Lab Notes</h1>
        <p className="text-muted-foreground">
          Research notes and documentation from our scientists.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Notes List */}
        <div className="lg:col-span-2 space-y-4">
          {labNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`glass-card rounded-xl p-4 border cursor-pointer transition-all hover:shadow-lg
                ${
                  selectedNote?.id === note.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }
                ${note.isLocked ? "opacity-75" : ""}
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {note.isLocked ? (
                    <Lock className="h-5 w-5 text-muted-foreground mt-1" />
                  ) : (
                    <Unlock className="h-5 w-5 text-primary mt-1" />
                  )}
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {note.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {note.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {note.date}
                      </span>
                    </div>
                  </div>
                </div>
                {note.hasHint && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    Contains hint
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Source Code Hint */}
          <div className="glass-card rounded-xl p-4 border border-primary/30 bg-primary/5">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">
                  Investigation Tip
                </h4>
                <p className="text-sm text-muted-foreground">
                  Web pages are made of code. Try right-clicking and selecting
                  &quot;View Page Source&quot; or &quot;Inspect&quot; to see
                  what&apos;s hidden in the HTML. Look for comments that start
                  with{" "}
                  <code className="bg-secondary px-1 rounded">&lt;!--</code> and
                  end with
                  <code className="bg-secondary px-1 rounded">--&gt;</code>
                </p>
              </div>
            </div>
          </div>

          {/* Cookie Hint */}
          <div className="glass-card rounded-xl p-4 border border-accent/30 bg-accent/5">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">
                  Browser Storage Tip
                </h4>
                <p className="text-sm text-muted-foreground">
                  Websites can store data in your browser using
                  &quot;cookies&quot;. Open Developer Tools (F12), go to the
                  Application tab, and look at Cookies. What do you find?
                </p>
                {cookieFlagFound && (
                  <p className="text-xs text-primary mt-2">
                    ✓ Cookie flag discovered!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Note Detail & Tools */}
        <div className="space-y-4">
          {selectedNote ? (
            <div className="glass-card rounded-xl p-6 border border-border">
              <div className="mb-4">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    selectedNote.isLocked
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {selectedNote.isLocked ? "Encrypted" : "Accessible"}
                </span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                {selectedNote.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedNote.author} • {selectedNote.date}
              </p>
              <div className="prose prose-sm text-foreground">
                <p>{selectedNote.content}</p>
              </div>

              {selectedNote.encryptedContent && (
                <div className="mt-4 p-3 bg-secondary rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    Encrypted data found:
                  </p>
                  <code className="text-sm font-mono text-foreground break-all">
                    {selectedNote.encryptedContent}
                  </code>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card rounded-xl p-6 border border-border text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Select a note to view details
              </p>
            </div>
          )}

          {/* Caesar Cipher Tool */}
          <div className="glass-card rounded-xl p-6 border border-accent/20">
            <button
              onClick={() => setShowCipherHelper(!showCipherHelper)}
              className="w-full flex items-center justify-between text-foreground"
            >
              <h3 className="font-semibold">🔐 Caesar Cipher Decoder</h3>
              <span className="text-sm text-primary">
                {showCipherHelper ? "Hide" : "Show"}
              </span>
            </button>

            {showCipherHelper && (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  A Caesar cipher shifts each letter by a fixed number. Try
                  shift = 3 for the encrypted note!
                </p>
                <input
                  type="text"
                  placeholder="Enter encrypted text..."
                  value={cipherInput}
                  onChange={(e) => setCipherInput(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-mono"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={cipherShift}
                    onChange={(e) =>
                      setCipherShift(parseInt(e.target.value) || 0)
                    }
                    className="w-20 px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                    min="1"
                    max="25"
                  />
                  <button
                    onClick={handleDecode}
                    className="flex-1 bg-accent text-accent-foreground py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                  >
                    Decode (shift {cipherShift})
                  </button>
                </div>
                {cipherOutput && (
                  <div
                    className={`p-2 rounded-lg text-sm font-mono ${
                      cipherOutput.includes("DINO{")
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {cipherOutput}
                  </div>
                )}
                {encodingFlagFound && (
                  <p className="text-xs text-primary">
                    ✓ Encoding flag decoded!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Found Flags Summary */}
          <div className="glass-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-3">
              📋 Page Discoveries
            </h3>
            <div className="space-y-2 text-sm">
              <div
                className={`flex items-center gap-2 ${inspectFlagFound ? "text-primary" : "text-muted-foreground"}`}
              >
                {inspectFlagFound ? "✓" : "○"} Source code inspection flag
              </div>
              <div
                className={`flex items-center gap-2 ${cookieFlagFound ? "text-primary" : "text-muted-foreground"}`}
              >
                {cookieFlagFound ? "✓" : "○"} Cookie storage flag
              </div>
              <div
                className={`flex items-center gap-2 ${encodingFlagFound ? "text-primary" : "text-muted-foreground"}`}
              >
                {encodingFlagFound ? "✓" : "○"} Caesar cipher flag
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ClientLayout>
      <LabNotesPage />
    </ClientLayout>
  );
}
