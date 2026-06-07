import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="flex h-14 items-center justify-between border-b border-neutral-200 px-6">
        <div className="flex items-baseline gap-1 text-lg tracking-[-0.02em] text-black">
          <span className="font-normal">Tiffin</span>
          <span className="font-bold">Finder</span>
          <span className="font-normal">Manager</span>
        </div>
        <Link
          href="/login"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Sign in
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-16">
        <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-black md:text-[52px]">
          Manage your store,
          <span className="block text-[#06c167]">your way.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600">
          Track live sales, handle orders, update your menu, run marketing campaigns, and manage payouts — all from one
          dashboard.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Sign in to dashboard
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-full bg-[#f6f6f6] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
          >
            Preview dashboard
          </Link>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Sales today", value: "A$219.65" },
            { label: "Booked orders", value: "5" },
            { label: "Store status", value: "Online", accent: true },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-[#f6f6f6] px-5 py-4">
              <p className="text-xs font-medium text-neutral-500">{stat.label}</p>
              <p className={cn("mt-1 kpi-value", stat.accent && "text-[#06c167]")}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
