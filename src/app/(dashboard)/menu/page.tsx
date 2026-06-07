"use client";

import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  EyeOff,
  GripVertical,
  Info,
  Plus,
  Settings,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { MenuItemRow } from "@/components/menu/menu-item-row";
import { MenuSearch } from "@/components/menu/shared";
import { overviewCategories, menuHoursSummary } from "@/lib/menu-data";

export default function MenuOverviewPage() {
  return (
    <div className="space-y-5">
      {/* Photo promo */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#fff0e6] to-[#ffe8d6] px-6 py-5">
        <button type="button" className="absolute right-4 top-4 rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-white/60 hover:text-black">
          <X className="size-4" />
        </button>
        <div className="flex items-center justify-between gap-6 pr-8">
          <div className="max-w-lg">
            <p className="text-base font-bold text-black">Photos of menu items can increase sales</p>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
              Add high-quality photos to help customers choose what to order.
            </p>
            <button
              type="button"
              className="mt-4 rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Add photo
            </button>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            {["from-orange-300", "from-amber-300", "from-rose-300"].map((g) => (
              <div key={g} className={`size-16 rounded-xl bg-gradient-to-br ${g} to-white/40 shadow-sm`} />
            ))}
          </div>
        </div>
      </div>

      {/* Tips banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#e8f2fc] px-5 py-4">
        <p className="flex items-start gap-2.5 text-sm text-black">
          <Info className="mt-0.5 size-4 shrink-0" />
          <span>
            <span className="font-semibold">Make sure your menu looks correct.</span> Update items yourself or contact
            support for help.
          </span>
        </p>
        <button
          type="button"
          className="shrink-0 rounded-full bg-white px-5 py-2 text-sm font-medium text-black shadow-sm transition-colors hover:bg-neutral-50"
        >
          View tips
        </button>
      </div>

      {/* Menu header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <button type="button" className="inline-flex items-center gap-1.5 text-lg font-bold text-black">
            Menu
            <ChevronDown className="size-4 text-neutral-500" />
          </button>
          <div className="mt-2 space-y-0.5 text-sm text-neutral-500">
            {menuHoursSummary.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <Link href="/menu/menus/menu">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#f6f6f6] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#eeeeee]"
          >
            <Settings className="size-4" />
            Edit
          </button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-neutral-200 pb-5">
        <MenuSearch placeholder="Search 83 items" className="min-w-0 flex-1" pill />
        <button
          type="button"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f6f6f6] text-neutral-600 transition-colors hover:bg-[#eeeeee] hover:text-black"
        >
          <SlidersHorizontal className="size-4" />
        </button>
        <Link href="/menu/items/new" className="shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#f6f6f6] px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#eeeeee]"
          >
            <Plus className="size-4" />
            Add
          </button>
        </Link>
        <button
          type="button"
          disabled
          className="shrink-0 rounded-full bg-[#e8e8e8] px-6 py-2.5 text-sm font-medium text-neutral-400"
        >
          Save
        </button>
      </div>

      {/* Categories */}
      {overviewCategories.map((category) => (
        <section key={category.id} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
          <button
            type="button"
            className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#fafafa]"
          >
            <div className="flex items-center gap-3">
              <GripVertical className="size-5 text-neutral-300" />
              <div>
                <p className="font-semibold text-black">{category.name}</p>
                <p className="text-sm text-neutral-500">{category.count} items</p>
              </div>
            </div>
            <ChevronUp className="size-4 text-neutral-500" />
          </button>
          <div className="border-t border-neutral-100 px-2">
            {category.items.map((item) => (
              <MenuItemRow key={item.id} item={item} href={`/menu/items/${item.id}`} />
            ))}
          </div>
          <div className="border-t border-neutral-100 px-5 py-4">
            <Link href="/menu/items/new">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#f6f6f6] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#eeeeee]"
              >
                <Plus className="size-3.5" />
                Add Item
              </button>
            </Link>
          </div>
        </section>
      ))}

      <section className="rounded-2xl border border-neutral-200 bg-white">
        <button
          type="button"
          className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#fafafa]"
        >
          <div className="flex items-center gap-3">
            <EyeOff className="size-4 text-neutral-400" />
            <div>
              <p className="font-semibold text-black">Uncategorised</p>
              <p className="text-sm text-neutral-500">Hidden from customers · 0 items</p>
            </div>
          </div>
          <ChevronDown className="size-4 text-neutral-500" />
        </button>
      </section>

      <Link href="/menu/items/new">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#f6f6f6] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#eeeeee]"
        >
          <Plus className="size-3.5" />
          Add Item
        </button>
      </Link>
    </div>
  );
}
