"use client";

import { Info, ThumbsDown, ThumbsUp, X } from "lucide-react";

type RateDeliveryModalProps = {
  open: boolean;
  onClose: () => void;
  courierName: string;
};

export function RateDeliveryModal({ open, onClose, courierName }: RateDeliveryModalProps) {
  if (!open) return null;

  return (
    <>
      <button type="button" className="fixed inset-0 z-[60] bg-black/40" onClick={onClose} aria-label="Close" />
      <div className="fixed left-1/2 top-1/2 z-[70] w-full max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold text-black">Rate delivery experience</h2>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-neutral-100" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          Your feedback helps create a positive experience for users on the platform. Feedback, if shared with delivery
          people, will be anonymised.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-28 items-center justify-center rounded-xl border border-neutral-200 bg-white transition-colors hover:border-neutral-400 hover:bg-neutral-50"
          >
            <ThumbsUp className="size-9 text-black" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-28 items-center justify-center rounded-xl border border-neutral-200 bg-white transition-colors hover:border-neutral-400 hover:bg-neutral-50"
          >
            <ThumbsDown className="size-9 text-black" strokeWidth={1.5} />
          </button>
        </div>
        <button type="button" className="mt-6 w-full text-center text-sm font-medium text-[#276ef1] hover:underline">
          I have a safety issue with delivery person
        </button>
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            className="flex-1 rounded-full bg-[#f3f3f3] px-4 py-3 text-sm font-medium text-neutral-500"
          >
            Unpair delivery person
          </button>
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
            aria-label="More information"
          >
            <Info className="size-4" />
          </button>
        </div>
        <p className="sr-only">Rating {courierName}</p>
      </div>
    </>
  );
}
