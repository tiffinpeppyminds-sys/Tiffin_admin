"use client";

import { Heart, Star } from "lucide-react";

export function PhoneMockup({ shopName }: { shopName: string }) {
  return (
    <div className="mx-auto w-[220px]">
      <div className="rounded-[32px] border-[6px] border-black bg-black p-1.5 shadow-xl">
        <div className="overflow-hidden rounded-[26px] bg-white">
          <div className="bg-neutral-100 px-3 py-2 text-center text-[10px] font-medium text-neutral-600">
            Now · 1400 Broadway
          </div>
          <div className="relative h-28 bg-gradient-to-br from-amber-200 via-orange-300 to-rose-300">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1YjA3MCIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNjAiIHI9IjMwIiBmaWxsPSIjZWE1ODQ4IiBvcGFjaXR5PSIwLjciLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSI0MCIgcj0iMjUiIGZpbGw9IiNkOTc3MDYiIG9wYWNpdHk9IjAuNyIvPjwvc3ZnPg==')] bg-cover" />
          </div>
          <div className="space-y-1.5 px-3 py-3">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-bold text-black">{shopName}</p>
              <Heart className="size-4 shrink-0 text-black" />
            </div>
            <p className="text-[11px] text-neutral-600">A$0 Delivery Fee · 15 min</p>
            <div className="flex items-center gap-1 text-[11px] text-neutral-600">
              <Star className="size-3 fill-black text-black" />
              <span className="font-semibold text-black">4.5</span>
              <span>(4,710+)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
