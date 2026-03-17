"use client";

interface AlertCardProps {
  type: "info" | "warning" | "error" | "limit";
  title: string;
  children: React.ReactNode;
}

const config: Record<
  AlertCardProps["type"],
  { border: string; bg: string; text: string; iconBg: string; icon: string }
> = {
  info: {
    border: "border-l-confidence-opplyst",
    bg: "bg-confidence-opplyst/6",
    text: "text-confidence-opplyst",
    iconBg: "bg-confidence-opplyst/12",
    icon: "ℹ",
  },
  warning: {
    border: "border-l-confidence-utledet",
    bg: "bg-confidence-utledet/6",
    text: "text-confidence-utledet",
    iconBg: "bg-confidence-utledet/12",
    icon: "⚠",
  },
  error: {
    border: "border-l-avvik",
    bg: "bg-avvik/6",
    text: "text-avvik",
    iconBg: "bg-avvik/12",
    icon: "✕",
  },
  limit: {
    border: "border-l-confidence-uavklart",
    bg: "bg-confidence-uavklart/6",
    text: "text-confidence-uavklart",
    iconBg: "bg-confidence-uavklart/12",
    icon: "◻",
  },
};

export default function AlertCard({ type, title, children }: AlertCardProps) {
  const { border, bg, text, iconBg, icon } = config[type];

  return (
    <div
      className={`
        rounded-card border border-stone-border/40
        border-l-[3px] ${border} ${bg}
        p-4
      `}
      role="alert"
    >
      <div className="flex gap-3">
        <span
          className={`
            flex items-center justify-center shrink-0
            w-6 h-6 rounded-badge text-micro
            ${iconBg} ${text}
          `}
          aria-hidden="true"
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p className={`text-caption font-semibold ${text}`}>{title}</p>
          <div className="mt-1 text-body-sm text-ink-600">{children}</div>
        </div>
      </div>
    </div>
  );
}
