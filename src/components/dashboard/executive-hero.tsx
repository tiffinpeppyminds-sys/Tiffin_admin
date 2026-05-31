"use client";

import { ArrowUpRight, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ExecutiveHero() {
  return (
    <section className="premium-gradient top-shine animate-fade-in-up overflow-hidden rounded-2xl p-6 text-white shadow-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Badge className="mb-3 border-white/30 bg-white/15 text-white" variant="default">
            <Sparkles className="mr-1.5 size-3.5" />
            Executive Control Layer
          </Badge>
          <h2 className="heading-classic text-3xl font-semibold">Modern operations with classic reliability.</h2>
          <p className="mt-2 max-w-2xl text-sm text-blue-100">
            Platform-level command view for approvals, service quality, growth reporting, and escalation response.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <Button className="border border-white/20 bg-white/10 text-white hover:bg-white/20">
            <Rocket className="mr-1.5 size-4" />
            Launch Campaign
          </Button>
          <Button className="border border-white/20 bg-white/10 text-white hover:bg-white/20">
            <ShieldCheck className="mr-1.5 size-4" />
            Review Compliance
          </Button>
          <Button className="border border-white/20 bg-white/10 text-white hover:bg-white/20 sm:col-span-2">
            Open Strategic Reports
            <ArrowUpRight className="ml-1.5 size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
