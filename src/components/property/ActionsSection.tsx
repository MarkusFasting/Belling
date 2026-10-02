"use client";

import SectionCard from "@/components/ui/SectionCard";

interface ActionsSectionProps {
  kommune: string;
  gnr: number;
  bnr: number;
}

interface ActionCard {
  icon: string;
  title: string;
  description: string;
  action: {
    label: string;
    href?: string;
    disabled?: boolean;
  };
}

export default function ActionsSection({
  kommune,
  gnr,
  bnr,
}: ActionsSectionProps) {
  const actions: ActionCard[] = [
    {
      icon: "\u2191",
      title: "Last opp dokument",
      description:
        "Last opp salgsoppgave eller takstrapport for automatisk analyse og kryssvalidering mot offentlige data.",
      action: {
        label: "Last opp",
      },
    },
    {
      icon: "\u2193",
      title: "Bestill grunnbok",
      description:
        "Hent offisielle grunnboksopplysninger med hjemmelsforhold, heftelser og servitutter fra Kartverket.",
      action: {
        label: "G\u00E5 til Infoland",
        href: `https://www.infoland.no/`,
      },
    },
    {
      icon: "\u2709",
      title: "Kontakt kommunen",
      description: `Ta kontakt med ${kommune} kommune for detaljert planinformasjon, byggesaker og reguleringsbestemmelser for ${gnr}/${bnr}.`,
      action: {
        label: "Finn kontaktinfo",
        href: `https://www.${kommune.toLowerCase().replace(/\s+/g, "")}.kommune.no/`,
      },
    },
    {
      icon: "\u2193",
      title: "Last ned rapport",
      description:
        "Eksporter eiendomsrapporten som PDF med alle datapunkter, kilder og avviksvurdering.",
      action: {
        label: "Kommer snart",
        disabled: true,
      },
    },
  ];

  return (
    <SectionCard
      title="Videre handlinger"
      subtitle="Neste steg for eiendomsunders\u00F8kelsen"
      id="actions"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((card) => (
          <div
            key={card.title}
            className={`
              group relative flex flex-col rounded-card border border-stone-border/50
              bg-white p-5 transition-all
              ${card.action.disabled
                ? "opacity-60 cursor-not-allowed"
                : "hover:shadow-card-hover hover:border-mineral-muted cursor-pointer"
              }
            `}
          >
            {/* Icon */}
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-badge bg-mineral-wash">
              <span
                className="text-heading-sm text-mineral"
                aria-hidden="true"
              >
                {card.icon}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-body font-semibold text-ink mb-1">
              {card.title}
            </h3>
            <p className="text-body-sm text-ink-500 mb-4 flex-1">
              {card.description}
            </p>

            {/* Action */}
            {card.action.href && !card.action.disabled ? (
              <a
                href={card.action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  rounded-button border border-mineral/30 bg-mineral-wash
                  px-4 py-2 text-caption font-semibold text-mineral
                  transition-colors hover:bg-mineral/10
                "
              >
                {card.action.label}
                <span className="ml-1.5 text-micro" aria-hidden="true">
                  {"\u2197"}
                </span>
              </a>
            ) : (
              <button
                type="button"
                disabled={card.action.disabled}
                className={`
                  inline-flex items-center justify-center
                  rounded-button px-4 py-2 text-caption font-semibold
                  transition-colors
                  ${card.action.disabled
                    ? "border border-stone-border/50 bg-stone-light text-ink-400 cursor-not-allowed"
                    : "border border-mineral/30 bg-mineral-wash text-mineral hover:bg-mineral/10"
                  }
                `}
              >
                {card.action.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
