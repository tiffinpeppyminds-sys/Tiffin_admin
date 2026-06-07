"use client";

import Link from "next/link";
import { ChevronDown, ImageIcon, Search } from "lucide-react";
import { itemsList } from "@/lib/menu-data";

export default function ItemsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="page-title-lg">Items</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-black hover:bg-neutral-50"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-blue-500" />
            Review AI suggestions
          </button>
          <Link href="/menu/items/new">
            <button
              type="button"
              className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
            >
              + New item
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search.."
            className="w-full rounded-lg bg-[#f6f6f6] py-3 pl-10 pr-4 text-sm outline-none placeholder:text-neutral-500 focus:ring-1 focus:ring-neutral-300"
          />
        </div>
        <div className="relative">
          <select className="cursor-pointer appearance-none rounded-full border border-neutral-300 bg-white py-2.5 pl-4 pr-9 text-sm font-medium text-black outline-none">
            <option>All</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-500">
              <th className="pb-3 pr-4 font-medium">Photo</th>
              <th className="pb-3 pr-4 font-medium">
                Name <span className="text-neutral-400">↑</span>
              </th>
              <th className="pb-3 pr-4 font-medium">Price</th>
              <th className="pb-3 pr-4 font-medium">Menus</th>
              <th className="pb-3 pr-4 font-medium">Categories</th>
              <th className="pb-3 pr-4 font-medium">Used In</th>
              <th className="pb-3 pr-4 font-medium">Contains</th>
              <th className="pb-3 font-medium">Last updated</th>
            </tr>
          </thead>
          <tbody>
            {itemsList.map((item) => (
              <tr key={item.id} className="border-b border-neutral-200">
                <td className="py-4 pr-4">
                  {item.hasPhoto ? (
                    <div className="size-11 rounded-md bg-gradient-to-br from-amber-100 to-orange-200" />
                  ) : (
                    <div className="flex size-11 items-center justify-center rounded-md bg-neutral-100 text-neutral-400">
                      <ImageIcon className="size-4" />
                    </div>
                  )}
                </td>
                <td className="py-4 pr-4">
                  <Link href={`/menu/items/${item.id}`} className="font-medium text-[#06c167] hover:underline">
                    {item.name}
                  </Link>
                </td>
                <td className="py-4 pr-4 text-black">{item.price}</td>
                <td className="py-4 pr-4 text-black">{item.menus}</td>
                <td className="py-4 pr-4 text-black">{item.categories}</td>
                <td className="py-4 pr-4 text-black">{item.usedIn}</td>
                <td className="py-4 pr-4 text-black">{item.contains}</td>
                <td className="py-4 text-black">{item.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
