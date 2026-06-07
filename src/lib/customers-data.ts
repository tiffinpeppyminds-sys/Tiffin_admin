export type CustomerGroup = {
  id: "new" | "occasional" | "frequent";
  label: string;
  count: number;
  percent: number;
  change: number;
  color: string;
  description: string;
  sales: string;
  salesShare: string;
  avgOrder: string;
  avgRating: string;
  uberOne: string;
};

export const customerGroups: CustomerGroup[] = [
  {
    id: "new",
    label: "New",
    count: 9,
    percent: 64.3,
    change: 80,
    color: "#276ef1",
    description: "Customers who placed their first order in the last 7 days.",
    sales: "A$293",
    salesShare: "61.2% of total sales",
    avgOrder: "A$33 average order value",
    avgRating: "5.0 average rating",
    uberOne: "77.8% Uber One members",
  },
  {
    id: "occasional",
    label: "Occasional",
    count: 2,
    percent: 14.3,
    change: 100,
    color: "#0e9f8e",
    description: "Customers who ordered once or twice in the last 90 days.",
    sales: "A$44",
    salesShare: "9.2% of total sales",
    avgOrder: "A$22 average order value",
    avgRating: "No ratings available",
    uberOne: "100.0% Uber One members",
  },
  {
    id: "frequent",
    label: "Frequent",
    count: 3,
    percent: 21.4,
    change: 200,
    color: "#ffc043",
    description: "Customers who ordered 3 or more times in the last 90 days.",
    sales: "A$142",
    salesShare: "29.6% of total sales",
    avgOrder: "A$48 average order value",
    avgRating: "No ratings available",
    uberOne: "66.7% Uber One members",
  },
];

export const shopsByGroup = [
  {
    name: "Maikhana Adelaide",
    address: "6 Centre Parade, Enfield",
    new: 8,
    occasional: 1,
    frequent: 3,
    total: 12,
  },
  {
    name: "Scoop Shoppe",
    address: "Shop 16A/449 Main N Rd, Enfield",
    new: 1,
    occasional: 1,
    frequent: 0,
    total: 2,
  },
];

export const trendBars = [3, 2, 1, 1, 2, 5];

export type CustomerReview = {
  id: string;
  initials: string;
  name: string;
  isNewCustomer: boolean;
  stars: number;
  shop: string;
  reviewedDate: string;
  orderedDate: string;
  total: string;
  daysLeft: number;
  orderId: string;
  orderDateLong: string;
  shopAddress: string;
  items: { name: string; price: string; qty: number; sides?: { name: string; price: string; qty: number }[] }[];
  timeline: { time: string; label: string }[];
  netPayout: string;
};

export const customerReviews: CustomerReview[] = [
  {
    id: "tm-1",
    initials: "TM",
    name: "Tetevi m",
    isNewCustomer: true,
    stars: 5,
    shop: "Maikhana Adelaide",
    reviewedDate: "08/06/2026",
    orderedDate: "08/06/2026",
    total: "A$28.70",
    daysLeft: 13,
    orderId: "78B5E",
    orderDateLong: "6 Jun 2026",
    shopAddress: "6 Centre Parade",
    items: [
      {
        name: "Tawa Fish Fry",
        price: "A$24.80",
        qty: 1,
        sides: [
          { name: "Tandoori Roti", price: "A$3.90", qty: 1 },
          { name: "Missi Roti", price: "A$3.90", qty: 1 },
        ],
      },
    ],
    timeline: [
      { time: "23:24", label: "Order placed by customer" },
      { time: "23:25", label: "Order confirmed by shop" },
      { time: "23:47", label: "Courier departs" },
      { time: "23:54", label: "Order delivered to customer" },
    ],
    netPayout: "A$28.70",
  },
];

export const menuItemRank = [
  { name: "Blue Bubble Gum Ice Cream", rating: 100, likes: 3, dislikes: 0, comments: 0 },
  { name: "Malai Chicken Tikka", rating: 0, likes: 0, dislikes: 1, comments: 0 },
  { name: "Chocolate Sundae", rating: 80, likes: 2, dislikes: 0, comments: 0 },
  { name: "Missi Roti", rating: 75, likes: 2, dislikes: 1, comments: 0 },
];

export const menuReviews = [
  {
    item: "Malai Chicken Tikka",
    positive: false,
    fulfilment: "Delivery by an Uber partner",
    ordered: "Sun 4/12/26",
    reviewed: "Sun 4/12/26",
  },
  {
    item: "Blue Bubble Gum Ice Cream",
    positive: true,
    fulfilment: "Delivery by an Uber partner",
    ordered: "Sat 3/12/26",
    reviewed: "Sat 3/12/26",
  },
];

export const compliments = [
  { label: "Good portion", count: 6 },
  { label: "Tasty", count: 5 },
  { label: "Perfect temperature", count: 5 },
  { label: "Nice presentation", count: 5 },
  { label: "Fresh", count: 5 },
];

export const improvements = [
  { label: "Not so tasty", count: 2 },
  { label: "Small portion", count: 2 },
  { label: "Soggy or leaky", count: 1 },
];

export const starDistribution = [
  { stars: 5, count: 5 },
  { stars: 4, count: 0 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 3 },
];
