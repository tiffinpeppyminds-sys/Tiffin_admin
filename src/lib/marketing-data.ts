import { Megaphone } from "lucide-react";
import { campaignTypes } from "@/lib/offers-data";

export const marketingRecommendations = [
  {
    id: "ad",
    title: "Create an ad",
    stat: "52% of Indian shops in Adelaide run ads",
    href: "/ads/create",
    preview: "ad" as const,
  },
  {
    id: "percent-off-items",
    title: "Create a percentage off items campaign",
    stat: "Sales increased by an average of 31% for shops who ran this offer",
    href: "/offers/create/percent-off-items",
    preview: "offer" as const,
  },
  {
    id: "bogo",
    title: "Create a buy 1, get 1 free campaign",
    stat: "Sales increased by an average of 34% for shops who ran this offer",
    href: "/offers/create/bogo",
    preview: "offer" as const,
  },
];

export const adTool = {
  slug: "ad",
  title: "Ad campaign",
  subtitle: "Boost visibility in feed and search",
  icon: Megaphone,
  href: "/ads/create",
};

export const allMarketingTools = [
  adTool,
  ...campaignTypes.map((c) => ({
    slug: c.slug,
    title: c.title,
    example: c.example,
    badge: c.badge,
    icon: c.icon,
    href: `/offers/create/${c.slug}` as const,
  })),
];

export type OfferCampaign = {
  id: string;
  name: string;
  status: "Cancelled" | "Active" | "Scheduled" | "Ended";
  dates: string;
  shops: number;
  audience: string;
  sales: string;
  newCustomers: number;
  orders: number;
};

export const offerCampaigns: OfferCampaign[] = [
  {
    id: "buy-one-free-item",
    name: "Buy one, get a free item",
    status: "Cancelled",
    dates: "25 Jan 2026 - 25 Jan 2027",
    shops: 1,
    audience: "All customers",
    sales: "A$0",
    newCustomers: 0,
    orders: 0,
  },
  {
    id: "buy-one-free-item-2",
    name: "Buy one, get a free item",
    status: "Cancelled",
    dates: "25 Jan 2026 - 25 Jan 2027",
    shops: 1,
    audience: "All customers",
    sales: "A$0",
    newCustomers: 0,
    orders: 0,
  },
  {
    id: "buy-one-free-item-3",
    name: "Buy one, get a free item",
    status: "Cancelled",
    dates: "25 Jan 2026 - 25 Jan 2027",
    shops: 1,
    audience: "All customers",
    sales: "A$0",
    newCustomers: 0,
    orders: 0,
  },
  {
    id: "buy-one-free-item-4",
    name: "Buy one, get a free item",
    status: "Cancelled",
    dates: "25 Jan 2026 - 25 Jan 2027",
    shops: 1,
    audience: "All customers",
    sales: "A$0",
    newCustomers: 0,
    orders: 0,
  },
];

export const campaignDetail = {
  id: "buy-one-free-item",
  name: "Buy one, get a free item",
  status: "Cancelled",
  statusDates: "25 Jan 2026 – 25 Jan 2027",
  sales: "A$0.00",
  newCustomers: 0,
  orders: 0,
  offerRedemption: "A$0.00",
  campaignDuration: "133 days",
  avgRedemptionPerOrder: "A$0.00",
  avgOrderValue: "A$0.00",
  audience: "All customers",
  budget: "No redemption limit",
  scheduling: "Run during open hours",
  shop: "Maikhana Adelaide",
  duration: "25 Jan 2026 - 25 Jan 2027",
};

export function getCampaignDetail(id: string) {
  if (id.startsWith("buy-one-free-item")) return campaignDetail;
  return campaignDetail;
}
