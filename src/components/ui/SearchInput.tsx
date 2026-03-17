"use client";

import { useRef, useEffect, useState } from "react";
import type { SearchResult } from "@/types";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  results: SearchResult[];
  loading: boolean;
  onSelect: (result: SearchResult) => void;
  placeholder?: string;
  size?: "default" | "large";
}

export default function SearchInput({
  value,
  onChange,
  results,
  loading,
  onSelect,
  placeholder = "Søk etter adresse eller matrikkel...",
  size = "default",
}: SearchInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const showDropdown = isFocused && (results.length > 0 || loading);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLarge = size === "large";

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input wrapper */}
      <div
        className={`
          relative flex items-center bg-white
          border border-stone-border rounded-input
          transition-shadow duration-200
          ${isFocused ? "shadow-input-focus border-mineral-muted" : "shadow-card hover:shadow-card-hover"}
          ${isLarge ? "h-14" : "h-10"}
        `}
      >
        {/* Magnifying glass icon */}
        <div
          className={`
            flex items-center justify-center shrink-0 text-ink-400
            ${isLarge ? "pl-4 pr-2" : "pl-3 pr-2"}
          `}
        >
          <svg
            width={isLarge ? 22 : 18}
            height={isLarge ? 22 : 18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className={`
            flex-1 bg-transparent outline-none text-ink placeholder:text-ink-400
            ${isLarge ? "text-body-lg pr-4" : "text-body pr-3"}
          `}
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />

        {/* Loading spinner */}
        {loading && (
          <div
            className={`
              shrink-0 animate-spin rounded-full
              border-2 border-stone-mid border-t-mineral
              ${isLarge ? "w-5 h-5 mr-4" : "w-4 h-4 mr-3"}
            `}
            aria-label="Søker..."
          />
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          className="
            absolute z-50 top-full left-0 right-0 mt-1.5
            bg-white border border-stone-border rounded-card
            shadow-elevated overflow-hidden
            max-h-72 overflow-y-auto
          "
          role="listbox"
        >
          {loading && results.length === 0 ? (
            <div className="px-4 py-5 text-center text-body-sm text-ink-400">
              Søker...
            </div>
          ) : (
            results.map((result) => (
              <button
                key={result.slug}
                type="button"
                role="option"
                aria-selected={false}
                className="
                  w-full text-left px-4 py-3
                  hover:bg-stone-warm transition-colors duration-100
                  border-b border-stone-border/40 last:border-b-0
                  focus:outline-none focus:bg-stone-warm
                "
                onClick={() => {
                  onSelect(result);
                  setIsFocused(false);
                }}
              >
                <div className="text-body font-medium text-ink">
                  {result.address}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-caption text-ink-500">
                    {result.municipality}
                  </span>
                  <span className="text-micro text-ink-400" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-caption text-ink-400 font-mono">
                    {result.gnr}/{result.bnr}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
