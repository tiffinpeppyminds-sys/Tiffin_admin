"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { EmptyOrdersIcon } from "@/components/orders/empty-orders-icon";
import { PaymentsFilterDropdown } from "@/components/payments/shared";
import { payoutByOrderKpis } from "@/lib/payments-data";

export default function PayoutsByOrderPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-6">
      <h1 className="page-title">Payouts by order</h1>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <PaymentsFilterDropdown label="Maikhana Adelaide" options={["Maikhana Adelaide", "Scoop Shoppe"]} />
          <PaymentsFilterDropdown label="08/06/2026 - 08/06/2026" options={["08/06/2026 - 08/06/2026", "Last 7 days"]} />
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customer name or order ID"
            className="w-full rounded-lg bg-[#f6f6f6] py-3 pl-10 pr-4 text-sm outline-none placeholder:text-neutral-500 focus:ring-1 focus:ring-neutral-300"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 border-b border-neutral-200 pb-5">
        {payoutByOrderKpis.map((kpi) => (
          <div key={kpi.label} className="min-w-[120px]">
            <p className="inline-flex items-center gap-1 text-sm text-neutral-600">
              {kpi.label}
              <span className="text-neutral-400">ⓘ</span>
            </p>
            <p className="mt-1 text-lg font-bold text-black">{kpi.value}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-neutral-500">Last updated: 8 June 2026 at 3:33:11 GMT+5:30</p>

      <div className="flex flex-col items-center justify-center py-24 text-center">
        <EmptyOrdersIcon />
        <p className="mt-6 text-lg font-semibold text-black">No orders found</p>
        <p className="mt-2 text-sm text-neutral-500">Adjust your filters to see more orders</p>
      </div>
    </div>
  );
}
