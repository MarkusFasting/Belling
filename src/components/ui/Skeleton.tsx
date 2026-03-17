"use client";

interface SkeletonProps {
  className?: string;
  lines?: number;
}

const lineWidths = ["w-full", "w-3/4", "w-5/6", "w-2/3", "w-4/5"];

export default function Skeleton({ className, lines }: SkeletonProps) {
  if (lines) {
    return (
      <div className="flex flex-col gap-2.5" role="status" aria-label="Laster...">
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`
              h-3.5 rounded-badge animate-pulse bg-stone-mid/50
              ${lineWidths[i % lineWidths.length]}
            `}
          />
        ))}
        <span className="sr-only">Laster...</span>
      </div>
    );
  }

  return (
    <div role="status" aria-label="Laster...">
      <div
        className={`rounded-badge animate-pulse bg-stone-mid/50 ${className ?? "h-10 w-full"}`}
      />
      <span className="sr-only">Laster...</span>
    </div>
  );
}
