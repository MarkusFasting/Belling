"use client";

import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { usePropertyData } from "@/hooks/usePropertyData";
import PropertySummary from "@/components/property/PropertySummary";
import IdentitySection from "@/components/property/IdentitySection";
import MapSection from "@/components/property/MapSection";
import ZoningSection from "@/components/property/ZoningSection";
import FieldValidationSection from "@/components/property/FieldValidationSection";
import DocumentAnalysisSection from "@/components/property/DocumentAnalysisSection";
import DiscrepancySection from "@/components/property/DiscrepancySection";
import SourceRegistrySection from "@/components/property/SourceRegistrySection";
import ActionsSection from "@/components/property/ActionsSection";
import ChatPanel from "@/components/chat/ChatPanel";
import DocumentUpload from "@/components/document/DocumentUpload";
import Skeleton from "@/components/ui/Skeleton";

const navSections = [
  { id: "sammendrag", label: "Sammendrag" },
  { id: "identitet", label: "Identitet" },
  { id: "kart", label: "Kart" },
  { id: "plandata", label: "Plandata" },
  { id: "validering", label: "Feltvalidering" },
  { id: "dokumenter", label: "Dokumenter" },
  { id: "avvik", label: "Avvik" },
  { id: "kilder", label: "Kilder" },
  { id: "handlinger", label: "Handlinger" },
];

function parseSlug(slug: string) {
  const parts = slug.split("-");
  if (parts.length < 3) return null;
  const kommune = parts[0];
  const gnr = parseInt(parts[1], 10);
  const bnr = parseInt(parts[2], 10);
  if (isNaN(gnr) || isNaN(bnr)) return null;
  return { kommune, gnr, bnr };
}

export default function PropertyPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const parsed = useMemo(() => parseSlug(slug), [slug]);

  const { report, loading, error } = usePropertyData(
    parsed?.kommune ?? "",
    parsed?.gnr ?? 0,
    parsed?.bnr ?? 0
  );

  const [chatOpen, setChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("sammendrag");

  if (!parsed) {
    return (
      <div className="section-spacing">
        <div className="container-narrow text-center">
          <h1 className="text-display-sm mb-4">Ugyldig eiendomsreferanse</h1>
          <p className="text-body text-ink-500">
            URL-formatet skal være /eiendom/kommunenr-gnr-bnr, f.eks.
            /eiendom/0301-123-45
          </p>
          <a href="/sok" className="btn-primary mt-6 inline-block">
            Gå til søk
          </a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-spacing">
        <div className="container-narrow text-center">
          <h1 className="text-display-sm mb-4 text-avvik">
            Kunne ikke hente eiendomsdata
          </h1>
          <p className="text-body text-ink-500 mb-6">{error}</p>
          <a href="/sok" className="btn-primary">
            Prøv et nytt søk
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-warm">
      {/* Mobile chat FAB */}
      <button
        onClick={() => setChatOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-mineral text-white rounded-full shadow-elevated flex items-center justify-center hover:bg-mineral-dark transition-colors"
        aria-label="Åpne chat"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Mobile chat overlay */}
      {chatOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between p-4 border-b border-stone-border">
            <h2 className="text-heading-sm">Spør om eiendommen</h2>
            <button
              onClick={() => setChatOpen(false)}
              className="p-2 text-ink-400 hover:text-ink"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="h-[calc(100vh-64px)]">
            <ChatPanel
              kommune={parsed.kommune}
              gnr={parsed.gnr}
              bnr={parsed.bnr}
            />
          </div>
        </div>
      )}

      <div className="container-page py-8">
        <div className="flex gap-8">
          {/* Left sidebar nav — desktop only */}
          <aside className="hidden lg:block w-48 shrink-0">
            <nav className="sticky top-24 space-y-1">
              {navSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setActiveSection(section.id)}
                  className={`block px-3 py-2 rounded-button text-body-sm transition-colors ${
                    activeSection === section.id
                      ? "bg-mineral-wash text-mineral font-medium"
                      : "text-ink-500 hover:text-ink hover:bg-stone-light"
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-8">
            {loading || !report ? (
              <div className="space-y-6">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-60 w-full" />
                <Skeleton className="h-96 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            ) : (
              <>
                <div id="sammendrag">
                  <PropertySummary report={report} />
                </div>

                <div id="identitet">
                  <IdentitySection identity={report.identity} />
                </div>

                <div id="kart">
                  <MapSection
                    coordinates={report.identity.koordinater.value}
                    address={report.identity.adresse.value}
                    kommune={parsed.kommune}
                    gnr={parsed.gnr}
                    bnr={parsed.bnr}
                  />
                </div>

                <div id="plandata">
                  <ZoningSection zoning={report.zoning} />
                </div>

                <div id="validering">
                  <FieldValidationSection report={report} />
                </div>

                <div id="dokumenter">
                  <DocumentUpload />
                  <div className="mt-6">
                    <DocumentAnalysisSection documents={report.documents} />
                  </div>
                </div>

                <div id="avvik">
                  <DiscrepancySection discrepancies={report.discrepancies} />
                </div>

                <div id="kilder">
                  <SourceRegistrySection sources={report.sources} />
                </div>

                <div id="handlinger">
                  <ActionsSection
                    kommune={parsed.kommune}
                    gnr={parsed.gnr}
                    bnr={parsed.bnr}
                  />
                </div>
              </>
            )}
          </main>

          {/* Right sidebar — chat — desktop only */}
          <aside className="hidden lg:block w-[380px] shrink-0">
            <div className="sticky top-24 h-[calc(100vh-8rem)]">
              <ChatPanel
                kommune={parsed.kommune}
                gnr={parsed.gnr}
                bnr={parsed.bnr}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
