"use client";

import type { SourceEntry } from "@/types";
import SectionCard from "@/components/ui/SectionCard";

interface SourceRegistrySectionProps {
  sources: SourceEntry[];
}

const statusConfig: Record<
  SourceEntry["status"],
  { label: string; bg: string; text: string }
> = {
  ok: {
    label: "OK",
    bg: "bg-confidence-dokumentert/15",
    text: "text-confidence-dokumentert",
  },
  feil: {
    label: "Feil",
    bg: "bg-avvik/15",
    text: "text-avvik",
  },
  timeout: {
    label: "Timeout",
    bg: "bg-confidence-utledet/15",
    text: "text-confidence-utledet",
  },
};

const sourceTypeLabels: Record<string, string> = {
  offentlig_register: "Offentlig register",
  opplastet_dokument: "Opplastet dokument",
  beregnet: "Beregnet",
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

function formatResponseTime(ms: number): string {
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(1)} s`;
}

export default function SourceRegistrySection({
  sources,
}: SourceRegistrySectionProps) {
  return (
    <SectionCard
      title="Kilderegister"
      subtitle={`${sources.length} kilder benyttet`}
      id="sources"
    >
      {sources.length === 0 ? (
        <p className="text-body-sm text-ink-500">
          Ingen kilder registrert.
        </p>
      ) : (
        <div className="overflow-x-auto -mx-5">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b border-stone-border/60">
                <th className="px-5 py-2.5 text-caption text-ink-500 font-semibold">
                  Kilde
                </th>
                <th className="px-5 py-2.5 text-caption text-ink-500 font-semibold">
                  Type
                </th>
                <th className="px-5 py-2.5 text-caption text-ink-500 font-semibold">
                  Felt
                </th>
                <th className="px-5 py-2.5 text-caption text-ink-500 font-semibold">
                  Hentet
                </th>
                <th className="px-5 py-2.5 text-caption text-ink-500 font-semibold">
                  Status
                </th>
                <th className="px-5 py-2.5 text-caption text-ink-500 font-semibold text-right">
                  Responstid
                </th>
              </tr>
            </thead>
            <tbody>
              {sources.map((entry, idx) => {
                const st = statusConfig[entry.status];

                return (
                  <tr
                    key={`${entry.source.name}-${idx}`}
                    className={`
                      border-b border-stone-border/30 last:border-b-0
                      ${idx % 2 === 0 ? "bg-white" : "bg-stone-warm"}
                    `}
                  >
                    {/* Source name */}
                    <td className="px-5 py-2.5 text-body-sm font-medium text-ink">
                      {entry.source.url ? (
                        <a
                          href={entry.source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-stone-border hover:decoration-mineral transition-colors"
                        >
                          {entry.source.name}
                        </a>
                      ) : (
                        entry.source.name
                      )}
                    </td>

                    {/* Type */}
                    <td className="px-5 py-2.5 text-micro text-ink-500">
                      {sourceTypeLabels[entry.source.type] ?? entry.source.type}
                    </td>

                    {/* Fields provided */}
                    <td className="px-5 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {entry.fieldsProvided.map((field) => (
                          <span
                            key={field}
                            className="
                              inline-block rounded-badge bg-stone-light px-1.5 py-0.5
                              text-micro text-ink-600
                            "
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Retrieved at */}
                    <td className="px-5 py-2.5 text-micro text-ink-500 whitespace-nowrap">
                      {formatDateTime(entry.retrievedAt)}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-2.5">
                      <span
                        className={`
                          inline-flex items-center rounded-badge px-1.5 py-0.5
                          text-micro font-semibold ${st.bg} ${st.text}
                        `}
                      >
                        {st.label}
                      </span>
                    </td>

                    {/* Response time */}
                    <td className="px-5 py-2.5 text-micro text-ink-500 text-right font-mono">
                      {entry.responseTimeMs !== undefined
                        ? formatResponseTime(entry.responseTimeMs)
                        : "\u2014"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}
