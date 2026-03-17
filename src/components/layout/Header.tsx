"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/sok", label: "Søk" },
  { href: "/om", label: "Om" },
  { href: "/pris", label: "Pris" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-stone-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-semibold text-heading-sm tracking-tight text-ink-900"
          >
            Eiendomsgrunn
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-body-sm transition ${
                    isActive
                      ? "text-ink-900"
                      : "text-ink-600 hover:text-ink"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-[1.19rem] left-0 right-0 h-[2px] bg-mineral rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
            aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block h-[2px] w-5 bg-ink-700 rounded-full transition-transform origin-center ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-ink-700 rounded-full transition-opacity ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-ink-700 rounded-full transition-transform origin-center ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile slide-down nav */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          mobileOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 px-3 rounded-button text-body-sm transition ${
                  isActive
                    ? "text-ink-900 bg-stone-warm border-l-2 border-mineral"
                    : "text-ink-600 hover:text-ink hover:bg-stone-warm"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
