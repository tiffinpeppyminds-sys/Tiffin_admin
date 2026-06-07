"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

export function CategoryForm({ backHref }: { backHref: string }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-full bg-[#f6f6f6] px-4 py-2 text-sm font-medium text-black hover:bg-[#eeeeee]"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
        <div className="flex gap-2">
          <button type="button" className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-black hover:bg-neutral-50">
            Delete
          </button>
          <button type="button" disabled className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-300">
            Duplicate
          </button>
          <button type="button" className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800">
            Save
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-black">Name</label>
          <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-[#06c167] hover:underline">
            <Plus className="size-3.5" />
            Add Note
          </button>
        </div>
        <input type="text" className="auth-input mt-2 max-w-md" placeholder="Category name" />
      </div>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-lg font-bold text-black">Menus for category to appear in</h2>
        <label className="mt-4 flex items-center gap-3">
          <input type="checkbox" defaultChecked className="size-4 rounded border-neutral-400 accent-black" />
          <span className="text-sm text-black">Menu</span>
        </label>
      </section>
    </div>
  );
}
