"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { CampaignToolCard } from "@/components/offers/campaign-tool-card";
import { campaignTypes } from "@/lib/offers-data";

export default function NewCampaignPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white px-6 py-8 lg:px-12 lg:py-10">
      <button
        type="button"
        onClick={() => router.push("/offers")}
        className="rounded-full border border-neutral-300 p-2 text-neutral-600 hover:bg-neutral-50 hover:text-black"
        aria-label="Close"
      >
        <X className="size-5" />
      </button>

      <div className="mx-auto mt-8 max-w-5xl">
        <h1 className="page-title-lg">Select a campaign</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Recommendation badges are based on marketplace trends or annual studies. Your results may vary.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaignTypes.map((campaign) => (
            <CampaignToolCard key={campaign.slug} campaign={campaign} />
          ))}
        </div>
      </div>
    </div>
  );
}
