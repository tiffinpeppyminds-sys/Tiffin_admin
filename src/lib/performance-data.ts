export const salesKpis = [
  {
    id: "sales",
    label: "Sales",
    value: "A$592",
    trend: 25,
    trendUp: true,
    note: "Total value of items sold",
  },
  {
    id: "booked",
    label: "Booked orders",
    value: "16",
    trend: 60,
    trendUp: true,
    note: "Orders that generated sales",
  },
  {
    id: "ticket",
    label: "Average ticket size",
    value: "A$36.98",
    trend: 22,
    trendUp: false,
    note: "Average value of items sold per order",
  },
] as const;

export const salesChartData = {
  sales: [
    { day: "1 Jun", current: 75, previous: 50 },
    { day: "2 Jun", current: 0, previous: 40 },
    { day: "3 Jun", current: 55, previous: 85 },
    { day: "4 Jun", current: 95, previous: 105 },
    { day: "5 Jun", current: 140, previous: 155 },
    { day: "6 Jun", current: 175, previous: 290 },
    { day: "7 Jun", current: 220, previous: 150 },
  ],
  booked: [
    { day: "1 Jun", current: 2, previous: 1 },
    { day: "2 Jun", current: 0, previous: 1 },
    { day: "3 Jun", current: 2, previous: 3 },
    { day: "4 Jun", current: 3, previous: 4 },
    { day: "5 Jun", current: 4, previous: 5 },
    { day: "6 Jun", current: 3, previous: 8 },
    { day: "7 Jun", current: 2, previous: 4 },
  ],
  ticket: [
    { day: "1 Jun", current: 38, previous: 50 },
    { day: "2 Jun", current: 0, previous: 40 },
    { day: "3 Jun", current: 28, previous: 42 },
    { day: "4 Jun", current: 32, previous: 35 },
    { day: "5 Jun", current: 35, previous: 38 },
    { day: "6 Jun", current: 42, previous: 48 },
    { day: "7 Jun", current: 37, previous: 45 },
  ],
};

export const salesRankingItems = [
  { name: "Missi Roti", price: "A$3.90", sold: 5, soldChange: 150, sales: "A$19.50", salesChange: 150, popular: true },
  { name: "Butter Chicken", price: "A$22.00", sold: 4, soldChange: 100, sales: "A$88.00", salesChange: 100, popular: false },
  { name: "Kadai Paneer (V)", price: "A$19.90", sold: 3, soldChange: 50, sales: "A$59.70", salesChange: 50, popular: false },
  { name: "Dal Makhani (V)", price: "A$19.90", sold: 3, soldChange: 0, sales: "A$59.70", salesChange: 0, popular: false },
  { name: "Chocolate Sundae", price: "A$12.50", sold: 2, soldChange: -50, sales: "A$25.00", salesChange: -50, popular: false },
  { name: "Garlic Naan", price: "A$4.90", sold: 2, soldChange: null, sales: "A$9.80", salesChange: null, popular: false },
  { name: "Mango Lassi", price: "A$10.00", sold: 1, soldChange: null, sales: "A$10.00", salesChange: null, popular: false },
];

export const funnelStages = [
  { label: "Viewed shop", value: 398, change: -74 },
  { label: "Viewed menu", value: 35, change: -75 },
  { label: "Added to basket", value: 9, change: -72 },
  { label: "Placed an order", value: 4, change: -73 },
];

export const successOverview = [
  { label: "Poor", count: 1, border: "border-[#e11900]", bg: "bg-[#fff2f2]" },
  { label: "Fair", count: 0, border: "border-[#ffc043]", bg: "bg-[#fffaf0]" },
  { label: "Good", count: 1, border: "border-[#06c167]", bg: "bg-[#f0fff6]" },
  { label: "Great", count: 0, border: "border-[#0e8345]", bg: "bg-[#edfdf4]" },
  { label: "Excellent", count: 0, border: "border-[#276ef1]", bg: "bg-[#f0f6ff]" },
];

export const successShops = [
  {
    name: "Scoop Shoppe",
    status: "Poor" as const,
    operational: "85.2",
    menuMarkup: "—",
    menuDetails: "82%",
    ratings: "4.2",
    packaging: "—",
    sales: "A$1,058.12",
    highlights: { operational: true, ratings: false },
  },
  {
    name: "Maikhana Adelaide",
    status: "Good" as const,
    operational: "97.8",
    menuMarkup: "—",
    menuDetails: "96%",
    ratings: "2.3",
    packaging: "—",
    sales: "A$6,939.67",
    highlights: { operational: true, ratings: true },
  },
];

export const operationalMetrics = [
  { metric: "Unfulfilled orders", current: "16.67%", goal: "< 5.00%", impact: "High", failing: true },
  { metric: "Orders with avoidable courier wait time", current: "6.06%", goal: "< 50.00%", impact: "Low", failing: true },
  { metric: "Inaccurate orders", current: "17.64%", goal: "< 4.00%", impact: "Medium", failing: true },
  { metric: "Food taste and quality", current: "2.94%", goal: "< 1.50%", impact: "Low", failing: true },
];

export const recommendations = [
  {
    category: "Operational excellence",
    title: "Review inaccurate orders",
    body: "Your inaccurate order rate is 17.64%, above the goal of 4.00%. Review recent orders to identify patterns.",
    cta: "Review",
    href: "/performance/operations",
  },
  {
    category: "Operational excellence",
    title: "Reduce unfulfilled orders",
    body: "16.67% of orders were unfulfilled. Stay online and confirm orders promptly to improve your score.",
    cta: "Review",
    href: "/performance/operations",
  },
  {
    category: "Menu",
    title: "Improve menu details",
    body: "Complete item descriptions and photos to help customers make confident choices.",
    cta: "Review",
    href: "/menu",
  },
];

export const benefitRows = [
  { label: "Core platform tools(3)", locked: [1, 2, 3, 4] },
  { label: "Visibility boosters(3)", locked: [1, 2, 3, 4] },
  { label: "Marketplace benefits(5)", locked: [1, 2, 3, 4] },
];

export const faqItems = [
  "What is the success score?",
  "How is the success score calculated?",
  "How can I achieve a higher success score?",
  "How often is my success score updated?",
];

export const trendData = [
  { date: "01/06", current: 0, previous: 1 },
  { date: "02/06", current: 0, previous: 0.5 },
  { date: "03/06", current: 0, previous: 1 },
  { date: "04/06", current: 0, previous: 0.2 },
  { date: "05/06", current: 0, previous: 0.8 },
  { date: "06/06", current: 0, previous: 0.4 },
];

export const onlineRateData = [
  { date: "01/08", rate: 55 },
  { date: "02/08", rate: 58 },
  { date: "03/08", rate: 62 },
  { date: "04/08", rate: 60 },
  { date: "05/08", rate: 64 },
  { date: "06/08", rate: 64 },
];

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));

export function salesHeatValue(day: number, hour: number) {
  const peak = (day === 5 || day === 6) && hour >= 18 && hour <= 22;
  const medium = hour >= 11 && hour <= 14;
  if (peak) return 4;
  if (medium) return 2;
  if (hour >= 8 && hour <= 20) return 1;
  return 0;
}

export function issuesHeatValue(day: number, hour: number) {
  if (hour >= 19 && hour <= 21) return 1;
  return 0;
}
