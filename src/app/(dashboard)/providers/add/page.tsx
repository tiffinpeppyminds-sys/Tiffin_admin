"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight, Copy, Plus } from "lucide-react";

const options = [
  {
    icon: Copy,
    title: "Copy shop",
    description: "We'll pre-fill info like your menu.",
    href: "/providers/add/copy",
  },
  {
    icon: Plus,
    title: "Start from scratch",
    description: null,
    href: "/providers/add/business",
  },
];

export default function AddShopPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <Link href="/providers" className="mb-8 inline-flex text-black hover:text-neutral-600">
        <ArrowLeft className="size-5" />
      </Link>

      <h1 className="page-title-xl">How would you like to add another shop?</h1>

      <div className="mt-8 space-y-3">
        {options.map(({ icon: Icon, title, description, href }) => (
          <Link
            key={title}
            href={href}
            className="flex items-center gap-4 rounded-xl border border-neutral-200 px-5 py-5 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
          >
            <Icon className="size-5 shrink-0 text-black" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-black">{title}</p>
              {description ? <p className="mt-0.5 text-sm text-neutral-500">{description}</p> : null}
            </div>
            <ChevronRight className="size-5 shrink-0 text-neutral-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}
