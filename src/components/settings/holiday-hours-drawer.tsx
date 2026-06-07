"use client";

import { ChevronDown, Info, X } from "lucide-react";

export function HolidayHoursDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-y-0 left-0 right-0 top-14 z-40 bg-black/40 lg:left-64"
        onClick={onClose}
        aria-label="Close drawer"
      />
      <aside className="fixed right-0 top-14 z-50 flex h-[calc(100vh-3.5rem)] w-full max-w-[460px] flex-col border-l border-neutral-200 bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.12)]">
        <div className="flex items-start justify-between px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-black">Add holiday hours</h2>
            <p className="mt-1 text-sm text-neutral-600">Set dates you&apos;re closed or have special hours.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 hover:bg-neutral-100" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 pb-6">
          <div>
            <label className="text-sm font-semibold text-black">Shops</label>
            <div className="relative mt-2">
              <select className="w-full appearance-none rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none">
                <option>Shops (0)</option>
                <option>Maikhana Adelaide</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-black">Duration</label>
            <div className="relative mt-2">
              <select className="w-full appearance-none rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm text-neutral-500 outline-none">
                <option>Select date</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
            </div>
          </div>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="radio" name="hours-type" defaultChecked className="size-4 accent-black" />
              <span className="text-sm text-black">Closed all day</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="radio" name="hours-type" className="size-4 accent-black" />
              <span className="text-sm text-black">Open with special hours</span>
              <Info className="size-4 text-neutral-400" />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 border-t border-neutral-200 px-6 py-4">
          <button type="button" onClick={onClose} className="text-sm font-medium text-black hover:underline">
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Save
          </button>
        </div>
      </aside>
    </>
  );
}
