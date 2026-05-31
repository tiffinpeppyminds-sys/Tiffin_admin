"use client";

import { useState } from "react";
import { AlertCircle, Repeat2, ShieldAlert, Wallet2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ModuleTable } from "@/components/ui/module-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialCustomers = [
  { name: "Amrita Nair", phone: "+61 420 101 900", orders: 23, status: "Active", spend: "$612", risk: "Low", repeatRate: "44%" },
  { name: "Mason Clarke", phone: "+61 410 555 011", orders: 3, status: "Under Review", spend: "$93", risk: "High", repeatRate: "11%" },
  { name: "Priya Joshi", phone: "+61 478 330 777", orders: 51, status: "VIP", spend: "$1,904", risk: "Low", repeatRate: "67%" },
  { name: "Ryan Smith", phone: "+61 430 802 210", orders: 16, status: "Active", spend: "$388", risk: "Medium", repeatRate: "31%" },
  { name: "Jenna Lee", phone: "+61 400 119 442", orders: 7, status: "Under Review", spend: "$140", risk: "High", repeatRate: "18%" },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);

  const updateCustomerStatus = (phone: string, status: string) => {
    setCustomers((current) =>
      current.map((customer) => (customer.phone === phone ? { ...customer, status } : customer)),
    );
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="top-shine">
          <CardHeader><CardTitle className="text-sm">Active Customers</CardTitle></CardHeader>
          <CardContent>
            <p className="heading-classic text-3xl font-semibold text-black dark:text-slate-100">12.8K</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-black dark:text-slate-300"><Repeat2 className="size-3.5 text-blue-600" />+4.2% weekly growth</p>
          </CardContent>
        </Card>
        <Card className="top-shine">
          <CardHeader><CardTitle className="text-sm">VIP Customers</CardTitle></CardHeader>
          <CardContent>
            <p className="heading-classic text-3xl font-semibold text-black dark:text-slate-100">1,046</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-black dark:text-slate-300"><Wallet2 className="size-3.5 text-blue-600" />42% revenue contribution</p>
          </CardContent>
        </Card>
        <Card className="top-shine">
          <CardHeader><CardTitle className="text-sm">Accounts Under Review</CardTitle></CardHeader>
          <CardContent>
            <p className="heading-classic text-3xl font-semibold text-black dark:text-slate-100">37</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-black dark:text-slate-300"><ShieldAlert className="size-3.5 text-amber-600" />Fraud/abuse monitoring</p>
          </CardContent>
        </Card>
        <Card className="top-shine">
          <CardHeader><CardTitle className="text-sm">Support Escalations</CardTitle></CardHeader>
          <CardContent>
            <p className="heading-classic text-3xl font-semibold text-black dark:text-slate-100">14</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-black dark:text-slate-300"><AlertCircle className="size-3.5 text-blue-600" />Avg resolution 6.4 hrs</p>
          </CardContent>
        </Card>
      </section>

      <ModuleTable
        title="Customer Governance"
        description="Track account health, lifetime value, repeat behavior, and moderation risk."
        data={customers}
        searchPlaceholder="Search customer by name or phone..."
        filterOptions={[
          { label: "Active", value: "active", predicate: (customer) => customer.status === "Active" },
          { label: "VIP", value: "vip", predicate: (customer) => customer.status === "VIP" },
          { label: "Under Review", value: "review", predicate: (customer) => customer.status === "Under Review" },
          { label: "High Risk", value: "high_risk", predicate: (customer) => customer.risk === "High" },
          { label: "Suspended", value: "suspended", predicate: (customer) => customer.status === "Suspended" },
          { label: "Rejected", value: "rejected", predicate: (customer) => customer.status === "Rejected" },
        ]}
        columns={[
          { key: "name", label: "Customer", sortable: true, className: "min-w-44" },
          { key: "phone", label: "Phone", sortable: true },
          { key: "orders", label: "Orders", sortable: true },
          { key: "spend", label: "Lifetime Spend", sortable: true },
          { key: "repeatRate", label: "Repeat Rate", sortable: true },
          {
            key: "risk",
            label: "Risk",
            sortable: true,
            render: (customer) => (
              <Badge
                variant={
                  customer.risk === "High"
                    ? "danger"
                    : customer.risk === "Medium"
                      ? "warning"
                      : "success"
                }
              >
                {customer.risk}
              </Badge>
            ),
          },
          {
            key: "status",
            label: "Status",
            sortable: true,
            render: (customer) => (
              <Badge
                variant={
                  customer.status === "VIP"
                    ? "default"
                    : customer.status === "Active"
                      ? "success"
                      : customer.status === "Suspended"
                        ? "muted"
                        : customer.status === "Rejected"
                          ? "danger"
                          : "warning"
                }
              >
                {customer.status}
              </Badge>
            ),
          },
          {
            key: "repeatRate",
            label: "Action",
            render: (customer) => (
              <div className="flex min-w-44 flex-wrap gap-2">
                {customer.status === "Under Review" ? (
                  <Button size="sm" variant="ghost" onClick={() => updateCustomerStatus(customer.phone, "Rejected")}>
                    Reject
                  </Button>
                ) : customer.status === "Suspended" || customer.status === "Rejected" ? (
                  <Button size="sm" variant="secondary" onClick={() => updateCustomerStatus(customer.phone, "Active")}>
                    Reactivate
                  </Button>
                ) : (
                  <Button size="sm" variant="ghost" onClick={() => updateCustomerStatus(customer.phone, "Suspended")}>
                    Suspend
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
