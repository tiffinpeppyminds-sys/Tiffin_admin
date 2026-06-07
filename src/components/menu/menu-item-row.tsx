"use client";

import Link from "next/link";
import { Check, ChevronDown, GripVertical, Star } from "lucide-react";
import type { MenuItemRow as MenuItem } from "@/lib/menu-data";

function ItemThumb({ name, placeholder }: { name: string; placeholder?: boolean }) {
  if (placeholder) {
    return <div className="size-14 shrink-0 rounded-md bg-neutral-200" />;
  }
  return (
    <div className="size-14 shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-amber-100 via-orange-200 to-rose-200">
      <div className="flex h-full items-end justify-center pb-1 text-[8px] font-bold text-neutral-600/60">
        {name.slice(0, 3)}
      </div>
    </div>
  );
}

export function MenuItemRow({ item, href }: { item: MenuItem; href?: string }) {
  const nameEl = href ? (
    <Link href={href} className="font-semibold text-black hover:underline">
      {item.name}
    </Link>
  ) : (
    <span className="font-semibold text-black">{item.name}</span>
  );

  return (
    <div className="flex items-center gap-4 border-b border-neutral-200 py-4">
      <GripVertical className="size-5 shrink-0 text-neutral-300" />
      <ItemThumb name={item.name} placeholder={item.placeholder} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {nameEl}
          {item.popular ? (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-[#06c167]">
              <Star className="size-3.5 fill-[#06c167]" />
              Popular
            </span>
          ) : null}
        </div>
        {item.sides ? (
          <button type="button" className="mt-0.5 text-sm text-[#06c167] hover:underline">
            {item.sides}
          </button>
        ) : null}
      </div>
      <div className="flex items-center gap-1 rounded-lg bg-[#f6f6f6] px-3 py-2.5">
        <span className="text-sm text-neutral-600">$</span>
        <input
          type="text"
          defaultValue={item.price}
          className="w-12 border-0 bg-transparent text-sm font-medium text-black outline-none"
        />
      </div>
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#f6f6f6] px-2 py-1.5"
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-[#06c167] text-white">
          <Check className="size-3.5 stroke-[3]" />
        </span>
        <ChevronDown className="size-4 text-neutral-500" />
      </button>
    </div>
  );
}
