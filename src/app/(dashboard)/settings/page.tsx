"use client";

import { useState } from "react";
import { ShopFilter } from "@/components/settings/shop-filter";
import { ToggleRow } from "@/components/settings/toggle-row";
import { generalToggles, offeringsToggles, settingsShops } from "@/lib/settings-data";
import { cn } from "@/lib/utils";

const tabs = ["General", "Offerings"] as const;

const allShopsToggles = [
  generalToggles.find((t) => t.id === "optimise-menu")!,
  offeringsToggles.find((t) => t.id === "busy-mode")!,
  offeringsToggles.find((t) => t.id === "ai-descriptions")!,
];

const offeringsOnlyToggles = offeringsToggles.filter(
  (t) => t.id === "busy-mode" || t.id === "ai-descriptions",
);
const allergyToggles = offeringsToggles.filter((t) => t.id === "allergy-requests" || t.id === "share-phone");

export default function GeneralSettingsPage() {
  const [shop, setShop] = useState<string>(settingsShops[0]);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("General");
  const [toggles, setToggles] = useState({
    ...Object.fromEntries(generalToggles.map((t) => [t.id, t.enabled])),
    ...Object.fromEntries(offeringsToggles.map((t) => [t.id, t.enabled])),
  });

  const isAllShops = shop === settingsShops[0];
  const flip = (id: string) => setToggles((prev) => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));

  return (
    <div className="space-y-5">
      {!isAllShops ? (
        <>
          <h1 className="page-title">General settings</h1>
          <ShopFilter value={shop} onChange={setShop} />
          <div className="border-b border-neutral-200">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn("tab-link", activeTab === tab && "tab-link-active")}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <ShopFilter value={shop} onChange={setShop} />
      )}

      {isAllShops ? (
        <div>
          {allShopsToggles.map((toggle) => (
            <ToggleRow
              key={toggle.id}
              label={toggle.label}
              description={toggle.description}
              enabled={toggles[toggle.id as keyof typeof toggles]}
              onToggle={() => flip(toggle.id)}
            />
          ))}
          <div className="border-b border-neutral-200 py-6">
            <p className="font-semibold text-black">Allergy requests</p>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
              Help your customers order safely by allowing them to share their food allergies.{" "}
              <button type="button" className="font-medium text-[#06c167] hover:underline">
                Learn more
              </button>
            </p>
          </div>
          {allergyToggles.map((toggle) => (
            <ToggleRow
              key={toggle.id}
              label={toggle.label}
              description={toggle.description}
              enabled={toggles[toggle.id as keyof typeof toggles]}
              onToggle={() => flip(toggle.id)}
            />
          ))}
          <p className="pt-2 text-xs leading-relaxed text-neutral-500">
            By enabling allergy requests, you acknowledge that you are responsible for ensuring food safety and
            communicating allergen information to customers. Tiffin Finder is not liable for allergic reactions.
          </p>
        </div>
      ) : activeTab === "General" ? (
        <div>
          <ToggleRow
            label="Contactless ordering"
            description="Customers can scan a QR code to view your menu and place orders from their phone. "
            badge="NEW"
            descriptionExtra={
              <button type="button" className="font-medium text-[#06c167] hover:underline">
                Learn more
              </button>
            }
            action={
              <button type="button" className="shrink-0 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800">
                Get your QR code
              </button>
            }
          />
          {generalToggles.map((toggle) => (
            <ToggleRow
              key={toggle.id}
              label={toggle.label}
              description={toggle.description}
              enabled={toggles[toggle.id as keyof typeof toggles]}
              onToggle={() => flip(toggle.id)}
            />
          ))}
        </div>
      ) : (
        <div>
          {offeringsOnlyToggles.map((toggle) => (
            <ToggleRow
              key={toggle.id}
              label={toggle.label}
              description={toggle.description}
              enabled={toggles[toggle.id as keyof typeof toggles]}
              onToggle={() => flip(toggle.id)}
            />
          ))}
          <div className="border-b border-neutral-200 py-6">
            <p className="font-semibold text-black">Allergy requests</p>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
              Help your customers order safely by allowing them to share their food allergies.{" "}
              <button type="button" className="font-medium text-[#06c167] hover:underline">
                Learn more
              </button>
            </p>
          </div>
          {allergyToggles.map((toggle) => (
            <ToggleRow
              key={toggle.id}
              label={toggle.label}
              description={toggle.description}
              enabled={toggles[toggle.id as keyof typeof toggles]}
              onToggle={() => flip(toggle.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
