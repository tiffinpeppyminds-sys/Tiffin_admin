"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { HolidayHoursDrawer } from "@/components/settings/holiday-hours-drawer";
import { ShopFilter } from "@/components/settings/shop-filter";
import { settingsShops } from "@/lib/settings-data";

function PalmTreeIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <ellipse cx="48" cy="82" rx="32" ry="10" fill="#06c167" opacity="0.25" />
      <rect x="44" y="46" width="8" height="36" rx="2" fill="#8B6914" />
      <path d="M48 46 C24 36 12 22 8 10 C20 16 32 26 48 34 C64 26 76 16 88 10 C84 22 72 36 48 46Z" fill="#06c167" />
      <path d="M48 40 C34 30 26 18 24 6 C32 14 40 24 48 30 C56 24 64 14 72 6 C70 18 62 30 48 40Z" fill="#34d399" />
    </svg>
  );
}

export default function HolidayHoursPage() {
  const [shop, setShop] = useState<string>(settingsShops[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="page-title">Holiday hours</h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-600">
          Update your holiday hours so customers know when you&apos;re closed during the holidays. All times are
          displayed in your shop&apos;s local time zone.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <ShopFilter value={shop} onChange={setShop} />
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
        >
          <span className="flex size-5 items-center justify-center rounded-full border border-white/30">
            <Plus className="size-3.5" />
          </span>
          Add
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-32 text-center">
        <PalmTreeIcon />
        <p className="mt-6 text-sm text-neutral-500">You do not have any holiday hours set</p>
      </div>

      <HolidayHoursDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
