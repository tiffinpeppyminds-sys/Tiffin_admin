"use client";

import { useEffect, useState, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChartNoAxesCombined,
  ChevronDown,
  CreditCard,
  FileText,
  Home,
  Megaphone,
  ScrollText,
  Settings,
  Sparkles,
  Store,
  Tag,
  UserCog,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Leaf = { label: string; href: string; match?: (path: string) => boolean };
type NavItem = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  href?: string;
  children?: Leaf[];
};

const nav: NavItem[] = [
  { label: "Home", icon: Home, href: "/dashboard" },
  {
    label: "Shops",
    icon: Store,
    children: [
      { label: "All shops", href: "/providers", match: (p) => p === "/providers" || (p.startsWith("/providers/") && !["shop-groups", "webshop", "devices", "add"].some((s) => p.includes(s))) },
      { label: "Shop groups", href: "/providers/shop-groups" },
      { label: "Webshop", href: "/providers/webshop" },
      { label: "Devices", href: "/providers/devices" },
    ],
  },
  { label: "Orders", icon: ScrollText, href: "/orders" },
  {
    label: "Performance",
    icon: ChartNoAxesCombined,
    children: [
      { label: "Sales", href: "/performance/sales" },
      { label: "Operations", href: "/performance/operations" },
      { label: "Success", href: "/performance/success" },
      { label: "Market benchmarking", href: "/performance/market-benchmarking" },
    ],
  },
  {
    label: "Customers",
    icon: Users,
    children: [
      { label: "Customer insights", href: "/customers" },
      { label: "Reviews", href: "/feedback" },
    ],
  },
  { label: "Reports", icon: FileText, href: "/reports" },
  { label: "Ads", icon: Megaphone, href: "/ads" },
  { label: "Offers", icon: Tag, href: "/offers" },
  { label: "Marketing", icon: Sparkles, href: "/marketing" },
  { label: "Menu", icon: BookOpen, href: "/menu" },
  {
    label: "Payments",
    icon: CreditCard,
    children: [
      { label: "Payouts", href: "/payments", match: (p) => p === "/payments" },
      { label: "Payouts by order", href: "/payments/payouts-by-order" },
      { label: "Invoices", href: "/payments/invoices" },
      { label: "Invoice settings", href: "/payments/invoice-settings" },
      { label: "Banking", href: "/payments/banking" },
    ],
  },
  { label: "Users", icon: UserCog, href: "/admins" },
  {
    label: "Settings",
    icon: Settings,
    children: [
      { label: "General", href: "/settings", match: (p) => p === "/settings" },
      { label: "Holiday hours", href: "/settings/holiday-hours" },
      { label: "Preparation Times", href: "/settings/preparation-times" },
      { label: "Documents", href: "/settings/documents" },
      { label: "Appointments", href: "/settings/appointments" },
    ],
  },
];

function isChildActive(child: Leaf, pathname: string) {
  if (child.match) return child.match(pathname);
  return pathname === child.href;
}

function isGroupActive(item: NavItem, pathname: string) {
  return item.children?.some((child) => isChildActive(child, pathname)) ?? false;
}

export function Sidebar() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const active = nav.find((item) => item.children && isGroupActive(item, pathname));
    if (active) setOpenGroup(active.label);
  }, [pathname]);

  const toggleGroup = (label: string) => {
    setOpenGroup((current) => (current === label ? null : label));
  };

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 flex-col overflow-y-auto border-r border-neutral-200 bg-white lg:flex">
      <div className="px-4 pt-4">
        <p className="px-2 text-[11px] font-medium text-neutral-500">Business</p>
        <button
          type="button"
          className="mt-0.5 flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-neutral-100"
        >
          <span className="text-base font-bold tracking-[-0.02em] text-black">All shops</span>
          <ChevronDown className="size-4 text-neutral-500" />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-3">
        {nav.map((item) => {
          const Icon = item.icon;

          if (item.children) {
            const isOpen = openGroup === item.label;
            const groupActive = isGroupActive(item, pathname);
            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => toggleGroup(item.label)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    groupActive
                      ? "font-semibold text-black"
                      : "font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black",
                  )}
                >
                  <Icon className={cn("size-[18px] shrink-0", groupActive ? "text-black" : "text-neutral-500")} />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronDown className={cn("size-4 text-neutral-400 transition-transform", isOpen && "rotate-180")} />
                </button>
                {isOpen ? (
                  <div className="mb-1 space-y-0.5 pl-9">
                    {item.children.map((child) => {
                      const active = isChildActive(child, pathname);
                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm transition-colors",
                            active
                              ? "bg-neutral-100 font-semibold text-black"
                              : "font-medium text-neutral-600 hover:bg-neutral-50 hover:text-black",
                          )}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          }

          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href ?? "#"}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-neutral-100 font-semibold text-black"
                  : "font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black",
              )}
            >
              <Icon className={cn("size-[18px] shrink-0", isActive ? "text-black" : "text-neutral-500")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
