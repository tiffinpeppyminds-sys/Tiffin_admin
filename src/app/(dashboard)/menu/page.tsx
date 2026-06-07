"use client";

import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  EyeOff,
  GripVertical,
  Info,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { MenuItemRow } from "@/components/menu/menu-item-row";
import { overviewCategories, menuHoursSummary } from "@/lib/menu-data";

export default function MenuOverviewPage() {
  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden bg-[#fff0e6] px-6 py-5">
        <button type="button" className="absolute right-5 top-5 text-neutral-500 hover:text-black">
          <X className="size-4" />
        </button>
        <div className="flex items-center justify-between gap-6 pr-10">
          <div className="max-w-lg">
            <p className="text-[15px] font-bold text-black">Photos of menu items can increase sales</p>
            <p className="mt-1.5 text-sm text-neutral-700">
              Add high-quality photos to help customers choose what to order.
            </p>
            <button
              type="button"
              className="mt-4 rounded-full border border-neutral-400 bg-white px-5 py-2 text-sm font-medium text-black hover:bg-neutral-50"
            >
              Add photo
            </button>
          </div>
          <div className="hidden shrink-0 sm:block">
            <div className="flex gap-2">
              <div className="size-16 rounded-lg bg-orange-200/80" />
              <div className="size-16 rounded-lg bg-amber-200/80" />
              <div className="size-16 rounded-lg bg-rose-200/80" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#e8f2fc] px-6 py-4">
        <p className="flex items-start gap-2 text-sm text-black">
          <Info className="mt-0.5 size-4 shrink-0 text-black" />
          <span>
            <span className="font-bold">Make sure your menu looks correct.</span> You can make updates on your
            own or contact support for help.
          </span>
        </p>
        <button
          type="button"
          className="shrink-0 rounded-full border border-neutral-400 bg-white px-5 py-2 text-sm font-medium text-black hover:bg-neutral-50"
        >
          View tips
        </button>
      </div>

      <div className="flex items-start justify-between gap-4 pt-2">
        <div>
          <button type="button" className="inline-flex items-center gap-1.5 text-lg font-bold text-black">
            Menu
            <ChevronDown className="size-4" />
          </button>
          <div className="mt-2 space-y-0.5 text-sm text-neutral-600">
            {menuHoursSummary.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <Link href="/menu/menus/menu">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-50"
          >
            <Settings className="size-4" />
            Edit
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-3 border-b border-neutral-200 pb-5">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search 83 items"
            className="w-full rounded-lg bg-[#f6f6f6] py-3 pl-10 pr-4 text-sm text-black outline-none placeholder:text-neutral-500 focus:ring-1 focus:ring-neutral-300"
          />
        </div>
        <button
          type="button"
          className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-300 text-neutral-500 hover:bg-neutral-50"
        >
          <SlidersHorizontal className="size-4" />
        </button>
        <Link href="/menu/items/new" className="shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border border-neutral-400 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-50"
          >
            <Plus className="size-4" />
            Add
          </button>
        </Link>
        <button
          type="button"
          disabled
          className="shrink-0 rounded-full bg-[#e8e8e8] px-6 py-2 text-sm font-medium text-neutral-400"
        >
          Save
        </button>
      </div>

      {overviewCategories.map((category) => (
        <section key={category.id}>
          <button
            type="button"
            className="flex w-full items-center justify-between border-b border-neutral-200 py-4 text-left"
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
          {category.items.map((item) => (
            <MenuItemRow key={item.id} item={item} href={`/menu/items/${item.id}`} />
          ))}
          <div className="border-b border-neutral-200 py-4">
            <Link href="/menu/items/new">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-[#f6f6f6] px-4 py-2 text-sm font-medium text-black hover:bg-neutral-100"
              >
                <Plus className="size-3.5" />
                Add Item
              </button>
            </Link>
          </div>
        </section>
      ))}

      <button
        type="button"
        className="flex w-full items-center justify-between border-b border-neutral-200 py-4 text-left"
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

      <div className="pt-2">
        <Link href="/menu/items/new">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-[#f6f6f6] px-4 py-2 text-sm font-medium text-black hover:bg-neutral-100"
          >
            <Plus className="size-3.5" />
            Add Item
          </button>
        </Link>
      </div>
    </div>
  );
}
