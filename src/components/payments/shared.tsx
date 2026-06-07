"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, CloudDownload, Info, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function PaymentsFilterDropdown({
  label,
  options,
  dark = false,
  onSelect,
}: {
  label: string;
  options: string[];
  dark?: boolean;
  onSelect?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(label);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium",
          dark
            ? "bg-black text-white hover:bg-neutral-800"
            : "border border-neutral-300 text-black hover:bg-neutral-50",
        )}
      >
        {value}
        <ChevronDown className={cn("size-3.5", dark ? "text-white/80" : "text-neutral-500")} />
      </button>
      {open ? (
        <div className="absolute left-0 top-10 z-20 w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
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

export function PaymentsTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="border-b border-neutral-200">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={cn(
              "tab-link",
              active === tab ? "tab-link-active" : "",
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PayoutKpiCard({
  label,
  value,
  change,
  info,
}: {
  label: string;
  value: string;
  change?: string;
  info?: boolean;
}) {
  return (
    <div className="min-w-[140px] flex-1">
      <p className="inline-flex items-center gap-1 text-sm text-neutral-600">
        {label}
        {info ? <Info className="size-3.5 text-neutral-400" /> : null}
      </p>
      <p className="mt-1 text-xl font-bold text-black">{value}</p>
      {change ? (
        <p className="mt-0.5 inline-flex items-center gap-0.5 text-xs font-medium text-[#06c167]">
          <TrendingUp className="size-3" />
          {change}
        </p>
      ) : null}
    </div>
  );
}

export function DownloadButton({ label = "Download" }: { label?: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-black hover:bg-neutral-50"
    >
      <CloudDownload className="size-4" />
      {label}
    </button>
  );
}

export function SectionHeading({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-lg font-bold text-black">{title}</h2>
      {action}
    </div>
  );
}
