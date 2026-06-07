"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight, Copy } from "lucide-react";
import { shops } from "@/lib/shops-data";

export default function CopyShopPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <Link href="/providers/add" className="mb-8 inline-flex text-black hover:text-neutral-600">
        <ArrowLeft className="size-5" />
      </Link>

      <h1 className="page-title-xl">Select a shop to copy</h1>

      <div className="mt-8 space-y-3">
        {shops.map((shop) => (
          <Link
            key={shop.id}
            href={`/providers/add/business?copyFrom=${shop.id}`}
            className="flex items-center gap-4 rounded-xl border border-neutral-200 px-5 py-5 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
          >
            <Copy className="size-5 shrink-0 text-black" />
            <p className="min-w-0 flex-1 text-sm font-medium text-black">
              {shop.name} - {shop.shortAddress}
            </p>
            <ChevronRight className="size-5 shrink-0 text-neutral-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}
