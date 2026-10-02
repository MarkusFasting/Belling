"use client";

import type { ValidationStatus } from "@/types";

interface ValidationBadgeProps {
  status: ValidationStatus;
}

const config: Record<
  ValidationStatus,
  { label: string; bg: string; text: string; icon: string }
> = {
  bekreftet_flere: {
    label: "Bekreftet av flere kilder",
    bg: "bg-confidence-dokumentert/12",
    text: "text-confidence-dokumentert",
    icon: "✓✓",
  },
  bekreftet_en: {
    label: "Bekreftet av én kilde",
    bg: "bg-confidence-dokumentert/8",
    text: "text-confidence-dokumentert",
    icon: "✓",
  },
  avvik: {
    label: "Avvik funnet",
    bg: "bg-avvik/12",
    text: "text-avvik",
    icon: "!",
  },
  ikke_funnet: {
    label: "Ikke funnet",
    bg: "bg-confidence-uavklart/12",
    text: "text-confidence-uavklart",
    icon: "—",
  },
  kun_dokument: {
    label: "Kun i dokument",
    bg: "bg-confidence-utledet/12",
    text: "text-confidence-utledet",
    icon: "◇",
  },
  ai_utledet: {
    label: "AI-utledet",
    bg: "bg-confidence-opplyst/12",
    text: "text-confidence-opplyst",
    icon: "◈",
  },
};

export default function ValidationBadge({ status }: ValidationBadgeProps) {
  const { label, bg, text, icon } = config[status];

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-badge px-2 py-0.5
        text-micro font-medium select-none
        ${bg} ${text}
      `}
    >
      <span className="text-[0.6rem] leading-none" aria-hidden="true">
        {icon}
      </span>
      {label}
    </span>
  );
}
