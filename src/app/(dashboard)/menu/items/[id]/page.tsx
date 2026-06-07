"use client";

import { ItemForm } from "@/components/menu/item-form";

export default function EditItemPage() {
  return <ItemForm mode="edit" backHref="/menu/items" />;
}
