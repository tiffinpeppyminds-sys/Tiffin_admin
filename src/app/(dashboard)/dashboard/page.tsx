"use client";

import { Activity, ShieldCheck, Store, UsersRound } from "lucide-react";
import dynamic from "next/dynamic";
import { topMetrics } from "@/lib/mock-data";
import { ExecutiveHero } from "@/components/dashboard/executive-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";

const RevenueChart = dynamic(
  () => import("@/components/dashboard/revenue-chart").then((mod) => mod.RevenueChart),
  { ssr: false },
);

const highlights = [
  { icon: ShieldCheck, title: "Business verifications pending", value: "14", note: "Review ID and safety docs" },
  { icon: Store, title: "Featured providers", value: "32", note: "Promoted on public explore page" },
  { icon: UsersRound, title: "Total admins", value: "8", note: "1 super admin + 7 delegated admins" },
  { icon: Activity, title: "Avg. order acceptance time", value: "3m 42s", note: "Across all active providers" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <ExecutiveHero />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {topMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid grid-cols-4 gap-4">
        {highlights.map(({ icon: Icon, title, value, note }) => (
          <Card
            key={title}
            className="animate-fade-in-up relative overflow-hidden transition-transform hover:-translate-y-0.5"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-slate-900" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xs text-black dark:text-slate-300">
                <Icon className="size-4 text-indigo-600" />
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="heading-classic text-2xl font-semibold text-black dark:text-slate-100">{value}</p>
              <p className="mt-1 text-[11px] text-black dark:text-slate-400">{note}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <RevenueChart />
        <Card>
          <CardHeader>
            <CardTitle>Executive Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-black dark:text-slate-300">
            <div className="subtle-divider rounded-xl bg-white p-3 dark:bg-slate-950/40">
              <p className="font-semibold text-black dark:text-slate-100">Peak demand</p>
              <p>Friday-Sunday dinner slots are driving most new users this week.</p>
            </div>
            <div className="subtle-divider rounded-xl bg-white p-3 dark:bg-slate-950/40">
              <p className="font-semibold text-black dark:text-slate-100">Provider quality</p>
              <p>3 providers need compliance follow-up due to delayed order acknowledgements.</p>
            </div>
            <div className="subtle-divider rounded-xl bg-white p-3 dark:bg-slate-950/40">
              <p className="font-semibold text-black dark:text-slate-100">Action recommended</p>
              <p>Boost featured placement for high-rated kitchens in low-supply suburbs.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
