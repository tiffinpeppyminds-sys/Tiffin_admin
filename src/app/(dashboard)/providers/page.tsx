"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  CloudDownload,
  Moon,
  RefreshCw,
  Search,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { shops } from "@/lib/shops-data";

export default function ShopsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [lastUpdated, setLastUpdated] = useState("01:55");

  const filtered = useMemo(() => {
    let list = [...shops];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.shortAddress.toLowerCase().includes(q));
    }
    if (statusFilter === "closed") list = list.filter((s) => s.isClosed);
    if (statusFilter === "open") list = list.filter((s) => !s.isClosed);
    if (sortBy === "sales") list.sort((a, b) => parseFloat(b.sales.replace(/[^0-9.]/g, "")) - parseFloat(a.sales.replace(/[^0-9.]/g, "")));
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [query, statusFilter, sortBy]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="page-title">Shops</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm">
            <CloudDownload className="mr-1.5 size-4" />
            Download shops
          </Button>
          <Link href="/providers/add">
            <Button variant="ghost" size="sm">
              See shops in setup
            </Button>
          </Link>
          <Link href="/providers/add">
            <Button size="sm">+ Add</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <FilterPill
          label={sortBy === "name" ? "Sort" : `Sort: ${sortBy}`}
          options={[
            { label: "Name", value: "name" },
            { label: "Sales", value: "sales" },
          ]}
          onSelect={setSortBy}
        />
        <FilterPill
          label={statusFilter === "all" ? "Shop status" : `Status: ${statusFilter}`}
          options={[
            { label: "All", value: "all" },
            { label: "Closed", value: "closed" },
            { label: "Open", value: "open" },
          ]}
          onSelect={setStatusFilter}
        />
        <Link href="/settings">
          <Button variant="secondary" size="sm">
            <Calendar className="mr-1.5 size-4" />
            Add holiday hours
          </Button>
        </Link>
        <div className="relative ml-auto flex items-center gap-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="h-10 w-44 rounded-full border border-neutral-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-black"
          />
          <span className="text-xs text-neutral-500">
            {filtered.length} total · Last updated: {lastUpdated}
          </span>
          <button
            type="button"
            onClick={() => setLastUpdated(new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", hour12: false }))}
            className="flex size-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
            aria-label="Refresh"
          >
            <RefreshCw className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-xl bg-[#e8efff] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-white">
            <Smartphone className="size-5 text-[#276ef1]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Download the Tiffin Finder Manager app</p>
            <p className="text-xs text-neutral-600">
              Get real-time alerts about shop downtime and pause or unpause shops directly from your phone.
            </p>
          </div>
        </div>
        <Link href="/dashboard">
          <Button variant="secondary" size="sm">
            Get the app
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-xl bg-[#e8efff] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-black">Add scheduled instructions</p>
          <p className="text-xs text-neutral-600">
            You can now add scheduled instructions for delivery people based on the time of the day; you can start by
            adding for Maikhana Adelaide first.
          </p>
        </div>
        <Link href="/providers/maikhana-adelaide">
          <Button variant="secondary" size="sm">
            Add
          </Button>
        </Link>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-black">Closed shops</h2>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          {filtered.map((shop, idx) => (
            <Link
              key={shop.id}
              href={`/providers/${shop.id}`}
              className={`flex items-center gap-4 px-4 py-4 transition-colors hover:bg-neutral-50 ${idx > 0 ? "border-t border-neutral-200" : ""}`}
            >
              <div className="relative">
                <div className={`flex size-12 items-center justify-center rounded-full text-lg font-bold ${shop.accent}`}>
                  {shop.name.charAt(0)}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-neutral-800 text-white">
                  <Moon className="size-3" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-black">{shop.name}</p>
                <p className="text-sm text-neutral-500">{shop.shortAddress}</p>
              </div>
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                {shop.rating}
              </span>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-black">Closed</p>
                <p className="text-xs text-neutral-500">{shop.opensAt}</p>
              </div>
              <div className="hidden text-right md:block">
                <p className="text-sm font-semibold text-black">{shop.sales}</p>
                <p className="text-xs text-neutral-500">Sales</p>
              </div>
              <div className="hidden text-right md:block">
                <p className="text-sm font-semibold text-black">{shop.orders}</p>
                <p className="text-xs text-neutral-500">Orders</p>
              </div>
              <ChevronRight className="size-5 shrink-0 text-neutral-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterPill({
  label,
  options,
  onSelect,
}: {
  label: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-black hover:bg-neutral-50"
      >
        {label}
        <ChevronDown className="size-3.5" />
      </button>
      {open ? (
        <div className="absolute left-0 top-10 z-20 w-44 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
