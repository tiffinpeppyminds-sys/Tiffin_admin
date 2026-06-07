"use client";

import { cn } from "@/lib/utils";

export function SelectionCard({
  title,
  description,
  badge,
  selected,
  onSelect,
}: {
  title: string;
  description?: string;
  badge?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-xl p-4 text-left transition-colors",
        selected ? "border-2 border-black" : "border border-neutral-200 hover:border-neutral-300",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-black">{title}</p>
          {description ? <p className="mt-1 text-sm text-neutral-600">{description}</p> : null}
          {badge ? <p className="mt-1.5 text-sm font-medium text-[#06c167]">{badge}</p> : null}
        </div>
        <span
          className={cn(
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2",
            selected ? "border-black bg-black" : "border-neutral-300 bg-white",
          )}
        >
          {selected ? <span className="size-2 rounded-full bg-white" /> : null}
        </span>
      </div>
    </button>
  );
}
