"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CampaignsListTab } from "@/components/marketing/campaigns-list-tab";
import { CreateCampaignTab } from "@/components/marketing/create-campaign-tab";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "create" as const, label: "Create campaign" },
  { id: "campaigns" as const, label: "Campaigns" },
];

export default function MarketingPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "campaigns" ? "campaigns" : "create";
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>(initialTab);
  const [shop, setShop] = useState("Maikhana Adelaide");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="page-title">Marketing</h1>
        <Link href="/marketing/new">
          <Button>+ New campaign</Button>
        </Link>
      </div>

      <div className="border-b border-neutral-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "tab-link",
                activeTab === tab.id
                  ? "border-black text-black"
                  : "border-transparent text-neutral-500 hover:text-black",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "create" ? (
        <CreateCampaignTab shop={shop} onShopChange={setShop} />
      ) : (
        <CampaignsListTab />
      )}
    </div>
  );
}
