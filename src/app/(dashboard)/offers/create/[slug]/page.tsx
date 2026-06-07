"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Banknote,
  Calendar,
  Plus,
  Settings,
  Soup,
  Store,
  Target,
} from "lucide-react";
import { OfferPreviewPanel } from "@/components/offers/offer-preview-panel";
import {
  FormAccordion,
  GraySelect,
  PillToggle,
  SegmentedToggle,
} from "@/components/shared/form-accordion";
import {
  SplitFormBody,
  SplitFormFooter,
  SplitFormShell,
} from "@/components/shared/split-form-shell";
import {
  audienceOptions,
  durationPresets,
  getCampaignBySlug,
  shopOptions,
  type DurationPresets,
} from "@/lib/offers-data";
import { cn } from "@/lib/utils";

type SectionId = "shops" | "items" | "audience" | "duration" | "weeklySpend" | "advanced";

function UberOneBadge() {
  return (
    <span className="inline-flex items-center rounded bg-[#ffc043] px-1.5 py-0.5 text-[10px] font-bold text-black">
      Uber One
    </span>
  );
}

export default function CreateOfferPage() {
  const router = useRouter();
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "percent-off-items";
  const campaign = getCampaignBySlug(slug);

  const [openSection, setOpenSection] = useState<SectionId | null>(null);
  const [shop, setShop] = useState("Maikhana Adelaide");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [itemMode, setItemMode] = useState<"specific" | "category">("specific");
  const [dynamicOffers, setDynamicOffers] = useState(false);
  const [audience, setAudience] = useState("all");
  const [durationPreset, setDurationPreset] = useState<DurationPresets>("1 year");
  const [weeklyLimit, setWeeklyLimit] = useState<"none" | "set">("none");
  const [externalId, setExternalId] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const shopLabel = `${shop} (1/2)`;
  const itemsLabel = selectedItems.length > 0 ? `${selectedItems.length} items selected` : "No items selected";
  const itemsError = selectedItems.length === 0 && itemMode === "specific";
  const audienceLabel = audienceOptions.find((a) => a.id === audience)?.title ?? "All customers";
  const durationLabel =
    durationPreset === "1 year"
      ? "08/06/2026 - 07/06/2027"
      : durationPreset === "6 months"
        ? "08/06/2026 - 08/12/2026"
        : "Custom dates";
  const spendLabel = weeklyLimit === "none" ? "No budget set" : "Weekly limit set";

  const canCreate = acceptedTerms && (selectedItems.length > 0 || itemMode === "category");

  const toggleSection = (id: SectionId) => {
    setOpenSection((current) => (current === id ? null : id));
  };

  const addMockItems = () => {
    setSelectedItems(["Butter Chicken", "Tawa Fish Fry"]);
  };

  const salesBoost = useMemo(() => campaign.salesBoost ?? "31%", [campaign.salesBoost]);

  return (
    <SplitFormShell
      form={
        <>
          <SplitFormBody>
            <button
              type="button"
              onClick={() => router.push("/offers")}
              className="mb-8 text-black hover:text-neutral-600"
              aria-label="Back"
            >
              <ArrowLeft className="size-5" />
            </button>

            <h1 className="text-[34px] font-bold leading-tight tracking-[-0.02em] text-black">
              {campaign.createTitle}
            </h1>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-neutral-600">
              {campaign.createSubtitle}
            </p>

            <div className="mt-10">
              <FormAccordion
                icon={Store}
                label="Shops"
                value={shopLabel}
                expandedHint={openSection === "shops" ? "Select from 2 available locations" : undefined}
                isOpen={openSection === "shops"}
                onToggle={() => toggleSection("shops")}
              >
                <GraySelect
                  value={shop}
                  onChange={setShop}
                  options={shopOptions.map((opt) => ({ label: `${opt} (1/2)`, value: opt }))}
                />
              </FormAccordion>

              <FormAccordion
                icon={Soup}
                label="Items"
                value={itemsLabel}
                valueClassName={itemsError ? "text-[#e11900]" : undefined}
                showValueWhenOpen
                isOpen={openSection === "items"}
                onToggle={() => toggleSection("items")}
              >
                <div className="grid grid-cols-2 gap-3">
                  {(["specific", "category"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setItemMode(mode)}
                      className={cn(
                        "flex items-center justify-between rounded-xl p-4 text-left",
                        itemMode === mode
                          ? "border-2 border-black"
                          : "border border-neutral-200 hover:border-neutral-300",
                      )}
                    >
                      <span className="text-[15px] font-semibold text-black">
                        {mode === "specific" ? "Specific items" : "Entire category"}
                      </span>
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                          itemMode === mode ? "border-black bg-black" : "border-neutral-300 bg-white",
                        )}
                      >
                        {itemMode === mode ? <span className="size-2 rounded-full bg-white" /> : null}
                      </span>
                    </button>
                  ))}
                </div>
                {itemMode === "specific" ? (
                  <>
                    <button
                      type="button"
                      onClick={addMockItems}
                      className="mt-4 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                    >
                      Add items
                    </button>
                    {selectedItems.length > 0 ? (
                      <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                        {selectedItems.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                ) : null}
                <label className="mt-5 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={dynamicOffers}
                    onChange={(e) => setDynamicOffers(e.target.checked)}
                    className="mt-0.5 size-4 rounded border-neutral-400 accent-black"
                  />
                  <div>
                    <span className="text-sm font-medium text-black">
                      Optimise your offer with dynamic item offers{" "}
                      <span className="rounded bg-[#06c167] px-1.5 py-0.5 text-[10px] font-bold text-white">
                        NEW
                      </span>
                    </span>
                    <p className="mt-1 text-sm text-neutral-500">
                      Up to 47% higher redemption{" "}
                      <button type="button" className="underline hover:text-black">
                        See details
                      </button>
                    </p>
                  </div>
                </label>
              </FormAccordion>

              <FormAccordion
                icon={Target}
                label="Audience"
                value={audienceLabel}
                isOpen={openSection === "audience"}
                onToggle={() => toggleSection("audience")}
              >
                <p className="mb-4 text-sm text-neutral-600">Select which customers will see your offer.</p>
                <div className="space-y-3">
                  {audienceOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAudience(opt.id)}
                      className={cn(
                        "w-full rounded-xl p-4 text-left transition-colors",
                        audience === opt.id ? "border-2 border-black" : "border border-neutral-200",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-[15px] font-semibold text-black">{opt.title}</p>
                            {"isUberOne" in opt && opt.isUberOne ? <UberOneBadge /> : null}
                          </div>
                          <p className="mt-1 text-sm text-neutral-600">{opt.description}</p>
                          {"badge" in opt && opt.badge ? (
                            <p className="mt-1.5 text-sm font-medium text-[#06c167]">{opt.badge}</p>
                          ) : null}
                          {"isUberOne" in opt && opt.isUberOne ? (
                            <button type="button" className="mt-1 text-sm text-[#06c167] underline">
                              Learn more
                            </button>
                          ) : null}
                        </div>
                        <span
                          className={cn(
                            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                            audience === opt.id ? "border-black bg-black" : "border-neutral-300 bg-white",
                          )}
                        >
                          {audience === opt.id ? <span className="size-2 rounded-full bg-white" /> : null}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </FormAccordion>

              <FormAccordion
                icon={Calendar}
                label="Duration"
                value={durationLabel}
                expandedHint={openSection === "duration" ? "Select the dates your offer will run for." : undefined}
                isOpen={openSection === "duration"}
                onToggle={() => toggleSection("duration")}
              >
                <PillToggle
                  options={[...durationPresets]}
                  value={durationPreset}
                  onChange={setDurationPreset}
                />
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-black hover:text-neutral-600"
                >
                  <Plus className="size-4" />
                  Specify time of day
                </button>
              </FormAccordion>

              <FormAccordion
                icon={Banknote}
                label="Weekly spend"
                value={spendLabel}
                isOpen={openSection === "weeklySpend"}
                onToggle={() => toggleSection("weeklySpend")}
              >
                <p className="mb-4 text-sm text-neutral-600">
                  You only pay when customers order and can set an optional maximum spend.
                </p>
                <SegmentedToggle
                  options={["none", "set"]}
                  value={weeklyLimit}
                  onChange={setWeeklyLimit}
                  labels={{ none: "No limit", set: "Set weekly limit" }}
                />
              </FormAccordion>

              <FormAccordion
                icon={Settings}
                label="Advanced settings"
                isOpen={openSection === "advanced"}
                onToggle={() => toggleSection("advanced")}
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-black">External promotion ID</p>
                  <span className="inline-flex size-[18px] items-center justify-center rounded-full border border-neutral-400 text-[10px] font-bold text-neutral-400">
                    i
                  </span>
                </div>
                <input
                  type="text"
                  value={externalId}
                  onChange={(e) => setExternalId(e.target.value)}
                  className="mt-3 w-full rounded-lg bg-[#f6f6f6] px-4 py-3.5 text-[15px] text-black outline-none focus:ring-1 focus:ring-black"
                />
                <p className="mt-2 text-sm text-neutral-500">
                  Enter your optional external promotion ID. Please double-check as this cannot be changed later.
                </p>
              </FormAccordion>
            </div>
          </SplitFormBody>

          <SplitFormFooter>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="size-4 rounded border-neutral-400 accent-black"
              />
              <span className="text-sm text-black">
                I accept the{" "}
                <Link href="/settings" className="underline">
                  Terms &amp; Conditions
                </Link>
              </span>
            </label>
            <button
              type="button"
              disabled={!canCreate}
              onClick={() => router.push("/offers")}
              className={cn(
                "mt-5 h-12 w-full rounded-lg text-[15px] font-semibold transition-colors",
                canCreate
                  ? "bg-black text-white hover:bg-neutral-800"
                  : "cursor-not-allowed bg-[#eeeeee] text-neutral-400",
              )}
            >
              Create offer
            </button>
          </SplitFormFooter>
        </>
      }
      preview={<OfferPreviewPanel shopName={shop} salesBoost={salesBoost} />}
    />
  );
}
