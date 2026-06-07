"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExecutiveHero() {
  return (
    <section className="animate-fade-in-up overflow-hidden rounded-xl bg-black p-6 text-white lg:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            <span className="inline-block size-2 rounded-full bg-[#06c167]" />
            Store online
          </div>
          <h2 className="text-2xl font-bold tracking-[-0.02em] lg:text-[28px]">Good day, Desi Lunch Studio</h2>
          <p className="mt-1.5 max-w-xl text-sm text-neutral-300">
            Here is how your store is performing today. Manage live orders, update your menu, and grow your sales.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Button variant="success">View live orders</Button>
          <Button className="bg-white text-black hover:bg-neutral-200">
            Create offer
            <ArrowRight className="ml-1.5 size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
