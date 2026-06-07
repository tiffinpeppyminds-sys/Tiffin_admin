"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Moon, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeliveryInstructionsDrawer } from "@/components/shops/delivery-instructions-drawer";
import { defaultDeliveryInstruction, getShop, shopHours } from "@/lib/shops-data";
import { cn } from "@/lib/utils";

const tabs = ["Shop hours", "Pick-up instructions", "Tiffin Finder app"] as const;

export default function ShopInfoPage({ params }: { params: Promise<{ shopId: string }> }) {
  const { shopId } = use(params);
  const shop = getShop(shopId);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Shop hours");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pickupSame, setPickupSame] = useState(false);
  const [scheduledPickupSame, setScheduledPickupSame] = useState(false);

  if (!shop) notFound();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Shop info</h1>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-neutral-600">
            <Moon className="size-4" />
            Closed · {shop.opensAt}
          </p>
        </div>
        <Link href="/providers/add">
          <Button variant="secondary" size="sm">
            <Plus className="mr-1.5 size-4" />
            Add
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-xl bg-[#e8efff] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-black">Add scheduled instructions</p>
          <p className="text-xs text-neutral-600">
            You can now add scheduled instructions for delivery people based on the time of the day.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setDrawerOpen(true)}>
          Add
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200">
        <div className="grid lg:grid-cols-[1.2fr_1fr]">
          <div className="relative min-h-[280px] bg-[#e8f4ea]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#d4e8d4_0%,#b8d4b8_50%,#9ec49e_100%)] opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-neutral-600">
                <MapPin className="mx-auto size-8 text-black" />
                <p className="mt-2 text-xs">Map preview</p>
                <p className="text-[10px]">Enfield Plaza · Kensington Cr</p>
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex size-10 items-center justify-center rounded-full bg-black text-white shadow-lg">
                <MapPin className="size-5" />
              </div>
            </div>
            <button
              type="button"
              className="absolute right-3 top-3 rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white"
            >
              Adjust pin
            </button>
            <p className="absolute bottom-2 left-2 text-[10px] text-neutral-500">© Mapbox</p>
          </div>

          <div className="border-t border-neutral-200 p-5 lg:border-l lg:border-t-0">
            <h2 className="text-lg font-bold text-black">{shop.name}</h2>
            <p className="mt-1 text-sm text-neutral-600">{shop.address}</p>
            <p className="mt-3 text-sm text-neutral-600">Phone {shop.phone}</p>
            <button type="button" className="mt-4 text-sm font-medium text-black underline underline-offset-2">
              Edit
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-neutral-200">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "border-b-2 pb-3 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-neutral-500 hover:text-black",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Shop hours" ? (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-black">Shop hours</h3>
          <div className="overflow-hidden rounded-xl border border-neutral-200">
            {shopHours.map((row, idx) => (
              <div
                key={row.day}
                className={cn("flex items-center justify-between px-4 py-3", idx > 0 && "border-t border-neutral-100")}
              >
                <span className="text-sm font-medium text-black">{row.day}</span>
                <span className="text-sm text-neutral-600">{row.slots.join(", ")}</span>
              </div>
            ))}
          </div>
          <Link href="/settings">
            <Button variant="secondary" size="sm">
              Edit shop hours
            </Button>
          </Link>
        </div>
      ) : null}

      {activeTab === "Pick-up instructions" ? (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-black">Pick-up instructions</h3>
          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="text-sm text-black">{defaultDeliveryInstruction}</p>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-black"
            >
              <Pencil className="size-4" />
              Edit instructions
            </button>
          </div>
        </div>
      ) : null}

      {activeTab === "Tiffin Finder app" ? (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-black">Tiffin Finder app</h3>
          <p className="text-sm text-neutral-600">
            Manage how your shop appears in the Tiffin Finder customer app. Update your storefront photo, description,
            and delivery settings.
          </p>
          <Link href="/menu">
            <Button variant="secondary" size="sm">
              Manage storefront
            </Button>
          </Link>
        </div>
      ) : null}

      <DeliveryInstructionsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        instruction={defaultDeliveryInstruction}
        pickupSame={pickupSame}
        scheduledPickupSame={scheduledPickupSame}
        onTogglePickup={() => setPickupSame((v) => !v)}
        onToggleScheduledPickup={() => setScheduledPickupSame((v) => !v)}
      />
    </div>
  );
}
