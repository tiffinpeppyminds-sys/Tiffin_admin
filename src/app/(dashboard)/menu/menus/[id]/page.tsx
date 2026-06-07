"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ChevronDown, Plus, X } from "lucide-react";
import { scheduleDays } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

const hourMarkers = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "23:59"];

function ScheduleCard({ activeDays }: { activeDays: string[] }) {
  return (
    <div className="rounded-xl border border-[#e8e8e8] bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex flex-wrap gap-2">
          {scheduleDays.map((day) => (
            <button
              key={day}
              type="button"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium",
                activeDays.includes(day)
                  ? "bg-black text-white"
                  : ["Fri", "Sat"].includes(day)
                    ? "bg-neutral-200 text-black"
                    : "border border-neutral-300 bg-white text-black",
              )}
            >
              {day}
            </button>
          ))}
        </div>
        <button type="button" className="text-neutral-400 hover:text-black">
          <X className="size-4" />
        </button>
      </div>

      <div className="relative mt-5 h-2 rounded-full bg-neutral-100">
        <div className="absolute left-[25%] h-2 w-[20%] rounded-full bg-[#06c167]" />
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-neutral-400">
        {hourMarkers.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold text-black">Start time</p>
          <div className="relative">
            <select className="w-full appearance-none rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none">
              <option>6:00 PM</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-black">End time</p>
          <div className="relative">
            <select className="w-full appearance-none rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm outline-none">
              <option>10:45 PM</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
          </div>
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-black">
        <input type="checkbox" className="size-4 rounded border-neutral-400" />
        Open 24 hours
      </label>
    </div>
  );
}

export default function MenuEditPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "menu";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/menu/menus" className="text-black hover:text-neutral-600">
          <ArrowLeft className="size-5" />
        </Link>
        <div className="flex gap-2">
          <button type="button" className="text-sm font-medium text-black hover:underline">
            Delete
          </button>
          <button type="button" disabled className="text-sm font-medium text-neutral-300">
            Duplicate
          </button>
          <button type="button" className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800">
            Save
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-black">Name</label>
          <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-[#06c167] hover:underline">
            <Plus className="size-3.5" />
            Add Note
          </button>
        </div>
        <input
          type="text"
          defaultValue={id === "menu" ? "Menu" : ""}
          className="mt-2 w-full max-w-md border-0 border-b border-neutral-300 bg-transparent py-3 text-sm outline-none focus:border-black"
        />
      </div>

      <section>
        <h2 className="text-lg font-bold text-black">Menu availability</h2>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-black">Menu is active</p>
            <p className="text-sm text-neutral-500">Customers can view and order from this menu</p>
          </div>
          <button
            type="button"
            className="relative h-7 w-12 rounded-full bg-black"
            aria-label="Menu is active"
          >
            <span className="absolute right-1 top-1 size-5 rounded-full bg-white" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <ScheduleCard activeDays={["Mon", "Wed", "Thu"]} />
          <ScheduleCard activeDays={["Fri", "Sat", "Sun"]} />
        </div>

        <button type="button" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#06c167] hover:underline">
          <Plus className="size-4" />
          Add more days and times
        </button>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-lg font-bold text-black">Holiday delivery hours</h2>
      </section>
    </div>
  );
}
