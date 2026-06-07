"use client";

import { useState } from "react";
import { ChevronDown, Info, Star } from "lucide-react";
import { SalesOverview } from "@/components/performance/sales-overview";
import {
  DownloadButton,
  HeatmapGrid,
  PerformanceFilters,
  PillTabs,
  SectionCard,
  TrendBadge,
} from "@/components/performance/shared";
import { funnelStages, salesHeatValue, salesRankingItems } from "@/lib/performance-data";

const salesColors = ["#f3f3f3", "#dbeafe", "#93c5fd", "#3b82f6", "#1d4ed8"];
const salesLegend = ["A$0", "A$35", "A$70", "A$105", "A$140+"];

export default function PerformanceSalesPage() {
  const [rankingTab, setRankingTab] = useState<"Items" | "Shops">("Items");
  const [heatmapTab, setHeatmapTab] = useState<"Sales" | "Booked orders" | "Average ticket size">("Sales");

  const maxFunnel = Math.max(...funnelStages.map((s) => s.value));

  return (
    <div className="space-y-6">
      <PerformanceFilters />

      <div>
        <h1 className="page-title">Sales</h1>
        <p className="mt-1 text-sm text-neutral-600">See how your shop is performing on the platform.</p>
        <p className="mt-2 text-xs text-neutral-500">June 1 – 7, 2026 compared to May 25 – 31, 2026</p>
      </div>

      <SalesOverview />

      <SectionCard
        title={
          <span className="inline-flex items-center gap-1.5">
            User conversion funnel
            <Info className="size-4 text-neutral-400" />
          </span>
        }
        subtitle="Data shown below is available for June 1 – 4, 2026 only."
        action={<DownloadButton />}
      >
        <div className="mb-6">
          <p className="text-2xl font-bold text-black">
            11% <span className="text-base font-medium text-[#048a48]">↑ 6%</span>
          </p>
          <p className="text-sm text-neutral-500">Menu conversion rate</p>
        </div>
        <div className="space-y-4">
          {funnelStages.map((stage) => (
            <div key={stage.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-black">{stage.label}</span>
                <span className="text-neutral-600">
                  {stage.value}{" "}
                  <span className="text-[#cc1700]">↓ {Math.abs(stage.change)}%</span>
                </span>
              </div>
              <div className="h-8 overflow-hidden rounded bg-neutral-100">
                <div
                  className="h-full rounded bg-[#276ef1]"
                  style={{ width: `${(stage.value / maxFunnel) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Sales ranking"
        subtitle="View your top selling items and shops."
        action={<DownloadButton />}
      >
        <div className="mb-4">
          <PillTabs options={["Items", "Shops"]} value={rankingTab} onChange={setRankingTab} />
        </div>
        {rankingTab === "Items" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  {["Item", "Items sold ↓", "% change", "Sales", "% change"].map((col) => (
                    <th key={col} className="px-3 py-3 text-left text-sm font-medium text-black first:pl-0">
                      <span className="inline-flex items-center gap-1">
                        {col.replace(" ↓", "")}
                        {col.includes("↓") ? <ChevronDown className="size-3.5" /> : null}
                        {col.includes("%") ? <Info className="size-3.5 text-neutral-400" /> : null}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {salesRankingItems.map((item) => (
                  <tr key={item.name} className="border-b border-neutral-100">
                    <td className="py-4 pl-0 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="size-10 shrink-0 rounded bg-[#f3f3f3]" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-black">{item.name}</span>
                            {item.popular ? (
                              <span className="inline-flex items-center gap-0.5 rounded bg-[#e6f7ed] px-1.5 py-0.5 text-xs font-medium text-[#048a48]">
                                <Star className="size-3 fill-current" /> Popular
                              </span>
                            ) : null}
                          </div>
                          <span className="text-xs text-neutral-500">{item.price}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 font-medium text-black">{item.sold}</td>
                    <td className="px-3 py-4"><TrendBadge value={item.soldChange} /></td>
                    <td className="px-3 py-4 font-medium text-black">{item.sales}</td>
                    <td className="px-3 py-4"><TrendBadge value={item.salesChange} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  {["Shop", "Items sold", "% change", "Sales", "% change"].map((col) => (
                    <th key={col} className="px-3 py-3 text-left text-sm font-medium text-black first:pl-0">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100">
                  <td className="py-4 pl-0 pr-3 font-semibold text-black">Maikhana Adelaide</td>
                  <td className="px-3 py-4">12</td>
                  <td className="px-3 py-4"><TrendBadge value={60} /></td>
                  <td className="px-3 py-4">A$6,939.67</td>
                  <td className="px-3 py-4"><TrendBadge value={45} /></td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-4 pl-0 pr-3 font-semibold text-black">Scoop Shoppe</td>
                  <td className="px-3 py-4">4</td>
                  <td className="px-3 py-4"><TrendBadge value={25} /></td>
                  <td className="px-3 py-4">A$1,058.12</td>
                  <td className="px-3 py-4"><TrendBadge value={25} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Sales by hour"
        subtitle="View your sales trends by time of day."
        action={<DownloadButton />}
      >
        <div className="mb-4">
          <PillTabs
            options={["Sales", "Booked orders", "Average ticket size"]}
            value={heatmapTab}
            onChange={setHeatmapTab}
          />
        </div>
        <p className="mb-3 text-xs text-neutral-500 [writing-mode:vertical-lr] rotate-180">Time of the day (in hrs)</p>
        <HeatmapGrid getValue={salesHeatValue} colors={salesColors} legend={salesLegend} />
      </SectionCard>
    </div>
  );
}
