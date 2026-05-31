"use client";

import { Badge } from "@/components/ui/badge";
import { ModuleTable } from "@/components/ui/module-table";

const providers = [
  { name: "Adelaide Tiffin Hub", suburb: "Prospect", status: "Pending Verification", rating: 4.8, ordersToday: 49 },
  { name: "Curry Nest Kitchen", suburb: "Norwood", status: "Approved", rating: 4.6, ordersToday: 63 },
  { name: "Spice Route Meals", suburb: "Mawson Lakes", status: "Flagged", rating: 3.2, ordersToday: 15 },
  { name: "Desi Lunch Studio", suburb: "Glenelg", status: "Approved", rating: 4.9, ordersToday: 71 },
];

export default function ProvidersPage() {
  return (
    <ModuleTable
      title="Provider Approval & Quality Control"
      description="Review verification, rating health, and provider operations in one sortable table."
      data={providers}
      searchPlaceholder="Search provider, suburb, status..."
      filterOptions={[
        { label: "Approved", value: "approved", predicate: (provider) => provider.status === "Approved" },
        {
          label: "Pending Verification",
          value: "pending",
          predicate: (provider) => provider.status === "Pending Verification",
        },
        { label: "Flagged", value: "flagged", predicate: (provider) => provider.status === "Flagged" },
      ]}
      columns={[
        { key: "name", label: "Provider", sortable: true, className: "min-w-56" },
        { key: "suburb", label: "Suburb", sortable: true },
        {
          key: "status",
          label: "Status",
          sortable: true,
          render: (provider) => (
            <Badge
              variant={
                provider.status === "Approved"
                  ? "success"
                  : provider.status === "Pending Verification"
                    ? "warning"
                    : "danger"
              }
            >
              {provider.status}
            </Badge>
          ),
        },
        { key: "rating", label: "Rating", sortable: true },
        { key: "ordersToday", label: "Orders Today", sortable: true },
      ]}
    />
  );
}
