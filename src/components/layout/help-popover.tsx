"use client";

import { useRef, useEffect } from "react";
import { Calendar, Copy, HelpCircle, Mail } from "lucide-react";

export function HelpPopover({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 z-50 w-[340px] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl"
    >
      <div className="border-b border-neutral-200 px-6 py-5">
        <h2 className="text-2xl font-bold text-black">Help</h2>
      </div>

      <div className="px-6 py-5">
        <p className="text-sm text-neutral-500">Get in touch</p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Mail className="size-5 shrink-0 text-black" />
            <span className="truncate text-sm text-black">restaurants.anz@uber.com</span>
          </div>
          <button
            type="button"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-[#276ef1] text-[#276ef1] hover:bg-blue-50"
            aria-label="Copy email"
          >
            <Copy className="size-4" />
          </button>
        </div>
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="size-5 text-black" />
            <span className="text-sm text-black">Book an appointment</span>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-full bg-[#f6f6f6] px-4 py-1.5 text-xs font-medium text-black hover:bg-neutral-200"
          >
            Get started
          </button>
        </div>
      </div>

      <div className="border-t border-neutral-200 px-6 py-5">
        <p className="text-sm text-neutral-500">Resources</p>
        <button type="button" className="mt-4 flex items-center gap-3 text-sm text-black hover:opacity-80">
          <span className="flex size-5 items-center justify-center rounded-full bg-black">
            <HelpCircle className="size-3 text-white" />
          </span>
          <span className="underline underline-offset-2">Help centre</span>
        </button>
      </div>
    </div>
  );
}
