"use client";

import Link from "next/link";
import { Check, ChevronDown, GripVertical, Star } from "lucide-react";
import type { MenuItemRow as MenuItem } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

function ItemThumb({ name, placeholder }: { name: string; placeholder?: boolean }) {
  if (placeholder) {
    return <div className="size-14 shrink-0 rounded-xl bg-neutral-200" />;
  }
  return (
    <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 via-orange-200 to-rose-200 shadow-sm">
      <div className="flex h-full items-end justify-center pb-1 text-[8px] font-bold text-neutral-600/50">
        {name.slice(0, 3)}
      </div>
    </div>
  );
}

export function MenuItemRow({ item, href }: { item: MenuItem; href?: string }) {
  const nameEl = href ? (
    <Link href={href} className="font-semibold text-black transition-colors hover:text-[#06c167]">
      {item.name}
    </Link>
  ) : (
    <span className="font-semibold text-black">{item.name}</span>
  );

  return (
    <div className="flex items-center gap-4 px-3 py-4 transition-colors hover:bg-[#fafafa]">
      <GripVertical className="size-5 shrink-0 cursor-grab text-neutral-300" />
      <ItemThumb name={item.name} placeholder={item.placeholder} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {nameEl}
          {item.popular ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f9ee] px-2 py-0.5 text-xs font-semibold text-[#06c167]">
              <Star className="size-3 fill-[#06c167]" />
              Popular
            </span>
          ) : null}
        </div>
        {item.sides ? (
          <button type="button" className="mt-0.5 text-sm font-medium text-[#06c167] hover:underline">
            {item.sides}
          </button>
        ) : null}
      </div>
      <div className="flex items-center gap-1 rounded-xl bg-[#f6f6f6] px-3 py-2.5">
        <span className="text-sm text-neutral-500">$</span>
        <input
          type="text"
          defaultValue={item.price}
          className="w-12 border-0 bg-transparent text-sm font-semibold text-black outline-none"
        />
      </div>
      <button
        type="button"
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-2 transition-colors",
          item.available ? "bg-[#f6f6f6] hover:bg-[#eeeeee]" : "bg-neutral-100",
        )}
      >
        <span
          className={cn(
            "flex size-6 items-center justify-center rounded-full text-white",
            item.available ? "bg-[#06c167]" : "bg-neutral-400",
          )}
        >
          {item.available ? <Check className="size-3.5 stroke-[3]" /> : null}
        </span>
        <ChevronDown className="size-4 text-neutral-500" />
      </button>
    </div>
  );
}
