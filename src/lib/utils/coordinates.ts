// ─── Coordinate utilities ───────────────────────────────────

interface LatLng {
  lat: number;
  lng: number;
}

/**
 * Convert EPSG:4258 (ETRS89) coordinates to WGS84 lat/lng.
 * EPSG:4258 and WGS84 are essentially identical for practical purposes
 * (sub-meter differences), so this is a direct mapping.
 *
 * @param nord - Northing / latitude in EPSG:4258
 * @param ost - Easting / longitude in EPSG:4258
 */
export function toLatLng(nord: number, ost: number): LatLng {
  return {
    lat: nord,
    lng: ost,
  };
}

/**
 * Format coordinates as a human-readable string with Norwegian convention.
 * Uses "N" for north and "\u00D8" (Ø) for east.
 *
 * @example formatCoordinates(59.911, 10.733) => "59.9110\u00B0 N, 10.7330\u00B0 \u00D8"
 */
export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "\u00D8" : "V";

  const latFormatted = Math.abs(lat).toFixed(4);
  const lngFormatted = Math.abs(lng).toFixed(4);

  return `${latFormatted}\u00B0 ${latDir}, ${lngFormatted}\u00B0 ${lngDir}`;
}
