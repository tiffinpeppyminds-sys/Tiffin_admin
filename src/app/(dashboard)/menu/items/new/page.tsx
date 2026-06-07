"use client";

import { ItemForm } from "@/components/menu/item-form";

export default function NewItemPage() {
  return <ItemForm mode="new" backHref="/menu/items" />;
}
