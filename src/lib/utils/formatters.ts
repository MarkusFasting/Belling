import type { ConfidenceLevel, ValidationStatus } from "@/types";

// ─── Norwegian month names ──────────────────────────────────

const NORWEGIAN_MONTHS: Record<number, string> = {
  0: "januar",
  1: "februar",
  2: "mars",
  3: "april",
  4: "mai",
  5: "juni",
  6: "juli",
  7: "august",
  8: "september",
  9: "oktober",
  10: "november",
  11: "desember",
};

// ─── Public functions ───────────────────────────────────────

/**
 * Format a matrikkel number in the standard Norwegian format.
 * @example formatMatrikkel("0301", 123, 45) => "0301-123/45"
 */
export function formatMatrikkel(kommune: string, gnr: number, bnr: number): string {
  return `${kommune}-${gnr}/${bnr}`;
}

/**
 * Format an ISO date string to Norwegian locale format.
 * @example formatDate("2026-03-17") => "17. mars 2026"
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    return isoDate; // Return original if unparseable
  }

  const day = date.getDate();
  const month = NORWEGIAN_MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${day}. ${month} ${year}`;
}

/**
 * Format a number with Norwegian thousands separator (non-breaking space).
 * @example formatNumber(1234567) => "1 234 567"
 */
export function formatNumber(n: number): string {
  const parts = Math.abs(n).toFixed(0).split("");
  const formatted: string[] = [];

  for (let i = parts.length - 1, count = 0; i >= 0; i--, count++) {
    if (count > 0 && count % 3 === 0) {
      formatted.unshift("\u00A0"); // Non-breaking space
    }
    formatted.unshift(parts[i]);
  }

  return n < 0 ? `-${formatted.join("")}` : formatted.join("");
}

/**
 * Format an area value in square meters with Norwegian formatting.
 * @example formatArea(1234) => "1 234 m\u00B2"
 */
export function formatArea(sqm: number): string {
  return `${formatNumber(sqm)} m\u00B2`;
}

/**
 * Format a currency amount in Norwegian kroner.
 * @example formatCurrency(1234567) => "1 234 567 kr"
 */
export function formatCurrency(amount: number): string {
  return `${formatNumber(amount)} kr`;
}

/**
 * Return a human-readable Norwegian label for a confidence level.
 */
export function confidenceLabel(level: ConfidenceLevel): string {
  const labels: Record<ConfidenceLevel, string> = {
    dokumentert: "Dokumentert i offentlig register",
    opplyst: "Opplyst av eier/megler",
    utledet: "Utledet fra tilgjengelige data",
    uavklart: "Uavklart - trenger verifisering",
  };
  return labels[level];
}

/**
 * Return a human-readable Norwegian label for a validation status.
 */
export function validationLabel(status: ValidationStatus): string {
  const labels: Record<ValidationStatus, string> = {
    bekreftet_flere: "Bekreftet av flere kilder",
    bekreftet_en: "Bekreftet av \u00E9n kilde",
    avvik: "Avvik mellom kilder",
    ikke_funnet: "Ikke funnet i offentlige registre",
    kun_dokument: "Kun funnet i opplastet dokument",
    ai_utledet: "Utledet av AI-analyse",
  };
  return labels[status];
}
