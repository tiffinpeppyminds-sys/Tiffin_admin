"use client";

import { useMemo, useState } from "react";
import { AlertCircle, ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shops } from "@/lib/shops-data";

export default function ShopGroupsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [tab, setTab] = useState<"all" | "selected">("all");

  const filtered = useMemo(() => {
    if (!query.trim()) return shops;
    const q = query.toLowerCase();
    return shops.filter((s) => s.name.toLowerCase().includes(q) || s.shortAddress.toLowerCase().includes(q));
  }, [query]);

  const visible = tab === "selected" ? filtered.filter((s) => selected.includes(s.id)) : filtered;

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div>
      <h1 className="page-title">Shop groups</h1>

      <div className="mt-16 flex flex-col items-center justify-center text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-black text-white">
          <AlertCircle className="size-7" />
        </div>
        <h2 className="mt-5 text-xl font-bold text-black">No shop groups found</h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600">
          You don&apos;t have any shop groups. Create your first shop group now.
        </p>
        <Button className="mt-6" onClick={() => setModalOpen(true)}>
          Create shop group
        </Button>
      </div>

      {modalOpen ? (
        <>
          <button type="button" className="fixed inset-0 z-40 bg-black/40" onClick={() => setModalOpen(false)} />
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-black">Create new shop group</h3>
                <p className="text-sm text-neutral-500">Add shops to shop group</p>
              </div>
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-full p-1 hover:bg-neutral-100">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex border-b border-neutral-200 px-6">
              <button
                type="button"
                onClick={() => setTab("all")}
                className={`border-b-2 px-1 py-3 text-sm font-medium ${tab === "all" ? "border-black text-black" : "border-transparent text-neutral-500"}`}
              >
                All ({shops.length})
              </button>
              <button
                type="button"
                onClick={() => setTab("selected")}
                className={`ml-6 border-b-2 px-1 py-3 text-sm font-medium ${tab === "selected" ? "border-black text-black" : "border-transparent text-neutral-500"}`}
              >
                Selected ({selected.length})
              </button>
            </div>

            <div className="space-y-3 px-6 py-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for shops"
                  className="h-11 w-full rounded-full border border-neutral-300 pl-9 pr-3 text-sm outline-none focus:border-black"
                />
              </div>
              <div className="flex gap-4 text-sm">
                <button
                  type="button"
                  onClick={() => setSelected(shops.map((s) => s.id))}
                  className="font-medium text-black hover:underline"
                >
                  Select all
                </button>
                <button
                  type="button"
                  onClick={() => setSelected([])}
                  disabled={selected.length === 0}
                  className="font-medium text-neutral-400 disabled:cursor-not-allowed"
                >
                  Clear
                </button>
              </div>
              <div className="max-h-56 space-y-1 overflow-y-auto">
                {visible.map((shop) => (
                  <label
                    key={shop.id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-neutral-50"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(shop.id)}
                      onChange={() => toggle(shop.id)}
                      className="mt-1 size-4 rounded border-neutral-300 accent-black"
                    />
                    <span>
                      <span className="block text-sm font-medium text-black">{shop.name}</span>
                      <span className="block text-xs text-neutral-500">{shop.shortAddress}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-4">
              <Button variant="secondary" size="sm">
                Upload CSV
                <ChevronDown className="ml-1 size-3.5" />
              </Button>
              <Button size="sm" disabled={selected.length === 0}>
                Next
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
