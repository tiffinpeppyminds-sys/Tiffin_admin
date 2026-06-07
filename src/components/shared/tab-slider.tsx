"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function TabSlider<T extends string>({
  options,
  value,
  onChange,
  className,
  size = "md",
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
  size?: "sm" | "md";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const active = track.querySelector<HTMLButtonElement>(`[data-value="${value}"]`);
    if (!active) return;
    setIndicator({ left: active.offsetLeft, width: active.offsetWidth });
  }, [value]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator, options]);

  return (
    <div
      ref={trackRef}
      className={cn(
        "scrollbar-none relative inline-flex max-w-full overflow-x-auto rounded-full bg-[#f0f0f0] p-1",
        size === "sm" ? "p-0.5" : "p-1",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-black shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ left: indicator.left, width: indicator.width }}
      />
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          data-value={opt}
          onClick={() => onChange(opt)}
          className={cn(
            "relative z-10 shrink-0 rounded-full font-medium transition-colors duration-200",
            size === "sm" ? "px-3.5 py-1.5 text-xs" : "px-4 py-2 text-sm",
            value === opt ? "text-white" : "text-neutral-600 hover:text-black",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
