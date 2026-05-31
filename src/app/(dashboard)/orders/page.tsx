"use client";

import { Badge } from "@/components/ui/badge";
import { ModuleTable } from "@/components/ui/module-table";

const orders = [
  { id: "ORD-9081", provider: "Desi Lunch Studio", customer: "Priya Joshi", status: "New", total: "$23", eta: "24 min" },
  { id: "ORD-9082", provider: "Curry Nest Kitchen", customer: "Ryan Smith", status: "Accepted", total: "$18", eta: "20 min" },
  { id: "ORD-9083", provider: "Adelaide Tiffin Hub", customer: "Amrita Nair", status: "Preparing", total: "$27", eta: "14 min" },
  { id: "ORD-9084", provider: "Spice Route Meals", customer: "Mason Clarke", status: "Ready", total: "$16", eta: "Pickup" },
  { id: "ORD-9085", provider: "Desi Lunch Studio", customer: "Samuel Lee", status: "Completed", total: "$21", eta: "Delivered" },
];

export default function OrdersPage() {
  return (
    <ModuleTable
      title="Order Lifecycle Control"
      description="Track every live order with sortable ETA, status, and provider workload visibility."
      data={orders}
      searchPlaceholder="Search order, provider, customer..."
      filterOptions={[
        { label: "New", value: "new", predicate: (order) => order.status === "New" },
        { label: "Accepted", value: "accepted", predicate: (order) => order.status === "Accepted" },
        { label: "Preparing", value: "preparing", predicate: (order) => order.status === "Preparing" },
        { label: "Ready", value: "ready", predicate: (order) => order.status === "Ready" },
        { label: "Completed", value: "completed", predicate: (order) => order.status === "Completed" },
      ]}
      columns={[
        { key: "id", label: "Order ID", sortable: true },
        { key: "provider", label: "Provider", sortable: true, className: "min-w-52" },
        { key: "customer", label: "Customer", sortable: true },
        {
          key: "status",
          label: "Status",
          sortable: true,
          render: (order) => (
            <Badge
              variant={
                order.status === "Completed"
                  ? "success"
                  : order.status === "Ready"
                    ? "default"
                    : order.status === "Preparing"
                      ? "muted"
                      : order.status === "Accepted"
                        ? "warning"
                        : "danger"
              }
            >
              {order.status}
            </Badge>
          ),
        },
        { key: "total", label: "Total", sortable: true },
        { key: "eta", label: "ETA", sortable: true },
      ]}
    />
  );
}
