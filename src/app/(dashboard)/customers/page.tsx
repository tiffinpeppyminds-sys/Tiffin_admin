"use client";

import { Badge } from "@/components/ui/badge";
import { ModuleTable } from "@/components/ui/module-table";

const customers = [
  { name: "Amrita Nair", phone: "+61 420 101 900", orders: 23, status: "Active", spend: "$612" },
  { name: "Mason Clarke", phone: "+61 410 555 011", orders: 3, status: "Under Review", spend: "$93" },
  { name: "Priya Joshi", phone: "+61 478 330 777", orders: 51, status: "VIP", spend: "$1,904" },
  { name: "Ryan Smith", phone: "+61 430 802 210", orders: 16, status: "Active", spend: "$388" },
];

export default function CustomersPage() {
  return (
    <ModuleTable
      title="Customer Governance"
      description="Track customer account quality, lifetime value, and moderation states."
      data={customers}
      searchPlaceholder="Search customer by name or phone..."
      filterOptions={[
        { label: "Active", value: "active", predicate: (customer) => customer.status === "Active" },
        { label: "VIP", value: "vip", predicate: (customer) => customer.status === "VIP" },
        { label: "Under Review", value: "review", predicate: (customer) => customer.status === "Under Review" },
      ]}
      columns={[
        { key: "name", label: "Customer", sortable: true, className: "min-w-44" },
        { key: "phone", label: "Phone", sortable: true },
        { key: "orders", label: "Orders", sortable: true },
        { key: "spend", label: "Lifetime Spend", sortable: true },
        {
          key: "status",
          label: "Status",
          sortable: true,
          render: (customer) => (
            <Badge
              variant={customer.status === "VIP" ? "default" : customer.status === "Active" ? "success" : "warning"}
            >
              {customer.status}
            </Badge>
          ),
        },
      ]}
    />
  );
}
