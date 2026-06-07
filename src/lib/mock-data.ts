import { Metric, ScreenFlowStage, SideNavItem } from "@/types";

export const navItems: SideNavItem[] = [
  { label: "Home", href: "/dashboard", description: "Live sales summary and store activity" },
  { label: "Orders", href: "/orders", description: "Review active, scheduled and history orders in real time" },
  { label: "Menu", href: "/menu", description: "Items, pricing, photos and availability" },
  { label: "Performance", href: "/performance/sales", description: "Sales, operations, success and benchmarking" },
  { label: "Marketing", href: "/marketing", description: "Offers, ad campaigns and promotions" },
  { label: "Customers", href: "/customers", description: "Customer insights, trends and retention" },
  { label: "Reviews", href: "/feedback", description: "Customer and menu item reviews" },
  { label: "Payments", href: "/payments", description: "Payouts, balance and earnings" },
  { label: "Shops", href: "/providers", description: "All shops, groups, webshop and devices" },
  { label: "Order issues", href: "/complaints", description: "Disputes, chargebacks and resolutions" },
  { label: "Users", href: "/admins", description: "Team access and permissions" },
  { label: "Settings", href: "/settings", description: "Store configuration and alerts" },
];

export const topMetrics: Metric[] = [
  { label: "Sales", value: "$3,248", trend: "+12.4% vs last week" },
  { label: "Orders", value: "186", trend: "+8.4% vs last week" },
  { label: "Avg. ticket size", value: "$17.46", trend: "+3.1% vs last week" },
  { label: "Storefront views", value: "4,920", trend: "+6.0% vs last week" },
];

export const screenFlow: ScreenFlowStage[] = [
  {
    stage: "0",
    title: "App Launch",
    points: ["Splash with logo and tagline", "Auto transition to home explore experience"],
  },
  {
    stage: "1",
    title: "Public Discovery (No Login)",
    points: [
      "Location, search and nearby providers",
      "Public provider profile with menu, reviews and promotions",
      "Order attempts trigger role selection login popup",
    ],
  },
  {
    stage: "2",
    title: "Authentication Common Flow",
    points: [
      "Role entry point: customer or food business",
      "Mobile OTP login + backup email verification",
      "Basic details captured before role specific onboarding",
    ],
  },
  {
    stage: "3",
    title: "Customer Journey",
    points: [
      "Home with tabs: home, orders, favourites, profile",
      "Item selection, cart, coupons, pickup/delivery slot",
      "Order confirmation, live status, post-order ratings",
    ],
  },
  {
    stage: "4",
    title: "Food Business Journey",
    points: [
      "One-time registration and KYC verification",
      "Dashboard, menu, orders, reviews and profile tabs",
      "Order lifecycle controls: accept to complete",
    ],
  },
  {
    stage: "5",
    title: "Notifications",
    points: [
      "Business: new order alerts",
      "Customer: order acceptance and readiness updates",
      "Review reminder and provider verification updates",
    ],
  },
  {
    stage: "6",
    title: "Web Admin Responsibilities",
    points: [
      "Approve businesses and moderate user ecosystem",
      "Feature providers and manage complaints",
      "Run platform-wide operational and business reports",
    ],
  },
];
