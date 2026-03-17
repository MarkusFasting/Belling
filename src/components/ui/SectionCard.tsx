"use client";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}

export default function SectionCard({
  title,
  subtitle,
  icon,
  children,
  id,
}: SectionCardProps) {
  return (
    <section
      id={id}
      className="
        bg-white rounded-card shadow-card
        border border-stone-border/50
        border-t-2 border-t-mineral-muted
        overflow-hidden
      "
    >
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-2.5">
          {icon && (
            <span className="flex items-center justify-center w-8 h-8 rounded-badge bg-mineral-wash text-mineral">
              {icon}
            </span>
          )}
          <div>
            <h2 className="text-heading-sm text-ink">{title}</h2>
            {subtitle && (
              <p className="text-body-sm text-ink-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      <div className="px-5 pb-5">{children}</div>
    </section>
  );
}
