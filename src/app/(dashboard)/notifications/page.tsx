"use client";

import { Badge } from "@/components/ui/badge";
import { ModuleTable } from "@/components/ui/module-table";

const notifications = [
  { channel: "Business", trigger: "New order received", status: "Enabled", medium: "Push + In-app" },
  { channel: "Customer", trigger: "Order accepted / ready", status: "Enabled", medium: "Push + SMS" },
  { channel: "Customer", trigger: "Review reminder", status: "Enabled", medium: "Push" },
  { channel: "Business", trigger: "Verification status update", status: "Enabled", medium: "Email + In-app" },
  { channel: "Customer", trigger: "Promo weekend offer", status: "Paused", medium: "Push + Email" },
];

export default function NotificationsPage() {
  return (
    <ModuleTable
      title="Notifications"
      description="Manage notification triggers and delivery channels for your business."
      data={notifications}
      searchPlaceholder="Search trigger, channel, medium..."
      filterOptions={[
        { label: "Enabled", value: "enabled", predicate: (item) => item.status === "Enabled" },
        { label: "Paused", value: "paused", predicate: (item) => item.status === "Paused" },
        { label: "Business", value: "business", predicate: (item) => item.channel === "Business" },
        { label: "Customer", value: "customer", predicate: (item) => item.channel === "Customer" },
      ]}
      columns={[
        { key: "trigger", label: "Trigger", sortable: true, className: "min-w-64" },
        { key: "channel", label: "Audience", sortable: true },
        { key: "medium", label: "Medium", sortable: true },
        {
          key: "status",
          label: "Status",
          sortable: true,
          render: (item) => <Badge variant={item.status === "Enabled" ? "success" : "warning"}>{item.status}</Badge>,
        },
      ]}
    />
  );
}
