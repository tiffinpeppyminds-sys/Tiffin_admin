"use client";

import { Badge } from "@/components/ui/badge";
import { ModuleTable } from "@/components/ui/module-table";

const complaints = [
  { id: "CMP-1021", issue: "Late preparation", against: "Curry Nest Kitchen", priority: "Medium", owner: "Ops Team" },
  { id: "CMP-1028", issue: "Wrong item delivered", against: "Adelaide Tiffin Hub", priority: "High", owner: "Support Team" },
  { id: "CMP-1034", issue: "Unresponsive provider", against: "Spice Route Meals", priority: "Critical", owner: "Compliance Team" },
  { id: "CMP-1040", issue: "Order never accepted", against: "Desi Lunch Studio", priority: "High", owner: "Ops Team" },
];

export default function ComplaintsPage() {
  return (
    <ModuleTable
      title="Order issues"
      description="Review disputes, chargebacks, and resolutions across your shops."
      data={complaints}
      searchPlaceholder="Search complaint ID, issue, provider..."
      filterOptions={[
        { label: "Critical", value: "critical", predicate: (item) => item.priority === "Critical" },
        { label: "High", value: "high", predicate: (item) => item.priority === "High" },
        { label: "Medium", value: "medium", predicate: (item) => item.priority === "Medium" },
      ]}
      columns={[
        { key: "id", label: "Complaint ID", sortable: true },
        { key: "issue", label: "Issue", sortable: true, className: "min-w-52" },
        { key: "against", label: "Against", sortable: true, className: "min-w-44" },
        {
          key: "priority",
          label: "Priority",
          sortable: true,
          render: (item) => (
            <Badge
              variant={item.priority === "Critical" ? "danger" : item.priority === "High" ? "warning" : "muted"}
            >
              {item.priority}
            </Badge>
          ),
        },
        { key: "owner", label: "Owner Team", sortable: true },
      ]}
    />
  );
}
