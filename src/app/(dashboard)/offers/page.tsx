"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ThumbsDown, ThumbsUp } from "lucide-react";
import { CampaignToolCard } from "@/components/offers/campaign-tool-card";
import { Button } from "@/components/ui/button";
import { campaignTypes, featuredCampaigns, popularItems, shopOptions } from "@/lib/offers-data";

export default function OffersPage() {
  const [shop, setShop] = useState("Maikhana Adelaide");

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Offers</h1>
          <div className="relative mt-3 inline-block">
            <select
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              className="appearance-none rounded-lg border border-neutral-300 bg-white py-2 pl-3 pr-9 text-sm font-medium text-black outline-none focus:border-black"
            >
              {shopOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
          </div>
        </div>
        <Link href="/offers/new">
          <Button>+ New campaign</Button>
        </Link>
      </div>

      <section>
        <h2 className="text-lg font-bold text-black">Top recommendations</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Based on your shop&apos;s performance, marketplace trends and annual studies. Your results may vary.
        </p>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {featuredCampaigns.map((campaign) => (
            <div
              key={campaign.slug}
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <div className="h-44 bg-gradient-to-br from-amber-100 via-orange-200 to-rose-200" />
              <div className="p-5">
                <p className="text-[15px] font-bold text-black">{campaign.title}</p>
                <p className="mt-2 text-sm text-neutral-500">{campaign.stat}</p>
                <div className="mt-5 flex items-center justify-between">
                  <Link href={`/offers/create/${campaign.slug}`}>
                    <button
                      type="button"
                      className="rounded-full bg-[#f3f3f3] px-5 py-2 text-sm font-medium text-black hover:bg-neutral-200"
                    >
                      Create
                    </button>
                  </Link>
                  <div className="flex gap-2">
                    <button type="button" className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-black">
                      <ThumbsUp className="size-4" />
                    </button>
                    <button type="button" className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-black">
                      <ThumbsDown className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-black">Run offers on popular items</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Showcase items that represent your brand to attract new customers.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {popularItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4"
            >
              <div className={`size-14 shrink-0 rounded-full bg-gradient-to-br ${item.color}`} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-black">{item.name}</p>
                <p className="text-sm text-neutral-500">{item.orders} orders last 30 days</p>
              </div>
              <Link href="/offers/create/percent-off-items">
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-neutral-300 px-3 py-1.5 text-sm font-medium text-black hover:bg-neutral-50"
                >
                  Create offer
                  <ChevronDown className="size-3.5" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-black">All tools</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Recommendation badges are based on marketplace trends or annual studies. Your results may vary.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {campaignTypes.map((campaign) => (
            <CampaignToolCard key={campaign.slug} campaign={campaign} />
          ))}
        </div>
      </section>
    </div>
  );
}
