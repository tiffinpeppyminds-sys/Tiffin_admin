"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChartNoAxesCombined,
  CircleHelp,
  LayoutDashboard,
  ScrollText,
  ShieldCheck,
  Store,
  UserCog,
  Users,
  Workflow,
} from "lucide-react";
import { navItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  "/dashboard": LayoutDashboard,
  "/admins": UserCog,
  "/providers": Store,
  "/customers": Users,
  "/orders": ScrollText,
  "/complaints": CircleHelp,
  "/reports": ChartNoAxesCombined,
  "/notifications": Bell,
  "/app-flows": Workflow,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-card sticky top-4 hidden h-[calc(110vh-1rem)] w-80 flex-col rounded-2xl border border-blue-100/60 bg-gradient-to-b from-white to-slate-50 p-4 lg:flex dark:border-slate-700 dark:bg-slate-950">
      <div className="premium-gradient top-shine mb-6 flex min-h-[140px] flex-col overflow-hidden rounded-xl border border-blue-200/30 px-5 py-7 text-left text-white shadow-lg dark:border-blue-900/70">
        <div className="mb-4 flex w-full items-center justify-center gap-2">
          <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-50">
            <ShieldCheck className="size-3.5 text-blue-200" />
            Tiffin Finder
          </div>
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-blue-100">
            Executive
          </div>
        </div>

        <div className="mt-2 text-left">
          <p className="heading-classic text-[24px] leading-none font-semibold">Admin Control Center</p>
        </div>
      </div>
      <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/70 dark:text-slate-500">
        Navigation
      </p>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = iconMap[item.href] ?? LayoutDashboard;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-lg px-3 py-2.5 transition-all",
                isActive
                  ? "border-l-4 border-blue-700 bg-blue-50 text-black dark:border-blue-400 dark:bg-blue-950/40 dark:text-slate-100"
                  : "border-l-4 border-transparent text-black hover:bg-blue-50/60 dark:text-slate-300 dark:hover:bg-slate-900",
              )}
            >
              <div className="flex items-start gap-2.5">
                <Icon className={cn("mt-0.5 size-4 shrink-0", isActive ? "text-blue-800 dark:text-blue-300" : "text-black")} />
                <div>
                  <p className="heading-classic text-[15px] font-semibold">{item.label}</p>
                  <p className="text-xs text-black/80 dark:text-slate-500">{item.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="subtle-divider mt-auto rounded-xl border border-blue-200 bg-blue-50/70 p-4 dark:border-slate-700 dark:bg-slate-950/40">
        <p className="heading-classic text-sm font-semibold text-black dark:text-slate-100">Role: Super Admin</p>
        <p className="mt-1 text-xs text-black/85 dark:text-slate-400">
          Can create admins, manage permissions, and access every module.
        </p>
      </div>
    </aside>
  );
}
