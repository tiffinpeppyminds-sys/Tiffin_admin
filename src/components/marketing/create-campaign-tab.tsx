"use client";

import Link from "next/link";
import { ChevronDown, ThumbsDown, ThumbsUp } from "lucide-react";
import { MarketingToolCard } from "@/components/marketing/marketing-tool-card";
import { RecommendationPreview } from "@/components/marketing/recommendation-preview";
import { allMarketingTools, marketingRecommendations } from "@/lib/marketing-data";
import { popularItems, shopOptions } from "@/lib/offers-data";

export function CreateCampaignTab({ shop, onShopChange }: { shop: string; onShopChange: (v: string) => void }) {
  return (
    <div className="space-y-10">
      <div className="relative mt-1 inline-block">
        <select
          value={shop}
          onChange={(e) => onShopChange(e.target.value)}
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

      <section>
        <h2 className="text-lg font-bold text-black">Top recommendations</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Based on your shop&apos;s performance, marketplace trends and annual studies. Your results may vary.
        </p>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {marketingRecommendations.map((rec) => (
            <div key={rec.id} className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <RecommendationPreview type={rec.preview} />
              <div className="p-5">
                <p className="text-[15px] font-bold text-black">{rec.title}</p>
                <p className="mt-2 text-sm text-neutral-500">{rec.stat}</p>
                <div className="mt-5 flex items-center justify-between">
                  <Link href={rec.href}>
                    <button
                      type="button"
                      className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-black hover:bg-neutral-50"
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
          {allMarketingTools.map((tool) => (
            <MarketingToolCard
              key={tool.slug}
              title={tool.title}
              subtitle={"subtitle" in tool ? tool.subtitle : undefined}
              example={"example" in tool ? tool.example : undefined}
              badge={"badge" in tool ? tool.badge : undefined}
              icon={tool.icon}
              href={tool.href}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
