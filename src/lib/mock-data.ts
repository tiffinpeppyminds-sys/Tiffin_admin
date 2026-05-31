import { Metric, ScreenFlowStage, SideNavItem } from "@/types";

export const navItems: SideNavItem[] = [
  { label: "Overview", href: "/dashboard", description: "Live business KPIs and activity" },
  { label: "Admins", href: "/admins", description: "Super Admin controls and admin access" },
  { label: "Providers", href: "/providers", description: "Approve, verify and feature businesses" },
  { label: "Customers", href: "/customers", description: "Manage users and account suspensions" },
  { label: "Orders", href: "/orders", description: "Operational health across order lifecycle" },
  { label: "Complaints", href: "/complaints", description: "Resolve disputes and quality issues" },
  { label: "Reports", href: "/reports", description: "Growth, revenue and retention reporting" },
  { label: "Notifications", href: "/notifications", description: "Background communication orchestration" },
  { label: "App Feature Map", href: "/app-flows", description: "Public, customer and business screen coverage" },
];

export const topMetrics: Metric[] = [
  { label: "Total Active Providers", value: "248", trend: "+11% vs last week" },
  { label: "Orders Today", value: "1,964", trend: "+8.4% conversion lift" },
  { label: "Open Complaints", value: "19", trend: "-23% from previous week" },
  { label: "Gross Revenue", value: "$42,860", trend: "+14.7% week on week" },
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
