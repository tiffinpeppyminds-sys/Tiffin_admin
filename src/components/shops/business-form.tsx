"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getShop } from "@/lib/shops-data";

const businessTypes = ["Restaurant", "Grocery", "Convenience store", "Liquor store", "Other"];
const shopCounts = ["1", "2-5", "6-20", "21-50", "51+"];

export function BusinessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const copyFrom = searchParams.get("copyFrom");
  const sourceShop = copyFrom ? getShop(copyFrom) : null;

  const [businessType, setBusinessType] = useState("");
  const [shopCount, setShopCount] = useState("");

  const canSubmit = businessType && shopCount;

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <Link
        href={copyFrom ? "/providers/add/copy" : "/providers/add"}
        className="mb-8 inline-flex text-black hover:text-neutral-600"
      >
        <ArrowLeft className="size-5" />
      </Link>

      <h1 className="page-title-xl">Tell us more about your business</h1>

      {sourceShop ? (
        <p className="mt-2 text-sm text-neutral-500">Copying from {sourceShop.name}</p>
      ) : null}

      <form
        className="mt-10 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/providers");
        }}
      >
        <div>
          <label htmlFor="business-type" className="mb-2 block text-sm text-neutral-600">
            Business type
          </label>
          <select
            id="business-type"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="h-12 w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 text-sm text-black outline-none focus:border-black"
          >
            <option value="">Select...</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="shop-count" className="mb-2 block text-sm text-neutral-600">
            Number of shops
          </label>
          <select
            id="shop-count"
            value={shopCount}
            onChange={(e) => setShopCount(e.target.value)}
            className="h-12 w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 text-sm text-black outline-none focus:border-black"
          >
            <option value="">Select...</option>
            {shopCounts.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <Link href="/providers" className="text-sm font-medium text-black hover:underline">
            Cancel
          </Link>
          <Button type="submit" disabled={!canSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
