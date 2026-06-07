"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { DownloadButton, PillTabs } from "@/components/performance/shared";
import { salesChartData, salesKpis } from "@/lib/performance-data";
import { cn } from "@/lib/utils";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type KpiId = "sales" | "booked" | "ticket";

export function SalesOverview() {
  const [activeKpi, setActiveKpi] = useState<KpiId>("sales");
  const [overviewTab, setOverviewTab] = useState<"Overview" | "By channel">("Overview");

  return (
    <section className="rounded-xl border border-neutral-200 bg-white">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-100 px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-black">Overview</h2>
          <p className="mt-0.5 text-sm text-neutral-500">A summary of your revenue and sales by channel.</p>
        </div>
        <DownloadButton />
      </div>

      <div className="p-5">
        <div className="grid gap-3 lg:grid-cols-3">
          {salesKpis.map((kpi) => {
            const id = kpi.id as KpiId;
            const selected = activeKpi === id;
            return (
              <button
                key={kpi.id}
                type="button"
                onClick={() => setActiveKpi(id)}
                className={cn(
                  "rounded-xl border bg-white p-4 text-left transition-colors",
                  selected ? "border-2 border-black" : "border-neutral-200 hover:border-neutral-300",
                )}
              >
                <p className="inline-flex items-center gap-1 text-sm text-neutral-600">
                  {kpi.label}
                  <Info className="size-3.5 text-neutral-400" />
                </p>
                <p className="mt-2 kpi-value-lg">{kpi.value}</p>
                <p
                  className={cn(
                    "mt-1.5 text-sm font-medium",
                    kpi.trendUp ? "text-[#048a48]" : "text-[#cc1700]",
                  )}
                >
                  {kpi.trendUp ? "↑" : "↓"} {kpi.trend}%
                </p>
                <p className="mt-2 text-xs text-neutral-500">{kpi.note}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          <PillTabs options={["Overview", "By channel"]} value={overviewTab} onChange={setOverviewTab} />
        </div>

        {overviewTab === "Overview" ? (
          <div className="mt-5">
            <div className="mb-3 flex flex-wrap items-center gap-5 text-xs font-medium text-neutral-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#276ef1]" />
                This period (June 1 – 7)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-0.5 w-4 border-t border-dashed border-neutral-400" />
                Last period (May 25 – 31)
              </span>
            </div>
            <div className="h-64 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesChartData[activeKpi]} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
                  <defs>
                    <linearGradient id="salesOverviewGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#276ef1" stopOpacity={0.12} />
                      <stop offset="100%" stopColor="#276ef1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#eeeeee" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "#757575", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fill: "#757575", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 300]}
                    ticks={[0, 50, 100, 150, 200, 250, 300]}
                    tickFormatter={(value: number) => (activeKpi === "booked" ? `${value}` : `A$${value}`)}
                  />
                  <Tooltip
                    cursor={{ stroke: "#cccccc", strokeWidth: 1 }}
                    formatter={(value, name) => {
                      const numericValue = typeof value === "number" ? value : Number(value ?? 0);
                      const formatted = activeKpi === "booked" ? `${numericValue}` : `A$${numericValue}`;
                      return [formatted, name === "current" ? "This period" : "Last period"];
                    }}
                    labelStyle={{ color: "#000000", fontWeight: 600 }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #eeeeee",
                      background: "#ffffff",
                      color: "#000000",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="previous"
                    stroke="#9e9e9e"
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                    fill="none"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="current"
                    stroke="#276ef1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#salesOverviewGradient)"
                    dot={false}
                    activeDot={{ r: 5, stroke: "#ffffff", strokeWidth: 2, fill: "#276ef1" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-neutral-100 bg-neutral-50/50 px-6 py-16 text-center">
            <p className="text-sm font-medium text-neutral-600">Channel breakdown is available per shop in shop settings.</p>
          </div>
        )}
      </div>
    </section>
  );
}
