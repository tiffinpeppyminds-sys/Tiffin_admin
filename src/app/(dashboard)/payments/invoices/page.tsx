"use client";

import { useState } from "react";
import { AlertCircle, ChevronDown, CloudUpload, Eye } from "lucide-react";
import { PaymentsFilterDropdown, PaymentsTabs } from "@/components/payments/shared";
import { invoices } from "@/lib/payments-data";

const invoiceTabs = ["Invoices", "Export requests"] as const;

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState<(typeof invoiceTabs)[number]>("Invoices");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Invoices</h1>
          <p className="mt-1 max-w-2xl text-sm text-neutral-600">
            View all invoices for the selected merchant, download individual files, or filter and export multiple
            invoices at once.
          </p>
        </div>
        {activeTab === "Invoices" ? (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            <CloudUpload className="size-4" />
            BULK CSV
          </button>
        ) : null}
      </div>

      <PaymentsTabs tabs={[...invoiceTabs]} active={activeTab} onChange={(t) => setActiveTab(t as typeof activeTab)} />

      {activeTab === "Invoices" ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <PaymentsFilterDropdown label="Maikhana Adelaide" options={["Maikhana Adelaide", "Scoop Shoppe"]} dark />
            <PaymentsFilterDropdown label="Uber to shop" options={["Uber to shop", "Shop to Uber"]} dark />
            <PaymentsFilterDropdown label="2026/05/10 - 2026/06/08" options={["2026/05/10 - 2026/06/08", "Last 30 days"]} dark />
            <button type="button" className="text-sm font-medium text-black hover:underline">
              Reset
            </button>
          </div>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500">
                <th className="pb-3 pr-4 font-medium">Invoice number</th>
                <th className="pb-3 pr-4 font-medium">Merchant</th>
                <th className="pb-3 pr-4 font-medium">Type</th>
                <th className="pb-3 pr-4 font-medium">
                  Date issued <ChevronDown className="inline size-3.5" />
                </th>
                <th className="pb-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-neutral-200">
                  <td className="py-5 pr-4 text-black">--</td>
                  <td className="py-5 pr-4 text-black">{inv.merchant}</td>
                  <td className="py-5 pr-4 text-black">--</td>
                  <td className="py-5 pr-4 text-black" />
                  <td className="py-5">
                    <div className="flex items-center justify-end gap-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-[#e11900]">
                        <AlertCircle className="size-3.5" />
                        1 error
                      </span>
                      <button type="button" className="inline-flex items-center gap-1.5 text-sm font-medium text-black hover:underline">
                        <Eye className="size-4" />
                        View details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6">
            <p className="text-sm text-neutral-500">
              Only the filtered results will be exported. Export maximum of 100,000 invoices per request.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
            >
              <CloudUpload className="size-4" />
              Export multiple invoices
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-lg font-semibold text-black">No export requests</p>
          <p className="mt-2 text-sm text-neutral-500">Your export requests will appear here.</p>
        </div>
      )}
    </div>
  );
}
