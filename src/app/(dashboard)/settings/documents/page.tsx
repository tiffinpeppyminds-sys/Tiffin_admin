"use client";

import { useState } from "react";
import { Eye, FileText } from "lucide-react";
import { ShopFilter } from "@/components/settings/shop-filter";
import { documentsCompleted, documentsNeeded, settingsShops } from "@/lib/settings-data";

export default function DocumentsPage() {
  const [shop, setShop] = useState<string>(settingsShops[1]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Documents</h1>
        <p className="mt-1 text-sm text-neutral-600">
          These documents help ensure that you can operate on Tiffin Finder based on your shop setup.
        </p>
      </div>

      <ShopFilter value={shop} onChange={setShop} shops={settingsShops.slice(1)} />

      <section>
        <h2 className="text-base font-bold text-black">Action needed</h2>
        <div className="mt-3 divide-y divide-neutral-200">
          {documentsNeeded.map((doc) => (
            <div key={doc} className="flex items-center justify-between gap-4 py-5">
              <div className="flex items-start gap-4">
                <FileText className="mt-0.5 size-5 shrink-0 text-black" />
                <div>
                  <p className="text-xs text-neutral-500">If applicable</p>
                  <p className="text-sm font-medium text-black">{doc}</p>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#f6f6f6] px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200"
              >
                <Eye className="size-4" />
                Upload
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-base font-bold text-black">Completed steps</h2>
        <div className="mt-3 divide-y divide-neutral-200">
          {documentsCompleted.map((doc) => (
            <div key={doc.name} className="flex items-center justify-between gap-4 py-5">
              <div className="flex items-start gap-4">
                <FileText className="mt-0.5 size-5 shrink-0 text-black" />
                <div>
                  <p className="text-xs font-medium text-[#06c167]">{doc.status}</p>
                  <p className="text-sm font-medium text-black">{doc.name}</p>
                </div>
              </div>
              <button
                type="button"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f6f6f6] text-black hover:bg-neutral-200"
              >
                <Eye className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
