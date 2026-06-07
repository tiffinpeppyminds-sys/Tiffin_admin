"use client";

import { useRouter } from "next/navigation";
import { RotateCcw, X } from "lucide-react";
import { PhoneMockup } from "@/components/ads/phone-mockup";
import { formatCurrency } from "@/lib/ads-data";

function InfoIcon() {
  return (
    <span className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-full border border-neutral-400 text-[10px] font-bold leading-none text-neutral-400">
      i
    </span>
  );
}

export function AdPreviewPanel({
  shopName,
  weeklySales,
  maxWeeklySpend,
  spendDetail,
}: {
  shopName: string;
  weeklySales: number;
  maxWeeklySpend: number;
  spendDetail: string;
}) {
  const router = useRouter();

  return (
    <aside className="relative flex h-full flex-col bg-[#f6f6f6]">
      <button
        type="button"
        onClick={() => router.push("/ads")}
        className="absolute right-6 top-6 z-10 rounded-full p-1 text-neutral-500 hover:bg-neutral-200 hover:text-black"
        aria-label="Close"
      >
        <X className="size-5" />
      </button>

      <div className="flex flex-1 flex-col items-center px-8 pt-16">
        <PhoneMockup shopName={shopName} />
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black"
        >
          <RotateCcw className="size-4" />
          Replay
        </button>

        <div className="mt-8 w-full max-w-[300px] rounded-xl bg-white p-5 shadow-sm">
          <p className="text-[15px] font-bold text-black">Estimated results*</p>

          <div className="mt-5 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-black">Weekly ad sales</span>
                <InfoIcon />
              </div>
              <span className="text-sm font-bold text-[#06c167]">{formatCurrency(weeklySales)}</span>
            </div>

            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-black">Return on ad spend</span>
                  <InfoIcon />
                </div>
                <span className="text-sm font-bold text-[#06c167]">10x</span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                You&apos;ll get A$10 in sales for every A$1 you spend
              </p>
            </div>

            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-black">Max weekly ad spend</span>
                  <InfoIcon />
                </div>
                <span className="text-sm font-bold text-[#06c167]">{formatCurrency(maxWeeklySpend)}</span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">{spendDetail}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="px-8 pb-8 pt-6 text-center text-[11px] leading-relaxed text-neutral-500">
        * Your results may vary due to factors like demand, number of shops and operating hours. Results
        aren&apos;t guaranteed.
      </p>
    </aside>
  );
}
