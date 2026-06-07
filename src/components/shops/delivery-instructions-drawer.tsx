"use client";

import { Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DeliveryInstructionsDrawerProps = {
  open: boolean;
  onClose: () => void;
  instruction: string;
  pickupSame: boolean;
  scheduledPickupSame: boolean;
  onTogglePickup: () => void;
  onToggleScheduledPickup: () => void;
};

export function DeliveryInstructionsDrawer({
  open,
  onClose,
  instruction,
  pickupSame,
  scheduledPickupSame,
  onTogglePickup,
  onToggleScheduledPickup,
}: DeliveryInstructionsDrawerProps) {
  if (!open) return null;

  return (
    <>
      <button type="button" className="fixed inset-0 z-40 bg-black/30" onClick={onClose} aria-label="Close drawer" />
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h2 className="text-lg font-bold text-black">Delivery partner instructions</h2>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-neutral-100">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <section>
            <h3 className="font-semibold text-black">Default instructions</h3>
            <p className="mt-1 text-xs text-neutral-500">
              This will be your default fallback instruction when there is no instruction given for a time period in your
              menu hours.
            </p>
            <div className="mt-4 rounded-xl border border-neutral-200 p-4">
              <p className="text-xs font-medium text-neutral-500">Other</p>
              <div className="mt-2 flex items-start justify-between gap-3">
                <p className="text-sm text-black">{instruction}</p>
                <button type="button" className="shrink-0 text-neutral-400 hover:text-black">
                  <Pencil className="size-4" />
                </button>
              </div>
            </div>
            <ToggleRow label="Use the same for customer pick-up instructions" enabled={pickupSame} onToggle={onTogglePickup} />
          </section>

          <section className="mt-8">
            <h3 className="font-semibold text-black">Scheduled instructions</h3>
            <p className="mt-1 text-xs text-neutral-500">
              Add time-based instructions for your delivery partner to ensure smooth delivery hand-off.
            </p>
            <Button variant="secondary" className="mt-4 w-full">
              Add new instruction
            </Button>
            <ToggleRow
              label="Use the same for customer pick-up instructions"
              enabled={scheduledPickupSame}
              onToggle={onToggleScheduledPickup}
            />
          </section>
        </div>
      </aside>
    </>
  );
}

function ToggleRow({ label, enabled, onToggle }: { label: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="mt-5 flex items-center justify-between gap-4">
      <p className="text-sm text-black">{label}</p>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
          enabled ? "bg-[#06c167]" : "bg-neutral-300",
        )}
      >
        <span
          className={cn(
            "inline-block size-4 transform rounded-full bg-white shadow transition-transform",
            enabled ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}
