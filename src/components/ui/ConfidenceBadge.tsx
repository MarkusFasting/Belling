"use client";

import type { ConfidenceLevel } from "@/types";

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  size?: "sm" | "md";
}

const config: Record<
  ConfidenceLevel,
  { label: string; bg: string; text: string }
> = {
  dokumentert: {
    label: "Dokumentert",
    bg: "bg-confidence-dokumentert/15",
    text: "text-confidence-dokumentert",
  },
  opplyst: {
    label: "Opplyst",
    bg: "bg-confidence-opplyst/15",
    text: "text-confidence-opplyst",
  },
  utledet: {
    label: "Utledet",
    bg: "bg-confidence-utledet/15",
    text: "text-confidence-utledet",
  },
  uavklart: {
    label: "Uavklart",
    bg: "bg-confidence-uavklart/15",
    text: "text-confidence-uavklart",
  },
};

export default function ConfidenceBadge({
  level,
  size = "sm",
}: ConfidenceBadgeProps) {
  const { label, bg, text } = config[level];

  return (
    <span
      className={`
        inline-flex items-center rounded-badge font-medium select-none
        ${bg} ${text}
        ${size === "sm" ? "px-1.5 py-0.5 text-micro" : "px-2 py-0.5 text-caption"}
      `}
    >
      {label}
    </span>
  );
}
