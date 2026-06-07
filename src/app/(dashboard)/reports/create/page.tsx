"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reportCategories } from "@/lib/reports-data";
import { cn } from "@/lib/utils";

type Frequency = "Once" | "On a recurring schedule";

function InfoIcon() {
  return (
    <span
      aria-hidden
      className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-full border border-neutral-400 text-[10px] font-bold leading-none text-neutral-400"
    >
      i
    </span>
  );
}

function ReportFieldDropdown({
  label,
  value,
  options,
  onSelect,
  helperText,
}: {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  helperText?: string;
}) {
  const [open, setOpen] = useState(false);
  const isPlaceholder = value.includes("YYYY");

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-black">{label}</p>
      <div className="relative max-w-xl">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between rounded-lg bg-[#f6f6f6] px-4 py-3.5 text-left text-sm hover:bg-[#eeeeee]"
        >
          <span className={isPlaceholder ? "text-neutral-500" : "text-black"}>{value}</span>
          <ChevronDown className="size-4 shrink-0 text-neutral-500" />
        </button>
        {open ? (
          <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
                className="block w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50"
              >
                {opt}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      {helperText ? <p className="mt-2 text-xs text-neutral-500">{helperText}</p> : null}
    </div>
  );
}

export default function CreateReportPage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [frequency, setFrequency] = useState<Frequency>("Once");
  const [shops, setShops] = useState("Shops (0)");
  const [dateRange, setDateRange] = useState("YYYY/MM/DD - YYYY/MM/DD");

  const shopCount = shops === "Shops (0)" ? 0 : shops.includes("2") ? 2 : 1;
  const hasDateRange = !dateRange.includes("YYYY");
  const canCreate = selectedTypes.size > 0 && shopCount > 0 && hasDateRange;

  const toggleCategory = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleType = (id: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const shopOptions = useMemo(
    () => ["Shops (0)", "Shops (1)", "Shops (2)", "Maikhana Adelaide", "Scoop Shoppe"],
    [],
  );

  const dateOptions = [
    "YYYY/MM/DD - YYYY/MM/DD",
    "01/06/2026 - 07/06/2026",
    "25/05/2026 - 31/05/2026",
    "Last 7 days",
    "Last 30 days",
  ];

  return (
    <div className="pb-28">
      <p className="text-sm text-neutral-500">
        <Link href="/reports" className="hover:text-black hover:underline">
          Reports
        </Link>
        <span className="mx-1.5">&gt;</span>
        <span className="text-neutral-500">Create report</span>
      </p>

      <h1 className="page-title-lg mt-4">Create report</h1>
      <p className="mt-2 text-[15px] text-neutral-600">Set up your report to work for your business needs.</p>

      <section className="mt-10">
        <h2 className="text-[15px] font-bold text-black">1. Select a report type</h2>
        <div className="mt-4 max-w-xl overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {reportCategories.map((category, idx) => {
            const isOpen = expanded[category.id] ?? false;
            return (
              <div key={category.id} className={cn(idx > 0 && "border-t border-neutral-200")}>
                <button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-neutral-50/60"
                >
                  <span className="text-[15px] font-semibold text-black">{category.label}</span>
                  {isOpen ? (
                    <ChevronUp className="size-4 text-neutral-500" />
                  ) : (
                    <ChevronDown className="size-4 text-neutral-500" />
                  )}
                </button>
                {isOpen ? (
                  <div className="border-t border-neutral-200 px-5 pb-3 pt-1">
                    {category.types.map((type) => (
                      <label
                        key={type.id}
                        className="flex cursor-pointer items-center gap-3 py-3"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTypes.has(type.id)}
                          onChange={() => toggleType(type.id)}
                          className="size-[18px] shrink-0 rounded-[3px] border-neutral-400 accent-black"
                        />
                        <span className="flex-1 text-[15px] text-black">{type.label}</span>
                        <InfoIcon />
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[15px] font-bold text-black">2. Set a schedule</h2>

        <p className="mt-5 text-[15px] font-semibold text-black">
          How many times would like to receive this report?
        </p>
        <div className="mt-3 inline-flex rounded-full bg-[#f3f3f3] p-1">
          {(["Once", "On a recurring schedule"] as Frequency[]).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setFrequency(opt)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                frequency === opt
                  ? "border border-black bg-white text-black"
                  : "border border-transparent text-neutral-600 hover:text-black",
              )}
            >
              {opt}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-neutral-500">
          {frequency === "Once"
            ? "You'll receive your report within a few hours."
            : "Choose how often you want this report delivered."}
        </p>

        <div className="mt-8 space-y-6">
          <ReportFieldDropdown
            label="Select shops/groups"
            value={shops}
            options={shopOptions}
            onSelect={setShops}
          />
          <ReportFieldDropdown
            label="Select date range"
            value={dateRange}
            options={dateOptions}
            onSelect={setDateRange}
            helperText="Dates are based on the shop's time zone."
          />
          <div>
            <p className="mb-2 text-sm font-semibold text-black">Where would you like to receive the report?</p>
            <div className="max-w-xl rounded-lg bg-[#f6f6f6] px-4 py-3.5 text-sm text-black">
              Tiffin Finder Manager
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-neutral-200 bg-white px-5 py-4 lg:left-64">
        <div className="mx-auto flex w-full max-w-[1180px] justify-end">
          <button
            type="button"
            disabled={!canCreate}
            onClick={() => router.push("/reports")}
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-colors",
              canCreate
                ? "bg-black text-white hover:bg-neutral-800"
                : "cursor-not-allowed bg-[#eeeeee] text-neutral-400",
            )}
          >
            Create report
          </button>
        </div>
      </div>
    </div>
  );
}
