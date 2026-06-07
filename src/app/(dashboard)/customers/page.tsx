"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BarChart3, ChevronDown, ShoppingBag, Star } from "lucide-react";
import { DownloadButton, FilterDropdown, FilterPills } from "@/components/performance/shared";
import { customerGroups, shopsByGroup, trendBars } from "@/lib/customers-data";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

const totalCustomers = customerGroups.reduce((sum, g) => sum + g.count, 0);

function UberOneIcon() {
  return (
    <span className="flex size-4 items-center justify-center rounded-full bg-[#c7922e] text-[9px] font-bold text-white">
      U
    </span>
  );
}

export default function CustomerInsightsPage() {
  const [trendFilter, setTrendFilter] = useState<"All customers" | "New" | "Occasional" | "Frequent">("All customers");
  const trendData = trendBars.map((value, i) => ({ day: `D${i + 1}`, value }));

  const donutSegments = useMemo(() => {
    let offset = 0;
    return customerGroups.map((group) => {
      const pct = (group.count / totalCustomers) * 100;
      const segment = { group, pct, offset };
      offset += pct;
      return segment;
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Customer insights</h1>
        <p className="mt-1 text-sm text-neutral-600">See who is ordering from you and their impact on your sales.</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <FilterDropdown label="All shops" options={["All shops", "Maikhana Adelaide", "Scoop Shoppe"]} />
          <FilterDropdown label="Last 7 days" options={["Last 7 days", "Last 30 days", "Today"]} />
        </div>
      </div>

      <section className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="text-base font-bold text-black">Customer groups overview</h2>
        <p className="mt-1 text-xs text-neutral-500">June 1 – 7, 2026 compared to May 25 – 31, 2026</p>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="relative mx-auto flex size-40 shrink-0 items-center justify-center lg:mx-0">
            <svg viewBox="0 0 36 36" className="size-full -rotate-90">
              {donutSegments.map(({ group, pct, offset }) => (
                <circle
                  key={group.id}
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke={group.color}
                  strokeWidth="3.2"
                  strokeDasharray={`${pct} ${100 - pct}`}
                  strokeDashoffset={-offset}
                />
              ))}
            </svg>
            <div className="absolute text-center">
              <p className="text-xs text-neutral-500">Total</p>
              <p className="text-2xl font-bold text-black">{totalCustomers}</p>
            </div>
          </div>

          <div className="grid flex-1 gap-6 sm:grid-cols-3">
            {customerGroups.map((group) => (
              <div key={group.id}>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-black">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: group.color }} />
                  <span className="border-b border-dotted border-neutral-400">{group.label}</span>
                </span>
                <p className="mt-2 text-lg font-bold text-black">
                  {group.count} ({group.percent}%)
                </p>
                <p className="text-sm font-medium text-[#048a48]">{group.change.toFixed(1)}% ↑</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        {customerGroups.map((group) => (
          <section key={group.id} className="rounded-xl border border-neutral-200 bg-white p-5">
            <h3 className="text-base font-bold text-black">{group.label}</h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500">{group.description}</p>
            <div className="mt-4 divide-y divide-neutral-100 text-sm text-neutral-700">
              <p className="flex items-center gap-3 py-3">
                <BarChart3 className="size-4 shrink-0 text-neutral-400" />
                <span>
                  {group.sales} <span className="text-neutral-500">({group.salesShare})</span>
                </span>
              </p>
              <p className="flex items-center gap-3 py-3">
                <ShoppingBag className="size-4 shrink-0 text-neutral-400" />
                {group.avgOrder}
              </p>
              <p className="flex items-center gap-3 py-3">
                <Star className="size-4 shrink-0 text-neutral-400" />
                {group.avgRating}
              </p>
              <p className="flex items-center gap-3 py-3">
                <UberOneIcon />
                {group.uberOne}
              </p>
            </div>
          </section>
        ))}
      </div>

      <section className="rounded-xl border border-neutral-200 bg-white">
        <div className="flex flex-wrap items-start justify-between gap-3 px-6 py-5">
          <div>
            <h2 className="text-base font-bold text-black">Customer groups by shop</h2>
            <p className="mt-0.5 text-sm text-neutral-500">View how customer groups vary across all your shops</p>
          </div>
          <DownloadButton />
        </div>
        <div className="overflow-x-auto px-6 pb-6">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="py-3 pr-4 text-left text-sm font-medium text-black">Shop name</th>
                {["New", "Occasional", "Frequent", "Total"].map((col) => (
                  <th key={col} className="px-4 py-3 text-right text-sm font-medium text-black">
                    <span className="inline-flex items-center justify-end gap-1">
                      {col}
                      <ChevronDown className="size-3.5 text-neutral-400" />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shopsByGroup.map((shop) => (
                <tr key={shop.name} className="border-b border-neutral-100">
                  <td className="py-4 pr-4">
                    <Link href="/providers" className="font-medium text-[#276ef1] hover:underline">
                      {shop.name}
                    </Link>
                    <p className="text-xs text-neutral-500">{shop.address}</p>
                  </td>
                  <td className="px-4 py-4 text-right text-black">{shop.new}</td>
                  <td className="px-4 py-4 text-right text-black">{shop.occasional}</td>
                  <td className="px-4 py-4 text-right text-black">{shop.frequent}</td>
                  <td className="px-4 py-4 text-right font-medium text-black">{shop.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-neutral-200 bg-white">
        <div className="flex flex-wrap items-start justify-between gap-3 px-6 py-5">
          <div>
            <h2 className="text-base font-bold text-black">Customer group trends</h2>
            <p className="mt-0.5 text-sm text-neutral-500">View the trends of different customer groups visiting your shop.</p>
          </div>
          <DownloadButton />
        </div>
        <div className="px-6 pb-6">
          <FilterPills
            options={["All customers", "New", "Occasional", "Frequent"]}
            value={trendFilter}
            onChange={setTrendFilter}
          />
          <p className="mt-6 kpi-value-lg">14</p>
          <p className="text-sm text-neutral-500">{trendFilter}</p>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 8, right: 8, left: -16, bottom: 4 }}>
                <CartesianGrid stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#757575" }} axisLine={false} tickLine={false} hide />
                <YAxis tick={{ fontSize: 11, fill: "#757575" }} axisLine={false} tickLine={false} domain={[0, 6]} />
                <Bar dataKey="value" fill="#276ef1" radius={[2, 2, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
