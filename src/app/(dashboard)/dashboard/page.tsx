"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Banknote,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  Hourglass,
  Info,
  MapPin,
  Megaphone,
  Pencil,
  Smartphone,
  Star,
  Tag,
  ThumbsDown,
  ThumbsUp,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const RevenueChart = dynamic(
  () => import("@/components/dashboard/revenue-chart").then((mod) => mod.RevenueChart),
  { ssr: false },
);

const kpis = [
  { label: "Sales", value: "A$25.58", note: "Total value of items sold" },
  { label: "Booked orders", value: "1", note: "Orders that generated sales" },
  { label: "Average ticket size", value: "A$25.58", note: "Average value of items sold per order" },
];

const successRows = [
  { label: "Poor", count: 1, tone: "bg-[#f3a9a0]", width: "w-3/4" },
  { label: "Fair", count: 0, tone: "bg-neutral-200", width: "w-0" },
  { label: "Good", count: 1, tone: "bg-[#a7e3bf]", width: "w-2/3" },
  { label: "Great", count: 0, tone: "bg-neutral-200", width: "w-0" },
  { label: "Excellent", count: 0, tone: "bg-neutral-200", width: "w-0" },
];

const quickActions = [
  { icon: Megaphone, label: "Create ad", tone: "text-[#276ef1]", href: "/ads/create" },
  { icon: Tag, label: "Create offer", tone: "text-[#06c167]", href: "/offers/new" },
  { icon: Pencil, label: "Edit item", tone: "text-[#276ef1]", href: "/menu" },
  { icon: Clock, label: "Edit menu hours", tone: "text-black", href: "/menu" },
  { icon: Trophy, label: "Top Eats", tone: "text-[#ffc043]", href: "/marketing" },
  { icon: BookOpen, label: "Learning guide", tone: "text-[#276ef1]", href: "/performance/sales" },
  { icon: Smartphone, label: "Order Manager account", tone: "text-[#06c167]", href: "/settings" },
];

const opportunities = [
  {
    tag: "Operations",
    title: "Review why your online rate has dropped",
    location: "Desi Lunch Studio",
    body: "This week, your shop was available for 3.04% less time than last week. Make sure that you stay online so you don't miss out on new orders.",
    cta: "View analytics",
    href: "/performance/operations",
    icon: Hourglass,
    iconBg: "bg-[#fde8e6]",
    iconColor: "text-[#e11900]",
  },
  {
    tag: "Growth",
    title: "Download the Tiffin Finder Manager app",
    location: "Desi Lunch Studio +1 more shop",
    body: "Get real-time alerts about shop downtime and manage your shop on the go.",
    cta: "Get app",
    href: "/dashboard",
    icon: Smartphone,
    iconBg: "bg-[#e8efff]",
    iconColor: "text-[#276ef1]",
  },
  {
    tag: "Growth",
    title: "Access Merchant Financing to fuel your business",
    location: "Desi Lunch Studio",
    body: "Merchant Financing is a cash advance programme to help you invest in and grow your business.",
    cta: "Apply now",
    href: "/payments",
    icon: Banknote,
    iconBg: "bg-[#e6f9ee]",
    iconColor: "text-[#06c167]",
  },
];

const operations = [
  { label: "Orders with errors", href: "/complaints", value: "0", note: "" },
  { label: "Orders with chargebacks", href: "/complaints", value: "0", note: "" },
  { label: "Chargeback amount", href: "/payments", value: "A$0.00", note: "" },
];

