"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shops } from "@/lib/shops-data";

export default function DevicesPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return shops;
    const q = query.toLowerCase();
    return shops.filter((s) => s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Devices</h1>
          <p className="mt-1 text-sm text-neutral-500">Your list of devices per shop</p>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shop"
            className="h-10 w-56 rounded-full border border-neutral-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-black"
          />
        </div>
      </div>

      <p className="text-sm text-neutral-500">{filtered.length} shops</p>

      <div className="overflow-hidden rounded-xl border border-neutral-200">
        <table className="min-w-full text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">Shop</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">Address</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">Devices</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((shop, idx) => (
              <tr key={shop.id} className={idx > 0 ? "border-t border-neutral-100" : ""}>
                <td className="px-4 py-4 font-semibold text-black">{shop.name}</td>
                <td className="px-4 py-4 text-neutral-600">{shop.address}</td>
                <td className="px-4 py-4 text-neutral-600">No devices</td>
                <td className="px-4 py-4 text-right">
                  <Button variant="secondary" size="sm" disabled>
                    Replace
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
