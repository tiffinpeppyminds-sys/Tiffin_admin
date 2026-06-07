"use client";

import { ChevronDown, Info } from "lucide-react";
import { bankingDetails } from "@/lib/payments-data";

const fields = [
  { label: "BSB Number", value: bankingDetails.bsb },
  { label: "Bank account number", value: bankingDetails.accountNumber },
  { label: "Address", value: bankingDetails.address },
  { label: "Postcode", value: bankingDetails.postcode },
  { label: "Bank name", value: bankingDetails.bankName },
  { label: "Account holder's name (exactly as it appears on your bank statement)", value: bankingDetails.accountHolder },
  { label: "City", value: bankingDetails.city },
] as const;

export default function BankingPage() {
  return (
    <div className="space-y-8">
      <h1 className="page-title">Banking</h1>

      <div className="relative inline-block">
        <select className="cursor-pointer appearance-none rounded-full bg-[#f6f6f6] py-2.5 pl-4 pr-10 text-base font-semibold text-black outline-none">
          <option>Maikhana Adelaide</option>
          <option>Scoop Shoppe</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-black" />
      </div>

      <section className="space-y-5">
        <h2 className="inline-flex items-center gap-1.5 text-lg font-bold text-black">
          Bank account details
          <Info className="size-4 text-neutral-400" />
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.label}>
              <label className="text-sm text-neutral-600">{field.label}</label>
              <input
                type="text"
                readOnly
                defaultValue={field.value}
                className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm text-neutral-500 outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-black">Payout frequency</h2>
        <div className="flex items-center justify-between rounded-lg bg-[#f6f6f6] px-5 py-4">
          <span className="text-sm font-medium text-black">{bankingDetails.payoutFrequency}</span>
          <button type="button" className="rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-sm font-medium text-black hover:bg-neutral-50">
            Edit
          </button>
        </div>
      </section>
    </div>
  );
}
