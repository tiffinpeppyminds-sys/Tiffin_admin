"use client";

import {
  MenuGreenLink,
  MenuPageHeader,
  MenuPrimaryButton,
  MenuSearch,
  MenuTable,
  MenuTd,
  MenuTh,
} from "@/components/menu/shared";
import { categoriesList } from "@/lib/menu-data";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <MenuPageHeader
        title="Categories"
        action={<MenuPrimaryButton href="/menu/categories/new">+ New category</MenuPrimaryButton>}
      />

      <MenuSearch placeholder="Search categories" className="max-w-sm" />

      <MenuTable>
        <thead>
          <tr className="bg-[#fafafa]">
            <MenuTh>Name</MenuTh>
            <MenuTh>Menus</MenuTh>
            <MenuTh>Items</MenuTh>
          </tr>
        </thead>
        <tbody>
          {categoriesList.map((cat) => (
            <tr key={cat.id} className="transition-colors hover:bg-[#fafafa]">
              <MenuTd>
                <MenuGreenLink href={`/menu/categories/${cat.id}`}>{cat.name}</MenuGreenLink>
              </MenuTd>
              <MenuTd>{cat.menus}</MenuTd>
              <MenuTd>{cat.items}</MenuTd>
            </tr>
          ))}
        </tbody>
      </MenuTable>
    </div>
  );
}
