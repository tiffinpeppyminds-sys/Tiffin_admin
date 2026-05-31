"use client";

import { screenFlow } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { ModuleTable } from "@/components/ui/module-table";

export default function AppFlowsPage() {
  const flowRows = screenFlow.map((stage) => ({
    stage: stage.stage,
    title: stage.title,
    keyFeature: stage.points[0] ?? "N/A",
    coverage: stage.points.length >= 3 ? "Deep" : "Standard",
  }));

  return (
    <ModuleTable
      title="App Feature Coverage Matrix"
      description="Track every TIFFIN FINDER app stage with sortable lifecycle and implementation coverage views."
      data={flowRows}
      searchPlaceholder="Search stage, title, feature..."
      filterOptions={[
        { label: "Deep Coverage", value: "deep", predicate: (row) => row.coverage === "Deep" },
        { label: "Standard Coverage", value: "standard", predicate: (row) => row.coverage === "Standard" },
      ]}
      columns={[
        { key: "stage", label: "Stage", sortable: true },
        { key: "title", label: "Flow Name", sortable: true, className: "min-w-64" },
        { key: "keyFeature", label: "Key Feature", sortable: true, className: "min-w-72" },
        {
          key: "coverage",
          label: "Coverage",
          sortable: true,
          render: (row) => <Badge variant={row.coverage === "Deep" ? "success" : "muted"}>{row.coverage}</Badge>,
        },
      ]}
    />
  );
}
