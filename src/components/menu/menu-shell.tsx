"use client";

import type { ReactNode } from "react";
import { ChevronDown, Clock, Eye, Info, Tag } from "lucide-react";
import { MenuNavTabs } from "@/components/menu/menu-nav-tabs";
import { menuActionLinks, menuShops, menuTabs } from "@/lib/menu-data";

const actionIcons: Record<string, ReactNode> = {
  "Bulk update prices": <Tag className="size-3.5" />,
  "See changes": <Clock className="size-3.5" />,
  "View online": <Eye className="size-3.5" />,
  About: <Info className="size-3.5" />,
};

export function MenuShell({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="relative inline-block">
        <select
          defaultValue={menuShops[0]}
          className="cursor-pointer appearance-none rounded-full bg-[#f6f6f6] py-2.5 pl-4 pr-10 text-sm font-semibold text-black outline-none transition-colors hover:bg-[#eeeeee]"
        >
          {menuShops.map((shop) => (
            <option key={shop} value={shop}>
              {shop}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
      </div>

      <div className="flex flex-col gap-4 border-b border-neutral-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <MenuNavTabs tabs={menuTabs} />
        <div className="flex flex-wrap items-center gap-2">
          {menuActionLinks.map((link) => (
            <button
              key={link}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#f6f6f6] px-3.5 py-2 text-xs font-medium text-black transition-colors hover:bg-[#eeeeee]"
            >
              {actionIcons[link]}
              {link}
            </button>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
}
