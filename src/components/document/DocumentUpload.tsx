"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import AlertCard from "@/components/ui/AlertCard";

interface DocumentUploadProps {
  onUpload?: (file: File) => void;
}

type DocumentType = "salgsoppgave" | "takstrapport" | "annet";

interface UploadedFile {
  file: File;
  type: DocumentType;
  progress: number;
  done: boolean;
}

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

const ACCEPTED_EXTENSIONS = ".pdf,.jpg,.jpeg,.png";

function classifyFile(filename: string): DocumentType {
  const lower = filename.toLowerCase();
  if (lower.includes("salgsoppgave") || lower.includes("salg")) {
    return "salgsoppgave";
  }
  if (
    lower.includes("takst") ||
    lower.includes("tilstandsrapport") ||
    lower.includes("verdivurdering")
  ) {
    return "takstrapport";
  }
  return "annet";
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const TYPE_LABELS: Record<DocumentType, string> = {
  salgsoppgave: "Salgsoppgave",
  takstrapport: "Takstrapport",
  annet: "Annet",
};

const TYPE_COLORS: Record<DocumentType, string> = {
  salgsoppgave: "bg-confidence-dokumentert/12 text-confidence-dokumentert",
  takstrapport: "bg-confidence-opplyst/12 text-confidence-opplyst",
  annet: "bg-confidence-uavklart/12 text-confidence-uavklart",
};

export default function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        return;
      }

      const docType = classifyFile(file.name);
      setUploadedFile({ file, type: docType, progress: 0, done: false });
      onUpload?.(file);
    },
    [onUpload]
  );

  // Simulate upload progress
  useEffect(() => {
    if (!uploadedFile || uploadedFile.done) return;

    const interval = setInterval(() => {
      setUploadedFile((prev) => {
        if (!prev || prev.done) return prev;
        const next = prev.progress + Math.random() * 20 + 10;
        if (next >= 100) {
          return { ...prev, progress: 100, done: true };
        }
        return { ...prev, progress: Math.min(next, 95) };
      });
    }, 300);

    return () => clearInterval(interval);
  }, [uploadedFile?.done, uploadedFile !== null]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChooseFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          rounded-card border-2 border-dashed transition-colors duration-200
          flex flex-col items-center justify-center gap-3 p-8 text-center
          ${
            dragOver
              ? "border-mineral bg-mineral/5"
              : "border-stone-border/60 bg-white hover:border-stone-border"
          }
        `}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ink-300"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className="text-body-sm text-ink-500">
          Dra og slipp salgsoppgave eller takstrapport
        </p>
        <button
          type="button"
          onClick={handleChooseFile}
          className="px-4 py-2 rounded-button border border-stone-border text-caption text-ink-600 hover:bg-stone-light hover:border-mineral hover:text-mineral transition"
        >
          eller velg fil
        </button>
        <p className="text-micro text-ink-300">PDF, JPG eller PNG</p>
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* Uploaded file info */}
      {uploadedFile && (
        <div className="rounded-card border border-stone-border/50 bg-white p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-body-sm font-medium text-ink truncate">
                {uploadedFile.file.name}
              </p>
              <p className="text-micro text-ink-400">
                {formatFileSize(uploadedFile.file.size)}
              </p>
            </div>
            <span
              className={`shrink-0 px-2 py-0.5 rounded-badge text-micro font-medium ${TYPE_COLORS[uploadedFile.type]}`}
            >
              {TYPE_LABELS[uploadedFile.type]}
            </span>
          </div>

          {/* Progress bar */}
          {!uploadedFile.done && (
            <div className="w-full bg-stone-light rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-mineral rounded-full transition-all duration-300"
                style={{ width: `${uploadedFile.progress}%` }}
              />
            </div>
          )}

          {/* Done state */}
          {uploadedFile.done && (
            <AlertCard type="info" title="Under utvikling">
              Dokumentanalyse er under utvikling — fullstendig AI-analyse kommer
              snart.
            </AlertCard>
          )}
        </div>
      )}
    </div>
  );
}
