"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Banknote,
  Calendar,
  CircleCheck,
  Clock,
  Pencil,
  Settings,
  Store,
  Target,
} from "lucide-react";
import { AdPreviewPanel } from "@/components/ads/ad-preview-panel";
import {
  FormAccordion,
  GraySelect,
  PillToggle,
  RadioOptionCard,
} from "@/components/shared/form-accordion";
import {
  SplitFormBody,
  SplitFormFooter,
  SplitFormShell,
} from "@/components/shared/split-form-shell";
import {
  budgetOptions,
  defaultCampaignName,
  defaultStartDate,
  durationOptions,
  formatCurrency,
  getEstimates,
  shopOptions,
  type DurationOption,
} from "@/lib/ads-data";

type SectionId = "shops" | "audience" | "budget" | "duration" | "campaignName" | "advanced";

export default function CreateAdPage() {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<SectionId | null>("shops");
  const [showMoreSettings, setShowMoreSettings] = useState(false);

  const [shop, setShop] = useState("Maikhana Adelaide");
  const [audience, setAudience] = useState<"all" | "new">("all");
  const [budgetId, setBudgetId] = useState("8");
  const [duration, setDuration] = useState<DurationOption>("Ongoing");
  const [startDate] = useState(defaultStartDate);
  const [campaignName, setCampaignName] = useState(defaultCampaignName);
  const [bidding, setBidding] = useState<"auto" | "custom">("auto");

  const selectedBudget = budgetOptions.find((b) => b.id === budgetId) ?? budgetOptions[2];
  const shopCount = shop.includes("All shops") ? 2 : 1;
  const dailyBudget = budgetId === "custom" ? 8 : selectedBudget.daily;
  const estimates = useMemo(
    () => getEstimates(dailyBudget, shopCount),
    [dailyBudget, shopCount],
  );

  const toggleSection = (id: SectionId) => {
    setOpenSection((current) => (current === id ? null : id));
  };

  const audienceLabel = audience === "all" ? "All customers" : "New customers";
  const durationLabel = `${startDate} - ${duration}`;
  const budgetLabel =
    budgetId === "custom" ? "Custom budget" : `${formatCurrency(selectedBudget.daily)} per day`;

  return (
    <SplitFormShell
      form={
        <>
          <SplitFormBody>
            <h1 className="text-[34px] font-bold leading-tight tracking-[-0.02em] text-black">
              Ad campaign
            </h1>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-neutral-600">
              Create an ad to grow your sales and get discovered by more customers.{" "}
              <button type="button" className="font-medium text-[#06c167] hover:underline">
                How do ads work?
              </button>
            </p>

            <div className="mt-10">
              <FormAccordion
                icon={Store}
                label="Shops"
                value={shop}
                isOpen={openSection === "shops"}
                onToggle={() => toggleSection("shops")}
              >
                <GraySelect
                  value={shop}
                  onChange={setShop}
                  options={shopOptions.map((opt) => ({ label: opt, value: opt }))}
                />
              </FormAccordion>

              <FormAccordion
                icon={Target}
                label="Audience"
                value={audienceLabel}
                isOpen={openSection === "audience"}
                onToggle={() => toggleSection("audience")}
              >
                <p className="mb-4 text-sm text-neutral-600">Select which customers will see your ad.</p>
                <div className="space-y-3">
                  <RadioOptionCard
                    title="All customers"
                    description="Everyone within your shops' delivery radius"
                    badge="Recommended to maximise sales"
                    selected={audience === "all"}
                    onSelect={() => setAudience("all")}
                  />
                  <RadioOptionCard
                    title="New customers"
                    description="Eaters in your delivery radius who've never ordered from you."
                    selected={audience === "new"}
                    onSelect={() => setAudience("new")}
                  />
                </div>
              </FormAccordion>

              <FormAccordion
                icon={Banknote}
                label="Average daily budget"
                value={budgetLabel}
                isOpen={openSection === "budget"}
                onToggle={() => toggleSection("budget")}
              >
                <p className="mb-4 text-sm text-neutral-600">
                  Spend may vary day to day but will even out over a week.
                </p>
                <div className="space-y-3">
                  {budgetOptions.map((opt) => (
                    <RadioOptionCard
                      key={opt.id}
                      title={`${formatCurrency(opt.daily)} per day`}
                      description={`Estimated ${formatCurrency(opt.weeklySales)}/week sales from ads`}
                      badge={opt.recommended ? "Recommended to maximise sales" : undefined}
                      selected={budgetId === opt.id}
                      onSelect={() => setBudgetId(opt.id)}
                    />
                  ))}
                  <RadioOptionCard
                    title="Custom budget"
                    selected={budgetId === "custom"}
                    onSelect={() => setBudgetId("custom")}
                  />
                </div>
              </FormAccordion>

              <FormAccordion
                icon={Calendar}
                label="Duration"
                value={durationLabel}
                isOpen={openSection === "duration"}
                onToggle={() => toggleSection("duration")}
              >
                <div className="space-y-6">
                  <div>
                    <p className="mb-2 text-sm font-semibold text-black">Start date</p>
                    <div className="rounded-lg bg-[#f6f6f6] px-4 py-3.5 text-[15px] font-medium text-black">
                      {startDate}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-semibold text-black">Campaign duration</p>
                    <PillToggle
                      options={[...durationOptions]}
                      value={duration}
                      onChange={setDuration}
                    />
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-black hover:bg-neutral-50"
                  >
                    <Clock className="size-4" />
                    Add time range
                  </button>
                </div>
              </FormAccordion>

              {showMoreSettings ? (
                <>
                  <FormAccordion
                    icon={Pencil}
                    label="Campaign name"
                    value={campaignName}
                    isOpen={openSection === "campaignName"}
                    onToggle={() => toggleSection("campaignName")}
                  >
                    <div className="relative">
                      <input
                        type="text"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        className="w-full rounded-lg border border-black px-4 py-3 pr-10 text-[15px] text-black outline-none"
                      />
                      {campaignName.trim() ? (
                        <CircleCheck className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#06c167]" />
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-neutral-500">Name your campaign to track it later.</p>
                  </FormAccordion>

                  <FormAccordion
                    icon={Settings}
                    label="Advanced options"
                    isOpen={openSection === "advanced"}
                    onToggle={() => toggleSection("advanced")}
                  >
                    <p className="text-sm font-semibold text-black">Bidding</p>
                    <p className="mt-1 text-sm text-neutral-600">
                      Set how much to pay when someone clicks your ad
                    </p>
                    <div className="mt-4 space-y-3">
                      <RadioOptionCard
                        title="Set automatically"
                        badge="Recommended to maximise sales"
                        selected={bidding === "auto"}
                        onSelect={() => setBidding("auto")}
                      />
                      <RadioOptionCard
                        title="Set custom bid"
                        selected={bidding === "custom"}
                        onSelect={() => setBidding("custom")}
                      />
                    </div>
                  </FormAccordion>
                </>
              ) : (
                <div className="border-b border-neutral-200 px-8 py-5">
                  <button
                    type="button"
                    onClick={() => setShowMoreSettings(true)}
                    className="rounded-full bg-[#f3f3f3] px-5 py-2.5 text-sm font-medium text-black hover:bg-neutral-200"
                  >
                    More settings
                  </button>
                </div>
              )}
            </div>
          </SplitFormBody>

          <SplitFormFooter>
            <p className="text-xs leading-relaxed text-neutral-500">
              Campaigns run until the end date or until you pause them. You&apos;ll only be charged when
              customers click on your ad. Charges are deducted from your payouts. Taxes may apply.
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              Review previously accepted{" "}
              <Link href="/settings" className="font-semibold text-black underline">
                Terms &amp; Conditions
              </Link>
            </p>
            <button
              type="button"
              onClick={() => router.push("/ads")}
              className="mt-5 h-12 w-full rounded-lg bg-black text-[15px] font-semibold text-white hover:bg-neutral-800"
            >
              Create ad
            </button>
          </SplitFormFooter>
        </>
      }
      preview={
        <AdPreviewPanel
          shopName={shop.includes("All shops") ? "Maikhana Adelaide" : shop}
          weeklySales={estimates.weeklySales}
          maxWeeklySpend={estimates.maxWeeklySpend}
          spendDetail={estimates.spendDetail}
        />
      }
    />
  );
}
