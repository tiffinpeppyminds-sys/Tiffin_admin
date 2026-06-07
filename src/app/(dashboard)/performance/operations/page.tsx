"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  ConciergeBell,
  Info,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import {
  DownloadButton,
  EmptyResults,
  FilterPills,
  HeatmapGrid,
  InfoLabel,
  LastUpdatedRow,
  PerformanceFilters,
  PillTabs,
  SectionCard,
} from "@/components/performance/shared";
import { issuesHeatValue, trendData } from "@/lib/performance-data";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const issueColors = ["#fdeaea", "#f9d4d4", "#f0a8a8", "#d64545", "#800000"];
const issueLegend = ["0", "0.25", "0.5", "0.75", "1+"];

export default function PerformanceOperationsPage() {
  const [errorTab, setErrorTab] = useState<"All" | "Inaccurate orders" | "Taste and quality errors">("All");
  const [issuesTab, setIssuesTab] = useState<
    "Inaccurate orders" | "Food orders with taste and quality issues" | "Unfulfilled orders" | "Online rate" | "Efficiency by shop"
  >("Inaccurate orders");
  const [hourTab, setHourTab] = useState<
    "Inaccurate orders" | "Unfulfilled orders" | "Online rate" | "Food orders with taste and quality issues"
  >("Inaccurate orders");

  return (
    <div className="space-y-6">
      <PerformanceFilters />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Operations</h1>
          <p className="mt-2 text-xs text-neutral-500">June 1 – 6, 2026 compared to May 25 – 30, 2026</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/performance/operations" className="inline-flex items-center gap-1 text-neutral-600 hover:text-black">
            <Info className="size-4" /> Operations glossary
          </Link>
          <LastUpdatedRow />
        </div>
      </div>

      <div className="flex items-start gap-4 rounded-xl bg-[#e7f0fe] px-5 py-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#276ef1]/10">
          <ShoppingBag className="size-5 text-[#276ef1]" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-black">How do we determine order adjustments?</p>
          <p className="mt-1 text-sm text-neutral-600">
            Chargebacks occur when customers report order issues. We review evidence from both sides before determining adjustments.
          </p>
        </div>
        <button type="button" className="shrink-0 rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-sm font-medium text-black hover:bg-neutral-50">
          Learn more
        </button>
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-black">Courier wait time</h2>
            <p className="text-sm text-neutral-500">The amount of time a courier waits at your shop to pick up an order.</p>
          </div>
          <Link href="/performance/operations" className="text-sm font-medium text-black hover:underline">
            View more <ChevronRight className="inline size-4" />
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <KpiCard icon={Clock} label="Avoidable wait time" value="0 min" trend="↓ 5 min 20 sec" good />
          <KpiCard icon={ConciergeBell} label="Orders with avoidable wait time" value="0 (0%)" trend="↓ 100%" good />
          <KpiCard icon={Clock} label="Total wait time" value="1 min 2 sec" trend="↓ 4 min 45 sec" good />
        </div>
      </section>

      <SectionCard title="Orders with errors" action={<DownloadButton />}>
        <PillTabs
          options={["All", "Inaccurate orders", "Taste and quality errors"]}
          value={errorTab}
          onChange={setErrorTab}
        />
        <p className="mt-3 text-sm text-neutral-500">Orders with inaccuracies and taste and quality issues.</p>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Completed orders" value="11" trend="↑ 57.14%" good />
          <Metric label="Orders with errors" value="0 (0.00%)" trend="0.00%" />
          <Metric label="Orders with chargebacks" value="0 (0%)" trend="0.00%" />
          <Metric label="Net chargeback amount" value="A$0.00" trend="0.00%" />
        </div>
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2 text-sm">
            <span className="text-neutral-600">Show data for:</span>
            <button type="button" className="inline-flex items-center gap-1 rounded-full border border-neutral-300 px-3 py-1 text-sm font-medium">
              Orders with errors <ChevronDown className="size-3.5" />
            </button>
          </div>
          <p className="mb-3 text-sm font-semibold text-black">Trend over time</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 8, right: 8, left: -12, bottom: 4 }}>
                <CartesianGrid stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} domain={[0, 1.2]} />
                <Tooltip />
                <Line type="monotone" dataKey="current" stroke="#cc1700" strokeWidth={2} dot={false} name="This period" />
                <Line type="monotone" dataKey="previous" stroke="#737373" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Last period" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex gap-4 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 bg-[#cc1700]" /> This period</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 border-t border-dashed border-neutral-500" /> Last period</span>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Order issues by shop" action={<DownloadButton />}>
        <FilterPills
          options={["Inaccurate orders", "Food orders with taste and quality issues", "Unfulfilled orders", "Online rate", "Efficiency by shop"]}
          value={issuesTab}
          onChange={setIssuesTab}
        />
        <div className="mt-4"><EmptyResults /></div>
      </SectionCard>

      <SectionCard title="Top inaccurate items" action={<DownloadButton />}>
        <EmptyResults />
      </SectionCard>

      <SectionCard title="Order issues by hour" action={<DownloadButton />}>
        <FilterPills
          options={["Inaccurate orders", "Unfulfilled orders", "Online rate", "Food orders with taste and quality issues"]}
          value={hourTab}
          onChange={setHourTab}
        />
        <div className="mt-4">
          <HeatmapGrid getValue={issuesHeatValue} colors={issueColors} legend={issueLegend} />
        </div>
      </SectionCard>

      <SectionCard title="Unfulfilled orders" action={<DownloadButton />}>
        <div className="grid gap-6 sm:grid-cols-2">
          <Metric label="Unfulfilled orders" value="0" sub="(0.00%)" trend="↓ 100.00%" good />
          <Metric label="Sales lost" value="A$0.00" trend="↓ 100.00%" good />
        </div>
        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold text-black">Trend over time</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 8, right: 8, left: -12, bottom: 4 }}>
                <CartesianGrid stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
                <Line type="monotone" dataKey="current" stroke="#cc1700" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="previous" stroke="#737373" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Online rate" action={<DownloadButton />}>
        <p className="mb-4 text-2xl font-bold text-black">
          64% <span className="text-base font-medium text-[#048a48]">↑ 67%</span>
        </p>
        <div className="relative h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { date: "01/08", rate: 55 },
              { date: "02/08", rate: 58 },
              { date: "03/08", rate: 62 },
              { date: "04/08", rate: 60 },
              { date: "05/08", rate: 64 },
              { date: "06/08", rate: 64 },
            ]} margin={{ top: 8, right: 60, left: -12, bottom: 4 }}>
              <CartesianGrid stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Line type="monotone" dataKey="rate" stroke="#048a48" strokeWidth={2.5} dot={false} fill="url(#greenFill)" />
              <defs>
                <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#048a48" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#048a48" stopOpacity={0} />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
          <span className="absolute right-2 top-[28%] rounded-full bg-black px-2 py-0.5 text-xs font-medium text-white">
            🏅 Top Eats
          </span>
        </div>
      </SectionCard>
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  trend,
  good,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend: string;
  good?: boolean;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <Icon className="mb-2 size-5 text-neutral-500" />
      <InfoLabel label={label} />
      <p className="mt-2 text-2xl font-bold text-black">{value}</p>
      <p className={`mt-1 text-sm font-medium ${good ? "text-[#048a48]" : "text-neutral-500"}`}>{trend}</p>
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
  trend,
  good,
}: {
  label: string;
  value: string;
  sub?: string;
  trend: string;
  good?: boolean;
}) {
  return (
    <div>
      <InfoLabel label={label} />
      <p className="mt-1 text-2xl font-bold text-black">
        {value} {sub ? <span className="text-base font-normal text-neutral-500">{sub}</span> : null}
      </p>
      <p className={`mt-1 text-sm font-medium ${good ? "text-[#048a48]" : "text-neutral-500"}`}>{trend}</p>
    </div>
  );
}
