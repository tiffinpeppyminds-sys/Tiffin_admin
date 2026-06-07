export type BudgetOption = {
  id: string;
  daily: number;
  weeklySales: number;
  recommended?: boolean;
};

export const shopOptions = ["Maikhana Adelaide", "Scoop Shoppe", "All shops (2)"];

export const budgetOptions: BudgetOption[] = [
  { id: "4", daily: 4, weeklySales: 280 },
  { id: "6", daily: 6, weeklySales: 420 },
  { id: "8", daily: 8, weeklySales: 560, recommended: true },
  { id: "12", daily: 12, weeklySales: 840 },
];

export const durationOptions = ["Ongoing", "30 days", "45 days", "Custom end date"] as const;

export type DurationOption = (typeof durationOptions)[number];

export function formatCurrency(amount: number) {
  return `A$${amount.toFixed(2)}`;
}

export function getEstimates(dailyBudget: number, shopCount = 1) {
  const weeklySales = dailyBudget * 70;
  const maxWeeklySpend = dailyBudget * shopCount * 7;
  return {
    weeklySales,
    roas: "10x",
    roasDetail: "You'll get A$10 in sales for every A$1 you spend",
    maxWeeklySpend,
    spendDetail: `${shopCount} shops × ${formatCurrency(dailyBudget)} per shop × 7 days`,
  };
}

export const defaultCampaignName = "Ad Campaign 06/08/2026";
export const defaultStartDate = "06/08/2026";
