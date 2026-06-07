"use client";

import { ExternalLink } from "lucide-react";
import { invoiceDisclaimer } from "@/lib/payments-data";

export default function InvoiceSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="page-title">Invoice settings</h1>

      <div className="max-w-2xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-black">Invoice Settings</h2>
          <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-black hover:bg-neutral-50">
            FAQs
            <ExternalLink className="size-3.5" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-black">
              Company / Legal Name <span className="text-[#e11900]">*</span>
            </label>
            <input type="text" className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-neutral-300" />
          </div>
          <div>
            <label className="text-sm font-semibold text-black">Street address</label>
            <input type="text" className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-neutral-300" />
          </div>
          <div>
            <label className="text-sm font-semibold text-black">Town/City</label>
            <input type="text" className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-neutral-300" />
          </div>
          <div>
            <label className="text-sm font-semibold text-black">Postcode</label>
            <input
              type="text"
              placeholder="e.g. 1234"
              defaultValue="1234"
              className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-neutral-300"
            />
          </div>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="size-4 rounded border-neutral-400" />
            <span className="text-sm text-black">I am not registered for GST in Australia</span>
          </label>
          <div>
            <label className="text-sm font-semibold text-black">
              Australian Business Number (ABN) <span className="text-[#e11900]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 99999999999"
              defaultValue="99999999999"
              className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-neutral-300"
            />
          </div>
        </div>

        <div className="space-y-4 border-t border-neutral-200 pt-6">
          <label className="flex items-start gap-3">
            <input type="checkbox" className="mt-1 size-4 rounded border-neutral-400" />
            <span className="text-sm font-bold text-black">Disclaimer</span>
          </label>
          <p className="text-sm text-neutral-600">
            By ticking this box and pressing &apos;Submit&apos;, I acknowledge and agree that I am confirming to Uber
            B.V. and its related and affiliated entities (Uber) that:
          </p>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-600">
            {invoiceDisclaimer.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>

        <button
          type="button"
          className="w-full rounded-full bg-black py-3 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
