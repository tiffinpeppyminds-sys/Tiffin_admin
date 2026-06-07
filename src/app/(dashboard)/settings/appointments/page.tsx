"use client";

import { Info } from "lucide-react";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="page-title">Appointments</h1>

      <div className="flex items-start gap-3 rounded-xl bg-[#e8f2fc] px-5 py-4">
        <Info className="mt-0.5 size-5 shrink-0 text-black" />
        <div>
          <p className="font-semibold text-black">No appointments available right now</p>
          <p className="mt-1 text-sm text-black">
            Video calls can only be scheduled for issues already being reviewed by Support.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-black">Try these solutions</h2>
        <div>
          <p className="font-semibold text-black">Contact support</p>
          <p className="mt-1 text-sm text-neutral-600">Contact us for assistance with your account.</p>
          <button
            type="button"
            className="mt-4 rounded-full bg-[#f6f6f6] px-5 py-2 text-sm font-medium text-black hover:bg-neutral-200"
          >
            Get help
          </button>
        </div>
      </section>
    </div>
  );
}
