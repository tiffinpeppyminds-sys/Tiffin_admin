"use client";

import { ScheduleGrid } from "@/components/menu/schedule-grid";
import {
  MenuGreenLink,
  MenuPageHeader,
  MenuPrimaryButton,
  MenuSearch,
  MenuTable,
  MenuTd,
  MenuTh,
} from "@/components/menu/shared";
import { menuList } from "@/lib/menu-data";

export default function MenusPage() {
  return (
    <div className="space-y-6">
      <MenuPageHeader title="Menus" action={<MenuPrimaryButton href="/menu/menus/menu">+ New Menu</MenuPrimaryButton>} />

      <MenuSearch placeholder="Search menus" className="max-w-md" />

      <MenuTable>
        <thead>
          <tr className="bg-[#fafafa]">
            <MenuTh>Name</MenuTh>
            <MenuTh>Menu hours</MenuTh>
            <MenuTh>Categories</MenuTh>
            <MenuTh>Items</MenuTh>
          </tr>
        </thead>
        <tbody>
          {menuList.map((menu) => (
            <tr key={menu.id} className="transition-colors hover:bg-[#fafafa]">
              <MenuTd>
                <MenuGreenLink href={`/menu/menus/${menu.id}`}>{menu.name}</MenuGreenLink>
              </MenuTd>
              <MenuTd className="max-w-md">{menu.hours}</MenuTd>
              <MenuTd>{menu.categories}</MenuTd>
              <MenuTd>{menu.items}</MenuTd>
            </tr>
          ))}
        </tbody>
      </MenuTable>

      <ScheduleGrid />
    </div>
  );
}
