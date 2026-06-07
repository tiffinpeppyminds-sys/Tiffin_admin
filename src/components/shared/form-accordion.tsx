"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FormAccordion({
  icon: Icon,
  label,
  value,
  valueClassName,
  expandedHint,
  showValueWhenOpen = false,
  isOpen,
  onToggle,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value?: string;
  valueClassName?: string;
  expandedHint?: string;
  showValueWhenOpen?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  children?: ReactNode;
}) {
  const showValue = value && (!isOpen || showValueWhenOpen);

  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-8 py-5 text-left transition-colors hover:bg-neutral-50/50"
      >
        <Icon className="size-[22px] shrink-0 stroke-[1.5] text-black" />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-neutral-500">{label}</p>
          {showValue ? (
            <p className={cn("mt-0.5 text-[15px] font-semibold text-black", valueClassName)}>{value}</p>
          ) : null}
          {isOpen && expandedHint ? (
            <p className="mt-0.5 text-sm text-neutral-500">{expandedHint}</p>
          ) : null}
        </div>
        {isOpen ? (
          <ChevronUp className="size-5 shrink-0 text-neutral-500" />
        ) : (
          <ChevronDown className="size-5 shrink-0 text-neutral-500" />
        )}
      </button>
      {isOpen && children ? (
        <div className="border-t border-neutral-200 px-8 pb-7 pt-5">{children}</div>
      ) : null}
    </div>
  );
}

export function GraySelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none rounded-lg bg-[#f6f6f6] px-4 py-3.5 text-[15px] font-medium text-black outline-none focus:ring-1 focus:ring-black"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function PillToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="inline-flex flex-wrap gap-0 rounded-full bg-[#f3f3f3] p-1">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            value === opt
              ? "bg-black text-white"
              : "text-black hover:bg-neutral-200/80",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
  labels,
}: {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  labels?: Record<T, string>;
}) {
  return (
    <div className="inline-flex flex-wrap gap-0 rounded-full bg-[#f3f3f3] p-1">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            value === opt
              ? "border border-black bg-white text-black"
              : "border border-transparent text-neutral-600 hover:text-black",
          )}
        >
          {labels?.[opt] ?? opt}
        </button>
      ))}
    </div>
  );
}

export function RadioOptionCard({
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
