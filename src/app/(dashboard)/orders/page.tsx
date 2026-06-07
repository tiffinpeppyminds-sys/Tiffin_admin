"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ChevronDown,
  Info,
  Paperclip,
  Search,
} from "lucide-react";
import { ContactOptionsModal } from "@/components/orders/contact-options-modal";
import { EmptyOrdersIcon } from "@/components/orders/empty-orders-icon";
import { OrderDetailDrawer } from "@/components/orders/order-detail-drawer";
import { RateDeliveryModal } from "@/components/orders/rate-delivery-modal";
import { UberOneBadge } from "@/components/orders/uber-one-badge";
import { orders, type Order } from "@/lib/orders-data";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "active" as const,
    label: "Active",
    description:
      "Orders that are currently active. These orders have been accepted by the shop but have not yet been delivered, cancelled or picked up by the customer.",
  },
  {
    id: "scheduled" as const,
    label: "Scheduled",
    description: "Orders scheduled for a future date and time. They will appear here until the shop accepts them.",
  },
  {
    id: "history" as const,
    label: "History",
    description:
      "Orders that are finished and no longer in progress. It includes completed, cancelled or missed orders, too.",
  },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"active" | "scheduled" | "history">("history");
  const [query, setQuery] = useState("");
  const [shopFilter, setShopFilter] = useState("All shops (2)");
  const [dateFilter, setDateFilter] = useState("Last 7 days");
  const [issueFilter, setIssueFilter] = useState("Order issue");
  const [statusFilter, setStatusFilter] = useState("Order status");
  const [uberOne, setUberOne] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [rateOpen, setRateOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const tabMeta = tabs.find((t) => t.id === activeTab)!;

  const filtered = useMemo(() => {
    let list = orders.filter((o) => o.tab === activeTab);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((o) => o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q));
    }
    if (shopFilter !== "All shops (2)") {
      list = list.filter((o) => o.shop === shopFilter);
    }
    if (uberOne) {
      list = list.filter((o) => o.isUberOne);
    }
    if (issueFilter === "With issues") {
      list = list.filter((o) => o.issues.some((i) => i.tone !== "danger"));
    }
    return list;
  }, [activeTab, query, shopFilter, uberOne, issueFilter]);

  const resetFilters = () => {
    setQuery("");
    setShopFilter("All shops (2)");
    setDateFilter("Last 7 days");
    setIssueFilter("Order issue");
    setStatusFilter("Order status");
    setUberOne(false);
    setLastUpdated(0);
  };

  const resultLabel = filtered.length === 1 ? "result" : "results";

  return (
    <div className="space-y-5">
      <div>
        <h1 className="page-title">Orders</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Review your orders in real time. For a detailed view of your pay, go to{" "}
          <Link href="/payments/payouts-by-order" className="font-medium text-[#276ef1] hover:underline">
            Payouts by order
          </Link>
          .
        </p>
      </div>

      <div className="border-b border-neutral-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedOrder(null);
              }}
              className={cn(
                "tab-link",
                activeTab === tab.id
                  ? "border-black text-black"
                  : "border-transparent text-neutral-500 hover:text-black",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm leading-relaxed text-neutral-600">{tabMeta.description}</p>

      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown
          label={shopFilter}
          options={["All shops (2)", "Maikhana Adelaide", "Scoop Shoppe"]}
          onSelect={setShopFilter}
        />
        {activeTab === "history" ? (
          <>
            <FilterDropdown
              label={dateFilter}
              options={["Last 7 days", "Last 30 days", "Today"]}
              onSelect={setDateFilter}
            />
            <FilterDropdown
              label={issueFilter}
              options={["Order issue", "With issues", "No issues"]}
              onSelect={setIssueFilter}
            />
            <FilterDropdown
              label={statusFilter}
              options={["Order status", "Completed", "Cancelled"]}
              onSelect={setStatusFilter}
            />
            <button
              type="button"
              onClick={() => setUberOne((v) => !v)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                uberOne ? "border-black bg-black text-white" : "border-neutral-300 text-black hover:bg-neutral-50",
              )}
            >
              Uber One member
            </button>
          </>
        ) : null}
        <div className="relative ml-auto">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customer name or order ID"
            className="h-10 w-[280px] rounded-full border-0 bg-[#f6f6f6] pl-10 pr-4 text-sm text-black outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-neutral-300"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
        <span>Last updated {lastUpdated} seconds ago</span>
        <span className="text-neutral-300">·</span>
        <span className="inline-flex items-center gap-1.5">
          Showing {filtered.length} {resultLabel}
          <Info className="size-3.5 text-neutral-400" />
        </span>
        <button type="button" onClick={resetFilters} className="font-medium text-[#276ef1] hover:underline">
          Reset
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <EmptyOrdersIcon />
          <p className="mt-6 text-base font-semibold text-black">
            {activeTab === "active" ? "No live orders" : activeTab === "scheduled" ? "No scheduled orders" : "No orders found"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                {["Order ID", "Shop details", "Date", "Time", "Customer", "Fulfilment", "Courier", ...(activeTab === "history" ? ["Issue", "Subtotal"] : [])].map(
                  (col) => (
                    <th key={col} className="px-3 py-3 text-left text-sm font-medium text-black first:pl-0">
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={cn(
                    "cursor-pointer border-b border-neutral-100 transition-colors hover:bg-neutral-50/80",
                    selectedOrder?.id === order.id && "bg-neutral-50",
                  )}
                >
                  <td className="py-4 pl-0 pr-3 font-semibold text-black">{order.id}</td>
                  <td className="px-3 py-4 text-black">{order.shop}</td>
                  <td className="px-3 py-4 text-neutral-700">{order.date}</td>
                  <td className="px-3 py-4 text-neutral-700">{order.time}</td>
                  <td className="px-3 py-4">
                    <span className="inline-flex items-center gap-1.5 text-black">
                      {order.customer}
                      {order.isUberOne ? <UberOneBadge /> : null}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-neutral-700">
                    <span className="block leading-tight">{order.fulfilmentType}</span>
                    <span className="block leading-tight">{order.fulfilmentProvider}</span>
                  </td>
                  <td className="px-3 py-4 text-neutral-700">{order.courier}</td>
                  {activeTab === "history" ? (
                    <>
                      <td className="px-3 py-4">
                        {order.issues.length > 0 ? (
                          <div className="flex flex-col items-start gap-1">
                            <div className="flex flex-wrap gap-1">
                              {order.issues
                                .filter((issue) => issue.tone !== "danger")
                                .map((issue) => (
                                  <span
                                    key={issue.label}
                                    className={cn(
                                      "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium",
                                      issue.tone === "warning" && "bg-[#fff4d6] text-[#7a5b00]",
                                      issue.tone === "muted" && "bg-[#f0ebe3] text-[#5c5348]",
                                    )}
                                  >
                                    {issue.tone === "warning" ? <AlertTriangle className="size-3" /> : null}
                                    {issue.label === "Evidence attached" ? <Paperclip className="size-3" /> : null}
                                    {issue.label}
                                  </span>
                                ))}
                            </div>
                            {order.issues
                              .filter((issue) => issue.tone === "danger")
                              .map((issue) => (
                                <span key={issue.label} className="text-xs font-medium text-[#cc1700]">
                                  {issue.label}
                                </span>
                              ))}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-3 py-4">
                        <span className="font-medium text-black">{order.subtotal}</span>
                        {order.netPayout === "A$0.00" && order.subtotal !== "A$0.00" ? (
                          <span className="mt-0.5 block text-sm font-medium text-[#cc1700]">{order.netPayout}</span>
                        ) : null}
                      </td>
                    </>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <OrderDetailDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onRate={() => setRateOpen(true)}
        onContact={() => setContactOpen(true)}
      />

      <RateDeliveryModal
        open={rateOpen}
        onClose={() => setRateOpen(false)}
        courierName={selectedOrder?.courier ?? ""}
      />

      <ContactOptionsModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        customerName={selectedOrder?.customer ?? ""}
      />
    </div>
  );
}

function FilterDropdown({
  label,
  options,
  onSelect,
}: {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-black hover:bg-neutral-50"
      >
        {label}
        <ChevronDown className="size-3.5 text-neutral-500" />
      </button>
      {open ? (
        <div className="absolute left-0 top-10 z-20 w-52 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
            >
              {opt}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
