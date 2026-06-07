"use client";

import { TrendingUp } from "lucide-react";
import { OfferPhoneMockup } from "@/components/offers/offer-phone-mockup";

function InfoIcon() {
  return (
    <span className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-full border border-neutral-400 text-[10px] font-bold leading-none text-neutral-400">
      i
    </span>
  );
}

export function OfferPreviewPanel({ shopName, salesBoost }: { shopName: string; salesBoost: string }) {
  return (
    <aside className="flex h-full flex-col bg-[#f6f6f6]">
      <div className="flex flex-1 flex-col items-center px-8 pt-16">
        <OfferPhoneMockup shopName={shopName} />

        <div className="mt-10 w-full max-w-[300px] rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[15px] font-bold text-black">Up to {salesBoost} more sales</p>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                compared to shops not running this offer.{" "}
                <button type="button" className="underline hover:text-black">
                  How is this calculated?
                </button>
              </p>
            </div>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#06c167] text-white">
              <TrendingUp className="size-4" />
            </span>
          </div>

          <div className="my-4 border-t border-dashed border-neutral-300" />

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-black">Offer Redemption Fee (excluding taxes)</span>
              <InfoIcon />
            </div>
            <span className="text-sm font-bold text-black">A$0.55 per order</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
