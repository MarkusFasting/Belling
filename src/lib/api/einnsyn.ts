// ─── eInnsyn API ────────────────────────────────────────────

const EINNSYN_API = "https://api.einnsyn.no";

// ─── Types ──────────────────────────────────────────────────

export interface EinnsynResult {
  title: string;
  description?: string;
  publisher?: string;
  date?: string;
  url?: string;
}

interface EinnsynApiHit {
  _source?: {
    tittel?: string;
    beskrivelse?: string;
    publisertAv_navn?: string;
    publisertDato?: string;
    journaldato?: string;
    saksdato?: string;
    dokumentUrl?: string;
    arkivskaperNavn?: string;
  };
  tittel?: string;
  beskrivelse?: string;
}

interface EinnsynApiResponse {
  hits?: {
    hits?: EinnsynApiHit[];
    total?: number | { value: number };
  };
  _embedded?: {
    searchResults?: Array<{
      tittel?: string;
      beskrivelse?: string;
      publisertAv?: string;
      dato?: string;
      url?: string;
    }>;
  };
}

// ─── Public functions ───────────────────────────────────────

/**
 * Search public building case documents on eInnsyn.
 * @param query - Search query string
 * @param limit - Maximum number of results (default 10)
 * @returns Array of results, or null on error
 */
export async function searchEinnsyn(
  query: string,
  limit: number = 10
): Promise<EinnsynResult[] | null> {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: String(limit),
    });

    const response = await fetch(`${EINNSYN_API}/api/search?${params.toString()}`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(`eInnsyn API returned ${response.status}: ${response.statusText}`);
      return null;
    }

    const data: EinnsynApiResponse = await response.json();

    // Handle Elasticsearch-style response
    if (data.hits?.hits) {
      return data.hits.hits.map((hit) => {
        const source = hit._source;
        if (source) {
          return {
            title: source.tittel ?? "Uten tittel",
            description: source.beskrivelse ?? undefined,
            publisher: source.publisertAv_navn ?? source.arkivskaperNavn ?? undefined,
            date: source.journaldato ?? source.publisertDato ?? source.saksdato ?? undefined,
            url: source.dokumentUrl ?? undefined,
          };
        }
        return {
          title: hit.tittel ?? "Uten tittel",
          description: hit.beskrivelse ?? undefined,
        };
      });
    }

    // Handle embedded response format
    if (data._embedded?.searchResults) {
      return data._embedded.searchResults.map((result) => ({
        title: result.tittel ?? "Uten tittel",
        description: result.beskrivelse ?? undefined,
        publisher: result.publisertAv ?? undefined,
        date: result.dato ?? undefined,
        url: result.url ?? undefined,
      }));
    }

    return [];
  } catch (error) {
    console.error(
      "Error searching eInnsyn:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}
