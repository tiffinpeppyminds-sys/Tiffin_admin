"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { categoriesList } from "@/lib/menu-data";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="page-title-lg">Categories</h1>
        <Link href="/menu/categories/new">
          <button
            type="button"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            + New category
          </button>
        </Link>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg bg-[#f6f6f6] py-3 pl-10 pr-4 text-sm outline-none placeholder:text-neutral-500 focus:ring-1 focus:ring-neutral-300"
        />
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-neutral-500">
            <th className="pb-3 pr-4 font-medium">
              Name <span className="text-neutral-400">↕</span>
            </th>
            <th className="pb-3 pr-4 font-medium">Menus</th>
            <th className="pb-3 font-medium">Items</th>
          </tr>
        </thead>
        <tbody>
          {categoriesList.map((cat) => (
            <tr key={cat.id} className="border-b border-neutral-200">
              <td className="py-5 pr-4">
                <Link href={`/menu/categories/${cat.id}`} className="font-medium text-[#06c167] hover:underline">
                  {cat.name}
                </Link>
              </td>
              <td className="py-5 pr-4 text-black">{cat.menus}</td>
              <td className="py-5 text-black">{cat.items}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
