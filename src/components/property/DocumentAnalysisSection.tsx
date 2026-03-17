"use client";

import type { DocumentInfo } from "@/types";
import SectionCard from "@/components/ui/SectionCard";

interface DocumentAnalysisSectionProps {
  documents: DocumentInfo[];
}

const typeLabels: Record<DocumentInfo["type"], { label: string; bg: string; text: string }> = {
  salgsoppgave: {
    label: "Salgsoppgave",
    bg: "bg-confidence-opplyst/15",
    text: "text-confidence-opplyst",
  },
  takstrapport: {
    label: "Takstrapport",
    bg: "bg-confidence-dokumentert/15",
    text: "text-confidence-dokumentert",
  },
  reguleringsplan: {
    label: "Reguleringsplan",
    bg: "bg-confidence-utledet/15",
    text: "text-confidence-utledet",
  },
  annet: {
    label: "Annet",
    bg: "bg-confidence-uavklart/15",
    text: "text-confidence-uavklart",
  },
};

const statusConfig: Record<
  DocumentInfo["status"],
  { label: string; icon: string; color: string }
> = {
  laster_opp: {
    label: "Laster opp",
    icon: "\u2191",
    color: "text-confidence-opplyst",
  },
  analyserer: {
    label: "Analyserer",
    icon: "\u25CB",
    color: "text-confidence-utledet",
  },
  ferdig: {
    label: "Ferdig",
    icon: "\u2713",
    color: "text-confidence-dokumentert",
  },
  feil: {
    label: "Feil",
    icon: "\u2715",
    color: "text-avvik",
  },
};

function formatDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

export default function DocumentAnalysisSection({
  documents,
}: DocumentAnalysisSectionProps) {
  return (
    <SectionCard
      title="Dokumentanalyse"
      subtitle="Opplastede dokumenter og analysestatus"
      id="documents"
    >
      {documents.length === 0 ? (
        <div className="rounded-card border border-dashed border-stone-border bg-stone-warm p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-badge bg-mineral-wash">
            <span className="text-heading-sm text-mineral" aria-hidden="true">
              +
            </span>
          </div>
          <p className="text-body-sm font-medium text-ink-700 mb-1">
            Ingen dokumenter lastet opp
          </p>
          <p className="text-body-sm text-ink-500 max-w-sm mx-auto">
            Last opp en salgsoppgave eller takstrapport for automatisk analyse
            og kryssvalidering mot offentlige data.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => {
            const typeCfg = typeLabels[doc.type];
            const statusCfg = statusConfig[doc.status];

            return (
              <div
                key={doc.id}
                className="
                  flex items-center gap-4 rounded-card border border-stone-border/50
                  bg-white p-4 transition-shadow hover:shadow-card-hover
                "
              >
                {/* Status icon */}
                <div
                  className={`
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-badge bg-stone-warm
                    ${statusCfg.color}
                    ${doc.status === "analyserer" ? "animate-pulse" : ""}
                  `}
                >
                  <span className="text-body font-semibold" aria-hidden="true">
                    {statusCfg.icon}
                  </span>
                </div>

                {/* File info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-body-sm font-medium text-ink truncate">
                      {doc.filename}
                    </span>
                    <span
                      className={`
                        inline-flex shrink-0 items-center rounded-badge px-1.5 py-0.5
                        text-micro font-medium ${typeCfg.bg} ${typeCfg.text}
                      `}
                    >
                      {typeCfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-micro text-ink-400">
                    <span>{formatDateTime(doc.uploadedAt)}</span>
                    <span className={`font-medium ${statusCfg.color}`}>
                      {statusCfg.label}
                    </span>
                  </div>
                </div>

                {/* Extracted data count */}
                {doc.status === "ferdig" && doc.extractedData && (
                  <div className="shrink-0 text-right">
                    <span className="text-caption font-medium text-ink-600">
                      {Object.keys(doc.extractedData).length}
                    </span>
                    <span className="text-micro text-ink-400 ml-1">felt</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
}
