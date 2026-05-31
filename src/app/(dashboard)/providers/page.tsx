"use client";

import { useState } from "react";
import { AlertTriangle, BadgeCheck, Clock4, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ModuleTable } from "@/components/ui/module-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialProviders = [
  {
    name: "Adelaide Tiffin Hub",
    suburb: "Prospect",
    status: "Pending Verification",
    rating: 4.8,
    ordersToday: 49,
    sla: "92%",
    verificationAge: "2 days",
  },
  {
    name: "Curry Nest Kitchen",
    suburb: "Norwood",
    status: "Approved",
    rating: 4.6,
    ordersToday: 63,
    sla: "97%",
    verificationAge: "Verified",
  },
  {
    name: "Spice Route Meals",
    suburb: "Mawson Lakes",
    status: "Flagged",
    rating: 3.2,
    ordersToday: 15,
    sla: "74%",
    verificationAge: "Verified",
  },
  {
    name: "Desi Lunch Studio",
    suburb: "Glenelg",
    status: "Approved",
    rating: 4.9,
    ordersToday: 71,
    sla: "99%",
    verificationAge: "Verified",
  },
  {
    name: "South Yarra Meals",
    suburb: "Adelaide CBD",
    status: "Pending Verification",
    rating: 4.2,
    ordersToday: 22,
    sla: "89%",
    verificationAge: "5 days",
  },
];

export default function ProvidersPage() {
  const [providers, setProviders] = useState(initialProviders);

  const updateProviderStatus = (providerName: string, status: string) => {
    setProviders((current) =>
      current.map((provider) => (provider.name === providerName ? { ...provider, status } : provider)),
    );
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="top-shine">
          <CardHeader><CardTitle className="text-sm">Pending Verification</CardTitle></CardHeader>
          <CardContent>
            <p className="heading-classic text-3xl font-semibold text-black dark:text-slate-100">14</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-black dark:text-slate-300"><Clock4 className="size-3.5 text-blue-600" />Avg age 3.1 days</p>
          </CardContent>
        </Card>
        <Card className="top-shine">
          <CardHeader><CardTitle className="text-sm">Approved Providers</CardTitle></CardHeader>
          <CardContent>
            <p className="heading-classic text-3xl font-semibold text-black dark:text-slate-100">248</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-black dark:text-slate-300"><BadgeCheck className="size-3.5 text-blue-600" />+12 this week</p>
          </CardContent>
        </Card>
        <Card className="top-shine">
          <CardHeader><CardTitle className="text-sm">Quality Watchlist</CardTitle></CardHeader>
          <CardContent>
            <p className="heading-classic text-3xl font-semibold text-black dark:text-slate-100">6</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-black dark:text-slate-300"><AlertTriangle className="size-3.5 text-amber-600" />Needs compliance follow-up</p>
          </CardContent>
        </Card>
        <Card className="top-shine">
          <CardHeader><CardTitle className="text-sm">Avg Provider Rating</CardTitle></CardHeader>
          <CardContent>
            <p className="heading-classic text-3xl font-semibold text-black dark:text-slate-100">4.7</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-black dark:text-slate-300"><Star className="size-3.5 text-blue-600" />Platform-wide score</p>
          </CardContent>
        </Card>
      </section>

      <ModuleTable
        title="Provider Approval & Quality Control"
        description="Review verification, rating health, SLA score, and operational performance in one table."
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
          { label: "Suspended", value: "suspended", predicate: (provider) => provider.status === "Suspended" },
          { label: "Rejected", value: "rejected", predicate: (provider) => provider.status === "Rejected" },
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
                      : provider.status === "Suspended"
                        ? "muted"
                      : "danger"
                }
              >
                {provider.status}
              </Badge>
            ),
          },
          { key: "rating", label: "Rating", sortable: true },
          { key: "sla", label: "SLA", sortable: true },
          { key: "verificationAge", label: "Verification", sortable: true },
          { key: "ordersToday", label: "Orders Today", sortable: true },
          {
            key: "verificationAge",
            label: "Action",
            render: (provider) => (
              <div className="flex min-w-44 flex-wrap gap-2">
                {provider.status === "Pending Verification" ? (
                  <>
                    <Button size="sm" variant="secondary" onClick={() => updateProviderStatus(provider.name, "Approved")}>
                      Approve
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => updateProviderStatus(provider.name, "Rejected")}>
                      Reject
                    </Button>
                  </>
                ) : provider.status === "Approved" ? (
                  <Button size="sm" variant="ghost" onClick={() => updateProviderStatus(provider.name, "Suspended")}>
                    Suspend
                  </Button>
                ) : provider.status === "Suspended" ? (
                  <Button size="sm" variant="secondary" onClick={() => updateProviderStatus(provider.name, "Approved")}>
                    Reinstate
                  </Button>
                ) : (
                  <Button size="sm" variant="secondary" onClick={() => updateProviderStatus(provider.name, "Pending Verification")}>
                    Re-open
                  </Button>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
