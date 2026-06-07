"use client";

import { ChevronDown, ImageIcon, Sparkles } from "lucide-react";
import {
  MenuGreenLink,
  MenuPageHeader,
  MenuPrimaryButton,
  MenuSearch,
  MenuTable,
  MenuTd,
  MenuTh,
} from "@/components/menu/shared";
import { itemsList } from "@/lib/menu-data";

export default function ItemsPage() {
  return (
    <div className="space-y-6">
      <MenuPageHeader
        title="Items"
        action={
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#f6f6f6] px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[#eeeeee]"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500">
                <Sparkles className="size-3 text-white" />
              </span>
              Review AI suggestions
            </button>
            <MenuPrimaryButton href="/menu/items/new">+ New item</MenuPrimaryButton>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <MenuSearch placeholder="Search items" className="min-w-[240px] max-w-lg flex-1" />
        <div className="relative">
          <select className="cursor-pointer appearance-none rounded-full bg-[#f6f6f6] py-2.5 pl-4 pr-10 text-sm font-semibold text-black outline-none">
            <option>All</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
        </div>
      </div>

      <MenuTable className="min-w-[960px]">
        <thead>
          <tr className="bg-[#fafafa]">
            <MenuTh>Photo</MenuTh>
            <MenuTh>Name</MenuTh>
            <MenuTh>Price</MenuTh>
            <MenuTh>Menus</MenuTh>
            <MenuTh>Categories</MenuTh>
            <MenuTh>Used In</MenuTh>
            <MenuTh>Contains</MenuTh>
            <MenuTh>Last updated</MenuTh>
          </tr>
        </thead>
        <tbody>
          {itemsList.map((item) => (
            <tr key={item.id} className="transition-colors hover:bg-[#fafafa]">
              <MenuTd>
                {item.hasPhoto ? (
                  <div className="size-12 rounded-lg bg-gradient-to-br from-amber-100 to-orange-200 shadow-sm" />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-lg bg-[#f6f6f6] text-neutral-400">
                    <ImageIcon className="size-4" />
                  </div>
                )}
              </MenuTd>
              <MenuTd>
                <MenuGreenLink href={`/menu/items/${item.id}`}>{item.name}</MenuGreenLink>
              </MenuTd>
              <MenuTd>{item.price}</MenuTd>
              <MenuTd>{item.menus}</MenuTd>
              <MenuTd>{item.categories}</MenuTd>
              <MenuTd className="text-neutral-500">{item.usedIn}</MenuTd>
              <MenuTd className="text-neutral-500">{item.contains}</MenuTd>
              <MenuTd className="text-neutral-500">{item.updated}</MenuTd>
            </tr>
          ))}
        </tbody>
      </MenuTable>
    </div>
  );
}
