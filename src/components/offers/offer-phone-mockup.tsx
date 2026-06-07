"use client";

import { Heart, Search, Settings2, ShoppingCart } from "lucide-react";

export function OfferPhoneMockup({ shopName }: { shopName: string }) {
  return (
    <div className="mx-auto w-[220px]">
      <div className="rounded-[32px] border-[6px] border-black bg-black p-1.5 shadow-xl">
        <div className="overflow-hidden rounded-[26px] bg-white">
          <div className="flex items-center justify-between bg-white px-3 py-2">
            <Search className="size-3.5 text-black" />
            <div className="flex gap-2">
              <Settings2 className="size-3.5 text-black" />
              <ShoppingCart className="size-3.5 text-black" />
            </div>
          </div>
          <p className="px-3 pb-2 text-xs font-semibold text-black">All shops</p>
          <div className="px-3 pb-3">
            <div className="overflow-hidden rounded-xl border border-neutral-200">
              <div className="relative h-24 bg-gradient-to-br from-amber-200 via-orange-300 to-rose-300">
                <span className="absolute left-2 top-2 rounded bg-[#e11900] px-2 py-0.5 text-[10px] font-bold text-white">
                  Save on Menu Items
                </span>
              </div>
              <div className="flex items-center justify-between px-2.5 py-2">
                <p className="truncate text-xs font-bold text-black">{shopName}</p>
                <Heart className="size-3.5 shrink-0 text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
