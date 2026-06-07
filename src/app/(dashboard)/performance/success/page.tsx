"use client";

import { Fragment, useState, type ComponentType } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Info,
  Lock,
  Search,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DownloadButton,
  FaqAccordion,
  FilterDropdown,
  SectionCard,
  StatusBadge,
} from "@/components/performance/shared";
import {
  benefitRows,
  faqItems,
  operationalMetrics,
  recommendations,
  successOverview,
  successShops,
} from "@/lib/performance-data";
import { cn } from "@/lib/utils";

const tiers = ["Poor", "Fair", "Good", "Great", "Excellent"];
const tierIcons = ["◆", "◆", "●", "●", "●"];
const tierColors = ["text-[#cc1700]", "text-[#c7922e]", "text-[#06c167]", "text-[#0e8345]", "text-[#276ef1]"];

export default function PerformanceSuccessPage() {
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(benefitRows[0]?.label ?? null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title">Success score</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
          Success score helps you understand your business, rewards you for providing great value to customers and may
          help boost your sales.
        </p>
        <p className="mt-2 text-xs text-neutral-500">Evaluation period: 23 days left (01 Jul 2024)</p>
      </div>

      <section>
        <h2 className="text-base font-bold text-black">Overview (2)</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Your status is determined on the 1st of every month and is based on your last 90 days of performance.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {successOverview.map((card) => (
            <div
              key={card.label}
              className={cn("rounded-xl border-2 px-4 py-5", card.border, card.bg)}
            >
              <p className="text-sm font-medium text-neutral-600">Score</p>
              <p className="mt-1 text-lg font-bold text-black">{card.label}</p>
              <p className="mt-2 text-sm text-neutral-600">{card.count} shops</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-black">Shops</h2>
          <div className="flex items-center gap-2">
            <button type="button" className="flex size-9 items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-50">
              <Search className="size-4" />
            </button>
            <DownloadButton />
            <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-black hover:bg-neutral-50">
              Reset
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-white">
                {["Shop name", "Status", "Operational excellence", "Menu markup", "Menu details", "Ratings", "Sustainable packaging", "Sales", ""].map((col) => (
                  <th key={col || "action"} className="px-4 py-3 text-left text-sm font-medium text-black">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {successShops.map((shop) => (
                <tr key={shop.name} className="border-b border-neutral-100 hover:bg-neutral-50/50">
                  <td className="px-4 py-4 font-medium text-black">{shop.name}</td>
                  <td className="px-4 py-4"><StatusBadge status={shop.status} /></td>
                  <td className={cn("px-4 py-4", shop.highlights.operational && "bg-[#fff2f2]")}>{shop.operational}</td>
                  <td className="px-4 py-4 text-neutral-500">{shop.menuMarkup}</td>
                  <td className="px-4 py-4">{shop.menuDetails}</td>
                  <td className={cn("px-4 py-4", shop.highlights.ratings && "bg-[#fff2f2] text-[#cc1700]")}>{shop.ratings}</td>
                  <td className="px-4 py-4 text-neutral-500">{shop.packaging}</td>
                  <td className="px-4 py-4 font-medium">{shop.sales}</td>
                  <td className="px-4 py-4"><ChevronRight className="size-4 text-neutral-300" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-base font-bold text-black">Score breakdown</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Track your progress and meet the goals for each metric to reach the next level. Data updates daily.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <ScoreCard
            icon={Info}
            label="Operational excellence"
            value="85.2"
            goal="Goal: 94.0 or above"
            alert
          />
          <ScoreCard icon={UtensilsCrossed} label="Menu details" value="82%" goal="Goal: Not applicable" />
          <ScoreCard icon={Star} label="Rating" value="4.2" goal="Goal: Not applicable" />
        </div>
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                {["Operational excellence metric", "Current", "Goal", "Impact on metric"].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-sm font-medium text-black">
                    <span className="inline-flex items-center gap-1">{col} <Info className="size-3.5 text-neutral-400" /></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {operationalMetrics.map((row) => (
                <tr key={row.metric} className="border-b border-neutral-100">
                  <td className="px-4 py-4 text-black">{row.metric}</td>
                  <td className={cn("px-4 py-4 font-medium", row.failing && "text-[#cc1700]")}>{row.current}</td>
                  <td className="px-4 py-4 text-neutral-600">{row.goal}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">{row.impact}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-black">Recommendations (3)</h2>
            <p className="mt-1 text-sm text-neutral-500">Actions to help improve your success score.</p>
          </div>
          <FilterDropdown label="Filter by category" options={["All categories", "Operational excellence", "Menu"]} />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <div key={rec.title} className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5">
              <p className="text-xs font-medium text-neutral-500">{rec.category}</p>
              <p className="mt-2 font-bold text-black">{rec.title}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{rec.body}</p>
              <Link href={rec.href} className="mt-4">
                <Button size="sm" className="w-full">Review</Button>
              </Link>
            </div>
          ))}
        </div>
        <button type="button" className="mt-4 text-sm font-medium text-[#276ef1] hover:underline">
          View completed actions (0)
        </button>
      </section>

      <section>
        <button type="button" className="mb-4 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-black hover:bg-neutral-50">
          View completed actions (0)
        </button>
        <h2 className="page-title">Benefits</h2>
        <p className="mt-2 max-w-2xl text-sm text-neutral-600">
          Get rewarded for quality with benefits that provide increased visibility in the app and ways to help you grow.
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="min-w-[720px] w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="px-4 py-3 text-left font-medium text-black">Benefits</th>
                {tiers.map((tier, i) => (
                  <th
                    key={tier}
                    className={cn("px-4 py-3 text-center font-medium", i === 0 && "bg-neutral-50")}
                  >
                    <span className={cn("inline-flex items-center gap-1", tierColors[i])}>
                      {tierIcons[i]} {tier}
                    </span>
                    {i === 0 ? <p className="mt-1 text-xs font-normal text-neutral-500">Current tier</p> : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {benefitRows.map((row) => (
                <Fragment key={row.label}>
                  <tr className="border-b border-neutral-100">
                    <td className="px-4 py-3" colSpan={6}>
                      <button
                        type="button"
                        onClick={() => setExpandedBenefit(expandedBenefit === row.label ? null : row.label)}
                        className="flex w-full items-center gap-2 text-left font-medium text-black"
                      >
                        <ChevronDown className={cn("size-4 transition-transform", expandedBenefit === row.label && "rotate-180")} />
                        {row.label}
                      </button>
                    </td>
                  </tr>
                  {expandedBenefit === row.label ? (
                    <tr className="border-b border-neutral-100">
                      <td className="px-4 py-6 text-neutral-400">—</td>
                      {tiers.map((_, i) => (
                        <td key={i} className={cn("px-4 py-6 text-center", i === 0 && "bg-neutral-50")}>
                          {i === 0 ? null : <Lock className="mx-auto size-4 text-neutral-300" />}
                        </td>
                      ))}
                    </tr>
                  ) : null}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-base font-bold text-black">Frequently asked questions</h2>
        <FaqAccordion items={faqItems} />
      </section>
    </div>
  );
}

function ScoreCard({
  icon: Icon,
  label,
  value,
  goal,
  alert,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  goal: string;
  alert?: boolean;
}) {
  return (
    <div className="relative rounded-xl border border-neutral-200 bg-white p-5">
      {alert ? (
        <AlertCircle className="absolute right-4 top-4 size-5 text-[#cc1700]" />
      ) : null}
      <Icon className="size-5 text-neutral-500" />
      <p className="mt-3 inline-flex items-center gap-1 text-sm text-neutral-600">
        {label} <Info className="size-3.5 text-neutral-400" />
      </p>
      <p className="mt-2 kpi-value-lg">{value}</p>
      <p className="mt-1 text-sm text-neutral-500">{goal}</p>
    </div>
  );
}
