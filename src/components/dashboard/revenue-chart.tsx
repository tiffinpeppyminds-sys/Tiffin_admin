"use client";

import { Sparkles, TrendingUp, Wallet2 } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { day: "Mon", orders: 220, revenue: 4200 },
  { day: "Tue", orders: 248, revenue: 4610 },
  { day: "Wed", orders: 231, revenue: 4385 },
  { day: "Thu", orders: 265, revenue: 5010 },
  { day: "Fri", orders: 286, revenue: 5480 },
  { day: "Sat", orders: 324, revenue: 6210 },
  { day: "Sun", orders: 298, revenue: 5830 },
];

export function RevenueChart() {
  const latest = data[data.length - 1];
  const previous = data[data.length - 2];
  const growth = Math.round(((latest.orders - previous.orders) / previous.orders) * 1000) / 10;
  const latestRevenue = latest.revenue;
  const compactRevenue = `$${(latestRevenue / 1000).toFixed(1)}K`;

  return (
    <Card className="top-shine overflow-hidden">
      <CardHeader className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300">
              <Sparkles className="size-3.5" />
              Executive Analytics
            </div>
            <CardTitle>Revenue Momentum</CardTitle>
            <CardDescription>Weekly trend for orders and revenue across active providers.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary">
              7D
            </Button>
            <Button size="sm" variant="ghost">
              30D
            </Button>
            <Button size="sm" variant="ghost">
              90D
            </Button>
          </div>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          <div className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950/40">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-black dark:text-slate-300">Latest Orders</p>
            <p className="mt-1 inline-flex min-w-0 items-center gap-1 text-[15px] font-semibold text-black dark:text-slate-100 lg:text-base">
              <TrendingUp className="size-4 text-blue-600" />
              {latest.orders}
            </p>
          </div>
          <div className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950/40">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-black dark:text-slate-300">Latest Revenue</p>
            <p className="mt-1 inline-flex min-w-0 items-center gap-1 text-[15px] font-semibold text-black dark:text-slate-100 lg:text-base">
              <Wallet2 className="size-4 text-blue-600" />
              <span className="whitespace-nowrap">{compactRevenue}</span>
            </p>
          </div>
          <div className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950/40">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-black dark:text-slate-300">Momentum</p>
            <p className="mt-1">
              <Badge variant={growth >= 0 ? "success" : "danger"}>{growth >= 0 ? `+${growth}%` : `${growth}%`}</Badge>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="bg-gradient-to-b from-white to-blue-50/30 dark:from-slate-950 dark:to-blue-950/20">
        <div className="rounded-xl border border-blue-100/70 bg-white/70 p-3 shadow-inner dark:border-blue-900/40 dark:bg-slate-950/40">
          <div className="mb-2 flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-black dark:text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-blue-600" />
              Orders
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-slate-900 dark:bg-slate-300" />
              Revenue
            </span>
          </div>
          <div className="h-80 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 18, right: 6, left: -8, bottom: 8 }}>
              <defs>
                <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.55} />
                  <stop offset="55%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f172a" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#dbeafe" strokeDasharray="2 6" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "#0f172a", fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis
                yAxisId="orders"
                orientation="right"
                tick={{ fill: "#475569", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) => `${value}`}
              />
              <YAxis yAxisId="revenue" hide />
              <Tooltip
                cursor={{ stroke: "#3b82f6", strokeWidth: 1.5, strokeDasharray: "4 4" }}
                formatter={(value, name) => {
                  const numericValue = typeof value === "number" ? value : Number(value ?? 0);
                  return name === "orders"
                    ? [`${numericValue} orders`, "Orders"]
                    : [`$${numericValue}`, "Revenue"];
                }}
                labelStyle={{ color: "#0f172a", fontWeight: 700 }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #bfdbfe",
                  background: "#ffffff",
                  color: "#0f172a",
                  boxShadow: "0 16px 34px rgba(15,23,42,0.12)",
                }}
              />
              <Area
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                stroke="#0f172a"
                strokeWidth={1.5}
                strokeDasharray="5 4"
                fillOpacity={1}
                fill="url(#revenueGradient)"
              />
              <Area
                yAxisId="orders"
                type="monotone"
                dataKey="orders"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#ordersGradient)"
                activeDot={{ r: 6, stroke: "#ffffff", strokeWidth: 2, fill: "#2563eb" }}
              />
            </AreaChart>
          </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
