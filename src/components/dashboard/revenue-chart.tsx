"use client";

import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { salesChartData } from "@/lib/performance-data";

const data = salesChartData.sales;

export function RevenueChart() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <div className="grid gap-6 lg:grid-cols-[180px_1fr]">
        <div className="space-y-5">
          <Link href="/performance/sales" className="group block">
            <span className="inline-flex items-center gap-1 text-sm text-neutral-500 group-hover:text-black">
              Sales <ChevronRight className="size-3.5" />
            </span>
            <p className="mt-1 text-2xl font-bold tracking-[-0.02em] text-black">A$592</p>
            <p className="inline-flex items-center gap-1 text-xs font-medium text-[#048a48]">
              <TrendingUp className="size-3.5" /> 25%
            </p>
          </Link>
          <Link href="/performance/sales" className="group block">
            <span className="inline-flex items-center gap-1 text-sm text-neutral-500 group-hover:text-black">
              Booked orders <ChevronRight className="size-3.5" />
            </span>
            <p className="mt-1 text-2xl font-bold tracking-[-0.02em] text-black">16</p>
            <p className="inline-flex items-center gap-1 text-xs font-medium text-[#048a48]">
              <TrendingUp className="size-3.5" /> 60%
            </p>
          </Link>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-5 text-xs font-medium text-neutral-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#276ef1]" />
              This period (June 1 - 7)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded border-t border-dashed border-neutral-400" />
              Last period (May 25 - 31)
            </span>
          </div>
          <div className="h-56 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 4 }}>
                <defs>
                  <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#276ef1" stopOpacity={0.16} />
                    <stop offset="100%" stopColor="#276ef1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#eeeeee" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#757575", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: "#757575", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) => `A$${value}`}
                />
                <Tooltip
                  cursor={{ stroke: "#cccccc", strokeWidth: 1 }}
                  formatter={(value, name) => {
                    const numericValue = typeof value === "number" ? value : Number(value ?? 0);
                    return [`A$${numericValue}`, name === "current" ? "This period" : "Last period"];
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
                <Area type="monotone" dataKey="previous" stroke="#9e9e9e" strokeWidth={1.5} strokeDasharray="5 4" fill="none" />
                <Area
                  type="monotone"
                  dataKey="current"
                  stroke="#276ef1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#currentGradient)"
                  activeDot={{ r: 5, stroke: "#ffffff", strokeWidth: 2, fill: "#276ef1" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
