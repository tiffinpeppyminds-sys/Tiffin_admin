"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ToggleRow({
  label,
  description,
  enabled,
  onToggle,
  badge,
  action,
  descriptionExtra,
}: {
  label: string;
  description: string;
  enabled?: boolean;
  onToggle?: () => void;
  badge?: string;
  action?: ReactNode;
  descriptionExtra?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-8 border-b border-neutral-200 py-6 last:border-b-0">
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-black">{label}</p>
          {badge ? (
            <span className="rounded bg-[#276ef1] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              {badge}
            </span>
          ) : null}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
          {description}
          {descriptionExtra}
        </p>
      </div>
      {action ?? (
        <div className="flex shrink-0 items-center gap-2 pt-1">
          <span className="text-sm font-medium text-black">{enabled ? "On" : "Off"}</span>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={onToggle}
            className={cn(
              "relative inline-flex h-7 w-12 items-center rounded-full transition-colors",
              enabled ? "bg-[#06c167]" : "bg-neutral-300",
            )}
          >
            <span
              className={cn(
                "inline-block size-5 rounded-full bg-white shadow transition-transform",
                enabled ? "translate-x-6" : "translate-x-1",
              )}
            />
          </button>
        </div>
      )}
    </div>
  );
}
