"use client";

import { ChevronDown } from "lucide-react";
import { settingsShops } from "@/lib/settings-data";

export function ShopFilter({
  value,
  onChange,
  shops = settingsShops,
}: {
  value: string;
  onChange: (v: string) => void;
  shops?: readonly string[];
}) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none rounded-full bg-[#f6f6f6] py-2.5 pl-4 pr-10 text-sm font-semibold text-black outline-none"
      >
        {shops.map((shop) => (
          <option key={shop} value={shop}>
            {shop}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
    </div>
  );
}
