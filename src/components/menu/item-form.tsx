"use client";

import Link from "next/link";
import { ArrowLeft, Check, ChevronDown, CloudUpload, MoreVertical, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function ItemForm({ mode, backHref }: { mode: "new" | "edit"; backHref: string }) {
  const showPhoto = mode === "edit";

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href={backHref} className="text-black hover:text-neutral-600">
          <ArrowLeft className="size-5" />
        </Link>
        <button type="button" className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800">
          Save
        </button>
      </div>

      <div className="max-w-3xl space-y-7">
        <div>
          <label className="text-sm font-semibold text-black">
            Name <span className="text-[#e11900]">*</span>
          </label>
          <input
            type="text"
            className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-neutral-300"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black">Categories</label>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Add a category"
              className="w-full rounded-lg bg-[#f6f6f6] py-3 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-neutral-300"
            />
          </div>
          <p className="mt-2 text-sm text-neutral-500">Assign this item to your existing categories.</p>
        </div>

        <div>
          <label className="text-sm font-semibold text-black">Price by</label>
          <div className="mt-2 inline-flex rounded-full bg-[#f3f3f3] p-1">
            {["Each", "Weight"].map((opt) => (
              <button
                key={opt}
                type="button"
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium",
                  opt === "Each" ? "bg-black text-white" : "text-black",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-6">
          <label className="text-sm font-semibold text-black">
            Price <span className="text-[#e11900]">*</span>
          </label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg bg-[#f6f6f6] px-3 py-2.5">
              <span className="text-sm text-neutral-600">$</span>
              <input
                type="text"
                placeholder="None"
                className="w-20 border-0 bg-transparent text-sm font-medium text-black outline-none"
              />
            </div>
            <button type="button" className="rounded-lg border border-neutral-300 p-2.5 text-neutral-500 hover:bg-neutral-50">
              <MoreVertical className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6">
          <span className="text-sm text-neutral-600">Enable separate pricing for Pick-up</span>
          <button type="button" className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm font-medium text-black hover:bg-neutral-50">
            Add
          </button>
        </div>

        <div className="flex items-center justify-between gap-6">
          <label className="text-sm font-semibold text-black">VAT</label>
          <div className="relative w-28">
            <input
              type="text"
              defaultValue="10"
              className="w-full rounded-lg bg-[#f6f6f6] py-3 pl-4 pr-8 text-sm outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">%</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-black">Description (optional)</label>
            <span className="text-xs text-neutral-400">0/4000</span>
          </div>
          <textarea
            rows={4}
            placeholder="Enter description"
            className="mt-2 w-full rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-neutral-300"
          />
        </div>

        {showPhoto ? (
          <>
            <div>
              <label className="text-sm font-semibold text-black">Photo</label>
              <div className="mt-3 flex flex-wrap gap-6">
                <div className="flex min-h-[160px] min-w-[240px] flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-[#f6f6f6] p-6 text-center">
                  <p className="text-sm text-neutral-600">Drop image here to upload or</p>
                  <button type="button" className="mt-2 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-black">
                    <CloudUpload className="size-4" />
                    Upload new
                  </button>
                </div>
                <div className="max-w-xs text-sm text-neutral-500">
                  <p>Photos help customers decide what to order and can increase sales.</p>
                  <button type="button" className="mt-1 text-[#06c167] hover:underline">
                    See full photo guidelines
                  </button>
                  <p className="mt-3">
                    File requirement: JPG, PNG, GIF, HEIC or WEBP up to 10 MB. Minimum pixels required: 320 for width
                    and height.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button type="button" className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white">
                  Add Photo
                </button>
                <button type="button" disabled className="rounded-full px-5 py-2 text-sm font-medium text-neutral-300">
                  Delete
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-black">Add customisations</label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Add customisations"
                  className="w-full rounded-lg bg-[#f6f6f6] py-3 pl-10 pr-4 text-sm outline-none"
                />
              </div>
              <div className="mt-2 flex gap-4 text-sm">
                <button type="button" className="text-[#06c167] hover:underline">
                  Copy customisation of another item
                </button>
                <button type="button" className="text-neutral-500 hover:text-black">
                  Clear
                </button>
              </div>
            </div>

            <label className="flex items-center gap-3">
              <input type="checkbox" className="size-4 rounded border-neutral-400" />
              <span className="text-sm text-black">Sold out</span>
            </label>

            <div>
              <label className="text-sm font-semibold text-black">Product type</label>
              <div className="relative mt-2 max-w-md">
                <select className="w-full appearance-none rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm text-neutral-500 outline-none">
                  <option>Select..</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
              </div>
            </div>

            <button type="button" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#06c167] hover:underline">
              <Check className="size-4" />
              See item changes
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
