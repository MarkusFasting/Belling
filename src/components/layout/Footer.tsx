import Link from "next/link";

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

const columns: FooterColumn[] = [
  {
    heading: "Produkt",
    links: [
      { label: "Søk", href: "/sok" },
      { label: "Eiendomsrapport", href: "/rapport" },
      { label: "Priser", href: "/pris" },
    ],
  },
  {
    heading: "Ressurser",
    links: [
      { label: "Om oss", href: "/om" },
      { label: "Datakilder", href: "/datakilder" },
      { label: "API-status", href: "/api-status" },
    ],
  },
  {
    heading: "Juridisk",
    links: [
      { label: "Personvern", href: "/personvern" },
      { label: "Vilkår", href: "/vilkar" },
      { label: "Ansvarsfraskrivelse", href: "/ansvarsfraskrivelse" },
    ],
  },
  {
    heading: "Kontakt",
    links: [
      { label: "info@eiendomsgrunn.no", href: "mailto:info@eiendomsgrunn.no" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-caption uppercase tracking-wider text-ink-400 mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-ink-300 hover:text-white transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-ink-800">
          <p className="text-caption text-ink-500">
            &copy; 2026 Eiendomsgrunn AS &middot; Alle data fra offentlige
            registre
          </p>
        </div>
      </div>
    </footer>
  );
}
