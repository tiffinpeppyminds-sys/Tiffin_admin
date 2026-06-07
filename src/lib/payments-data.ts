export const paymentShops = ["Maikhana Adelaide", "Scoop Shoppe"] as const;

export const payoutKpis = [
  { label: "Total payout", value: "-A$18.90", change: "0%" },
  { label: "Customers", value: "0", change: "0%" },
  { label: "Settled orders", value: "0", change: "0%", info: true },
  { label: "Net order error adjustments", value: "-A$18.90", change: "0%", info: true },
] as const;

export const payoutByOrderKpis = [
  { label: "Settled orders", value: "0" },
  { label: "Sales (incl. VAT)", value: "A$0.00" },
  { label: "Marketplace fee", value: "A$0.00" },
  { label: "Customer refunds", value: "-A$18.90" },
  { label: "Order charges and more", value: "A$0.00" },
  { label: "Estimated payout", value: "-A$18.90" },
] as const;

export const payBreakdown = [
  { label: "Net order error adjustments", value: "-A$18.90", expandable: true },
  { label: "Total payout", value: "-A$18.90", bold: true },
] as const;

export const dailyPayout = {
  label: "Today",
  sales: "A$0.00",
  total: "-A$18.90",
} as const;

export const customerRefund = {
  customer: "TANISH C",
  orderId: "17BA3",
  fulfilment: "Delivery • Tiffin Finder App",
  date: "06/08/2026 at 1:07 AM",
  original: "A$44.60",
  refund: "-A$18.90",
} as const;

export const uberFees = [
  { label: "Delivery, powered by Uber", rate: "0% per order", orders: "0 orders" },
  { label: "Pick up", rate: "0% per order", orders: "0 orders" },
] as const;

export const statements = [
  { month: "May 2026", shop: "Maikhana Adelaide", earnings: "A$1,325.10", fees: "A$0.00", marketing: "-A$635.81", amendments: "-A$38.80", net: "A$1,286.30" },
  { month: "Apr 2026", shop: "Maikhana Adelaide", earnings: "A$1,325.10", fees: "A$0.00", marketing: "-A$635.81", amendments: "-A$38.80", net: "A$1,286.30" },
  { month: "Mar 2026", shop: "Maikhana Adelaide", earnings: "A$1,325.10", fees: "A$0.00", marketing: "-A$635.81", amendments: "-A$38.80", net: "A$1,286.30" },
  { month: "Feb 2026", shop: "Maikhana Adelaide", earnings: "A$1,325.10", fees: "A$0.00", marketing: "-A$635.81", amendments: "-A$38.80", net: "A$1,286.30" },
  { month: "Jan 2026", shop: "Maikhana Adelaide", earnings: "A$1,325.10", fees: "A$0.00", marketing: "-A$635.81", amendments: "-A$38.80", net: "A$1,286.30" },
] as const;

export const invoices = [
  { id: "1", merchant: "Maikhana Adelaide" },
  { id: "2", merchant: "Maikhana Adelaide" },
  { id: "3", merchant: "Maikhana Adelaide" },
  { id: "4", merchant: "Maikhana Adelaide" },
] as const;

export const bankingDetails = {
  bsb: "065106",
  accountNumber: "XXXXXX74",
  address: "6 Centre Parade, ..",
  postcode: "5085",
  bankName: "Commonwealth Bank",
  accountHolder: "little india adelaide",
  city: "Enfield",
  payoutFrequency: "Weekly",
} as const;

export const invoiceDisclaimer = [
  "I am providing Uber B.V. and its related and affiliated entities (Uber) with the information above for the purpose of Uber issuing tax invoices to me in respect of the services provided by Uber to me.",
  "I confirm that the information I have provided is true, correct and complete.",
  "I confirm that I am registered for GST in Australia and that the ABN I have provided is my ABN.",
  "I understand that Uber may verify the information I have provided with the Australian Taxation Office.",
  "I agree to notify Uber promptly if any of the information I have provided changes.",
  "I acknowledge that Uber may withhold tax from payments if required by law.",
  "I agree to indemnify Uber for any loss arising from incorrect information I have provided.",
] as const;
