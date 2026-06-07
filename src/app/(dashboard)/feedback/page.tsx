"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Info,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { RatingGauge } from "@/components/customers/rating-gauge";
import { ReviewReplyDrawer } from "@/components/customers/review-reply-drawer";
import { StarRating } from "@/components/customers/star-rating";
import { FilterDropdown } from "@/components/performance/shared";
import {
  compliments,
  customerReviews,
  improvements,
  menuItemRank,
  menuReviews,
  starDistribution,
  type CustomerReview,
} from "@/lib/customers-data";
import { cn } from "@/lib/utils";

const tabs = ["Overview", "Customers", "Menu items"] as const;

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");
  const [selectedReview, setSelectedReview] = useState<CustomerReview | null>(null);

  const maxStars = Math.max(...starDistribution.map((s) => s.count), 1);

  return (
    <div className="space-y-5">
      <h1 className="page-title">Reviews</h1>

      <div className="border-b border-neutral-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setSelectedReview(null);
              }}
              className={cn(
                "tab-link",
                activeTab === tab ? "tab-link-active" : "",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Overview" ? (
        <>
          <FilterDropdown label="All shops (2)" options={["All shops (2)", "Maikhana Adelaide", "Scoop Shoppe"]} />

          <section className="rounded-xl border border-neutral-200 bg-white p-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
              <div>
                <h2 className="text-base font-bold text-black">Restaurant</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
                  An average of consumer ratings given to your store (corresponding count as displayed on the app), with
                  priority given to the most recent ratings.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("Customers")}
                  className="mt-5 inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-50"
                >
                  See reviews <ChevronRight className="size-4" />
                </button>
              </div>
              <div>
                <p className="text-[42px] font-bold leading-none text-black">3.2</p>
                <StarRating value={3.2} size="md" precise />
                <div className="mt-5 space-y-2.5">
                  {starDistribution.map((row) => (
                    <div key={row.stars} className="flex items-center gap-3 text-xs">
                      <span className="w-14 shrink-0 text-neutral-600">{row.stars} stars</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className="h-full rounded-full bg-[#ffc043]"
                          style={{ width: `${(row.count / maxStars) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-base font-bold text-black">Menu items</h2>
            <p className="mt-1 text-sm text-neutral-500">How satisfied customers are with the items on your menu.</p>
            <div className="mt-8 flex flex-col items-center">
              <RatingGauge value={57} />
              <div className="mt-6 grid w-full max-w-md grid-cols-3 gap-4 text-center">
                <div>
                  <ThumbsUp className="mx-auto size-5 text-neutral-400" />
                  <p className="mt-2 text-xl font-bold text-black">8</p>
                  <p className="text-xs text-neutral-500">Likes</p>
                </div>
                <div>
                  <ThumbsDown className="mx-auto size-5 text-neutral-400" />
                  <p className="mt-2 text-xl font-bold text-black">6</p>
                  <p className="text-xs text-neutral-500">Dislikes</p>
                </div>
                <div>
                  <MessageCircle className="mx-auto size-5 text-neutral-400" />
                  <p className="mt-2 text-xl font-bold text-black">0</p>
                  <p className="text-xs text-neutral-500">Comments</p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {activeTab === "Customers" ? (
        <>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {[
              { label: "Customer reviews", value: "1" },
              { label: "Awaiting replies", value: "1" },
              { label: "Review offers redeemed", value: "0", info: true },
              { label: "Review offers ROI", value: "--", info: true },
            ].map((kpi) => (
              <div key={kpi.label}>
                <p className="text-sm text-neutral-500">
                  {kpi.label}
                  {kpi.info ? <Info className="ml-1 inline size-3.5 text-neutral-400" /> : null}
                </p>
                <p className="mt-1 text-2xl font-bold text-black">{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <h2 className="text-base font-bold text-black">Customer reviews</h2>
            <button
              type="button"
              className="rounded-full bg-[#f3f3f3] px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200"
            >
              Manage auto replies
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["All shops (2)", "Last 7 days", "Star rating", "Review tags", "Reply status", "Comments"].map((f) => (
              <FilterDropdown key={f} label={f} options={[f, "Any"]} />
            ))}
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 hover:bg-neutral-50"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="border-t border-neutral-200">
            {customerReviews.map((review) => (
              <div
                key={review.id}
                className={cn(
                  "flex flex-wrap items-center gap-4 border-b border-neutral-200 py-5 transition-colors",
                  selectedReview?.id === review.id && "bg-neutral-50/80",
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedReview(review)}
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-sm font-semibold text-black"
                >
                  {review.initials}
                </button>

                <button type="button" onClick={() => setSelectedReview(review)} className="min-w-[140px] text-left">
                  <p className="font-semibold text-black">{review.name}</p>
                  {review.isNewCustomer ? <p className="text-xs text-neutral-500">New customer</p> : null}
                </button>

                <button type="button" onClick={() => setSelectedReview(review)} className="min-w-[180px] flex-1 text-left">
                  <StarRating value={review.stars} />
                  <p className="mt-1 font-semibold text-black">{review.shop}</p>
                </button>

                <div className="min-w-[140px] text-sm text-neutral-500">
                  <p>Reviewed {review.reviewedDate}</p>
                  <p>Total {review.total}</p>
                </div>

                <div className="ml-auto text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedReview(review)}
                    className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                  >
                    Reply
                  </button>
                  <p className="mt-1 text-xs text-neutral-500">{review.daysLeft} days left</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {activeTab === "Menu items" ? (
        <>
          <FilterDropdown label="All shops (2)" options={["All shops (2)", "Maikhana Adelaide", "Scoop Shoppe"]} />

          <section className="rounded-xl border border-neutral-200 bg-white p-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_220px] lg:items-start">
              <div>
                <h2 className="text-base font-bold text-black">Menu items</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Customers give your menu items a thumbs-up or thumbs-down rating after delivery. This metric is the
                  average of all your item ratings.{" "}
                  <button type="button" className="font-medium text-[#048a48] hover:underline">
                    Learn more
                  </button>
                </p>
              </div>
              <RatingGauge value={57} size="md" />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-black">Compliments</h3>
                <div className="flex flex-wrap gap-2">
                  {compliments.map((c) => (
                    <span
                      key={c.label}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-black"
                    >
                      {c.label} <span className="text-neutral-500">{c.count} reviews</span>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-black">Areas for improvement</h3>
                <div className="flex flex-wrap gap-2">
                  {improvements.map((c) => (
                    <span
                      key={c.label}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-black"
                    >
                      {c.label} <span className="text-neutral-500">{c.count} review{c.count !== 1 ? "s" : ""}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-black">Menu item rank</h2>
                <button type="button" className="inline-flex items-center gap-1 rounded-full border border-neutral-300 px-3 py-1.5 text-sm font-medium text-black">
                  Highest to lowest rated <ChevronDown className="size-3.5" />
                </button>
              </div>
              <div className="space-y-0">
                {menuItemRank.map((item) => (
                  <div key={item.name} className="flex items-center gap-3 border-b border-neutral-100 py-4 last:border-0">
                    <div className="size-10 shrink-0 rounded bg-[#f3f3f3]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-black">{item.name}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-neutral-500">
                        <span className="inline-flex items-center gap-1 font-medium text-[#048a48]">
                          <span className="size-1.5 rounded-full bg-[#048a48]" />
                          {item.rating}%
                        </span>
                        <span className="inline-flex items-center gap-0.5">
                          <ThumbsUp className="size-3" /> {item.likes}
                        </span>
                        <span className="inline-flex items-center gap-0.5">
                          <ThumbsDown className="size-3" /> {item.dislikes}
                        </span>
                        <span className="inline-flex items-center gap-0.5">
                          <MessageCircle className="size-3" /> {item.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="mb-1 flex items-center justify-between">
                <h2 className="text-base font-bold text-black">Customer reviews</h2>
                <span className="text-xs text-neutral-500">8 reviews</span>
              </div>
              <p className="mb-4 text-xs text-neutral-500">Last 90 days</p>
              <div className="space-y-0">
                {menuReviews.map((review) => (
                  <div
                    key={review.item}
                    className="flex items-start justify-between gap-3 border-b border-neutral-100 py-4 last:border-0"
                  >
                    <div className="flex gap-3">
                      <div
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full",
                          review.positive ? "bg-[#e6f7ed] text-[#048a48]" : "bg-[#ffe5e5] text-[#cc1700]",
                        )}
                      >
                        {review.positive ? <ThumbsUp className="size-4" /> : <ThumbsDown className="size-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-black">{review.item}</p>
                        <p className="text-xs text-neutral-500">{review.fulfilment}</p>
                        <p className="text-xs text-neutral-500">
                          Ordered {review.ordered} · Reviewed {review.reviewed}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/orders"
                      className="shrink-0 rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium text-black hover:bg-neutral-50"
                    >
                      View order
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      ) : null}

      <ReviewReplyDrawer review={selectedReview} onClose={() => setSelectedReview(null)} />
    </div>
  );
}
