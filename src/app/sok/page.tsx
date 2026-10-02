"use client";

import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import SearchInput from "@/components/ui/SearchInput";
import type { SearchResult } from "@/types";

export default function SearchPage() {
  const router = useRouter();
  const { query, setQuery, results, loading, error } = useSearch();

  function handleSelect(result: SearchResult) {
    router.push(`/eiendom/${result.slug}`);
  }

  return (
    <div className="section-spacing">
      <div className="container-narrow">
        <div className="mb-10">
          <h1 className="text-display-sm mb-3">Søk etter eiendom</h1>
          <p className="text-body-lg text-ink-500">
            Skriv inn en adresse for å finne eiendomsinformasjon fra offentlige
            registre.
          </p>
        </div>

        <SearchInput
          value={query}
          onChange={setQuery}
          results={results}
          loading={loading}
          onSelect={handleSelect}
          placeholder="Adresse, f.eks. Storgata 1, Oslo..."
        />

        {error && (
          <div className="mt-4 p-4 bg-avvik/10 border border-avvik/20 rounded-card">
            <p className="text-body-sm text-avvik">{error}</p>
          </div>
        )}

        {query.length >= 2 && !loading && results.length === 0 && !error && (
          <div className="mt-8 text-center py-12">
            <p className="text-body text-ink-400">
              Ingen resultater for &laquo;{query}&raquo;
            </p>
            <p className="text-body-sm text-ink-400 mt-1">
              Prøv en annen adresse eller bruk færre søkeord
            </p>
          </div>
        )}

        {query.length < 2 && (
          <div className="mt-12">
            <h2 className="text-heading-sm text-ink-600 mb-6">
              Slik fungerer det
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="card-base p-5">
                <div className="w-8 h-8 rounded-full bg-mineral-wash text-mineral flex items-center justify-center text-body font-semibold mb-3">
                  1
                </div>
                <h3 className="text-heading-sm mb-1">Søk</h3>
                <p className="text-body-sm text-ink-500">
                  Skriv inn adressen og velg fra listen med resultater fra
                  Kartverket.
                </p>
              </div>
              <div className="card-base p-5">
                <div className="w-8 h-8 rounded-full bg-mineral-wash text-mineral flex items-center justify-center text-body font-semibold mb-3">
                  2
                </div>
                <h3 className="text-heading-sm mb-1">Analyser</h3>
                <p className="text-body-sm text-ink-500">
                  Vi henter data fra offentlige registre og sammenstiller en
                  komplett rapport.
                </p>
              </div>
              <div className="card-base p-5">
                <div className="w-8 h-8 rounded-full bg-mineral-wash text-mineral flex items-center justify-center text-body font-semibold mb-3">
                  3
                </div>
                <h3 className="text-heading-sm mb-1">Verifiser</h3>
                <p className="text-body-sm text-ink-500">
                  Last opp salgsoppgave eller takst for å sammenligne mot
                  offisielle data.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 p-4 bg-stone-light rounded-card">
          <p className="text-caption text-ink-400 text-center">
            Data hentes direkte fra Kartverkets adresseregister (Geonorge) —
            oppdatert i sanntid
          </p>
        </div>
      </div>
    </div>
  );
}
