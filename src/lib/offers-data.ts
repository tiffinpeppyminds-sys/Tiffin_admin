import {
  Award,
  Clock,
  CupSoda,
  Gift,
  PackageCheck,
  Percent,
  ShoppingBag,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type CampaignType = {
  slug: string;
  title: string;
  example?: string;
  badge?: string;
  icon: LucideIcon;
  createTitle: string;
  createSubtitle: string;
  salesBoost?: string;
};

export const campaignTypes: CampaignType[] = [
  {
    slug: "percent-off-items",
    title: "Per cent off items",
    example: "20% off select items",
    badge: "Customer favourite",
    icon: CupSoda,
    createTitle: "Per cent off items",
    createSubtitle: "Set a percentage off selected items or a menu category",
    salesBoost: "31%",
  },
  {
    slug: "bogo",
    title: "Buy 1, get 1 free",
    example: "Buy 1, get 1 free",
    badge: "Highest sales",
    icon: ShoppingBag,
    createTitle: "Buy 1, get 1 free",
    createSubtitle: "Offer a free item when customers buy a qualifying item",
    salesBoost: "34%",
  },
  {
    slug: "percent-off-order",
    title: "Per cent off order",
    example: "20% off A$20+",
    icon: Percent,
    createTitle: "Per cent off order",
    createSubtitle: "Set a percentage off the entire order when customers meet a minimum",
    salesBoost: "28%",
  },
  {
    slug: "amount-off-order",
    title: "Amount off order",
    example: "A$5 off A$20+",
    icon: Wallet,
    createTitle: "Amount off order",
    createSubtitle: "Set a fixed amount off when customers meet a minimum spend",
    salesBoost: "22%",
  },
  {
    slug: "free-item-purchase",
    title: "Free item with purchase",
    example: "Free item (spend A$20)",
    icon: Award,
    createTitle: "Free item with purchase",
    createSubtitle: "Give customers a free item when they spend a minimum amount",
    salesBoost: "25%",
  },
  {
    slug: "buy-one-free-item",
    title: "Buy one, get a free item",
    example: "Free fries with a burger",
    icon: Gift,
    createTitle: "Buy one, get a free item",
    createSubtitle: "Offer a free item when customers buy a specific item",
    salesBoost: "27%",
  },
  {
    slug: "free-delivery",
    title: "Free delivery",
    icon: PackageCheck,
    createTitle: "Free delivery",
    createSubtitle: "Offer free delivery to customers in your delivery radius",
    salesBoost: "19%",
  },
  {
    slug: "happy-hour",
    title: "Happy hour",
    example: "20% off A$20+ (14:00–17:00)",
    icon: Clock,
    createTitle: "Happy hour",
    createSubtitle: "Run a time-limited offer during specific hours",
    salesBoost: "24%",
  },
];

export const featuredCampaigns = [
  {
    slug: "percent-off-items",
    title: "Create a percentage off items campaign",
    stat: "Sales increased by an average of 31% for shops who ran this offer",
  },
  {
    slug: "bogo",
    title: "Create a buy 1, get 1 free campaign",
    stat: "Sales increased by an average of 34% for shops who ran this offer",
  },
];

export const popularItems = [
  { name: "Butter Chicken", orders: 11, color: "from-amber-200 to-orange-300" },
  { name: "Tawa Fish Fry", orders: 6, color: "from-sky-200 to-blue-300" },
  { name: "Chicken 65", orders: 5, color: "from-rose-200 to-red-300" },
];

export const shopOptions = ["Maikhana Adelaide", "Scoop Shoppe"];

export const audienceOptions = [
  {
    id: "all",
    title: "All customers",
    description: "Everyone within your shops' delivery radius",
    badge: "Recommended",
  },
  {
    id: "new",
    title: "New customers only",
    description: "Haven't ordered from your shop before.",
  },
  {
    id: "returning",
    title: "Returning customers",
    description: "Ordered from your shop within the last 6 months.",
  },
  {
    id: "lapsed",
    title: "Lapsed customers",
    description: "Haven't ordered from your shop in 45+ days.",
  },
  {
    id: "uber-one",
    title: "Uber One members only",
    description: "Members with an active subscription.",
    isUberOne: true,
  },
] as const;

export const durationPresets = ["1 year", "6 months", "Custom"] as const;

export type DurationPresets = (typeof durationPresets)[number];

export function getCampaignBySlug(slug: string) {
  return campaignTypes.find((c) => c.slug === slug) ?? campaignTypes[0];
}
