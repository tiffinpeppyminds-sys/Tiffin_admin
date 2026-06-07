"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  ThumbsUp,
  X,
} from "lucide-react";
import { UberOneBadge } from "@/components/orders/uber-one-badge";
import type { Order } from "@/lib/orders-data";
import { cn } from "@/lib/utils";

type OrderDetailDrawerProps = {
  order: Order | null;
  onClose: () => void;
  onRate: () => void;
  onContact: () => void;
};

export function OrderDetailDrawer({ order, onClose, onRate, onContact }: OrderDetailDrawerProps) {
  const [deliveryOpen, setDeliveryOpen] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(true);

  if (!order) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-y-0 left-0 right-0 top-14 z-40 bg-black/15 lg:left-64"
        onClick={onClose}
        aria-label="Close drawer"
      />
      <aside className="fixed right-0 top-14 z-50 flex h-[calc(100vh-3.5rem)] w-full max-w-[400px] flex-col border-l border-neutral-200 bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-start justify-between px-5 pb-2 pt-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#f0f0f0] text-sm font-semibold text-black">
                {order.customerInitials}
              </div>
              {order.isUberOne ? (
                <span className="absolute -bottom-0.5 -right-0.5">
                  <UberOneBadge />
                </span>
              ) : null}
            </div>
            <div>
              <p className="text-[15px] font-semibold text-black">{order.customer}</p>
              {order.isNewCustomer ? <span className="text-xs text-neutral-500">New customer</span> : null}
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 hover:bg-neutral-100" aria-label="Close">
            <X className="size-5 text-black" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[22px] font-bold leading-tight text-black">Order {order.id}</h2>
              <p className="mt-1 text-sm text-neutral-500">{order.orderDateLong}</p>
              <p className="text-sm text-neutral-600">
                {order.shop} ({order.shopAddress})
              </p>
            </div>
            <button
              type="button"
              onClick={onContact}
              className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-black transition-colors hover:bg-neutral-50"
              aria-label="Contact options"
            >
              <Phone className="size-[18px]" />
            </button>
          </div>

          <section className="mt-6 border-t border-neutral-200 pt-4">
            <button
              type="button"
              onClick={() => setDeliveryOpen((o) => !o)}
              className="flex w-full items-center justify-between text-left"
            >
              <h3 className="text-[15px] font-semibold text-black">Delivery details</h3>
              {deliveryOpen ? <ChevronUp className="size-4 text-neutral-500" /> : <ChevronDown className="size-4 text-neutral-500" />}
            </button>
            {deliveryOpen && order.courier !== "—" ? (
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="size-11 overflow-hidden rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900">
                    <div className="flex h-full w-full items-end justify-center pb-1 text-[10px] font-bold text-white">
                      {order.courier.slice(0, 3)}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-black">{order.courier}</p>
                    <p className="inline-flex items-center gap-1 text-xs text-neutral-600">
                      <ThumbsUp className="size-3" />
                      {order.courierRating}
                    </p>
                    <p className="text-xs text-neutral-500">{order.courierDeliveries} orders delivered</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onRate}
                  className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm font-medium text-black hover:bg-neutral-50"
                >
                  Rate
                </button>
              </div>
            ) : deliveryOpen ? (
              <p className="mt-3 text-sm text-neutral-500">Pick-up order — no courier assigned.</p>
            ) : null}
          </section>

          <section className="mt-5 border-t border-neutral-200 pt-4">
            <button
              type="button"
              onClick={() => setDetailsOpen((o) => !o)}
              className="flex w-full items-center justify-between text-left"
            >
              <h3 className="text-[15px] font-semibold text-black">Order details</h3>
              {detailsOpen ? <ChevronUp className="size-4 text-neutral-500" /> : <ChevronDown className="size-4 text-neutral-500" />}
            </button>
            {detailsOpen ? (
              <div className="mt-4">
                <div className="space-y-0">
                  {order.timeline.map((step, idx) => (
                    <div key={`${step.time}-${step.label}`} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="size-2.5 rounded-full bg-black" />
                        {idx < order.timeline.length - 1 ? (
                          <span
                            className={cn(
                              "min-h-[32px] w-px flex-1",
                              idx === 0 ? "border-l border-dashed border-neutral-300 bg-transparent" : "bg-black",
                            )}
                          />
                        ) : null}
                      </div>
                      <div className="pb-5">
                        <p className="text-xs text-neutral-500">{step.time}</p>
                        <p className="text-sm text-black">{step.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-0 border-t border-neutral-100 pt-2">
                  {order.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-3 border-b border-neutral-100 py-3">
                      <div className="flex items-center gap-3">
                        <div className="size-9 shrink-0 rounded bg-[#f3f3f3]" />
                        <span className="flex size-7 items-center justify-center rounded border border-neutral-200 text-xs font-medium text-neutral-600">
                          {item.qty}
                        </span>
                        <span className="text-sm text-black">{item.name}</span>
                      </div>
                      <span className="text-sm text-black">{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-2 space-y-2 pt-2 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Sales (incl. GST)</span>
                    <span>{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-black">
                    <span>Net payout</span>
                    <span>{order.netPayout}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </aside>
    </>
  );
}
