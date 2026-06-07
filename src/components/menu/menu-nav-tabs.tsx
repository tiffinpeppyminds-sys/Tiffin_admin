"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Tab = { id: string; label: string; href: string };

export function MenuNavTabs({ tabs }: { tabs: readonly Tab[] }) {
  const pathname = usePathname();
  const trackRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const activeId =
    tabs.find((tab) => (tab.id === "overview" ? pathname === "/menu" : pathname.startsWith(tab.href)))?.id ??
    "overview";

  const updateIndicator = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const active = track.querySelector<HTMLAnchorElement>(`[data-tab="${activeId}"]`);
    if (!active) return;
    setIndicator({ left: active.offsetLeft, width: active.offsetWidth });
  }, [activeId]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator, pathname]);

  return (
    <div
      ref={trackRef}
      className="scrollbar-none relative inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-[#f0f0f0] p-1"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-black shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ left: indicator.left, width: indicator.width }}
      />
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          data-tab={tab.id}
          className={cn(
            "relative z-10 shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
            activeId === tab.id ? "text-white" : "text-neutral-600 hover:text-black",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
