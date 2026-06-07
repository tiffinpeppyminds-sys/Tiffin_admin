"use client";

import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { notification } from "@/lib/settings-data";

export function NotificationsPopover({ open, onClose }: { open: boolean; onClose: () => void }) {
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
      className="absolute right-0 top-12 z-50 w-[400px] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl"
    >
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold text-black">Notifications</h2>
      </div>
      <div className="px-6 pb-6">
        <div className="rounded-lg border-2 border-[#276ef1] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#276ef1]" />
              <div>
                <p className="text-sm leading-relaxed text-black">{notification.message}</p>
                <p className="mt-2 text-xs text-neutral-500">
                  {notification.time} · {notification.category}
                </p>
              </div>
            </div>
            <button type="button" className="shrink-0 text-neutral-400 hover:text-black" aria-label="Dismiss">
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
