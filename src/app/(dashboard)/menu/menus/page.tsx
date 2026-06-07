"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { ScheduleGrid } from "@/components/menu/schedule-grid";
import { menuList } from "@/lib/menu-data";

export default function MenusPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="page-title-lg">Menus</h1>
        <Link href="/menu/menus/menu">
          <button
            type="button"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            + New Menu
          </button>
        </Link>
      </div>

      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder="Search.."
          className="w-full rounded-lg bg-[#f6f6f6] py-3 pl-10 pr-4 text-sm outline-none placeholder:text-neutral-500 focus:ring-1 focus:ring-neutral-300"
        />
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-neutral-500">
            <th className="pb-3 pr-4 font-medium">
              Name <span className="text-neutral-400">↑</span>
            </th>
            <th className="pb-3 pr-4 font-medium">Menu hours</th>
            <th className="pb-3 pr-4 font-medium">Categories</th>
            <th className="pb-3 font-medium">Items</th>
          </tr>
        </thead>
        <tbody>
          {menuList.map((menu) => (
            <tr key={menu.id} className="border-b border-neutral-200">
              <td className="py-5 pr-4">
                <Link href={`/menu/menus/${menu.id}`} className="font-medium text-[#06c167] hover:underline">
                  {menu.name}
                </Link>
              </td>
              <td className="max-w-md py-5 pr-4 text-black">{menu.hours}</td>
              <td className="py-5 pr-4 text-black">{menu.categories}</td>
              <td className="py-5 text-black">{menu.items}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ScheduleGrid />
    </div>
  );
}
