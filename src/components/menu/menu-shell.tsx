"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Clock, Eye, Info } from "lucide-react";
import { menuActionLinks, menuShops, menuTabs } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

const actionIcons: Record<string, ReactNode> = {
  "See changes": <Clock className="size-3.5" />,
  "View online": <Eye className="size-3.5" />,
  About: <Info className="size-3.5" />,
};

export function MenuShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const activeTab =
    menuTabs.find((tab) =>
      tab.id === "overview" ? pathname === "/menu" : pathname.startsWith(tab.href),
    )?.id ?? "overview";

  return (
    <div className="space-y-5">
      <div className="relative inline-block">
        <select
          defaultValue={menuShops[0]}
          className="cursor-pointer appearance-none rounded-full bg-[#f6f6f6] py-2.5 pl-4 pr-10 text-base font-semibold tracking-[-0.02em] text-black outline-none"
        >
          {menuShops.map((shop) => (
            <option key={shop} value={shop}>
              {shop}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-black" />
      </div>

      <div className="flex items-end justify-between gap-6 border-b border-neutral-200">
        <div className="flex gap-7 overflow-x-auto">
          {menuTabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn("tab-link shrink-0", activeTab === tab.id && "tab-link-active")}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        <div className="hidden shrink-0 items-center gap-5 pb-3.5 text-sm font-medium text-black lg:flex">
          {menuActionLinks.map((link) => (
            <button
              key={link}
              type="button"
              className="inline-flex items-center gap-1.5 whitespace-nowrap hover:text-neutral-600"
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
