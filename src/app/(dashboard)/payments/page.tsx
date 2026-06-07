"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, Info, UtensilsCrossed } from "lucide-react";
import {
  DownloadButton,
  PaymentsFilterDropdown,
  PaymentsTabs,
  PayoutKpiCard,
  SectionHeading,
} from "@/components/payments/shared";
import {
  customerRefund,
  dailyPayout,
  payBreakdown,
  payoutKpis,
  statements,
  uberFees,
} from "@/lib/payments-data";
import { cn } from "@/lib/utils";

const payoutTabs = ["Overview", "Statements"] as const;

export default function PayoutsPage() {
  const [activeTab, setActiveTab] = useState<(typeof payoutTabs)[number]>("Overview");

  return (
    <div className="space-y-6">
      <h1 className="page-title">Payouts</h1>

      <PaymentsTabs tabs={[...payoutTabs]} active={activeTab} onChange={(t) => setActiveTab(t as typeof activeTab)} />

      {activeTab === "Overview" ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <PaymentsFilterDropdown
              label="Maikhana Adelaide"
              options={["Maikhana Adelaide", "Scoop Shoppe"]}
            />
            <PaymentsFilterDropdown label="08/06/2026 - 08/06/2026" options={["08/06/2026 - 08/06/2026", "Last 7 days"]} />
            <DownloadButton />
          </div>

          <div className="flex flex-wrap gap-6 border-b border-neutral-200 pb-6">
            {payoutKpis.map((kpi) => (
              <PayoutKpiCard key={kpi.label} {...kpi} />
            ))}
          </div>

          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-black">Pay breakdown</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Your next payout is Jun 14, 2026. Payments are usually deposited within 1–3 business days, but may
                vary depending on your bank.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-neutral-200">
              {payBreakdown.map((row, i) => (
                <div
                  key={row.label}
                  className={cn(
                    "flex items-center justify-between px-5 py-4",
                    i < payBreakdown.length - 1 && "border-b border-neutral-200",
                  )}
                >
                  <p className={cn("inline-flex items-center gap-1.5 text-sm", "bold" in row && row.bold ? "font-bold text-black" : "text-black")}>
                    {"expandable" in row && row.expandable ? <ChevronRight className="size-4 text-neutral-400" /> : null}
                    {row.label}
                    <Info className="size-3.5 text-neutral-400" />
                  </p>
                  <p className={cn("text-sm", "bold" in row && row.bold ? "font-bold text-black" : "text-black")}>{row.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeading
              title="Daily payout"
              action={
                <div className="flex gap-2">
                  <button type="button" className="flex size-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 hover:bg-neutral-50">
                    <ChevronLeft className="size-4" />
                  </button>
                  <button type="button" className="flex size-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 hover:bg-neutral-50">
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              }
            />
            <div className="max-w-xs rounded-xl border border-neutral-200 p-5">
              <p className="font-bold text-black">{dailyPayout.label}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">Sales</span>
                  <span className="text-black">{dailyPayout.sales}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">Total payout</span>
                  <span className="font-bold text-black">{dailyPayout.total}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4 border-t border-neutral-200 pt-6">
            <SectionHeading
              title="Customer refunds"
              action={
                <Link href="/orders">
                  <button type="button" className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-black hover:bg-neutral-50">
                    See all orders
                  </button>
                </Link>
              }
            />
            <div className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 p-5">
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  <UtensilsCrossed className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-black">{customerRefund.customer}</p>
                  <p className="text-sm text-neutral-600">
                    {customerRefund.orderId} · {customerRefund.fulfilment}
                  </p>
                  <p className="text-sm text-neutral-500">{customerRefund.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-400 line-through">{customerRefund.original}</p>
                <p className="font-semibold text-[#e11900]">{customerRefund.refund}</p>
              </div>
            </div>
          </section>

          <section className="space-y-4 border-t border-neutral-200 pt-6">
            <div>
              <h2 className="text-lg font-bold text-black">Uber fees</h2>
              <p className="mt-1 text-sm text-neutral-600">
                The fees you pay depend on how your customers order and how they receive their order.
              </p>
            </div>
            <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200">
              {uberFees.map((fee) => (
                <div key={fee.label} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="font-medium text-black">{fee.label}</p>
                    <p className="text-sm text-neutral-500">{fee.rate}</p>
                  </div>
                  <p className="text-sm text-neutral-600">{fee.orders}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-bold text-black">Statements</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Access your simplified statements by the 5th of every month to help you manage your finances better.
            </p>
          </div>
          <PaymentsFilterDropdown label="Maikhana Adelaide" options={["Maikhana Adelaide", "Scoop Shoppe"]} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500">
                  <th className="pb-3 pr-4 font-medium">Month</th>
                  <th className="pb-3 pr-4 font-medium">Shop name</th>
                  <th className="pb-3 pr-4 font-medium">Earnings</th>
                  <th className="pb-3 pr-4 font-medium">Service fees</th>
                  <th className="pb-3 pr-4 font-medium">Marketing spends</th>
                  <th className="pb-3 pr-4 font-medium">Amendments</th>
                  <th className="pb-3 pr-4 font-medium">Net total</th>
                  <th className="pb-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {statements.map((row) => (
                  <tr key={row.month} className="border-b border-neutral-200">
                    <td className="py-4 pr-4 text-black">{row.month}</td>
                    <td className="py-4 pr-4 text-black">{row.shop}</td>
                    <td className="py-4 pr-4 text-black">{row.earnings}</td>
                    <td className="py-4 pr-4 text-black">{row.fees}</td>
                    <td className="py-4 pr-4 text-black">{row.marketing}</td>
                    <td className="py-4 pr-4 text-black">{row.amendments}</td>
                    <td className="py-4 pr-4 font-medium text-black">{row.net}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button type="button" className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-black hover:bg-neutral-50">
                          Download
                        </button>
                        <button type="button" className="flex size-8 items-center justify-center rounded-lg border border-neutral-300 text-neutral-500 hover:bg-neutral-50">
                          <Eye className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
