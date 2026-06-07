"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Gift, Info, Phone, X } from "lucide-react";
import { StarRating } from "@/components/customers/star-rating";
import type { CustomerReview } from "@/lib/customers-data";
import { cn } from "@/lib/utils";

type ReviewReplyDrawerProps = {
  review: CustomerReview | null;
  onClose: () => void;
};

const offers = ["None", "A$6", "A$15", "A$26"] as const;

export function ReviewReplyDrawer({ review, onClose }: ReviewReplyDrawerProps) {
  const [tab, setTab] = useState<"Review" | "Order details">("Review");
  const [message, setMessage] = useState("");
  const [offer, setOffer] = useState<(typeof offers)[number]>("None");
  const [expandedItem, setExpandedItem] = useState<string | null>(review?.items[0]?.name ?? null);

  if (!review) return null;

  const canSend = message.trim().length > 0;

  return (
    <>
      <button
        type="button"
        className="fixed inset-y-0 left-0 right-0 top-14 z-40 bg-black/15 lg:left-64"
        onClick={onClose}
        aria-label="Close drawer"
      />
      <aside className="fixed right-0 top-14 z-50 flex h-[calc(100vh-3.5rem)] w-full max-w-[400px] flex-col border-l border-neutral-200 bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between px-5">
          <div className="flex gap-6">
            {(["Review", "Order details"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "border-b-[3px] py-3.5 text-sm font-medium transition-colors",
                  tab === t ? "border-black text-black" : "border-transparent text-neutral-500 hover:text-black",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 hover:bg-neutral-100" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4">
          {tab === "Review" ? (
            <>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex size-11 items-center justify-center rounded-full bg-[#06c167] text-white">
                  <span className="text-sm font-bold">TF</span>
                </div>
                <div>
                  <p className="font-semibold text-black">{review.name}</p>
                  {review.isNewCustomer ? <p className="text-xs text-neutral-500">New customer</p> : null}
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-[#f6f6f6] px-4 py-4">
                <StarRating value={review.stars} size="md" />
                <p className="mt-2 font-semibold text-black">{review.shop}</p>
                <p className="mt-1 text-xs text-neutral-500">
                  Ordered {review.orderedDate} · Reviewed {review.reviewedDate} · Total {review.total}
                </p>
              </div>

              <div className="mt-5">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Reply privately to ${review.name}`}
                  rows={5}
                  className="w-full resize-none rounded-xl bg-[#f6f6f6] px-4 py-3 text-sm text-black outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-neutral-300"
                />
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                  Keep in mind that you can only send one message and that {review.name} will not be able to reply back.
                </p>
              </div>

              <div className="mt-5">
                <p className="inline-flex items-center gap-1 text-sm font-semibold text-black">
                  Send an offer <Info className="size-3.5 text-neutral-400" />
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {offers.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setOffer(opt)}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        offer === opt
                          ? "bg-black text-white"
                          : "bg-[#f3f3f3] text-black hover:bg-neutral-200",
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex gap-3 rounded-xl bg-[#e6f7ed] px-4 py-3">
                  <Gift className="size-5 shrink-0 text-[#048a48]" />
                  <p className="text-sm leading-relaxed text-neutral-700">
                    Encourage reorder with an offer. Roughly 30% of customers who receive an offer come back within 30
                    days.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#f0f0f0] text-sm font-semibold">
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-black">{review.name}</p>
                  {review.isNewCustomer ? <p className="text-xs text-neutral-500">New customer</p> : null}
                </div>
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-black">Order {review.orderId}</h2>
                  <p className="text-sm text-neutral-500">{review.orderDateLong}</p>
                  <p className="text-sm text-neutral-600">
                    {review.shop} ({review.shopAddress})
                  </p>
                </div>
                <button
                  type="button"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-50"
                  aria-label="Contact"
                >
                  <Phone className="size-[18px]" />
                </button>
              </div>

              <div className="mt-5 space-y-0">
                {review.timeline.map((step, idx) => (
                  <div key={step.label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="size-2.5 rounded-full bg-black" />
                      {idx < review.timeline.length - 1 ? (
                        <span
                          className={cn(
                            "min-h-[28px] w-px flex-1",
                            idx === 0 ? "border-l border-dashed border-neutral-300" : "bg-black",
                          )}
                        />
                      ) : null}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs text-neutral-500">{step.time}</p>
                      <p className="text-sm text-black">{step.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-100 pt-3">
                {review.items.map((item) => (
                  <div key={item.name} className="border-b border-neutral-100 py-3">
                    <button
                      type="button"
                      onClick={() => setExpandedItem(expandedItem === item.name ? null : item.name)}
                      className="flex w-full items-center justify-between text-left"
                    >
                      <span className="text-sm text-black">
                        {item.qty} {item.name}
                      </span>
                      <span className="flex items-center gap-2 text-sm text-black">
                        {item.price}
                        {expandedItem === item.name ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                      </span>
                    </button>
                    {expandedItem === item.name && item.sides ? (
                      <div className="mt-2 space-y-2 pl-4">
                        <p className="text-xs font-medium text-neutral-500">Add Sides</p>
                        {item.sides.map((side) => (
                          <div key={side.name} className="flex justify-between text-sm text-neutral-700">
                            <span>
                              {side.qty} {side.name}
                            </span>
                            <span>{side.price}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Sales (incl. GST)</span>
                  <span>{review.total}</span>
                </div>
                <div className="flex justify-between font-bold text-black">
                  <span>Net payout</span>
                  <span>{review.netPayout}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {tab === "Review" ? (
          <div className="border-t border-neutral-200 px-5 py-4">
            <button
              type="button"
              disabled={!canSend}
              className={cn(
                "w-full rounded-full py-3.5 text-sm font-semibold transition-colors",
                canSend ? "bg-black text-white hover:bg-neutral-800" : "bg-[#e5e5e5] text-white",
              )}
            >
              Send
            </button>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-neutral-400">
              Messages sent using Tiffin Finder Manager are subject to the{" "}
              <button type="button" className="underline hover:text-neutral-600">
                Privacy Notice
              </button>{" "}
              and{" "}
              <button type="button" className="underline hover:text-neutral-600">
                Community Guidelines
              </button>
              .
            </p>
          </div>
        ) : null}
      </aside>
    </>
  );
}
