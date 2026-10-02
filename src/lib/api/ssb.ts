// ─── SSB Statistikkbanken API ───────────────────────────────

const SSB_API = "https://data.ssb.no/api/v0/no/table";

// ─── Types ──────────────────────────────────────────────────

interface SSBQueryPayload {
  query: Array<{
    code: string;
    selection: {
      filter: string;
      values: string[];
    };
  }>;
  response: {
    format: string;
  };
}

interface SSBJsonStatResponse {
  dataset: {
    dimension: {
      [key: string]: {
        category: {
          index: Record<string, number>;
          label: Record<string, string>;
        };
      };
    };
    value: number[];
  };
}

export interface BoligprisIndeksEntry {
  year: string;
  index: number;
}

// ─── Public functions ───────────────────────────────────────

/**
 * Fetch boligprisindeks (housing price index) from SSB table 07241.
 * @param region - SSB region code (e.g., "0301" for Oslo)
 * @returns Array of year/index pairs, or null on error
 */
export async function getBoligprisIndeks(
  region: string
): Promise<BoligprisIndeksEntry[] | null> {
  try {
    const payload: SSBQueryPayload = {
      query: [
        {
          code: "Boligtype",
          selection: {
            filter: "item",
            values: ["00"], // All dwelling types
          },
        },
        {
          code: "Region",
          selection: {
            filter: "item",
            values: [region],
          },
        },
        {
          code: "ContentsCode",
          selection: {
            filter: "item",
            values: ["Boligpris"], // Boligprisindeks
          },
        },
        {
          code: "Tid",
          selection: {
            filter: "top",
            values: ["10"], // Last 10 periods
          },
        },
      ],
      response: {
        format: "json-stat2",
      },
    };

    const response = await fetch(`${SSB_API}/07241`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`SSB API returned ${response.status}: ${response.statusText}`);
      return null;
    }

    const data: SSBJsonStatResponse = await response.json();

    if (!data.dataset || !data.dataset.value) {
      return null;
    }

    const tidDimension = data.dataset.dimension["Tid"];
    if (!tidDimension) {
      return null;
    }

    const yearLabels = tidDimension.category.label;
    const yearIndex = tidDimension.category.index;
    const values = data.dataset.value;

    const results: BoligprisIndeksEntry[] = [];

    for (const [code, label] of Object.entries(yearLabels)) {
      const idx = yearIndex[code];
      if (idx !== undefined && idx < values.length) {
        results.push({
          year: label,
          index: values[idx],
        });
      }
    }

    // Sort chronologically
    results.sort((a, b) => a.year.localeCompare(b.year));

    return results;
  } catch (error) {
    console.error(
      "Error fetching boligprisindeks from SSB:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}
