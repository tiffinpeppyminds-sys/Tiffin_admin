export type ReportType = {
  id: string;
  label: string;
};

export type ReportCategory = {
  id: string;
  label: string;
  types: ReportType[];
};

export const reportCategories: ReportCategory[] = [
  {
    id: "payments",
    label: "Payments",
    types: [
      { id: "payment-details", label: "Payment details" },
      { id: "payment-details-item", label: "Payment details (item level)" },
      { id: "payout-summary", label: "Payout summary" },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    types: [
      { id: "order-accuracy", label: "Order accuracy" },
      { id: "top-inaccurate", label: "Top inaccurate items" },
      { id: "inaccurate-orders", label: "Inaccurate orders" },
      { id: "order-history", label: "Order history" },
      { id: "downtime", label: "Downtime" },
      { id: "pause-details", label: "Pause details" },
      { id: "shop-availability", label: "Shop availability report" },
    ],
  },
  {
    id: "reviews",
    label: "Reviews",
    types: [
      { id: "customer-reviews", label: "Customer and delivery reviews" },
      { id: "menu-reviews", label: "Menu item reviews" },
    ],
  },
];

export const deliveryOptions = ["Tiffin Finder Manager", "Email"];
