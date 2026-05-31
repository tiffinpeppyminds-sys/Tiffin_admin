"use client";

import { useState } from "react";
import { Clock3, Handshake, PackageCheck, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ModuleTable } from "@/components/ui/module-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialOrders = [
  { id: "ORD-9081", provider: "Desi Lunch Studio", customer: "Priya Joshi", status: "New", total: "$23", eta: "24 min", slaBreach: "No", channel: "Delivery" },
  { id: "ORD-9082", provider: "Curry Nest Kitchen", customer: "Ryan Smith", status: "Accepted", total: "$18", eta: "20 min", slaBreach: "No", channel: "Pickup" },
  { id: "ORD-9083", provider: "Adelaide Tiffin Hub", customer: "Amrita Nair", status: "Preparing", total: "$27", eta: "14 min", slaBreach: "No", channel: "Delivery" },
  { id: "ORD-9084", provider: "Spice Route Meals", customer: "Mason Clarke", status: "Ready", total: "$16", eta: "Pickup", slaBreach: "No", channel: "Pickup" },
  { id: "ORD-9085", provider: "Desi Lunch Studio", customer: "Samuel Lee", status: "Completed", total: "$21", eta: "Delivered", slaBreach: "No", channel: "Delivery" },
  { id: "ORD-9092", provider: "South Yarra Meals", customer: "Jenna Lee", status: "Preparing", total: "$31", eta: "37 min", slaBreach: "Yes", channel: "Delivery" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);

  const cancelOrder = (orderId: string) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled", eta: "Cancelled", slaBreach: "Yes" } : order,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="top-shine">
          <CardHeader><CardTitle className="text-sm">Live Orders</CardTitle></CardHeader>
          <CardContent>
            <p className="heading-classic text-3xl font-semibold text-black dark:text-slate-100">159</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-black dark:text-slate-300"><Clock3 className="size-3.5 text-blue-600" />Across all active providers</p>
          </CardContent>
        </Card>
        <Card className="top-shine">
          <CardHeader><CardTitle className="text-sm">Accepted in &lt; 5m</CardTitle></CardHeader>
          <CardContent>
            <p className="heading-classic text-3xl font-semibold text-black dark:text-slate-100">91%</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-black dark:text-slate-300"><Handshake className="size-3.5 text-blue-600" />Provider response SLA</p>
          </CardContent>
        </Card>
        <Card className="top-shine">
          <CardHeader><CardTitle className="text-sm">SLA Breaches Today</CardTitle></CardHeader>
          <CardContent>
            <p className="heading-classic text-3xl font-semibold text-black dark:text-slate-100">7</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-black dark:text-slate-300"><TriangleAlert className="size-3.5 text-amber-600" />Needs escalation</p>
          </CardContent>
        </Card>
        <Card className="top-shine">
          <CardHeader><CardTitle className="text-sm">Completed Today</CardTitle></CardHeader>
          <CardContent>
            <p className="heading-classic text-3xl font-semibold text-black dark:text-slate-100">1,805</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-black dark:text-slate-300"><PackageCheck className="size-3.5 text-blue-600" />98.1% successful completion</p>
          </CardContent>
        </Card>
      </section>

      <ModuleTable
        title="Order Lifecycle Control"
        description="Track every live order with ETA, SLA breaches, status transitions, and fulfillment channel."
        data={orders}
        searchPlaceholder="Search order, provider, customer..."
        filterOptions={[
          { label: "New", value: "new", predicate: (order) => order.status === "New" },
          { label: "Accepted", value: "accepted", predicate: (order) => order.status === "Accepted" },
          { label: "Preparing", value: "preparing", predicate: (order) => order.status === "Preparing" },
          { label: "Ready", value: "ready", predicate: (order) => order.status === "Ready" },
          { label: "Completed", value: "completed", predicate: (order) => order.status === "Completed" },
          { label: "Cancelled", value: "cancelled", predicate: (order) => order.status === "Cancelled" },
          { label: "SLA Breach", value: "breach", predicate: (order) => order.slaBreach === "Yes" },
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
                    : order.status === "Cancelled"
                      ? "danger"
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
          { key: "channel", label: "Channel", sortable: true },
          {
            key: "slaBreach",
            label: "SLA",
            sortable: true,
            render: (order) => (
              <Badge variant={order.slaBreach === "Yes" ? "danger" : "success"}>{order.slaBreach === "Yes" ? "Breach" : "On Time"}</Badge>
            ),
          },
          { key: "total", label: "Total", sortable: true },
          { key: "eta", label: "ETA", sortable: true },
          {
            key: "eta",
            label: "Action",
            render: (order) =>
              order.status === "Completed" || order.status === "Cancelled" ? (
                <span className="text-xs font-medium text-black dark:text-slate-400">No Action</span>
              ) : (
                <Button size="sm" variant="ghost" onClick={() => cancelOrder(order.id)}>
                  Cancel Order
                </Button>
              ),
          },
        ]}
      />
    </div>
  );
}
