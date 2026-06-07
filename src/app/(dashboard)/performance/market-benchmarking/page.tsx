"use client";

import { Info } from "lucide-react";
import { FilterDropdown } from "@/components/performance/shared";

export default function MarketBenchmarkingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown label="Scoop Shoppe" options={["Scoop Shoppe", "Maikhana Adelaide", "All shops (2)"]} />
        <FilterDropdown label="May 29 - Jun 4" options={["May 29 - Jun 4", "Last 7 days", "Last 30 days"]} />
      </div>

      <div className="flex items-center gap-2">
        <h1 className="page-title">Market benchmarking</h1>
        <Info className="size-5 text-neutral-400" />
      </div>

      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-black">
          <span className="text-2xl font-bold text-white">?</span>
        </div>
        <p className="mt-6 text-lg font-bold text-black">Opt in to view market benchmarking</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
          This shop has opted out of Market benchmarking, so data can&apos;t be displayed. To opt in and access peer
          benchmarking data, please contact us at{" "}
          <a href="mailto:support@tiffinfinder.com" className="font-medium text-[#276ef1] hover:underline">
            support@tiffinfinder.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
