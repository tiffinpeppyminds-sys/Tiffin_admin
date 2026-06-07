"use client";

import { useState } from "react";
import Link from "next/link";
import { EmptyOrdersIcon } from "@/components/orders/empty-orders-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = ["Available", "Scheduled"] as const;

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Available");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Create reports for detailed data on your business with Tiffin Finder.
          </p>
        </div>
        <Link href="/reports/create">
          <Button>Create report</Button>
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
        <p className="mt-6 text-lg font-semibold text-black">Create a report</p>
        <p className="mt-2 max-w-sm text-sm text-neutral-500">
          {activeTab === "Available"
            ? "Once your report is available, you'll be able to download it here."
            : "Scheduled reports you create will appear here."}
        </p>
        <Link href="/reports/create" className="mt-6">
          <Button variant="secondary">Create report</Button>
        </Link>
      </div>
    </div>
  );
}
