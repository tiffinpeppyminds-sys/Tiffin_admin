"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { ShopFilter } from "@/components/settings/shop-filter";
import { settingsShops } from "@/lib/settings-data";

export default function PreparationTimesPage() {
  const [shop, setShop] = useState<string>(settingsShops[1]);
  const [minutes, setMinutes] = useState(15);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Pick-up times</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
          Pick-up times are calculated based on your average preparation time. Customers see an estimated pick-up time
          when they place an order.{" "}
          <button type="button" className="font-medium text-[#06c167] hover:underline">
            Tips for accurate pick-ups
          </button>
        </p>
      </div>

      <ShopFilter value={shop} onChange={setShop} shops={settingsShops.slice(1)} />

      <section className="max-w-lg space-y-4">
        <div>
          <h2 className="text-lg font-bold text-black">Average preparation times</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Let us know how long it usually takes to prepare an order, and we&apos;ll use this information to improve
            pick-up accuracy.
          </p>
        </div>
        <div>
          <label className="text-sm font-semibold text-black">Minutes</label>
          <div className="mt-2 inline-flex items-center rounded-lg bg-[#f6f6f6] px-1">
            <button
              type="button"
              onClick={() => setMinutes((m) => Math.max(1, m - 1))}
              className="px-4 py-3 text-lg text-neutral-500 hover:text-black"
            >
              <Minus className="size-4" />
            </button>
            <span className="min-w-[56px] text-center text-sm font-semibold text-black">{minutes}</span>
            <button
              type="button"
              onClick={() => setMinutes((m) => m + 1)}
              className="px-4 py-3 text-lg text-neutral-500 hover:text-black"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
        <button type="button" className="text-sm font-medium text-[#06c167] hover:underline">
          + Add More
        </button>
        <div className="pt-2">
          <button
            type="button"
            className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Save changes
          </button>
        </div>
      </section>
    </div>
  );
}
