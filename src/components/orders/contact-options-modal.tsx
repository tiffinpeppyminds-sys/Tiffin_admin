"use client";

import { ChevronRight, Headset, UserRound, X } from "lucide-react";

type ContactOptionsModalProps = {
  open: boolean;
  onClose: () => void;
  customerName: string;
};

export function ContactOptionsModal({ open, onClose, customerName }: ContactOptionsModalProps) {
  if (!open) return null;

  return (
    <>
      <button type="button" className="fixed inset-0 z-[60] bg-black/40" onClick={onClose} aria-label="Close" />
      <div className="fixed left-1/2 top-1/2 z-[70] w-full max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">Contact options</h2>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-neutral-100" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>
        <div className="space-y-3">
          <button
            type="button"
            className="flex w-full items-center gap-4 rounded-xl border border-neutral-200 px-4 py-4 text-left transition-colors hover:bg-neutral-50"
          >
            <Headset className="size-5 shrink-0 text-black" />
            <span className="flex-1 text-[15px] font-medium text-black">Call Support</span>
            <ChevronRight className="size-5 text-neutral-300" />
          </button>
          <button
            type="button"
            disabled
            className="flex w-full cursor-not-allowed items-center gap-4 rounded-xl border border-neutral-200 px-4 py-4 text-left opacity-70"
          >
            <UserRound className="size-5 shrink-0 text-neutral-400" />
            <span className="flex-1">
              <span className="block text-sm text-neutral-500">Customer calling period has ended</span>
              <span className="block text-[15px] font-medium text-neutral-400">{customerName}</span>
            </span>
            <ChevronRight className="size-5 text-neutral-300" />
          </button>
        </div>
      </div>
    </>
  );
}
