"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  ChevronDown,
  Clock,
  Crosshair,
  DollarSign,
  Store,
  X,
} from "lucide-react";
import { getCampaignDetail } from "@/lib/marketing-data";
import { cn } from "@/lib/utils";

const chartTabs = ["Sales", "Orders", "New customers"] as const;

export default function CampaignDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "buy-one-free-item";
  const campaign = getCampaignDetail(id);
  const [activeChart, setActiveChart] = useState<(typeof chartTabs)[number]>("Sales");

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Link
            href="/marketing?tab=campaigns"
            className="mt-1 rounded-lg border border-neutral-300 p-2 text-black hover:bg-neutral-50"
            aria-label="Close"
          >
            <X className="size-5" />
          </Link>
          <div>
            <h1 className="page-title">{campaign.name}</h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-neutral-600">
              <span className="size-2 rounded-full bg-neutral-400" />
              {campaign.status} {campaign.statusDates}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-black hover:bg-neutral-50"
          >
            01/06/2026 – 07/06/2026
            <ChevronDown className="size-3.5" />
          </button>
          <button
            type="button"
            className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm font-medium text-black hover:bg-neutral-50"
          >
            Rerun
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Sales", value: campaign.sales, underline: true },
          { label: "New customers", value: String(campaign.newCustomers), underline: true },
          { label: "Orders", value: String(campaign.orders), underline: false },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-neutral-200 bg-white p-5">
            <p className="kpi-value-lg">{stat.value}</p>
            <p
              className={cn(
                "mt-1 text-sm text-black",
                stat.underline && "underline decoration-neutral-300 underline-offset-2",
              )}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 border-y border-neutral-200 py-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-black underline decoration-neutral-300 underline-offset-2">Offer redemption</span>
            <span className="font-semibold text-black">{campaign.offerRedemption}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-black">Campaign duration</span>
            <span className="font-semibold text-black">{campaign.campaignDuration}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-black">Average offer redemption per order</span>
            <span className="font-semibold text-black">{campaign.avgRedemptionPerOrder}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-black">Average order value</span>
            <span className="font-semibold text-black">{campaign.avgOrderValue}</span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200">
        <div className="flex gap-2 border-b border-neutral-200 px-4 py-3">
          {chartTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveChart(tab)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeChart === tab
                  ? "border border-black bg-white text-black"
                  : "text-neutral-600 hover:text-black",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="h-64 bg-white" />
      </div>

      <section>
        <h2 className="text-lg font-bold text-black">Campaign details</h2>
        <div className="mt-4 grid gap-0 md:grid-cols-2">
          {[
            { icon: Crosshair, label: "Audience", value: campaign.audience },
            { icon: Store, label: "Shop(s)", value: campaign.shop },
            { icon: DollarSign, label: "Budget", value: campaign.budget },
            { icon: Calendar, label: "Duration", value: campaign.duration },
            { icon: Clock, label: "Scheduling", value: campaign.scheduling },
          ].map((row, idx) => {
            const Icon = row.icon;
            return (
              <div
                key={row.label}
                className={cn(
                  "flex items-start gap-4 border-b border-neutral-200 py-5",
                  idx % 2 === 0 ? "md:pr-8" : "md:pl-8",
                )}
              >
                <Icon className="mt-0.5 size-5 shrink-0 text-black" />
                <div>
                  <p className="text-sm font-semibold text-black">{row.label}</p>
                  <p className="mt-0.5 text-sm text-neutral-600">{row.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
