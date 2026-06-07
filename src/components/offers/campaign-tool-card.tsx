"use client";

import Link from "next/link";
import { Heart, TrendingUp } from "lucide-react";
import type { CampaignType } from "@/lib/offers-data";
import { cn } from "@/lib/utils";

export function CampaignToolCard({ campaign, className }: { campaign: CampaignType; className?: string }) {
  const Icon = campaign.icon;

  return (
    <Link
      href={`/offers/create/${campaign.slug}`}
      className={cn(
        "group relative flex flex-col rounded-xl border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-300 hover:shadow-sm",
        className,
      )}
    >
      {campaign.badge ? (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#e6f9ee] px-2.5 py-1 text-[11px] font-semibold text-[#06c167]">
          {campaign.badge === "Customer favourite" ? (
            <Heart className="size-3 fill-[#06c167]" />
          ) : (
            <TrendingUp className="size-3" />
          )}
          {campaign.badge}
        </span>
      ) : null}
      <Icon className="size-8 text-[#276ef1]" />
      <p className="mt-4 text-[15px] font-bold text-black">{campaign.title}</p>
      {campaign.example ? <p className="mt-1 text-sm text-neutral-500">Example: {campaign.example}</p> : null}
    </Link>
  );
}
