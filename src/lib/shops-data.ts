export type Shop = {
  id: string;
  name: string;
  address: string;
  shortAddress: string;
  phone: string;
  rating: number;
  isClosed: boolean;
  opensAt: string;
  sales: string;
  orders: number;
  accent: string;
};

export const shops: Shop[] = [
  {
    id: "maikhana-adelaide",
    name: "Maikhana Adelaide",
    address: "6 Centre Parade, Enfield, 5085",
    shortAddress: "6 Centre Parade",
    phone: "+61403302980",
    rating: 2.7,
    isClosed: true,
    opensAt: "Opens 14:00 Monday",
    sales: "A$0",
    orders: 0,
    accent: "bg-amber-100",
  },
  {
    id: "scoop-shoppe",
    name: "Scoop Shoppe",
    address: "Shop 16A/449 Main N Rd, Enfield, 5085",
    shortAddress: "Shop 16A/449 Main N Rd",
    phone: "+61411223344",
    rating: 4.0,
    isClosed: true,
    opensAt: "Opens 08:00 Monday",
    sales: "A$25.58",
    orders: 1,
    accent: "bg-pink-100",
  },
];

export function getShop(id: string) {
  return shops.find((shop) => shop.id === id);
}

export const shopHours = [
  { day: "Monday", slots: ["14:00 - 22:00"] },
  { day: "Tuesday", slots: ["14:00 - 22:00"] },
  { day: "Wednesday", slots: ["14:00 - 22:00"] },
  { day: "Thursday", slots: ["14:00 - 22:00"] },
  { day: "Friday", slots: ["14:00 - 23:00"] },
  { day: "Saturday", slots: ["12:00 - 23:00"] },
  { day: "Sunday", slots: ["12:00 - 22:00"] },
];

export const defaultDeliveryInstruction =
  "Park out front of restaurant. Collect order from front counter and quote order ID and customer name.";
