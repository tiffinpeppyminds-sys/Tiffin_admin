export const menuShops = ["Maikhana Adelaide", "Scoop Shoppe"];

export const menuTabs = [
  { id: "overview", label: "Overview", href: "/menu" },
  { id: "menus", label: "Menus", href: "/menu/menus" },
  { id: "categories", label: "Categories", href: "/menu/categories" },
  { id: "items", label: "Items", href: "/menu/items" },
  { id: "customisations", label: "Customisations", href: "/menu/customisations" },
] as const;

export const menuActionLinks = [
  "Bulk update prices",
  "See changes",
  "View online",
  "About",
] as const;

export type MenuItemRow = {
  id: string;
  name: string;
  sides?: string;
  popular?: boolean;
  price: string;
  available: boolean;
  placeholder?: boolean;
  image?: string;
};

export type MenuCategoryGroup = {
  id: string;
  name: string;
  count: number;
  items: MenuItemRow[];
};

export const overviewCategories: MenuCategoryGroup[] = [
  {
    id: "non-veg-starters",
    name: "Non Vegetarian Starters",
    count: 17,
    items: [
      { id: "1", name: "Dry Chilli Chicken", sides: "Add Sides", popular: true, price: "18.90", available: true },
      { id: "2", name: "Chicken Tikka Schezwan", sides: "Add Sides", price: "18.90", available: true },
    ],
  },
  {
    id: "breads",
    name: "Breads",
    count: 5,
    items: [
      { id: "3", name: "Cheese Chilli Naan", sides: "Add Sides", price: "7.90", available: true },
      { id: "4", name: "Cheese Garlic Naan", sides: "Add Sides", popular: true, price: "7.90", available: true },
      { id: "5", name: "Peshawari Naan", sides: "Add Sides", price: "7.90", available: true },
      { id: "6", name: "Maikhana Special Naan", sides: "Add Sides", price: "7.90", available: true, placeholder: true },
      { id: "7", name: "Keema Naan", sides: "Add Sides", price: "9.90", available: true },
    ],
  },
];

export const menuList = [
  {
    id: "menu",
    name: "Menu",
    hours: "Monday, Wednesday - Thursday: 5:00 PM - 10:45 PM, Friday - Saturday: 4:30 PM - 10:00 PM, Sunday: 4:30 PM - 9:00 PM",
    categories: "Non Vegetarian Starters, +8",
    items: "83 delivery items",
  },
];

export const scheduleDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const scheduleHours = ["12 a.m.", "3 a.m.", "6 a.m.", "9 a.m.", "12 p.m.", "3 p.m.", "6 p.m.", "9 p.m.", "12 a.m."];

export const scheduleBlocks: Record<string, { start: number; end: number }[]> = {
  Mon: [{ start: 6, end: 9.75 }],
  Tue: [],
  Wed: [{ start: 6, end: 9.75 }],
  Thu: [{ start: 6, end: 9.75 }],
  Fri: [{ start: 4.5, end: 10 }],
  Sat: [{ start: 4.5, end: 10 }],
  Sun: [{ start: 4.5, end: 9 }],
};

export const categoriesList = [
  { id: "biryani", name: "Biryani", menus: "Menu", items: "2 delivery items" },
  { id: "breads", name: "Breads", menus: "Menu", items: "13 delivery items" },
  { id: "chakhna", name: "Chakhna", menus: "Menu", items: "8 delivery items" },
  { id: "kids", name: "Kids Menu", menus: "Menu", items: "4 delivery items" },
  { id: "non-veg-curries", name: "Non Vegetarian Curries and Dhaba Gravies", menus: "Menu", items: "11 delivery items" },
  { id: "non-veg-starters", name: "Non Vegetarian Starters", menus: "Menu", items: "17 delivery items" },
  { id: "rice", name: "Rice", menus: "Menu", items: "5 delivery items" },
  { id: "veg-curries", name: "Vegetarian Curries and Dhaba Gravies", menus: "Menu", items: "9 delivery items" },
];

export const itemsList = [
  { id: "achari-soya", name: "Achari Soya Chaap (V)", price: "$17.90", menus: "Menu", categories: "Vegetarian Starters", usedIn: "-", contains: "-", updated: "01/09", hasPhoto: true },
  { id: "beer-peanuts", name: "Beer Peanuts", price: "$6.90", menus: "Menu", categories: "Chakhna", usedIn: "-", contains: "-", updated: "12/09", hasPhoto: true },
  { id: "boiled-eggs", name: "Boiled Eggs", price: "$9.90", menus: "Menu", categories: "Non Vegetarian Start...", usedIn: "-", contains: "Add Sides", updated: "12/09", hasPhoto: true },
  { id: "ajwaini-fish", name: "Ajwaini Fish Tikka", price: "$20.90", menus: "Menu", categories: "Non Vegetarian Start...", usedIn: "-", contains: "-", updated: "02/06", hasPhoto: true },
  { id: "amritsari-fish", name: "Amritsari Fish Tikka", price: "$20.90", menus: "Menu", categories: "Non Vegetarian Start...", usedIn: "-", contains: "-", updated: "02/06", hasPhoto: false },
  { id: "anda-curry", name: "Anda Curry", price: "$16.90", menus: "Menu", categories: "Non Vegetarian Curri...", usedIn: "-", contains: "-", updated: "02/06", hasPhoto: true },
  { id: "butter-chicken", name: "Butter Chicken", price: "$19.90", menus: "Menu", categories: "Non Vegetarian Curri...", usedIn: "-", contains: "Add Sides", updated: "01/09", hasPhoto: true },
];

export const customisationsList = [
  { id: "add-sides", name: "Add Sides", options: 7 },
  { id: "prep-1", name: "Choice of Preparation", options: 2 },
  { id: "prep-2", name: "Choice of Preparation", options: 2 },
];

export const menuHoursSummary = [
  "Monday, Wednesday - Thursday 6:00 PM - 10:45 PM",
  "Friday - Saturday 4:30 PM - 10:00 PM",
  "Sunday 4:30 PM - 9:00 PM",
];
