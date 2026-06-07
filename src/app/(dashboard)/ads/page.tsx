"use client";

import { useState } from "react";
import Link from "next/link";
import { EmptyOrdersIcon } from "@/components/orders/empty-orders-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = ["Active", "Paused", "Ended"] as const;

export default function AdsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Active");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Ads</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Grow your sales and get discovered by more customers with sponsored listings.
          </p>
        </div>
        <Link href="/ads/create">
          <Button>Create ad</Button>
        </Link>
      </div>

      <div className="border-b border-neutral-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "tab-link",
                activeTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-neutral-500 hover:text-black",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-28 text-center">
        <EmptyOrdersIcon />
        <p className="mt-6 text-lg font-semibold text-black">Create your first ad</p>
        <p className="mt-2 max-w-sm text-sm text-neutral-500">
          {activeTab === "Active"
            ? "Sponsored listings help new customers discover your shops. Create an ad to get started."
            : activeTab === "Paused"
              ? "Paused ads will appear here when you pause a running campaign."
              : "Ended ads will appear here after a campaign finishes."}
        </p>
        <Link href="/ads/create" className="mt-6">
          <Button variant="secondary">Create ad</Button>
        </Link>
      </div>
    </div>
  );
}
