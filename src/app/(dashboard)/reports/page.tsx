"use client";

import { Badge } from "@/components/ui/badge";
import { ModuleTable } from "@/components/ui/module-table";

const reports = [
  { report: "Revenue by Suburb", cadence: "Weekly", owner: "Finance", status: "Published", trend: "+8.3%" },
  { report: "Provider SLA Health", cadence: "Daily", owner: "Ops", status: "Published", trend: "-1.1%" },
  { report: "Complaint Turnaround", cadence: "Weekly", owner: "Support", status: "Draft", trend: "+5.2%" },
  { report: "Customer Retention Cohort", cadence: "Monthly", owner: "Growth", status: "Published", trend: "+11.4%" },
  { report: "Menu Demand Forecast", cadence: "Monthly", owner: "Analytics", status: "Scheduled", trend: "+3.7%" },
];

export default function ReportsPage() {
  return (
    <ModuleTable
      title="Business & Operational Reports"
      description="Centralized report register with filterable cadence, status, and trend direction."
      data={reports}
      searchPlaceholder="Search report, owner, cadence..."
      filterOptions={[
        { label: "Published", value: "published", predicate: (report) => report.status === "Published" },
        { label: "Draft", value: "draft", predicate: (report) => report.status === "Draft" },
        { label: "Scheduled", value: "scheduled", predicate: (report) => report.status === "Scheduled" },
      ]}
      columns={[
        { key: "report", label: "Report", sortable: true, className: "min-w-64" },
        { key: "cadence", label: "Cadence", sortable: true },
        { key: "owner", label: "Owner", sortable: true },
        {
          key: "status",
          label: "Status",
          sortable: true,
          render: (report) => (
            <Badge
              variant={
                report.status === "Published" ? "success" : report.status === "Scheduled" ? "default" : "warning"
              }
            >
              {report.status}
            </Badge>
          ),
        },
        {
          key: "trend",
          label: "Trend",
          sortable: true,
          render: (report) => <Badge variant={report.trend.startsWith("+") ? "success" : "danger"}>{report.trend}</Badge>,
        },
      ]}
    />
  );
}
