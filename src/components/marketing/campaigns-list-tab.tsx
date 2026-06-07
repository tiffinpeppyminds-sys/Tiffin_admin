"use client";

import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { offerCampaigns } from "@/lib/marketing-data";
import { cn } from "@/lib/utils";

function FilterPill({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium",
        active ? "bg-black text-white" : "border border-neutral-300 bg-white text-black hover:bg-neutral-50",
      )}
    >
      {label}
      <ChevronDown className="size-3.5" />
    </button>
  );
}

export function CampaignsListTab() {
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2">
        <FilterPill label="Maikhana Adelaide" active />
        <FilterPill label="Campaign status (5)" />
        <FilterPill label="Last 7 days" />
      </div>

      <section>
        <h2 className="text-lg font-bold text-black">Offers</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-white text-neutral-500">
                <th className="px-4 py-3 font-medium">Campaign</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Dates</th>
                <th className="px-4 py-3 font-medium">Shops</th>
                <th className="px-4 py-3 font-medium">Audience</th>
                <th className="px-4 py-3 font-medium">Sales</th>
                <th className="px-4 py-3 font-medium">New customers</th>
                <th className="px-4 py-3 font-medium">Orders</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {offerCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-neutral-100 last:border-0">
                  <td className="px-4 py-4">
                    <Link
                      href={`/marketing/campaigns/${campaign.id}`}
                      className="font-medium text-black underline hover:text-neutral-600"
                    >
                      {campaign.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-2 text-black">
                      <span className="size-2 rounded-full bg-neutral-400" />
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-black">{campaign.dates}</td>
                  <td className="px-4 py-4 text-black">{campaign.shops}</td>
                  <td className="px-4 py-4 text-black">{campaign.audience}</td>
                  <td className="px-4 py-4 text-black">{campaign.sales}</td>
                  <td className="px-4 py-4 text-black">{campaign.newCustomers}</td>
                  <td className="px-4 py-4 text-black">{campaign.orders}</td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      className="rounded-full border border-neutral-300 px-3 py-1 text-sm font-medium text-black hover:bg-neutral-50"
                    >
                      Rerun
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 px-4 py-3 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <select className="rounded border border-neutral-300 px-2 py-1 text-black">
                <option>5</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" disabled className="text-neutral-300">
                <ChevronLeft className="size-4" />
              </button>
              <span className="text-black">Prev</span>
              <span className="rounded border border-neutral-300 px-2 py-0.5 text-black">1</span>
              <span>of 1</span>
              <span className="text-black">Next</span>
              <button type="button" disabled className="text-neutral-300">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-black">Ads</h2>
        <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-neutral-200 px-6 py-16 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
            <TrendingUp className="size-8" />
          </div>
          <p className="mt-6 text-lg font-semibold text-black">There is no active or upcoming ad campaign</p>
          <p className="mt-2 max-w-md text-sm text-neutral-500">
            Ads boost your shops higher up in the feed. Get started in minutes.
          </p>
          <Link href="/ads/create" className="mt-6">
            <button
              type="button"
              className="rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-black hover:bg-neutral-50"
            >
              Create ad
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
