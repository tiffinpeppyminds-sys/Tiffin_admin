"use client";

import { ChevronDown } from "lucide-react";
import { scheduleBlocks, scheduleDays } from "@/lib/menu-data";

const hours = ["12 a.m.", "3 a.m.", "6 a.m.", "9 a.m.", "12 p.m.", "3 p.m.", "6 p.m.", "9 p.m.", "12 a.m."];

export function ScheduleGrid() {
  return (
    <div className="space-y-4 border-t border-neutral-200 pt-8">
      <div>
        <h2 className="section-title">Menu schedule</h2>
        <p className="mt-1 text-sm text-neutral-500">When your menus are available throughout the week.</p>
      </div>

      <div className="relative inline-block">
        <select className="cursor-pointer appearance-none rounded-full bg-[#f6f6f6] py-2.5 pl-4 pr-10 text-sm font-semibold text-black outline-none">
          <option>All menus</option>
          <option>Menu</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[760px] overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="grid grid-cols-[72px_repeat(8,1fr)] border-b border-neutral-100 bg-[#fafafa] px-1 text-[11px] font-medium text-neutral-500">
            <div />
            {hours.map((h) => (
              <div key={`top-${h}`} className="py-2.5 text-center">
                {h}
              </div>
            ))}
          </div>

          {scheduleDays.map((day) => (
            <div
              key={day}
              className="grid grid-cols-[72px_repeat(8,1fr)] items-stretch border-b border-neutral-100 last:border-b-0"
            >
              <div className="flex items-center bg-[#f6f6f6] px-4 py-4 text-sm font-semibold text-black">
                {day}
              </div>
              <div className="relative col-span-8 min-h-[48px]">
                <div className="absolute inset-0 grid grid-cols-8">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="border-l border-neutral-100 first:border-l-0" />
                  ))}
                </div>
                {scheduleBlocks[day]?.map((block, i) => {
                  const left = ((block.start / 24) * 100).toFixed(1);
                  const width = (((block.end - block.start) / 24) * 100).toFixed(1);
                  return (
                    <div
                      key={i}
                      className="absolute top-3 h-6 rounded-md bg-[#06c167] shadow-sm"
                      style={{ left: `${left}%`, width: `${width}%` }}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          <div className="grid grid-cols-[72px_repeat(8,1fr)] border-t border-neutral-100 bg-[#fafafa] px-1 text-[11px] font-medium text-neutral-500">
            <div />
            {hours.map((h) => (
              <div key={`bottom-${h}`} className="py-2.5 text-center">
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