function Dropdown({ options, initial }: { options: string[]; initial: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initial);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-black hover:bg-neutral-50"
      >
        {value}
        <ChevronDown className="size-3.5 text-neutral-500" />
      </button>
      {open ? (
        <div className="absolute left-0 top-10 z-20 w-52 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-neutral-50 ${
                opt === value ? "font-semibold text-black" : "text-neutral-600"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Feedback() {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  if (vote) {
    return <span className="text-xs font-medium text-neutral-500">Thanks for your feedback</span>;
  }
  return (
    <>
      <button
        type="button"
        onClick={() => setVote("up")}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-black"
      >
        <ThumbsUp className="size-3.5" /> Helpful
      </button>
      <button
        type="button"
        onClick={() => setVote("down")}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-black"
      >
        <ThumbsDown className="size-3.5" /> Not helpful
      </button>
    </>
  );
}

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6 flex items-start gap-3 rounded-xl bg-[#fff4e0] px-4 py-3 text-sm text-[#5c4500]">
        <p>
          <span className="font-semibold">Payouts temporarily on hold.</span> The payouts for some of your shops are
          temporarily paused due to missing or incorrect bank details. Please check the{" "}
          <Link href="/payments" className="font-semibold underline">
            payouts page
          </Link>{" "}
          for shop level details.
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-8 xl:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          {/* Today's summary */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm text-neutral-500">Good evening, Desi Lunch Studio</p>
              <h1 className="page-title">Today&apos;s summary</h1>
              <p className="mt-0.5 text-xs text-neutral-400">Last updated 2 minutes ago</p>
              <div className="mt-3">
                <Dropdown options={["All shops (2)", "Desi Lunch Studio", "Curry Nest Kitchen"]} initial="All shops (2)" />
              </div>
            </div>

            <Link
              href="/performance/success"
              className="flex w-full items-center gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-neutral-300 lg:w-80"
            >
              <div className="min-w-0 flex-1">
                <p className="mb-3 flex items-center gap-1 text-sm font-semibold text-black">
                  Success score (2 shops) <Info className="size-3.5 text-neutral-400" />
                </p>
                <div className="space-y-2">
                  {successRows.map((row) => (
                    <div key={row.label} className="flex items-center gap-2 text-xs">
                      <span className="w-16 shrink-0 text-neutral-600">
                        {row.count} - {row.label}
                      </span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                        <span className={`block h-full rounded-full ${row.tone} ${row.width}`} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <ChevronRight className="size-5 shrink-0 text-neutral-400" />
            </Link>
          </div>

          {/* KPI cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-neutral-200 p-5">
                <p className="flex items-center gap-1 text-sm text-neutral-500">
                  {kpi.label}
                  <Info className="size-3.5 text-neutral-400" />
                </p>
                <p className="mt-2 text-2xl font-bold tracking-[-0.02em] text-black">{kpi.value}</p>
                <p className="mt-1 text-xs text-neutral-500">{kpi.note}</p>
              </div>
            ))}
          </div>

          {/* Top opportunities */}
          <div>
            <h2 className="text-xl font-bold tracking-[-0.01em] text-black">Top opportunities</h2>
            <p className="mb-3 text-sm text-neutral-500">Improve your business on the platform with opportunities.</p>
            <div className="overflow-hidden rounded-xl border border-neutral-200">
              {opportunities.map(({ icon: Icon, ...op }, idx) => (
                <div
                  key={op.title}
                  className={`flex items-start justify-between gap-4 p-5 ${idx > 0 ? "border-t border-neutral-200" : ""}`}
                >
                  <div className="min-w-0">
                    <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                      {op.tag}
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-black">{op.title}</h3>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-neutral-500">
                      <MapPin className="size-3.5" /> {op.location}
                    </p>
                    <p className="mt-2 max-w-xl text-sm text-neutral-600">{op.body}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-5">
                      <Link href={op.href}>
                        <Button variant="secondary" size="sm">
                          {op.cta}
                        </Button>
                      </Link>
                      <Feedback />
                    </div>
                  </div>
                  <div className={`hidden size-24 shrink-0 items-center justify-center rounded-full sm:flex ${op.iconBg}`}>
                    <Icon className={`size-9 ${op.iconColor}`} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-neutral-400">
              Once completed, it may take a few days for new opportunities to show. Outcomes from opportunities are not
              guaranteed.
            </p>
          </div>

          {/* Performance and sales data */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold tracking-[-0.01em] text-black">Your performance and sales data</h2>
              <div className="mt-2">
                <Dropdown options={["Last 7 days", "Last 30 days", "Today"]} initial="Last 7 days" />
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
                <span>June 1 - 7, 2026 compared to May 25 - 31, 2026</span>
                <span>Last updated on 6 June 2026 at 21:32</span>
              </div>
            </div>

            <h3 className="text-base font-semibold text-black">Sales</h3>
            <RevenueChart />

            <h3 className="pt-2 text-base font-semibold text-black">Operations</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-neutral-200 p-5 sm:col-span-2">
                <Link href="/complaints" className="group inline-flex items-center gap-1 text-sm font-semibold text-black">
                  Orders with errors <ChevronRight className="size-4 text-neutral-400 group-hover:text-black" />
                </Link>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Orders with missing/wrong items and/or taste and quality issues.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {operations.map((op) => (
                    <div key={op.label}>
                      <p className="flex items-center gap-1 text-xs text-neutral-500">
                        {op.label} <Info className="size-3 text-neutral-400" />
                      </p>
                      <p className="mt-1 text-lg font-bold text-black">{op.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 p-5">
                <Link href="/performance/operations" className="group inline-flex items-center gap-1 text-sm font-semibold text-black">
                  Shop downtime <ChevronRight className="size-4 text-neutral-400 group-hover:text-black" />
                </Link>
                <p className="mt-0.5 text-xs text-neutral-500">Time your shop was unavailable during open hours.</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-neutral-500">Total time</p>
                    <p className="mt-1 text-lg font-bold text-black">34h 26m (36%)</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Potential sales lost</p>
                    <p className="mt-1 text-lg font-bold text-black">
                      A$94.45 <span className="text-xs font-medium text-[#cc1700]">+100%</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 p-5">
                <Link href="/orders" className="group inline-flex items-center gap-1 text-sm font-semibold text-black">
                  Unfulfilled <ChevronRight className="size-4 text-neutral-400 group-hover:text-black" />
                </Link>
                <p className="mt-0.5 text-xs text-neutral-500">Orders that were missed or cancelled by the shop.</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-neutral-500">Orders</p>
                    <p className="mt-1 text-lg font-bold text-black">0</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Sales lost</p>
                    <p className="mt-1 text-lg font-bold text-black">A$0.00</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 p-5">
                <Link href="/performance/operations" className="group inline-flex items-center gap-1 text-sm font-semibold text-black">
                  Avoidable courier wait time <ChevronRight className="size-4 text-neutral-400 group-hover:text-black" />
                </Link>
                <p className="mt-0.5 text-xs text-neutral-500">Avoidable wait time at the shop after order is ready.</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-neutral-500">Orders</p>
                    <p className="mt-1 text-lg font-bold text-black">0</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Wait time</p>
                    <p className="mt-1 text-lg font-bold text-black">
                      0 min <span className="text-xs font-medium text-[#cc1700]">+100%</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="pt-2 text-xl font-bold tracking-[-0.01em] text-black">Customers</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-neutral-200 p-5">
                <Link href="/customers" className="group inline-flex items-center gap-1 text-sm font-semibold text-black">
                  Customers <ChevronRight className="size-4 text-neutral-400 group-hover:text-black" />
                </Link>
                <p className="mt-0.5 text-xs text-neutral-500">Customer groups are calculated based on last 7 days.</p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-neutral-500">New</p>
                    <p className="mt-1 text-lg font-bold text-black">9</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Occasional</p>
                    <p className="mt-1 text-lg font-bold text-black">2</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Frequent</p>
                    <p className="mt-1 text-lg font-bold text-black">3</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 p-5">
                <Link href="/feedback" className="group inline-flex items-center gap-1 text-sm font-semibold text-black">
                  Customer reviews <ChevronRight className="size-4 text-neutral-400 group-hover:text-black" />
                </Link>
                <p className="mt-0.5 text-xs text-neutral-500">A measure of how you are rated by customers.</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-neutral-500">Average rating</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-lg font-bold text-black">
                      <Star className="size-4 fill-black" /> 5.0
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Reviews</p>
                    <p className="mt-1 text-lg font-bold text-black">1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions rail */}
        <aside className="h-fit rounded-xl border border-neutral-200 p-2">
          <p className="px-3 py-2 text-base font-bold tracking-[-0.01em] text-black">Quick actions</p>
          <div className="space-y-0.5">
            {quickActions.map(({ icon: Icon, label, tone, href }) => (
              <Link
                key={label}
                href={href}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-black transition-colors hover:bg-neutral-50"
              >
                <Icon className={`size-[18px] shrink-0 ${tone}`} />
                <span className="flex-1">{label}</span>
                <ChevronRight className="size-4 text-neutral-300" />
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
