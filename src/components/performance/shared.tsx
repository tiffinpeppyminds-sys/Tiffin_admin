"use client";

import { useState, type ReactNode } from "react";
import {
  ChevronDown,
  ChevronRight,
  CloudDownload,
  Info,
  RefreshCw,
} from "lucide-react";
import { EmptyOrdersIcon } from "@/components/orders/empty-orders-icon";
import { cn } from "@/lib/utils";

export function FilterDropdown({
  label,
  options,
  onSelect,
}: {
  label: string;
  options: string[];
  onSelect?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(label);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-black hover:bg-neutral-50"
      >
        {value}
        <ChevronDown className="size-3.5 text-neutral-500" />
      </button>
      {open ? (
        <div className="absolute left-0 top-10 z-20 w-52 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setValue(opt);
                onSelect?.(opt);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
            >
              {opt}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function PerformanceFilters({ showDate = true }: { showDate?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterDropdown label="All shops (2)" options={["All shops (2)", "Maikhana Adelaide", "Scoop Shoppe"]} />
      {showDate ? <FilterDropdown label="Last 7 days" options={["Last 7 days", "Last 30 days", "Today"]} /> : null}
    </div>
  );
}

export function DownloadButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-black hover:bg-neutral-50",
        className,
      )}
    >
      <CloudDownload className="size-4" />
      Download
    </button>
  );
}

export function PillTabs<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-full bg-[#f3f3f3] p-1">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            value === opt ? "bg-black text-white" : "text-black hover:bg-neutral-200/60",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function FilterPills<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
            value === opt ? "bg-black text-white" : "border border-neutral-300 text-black hover:bg-neutral-50",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function SectionCard({
  title,
  subtitle,
  action,
  children,
  className,
}: {
  title: ReactNode;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-xl border border-neutral-200 bg-white", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-100 px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-black">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function EmptyResults({ label = "No results" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <EmptyOrdersIcon />
      <p className="mt-4 text-sm font-medium text-neutral-500">{label}</p>
    </div>
  );
}

export function InfoLabel({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-neutral-600">
      {label}
      <Info className="size-3.5 text-neutral-400" />
    </span>
  );
}

export function TrendBadge({ value, positiveIsGood = true }: { value: number | null; positiveIsGood?: boolean }) {
  if (value === null) return <span className="text-sm text-neutral-400">--</span>;
  const isPositive = value > 0;
  const isGood = positiveIsGood ? isPositive : !isPositive;
  const color = value === 0 ? "text-neutral-500" : isGood ? "text-[#048a48]" : "text-[#cc1700]";
  const arrow = value > 0 ? "↑" : value < 0 ? "↓" : "";
  return (
    <span className={cn("text-sm font-medium", color)}>
      {arrow} {Math.abs(value)}%
    </span>
  );
}

export function StatusBadge({ status }: { status: "Poor" | "Good" }) {
  const isPoor = status === "Poor";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        isPoor ? "bg-[#ffe5e5] text-[#cc1700]" : "bg-[#e6f7ed] text-[#048a48]",
      )}
    >
      {isPoor ? "✕" : "✓"} {status}
    </span>
  );
}

export function HeatmapGrid({
  getValue,
  colors,
  legend,
}: {
  getValue: (day: number, hour: number) => number;
  colors: string[];
  legend: string[];
}) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="mb-2 grid grid-cols-[48px_repeat(7,1fr)] gap-1 text-center text-xs font-medium text-neutral-500">
            <div />
            {days.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          {Array.from({ length: 24 }, (_, hour) => (
            <div key={hour} className="mb-1 grid grid-cols-[48px_repeat(7,1fr)] gap-1 items-center">
              <span className="text-right text-xs text-neutral-500">{String(hour).padStart(2, "0")}</span>
              {days.map((_, day) => {
                const v = getValue(day, hour);
                return (
                  <div
                    key={`${day}-${hour}`}
                    className="h-3 rounded-sm"
                    style={{ backgroundColor: colors[v] ?? colors[0] }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {colors.map((color, i) => (
          <div key={color} className="h-3 w-10 rounded-sm" style={{ backgroundColor: color }} />
        ))}
        <div className="flex gap-6 text-xs text-neutral-500">
          {legend.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LastUpdatedRow() {
  return (
    <div className="flex items-center gap-3 text-xs text-neutral-500">
      <span>Last updated a few seconds ago</span>
      <button type="button" className="inline-flex items-center gap-1 hover:text-black">
        <RefreshCw className="size-3.5" />
      </button>
    </div>
  );
}

export function FaqAccordion({ items }: { items: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
      {items.map((item, idx) => (
        <button
          key={item}
          type="button"
          onClick={() => setOpen(open === idx ? null : idx)}
          className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-neutral-50"
        >
          <span className="text-sm font-medium text-black">{item}</span>
          <ChevronRight className={cn("size-4 text-neutral-400 transition-transform", open === idx && "rotate-90")} />
        </button>
      ))}
    </div>
  );
}
