"use client";

import type { ConfidenceLevel } from "@/types";
import ConfidenceBadge from "./ConfidenceBadge";

interface DataRowProps {
  label: string;
  value: string | number;
  confidence?: ConfidenceLevel;
  source?: string;
  mono?: boolean;
}

export default function DataRow({
  label,
  value,
  confidence,
  source,
  mono = false,
}: DataRowProps) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 border-b border-stone-border/60 last:border-b-0">
      <div className="flex items-center justify-between gap-4">
        <span className="text-caption text-ink-500 shrink-0">{label}</span>
        <div className="flex items-center gap-2 text-right">
          <span
            className={`text-body font-medium text-ink ${mono ? "font-mono" : ""}`}
          >
            {value}
          </span>
          {confidence && <ConfidenceBadge level={confidence} size="sm" />}
        </div>
      </div>
      {source && (
        <span className="text-micro text-ink-400 text-right">{source}</span>
      )}
    </div>
  );
}
