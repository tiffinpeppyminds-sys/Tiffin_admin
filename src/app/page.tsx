import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 md:py-16">
      <Card className="top-shine relative w-full overflow-hidden rounded-[28px] border border-blue-200/70 bg-white/95 shadow-[0_24px_64px_rgba(15,23,42,0.16)] dark:border-slate-700/70 dark:bg-slate-950/85">
        <div className="premium-gradient h-1.5 w-full" />
        <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-500/20" />
        <div className="pointer-events-none absolute -right-24 bottom-6 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-500/20" />

        <div className="relative z-10 grid gap-8 p-6 md:p-9 lg:grid-cols-[1.2fr_0.8fr] lg:p-11">
          <section className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-900 dark:border-blue-400/40 dark:bg-blue-950/50 dark:text-blue-200">
              <Sparkles className="size-3.5" />
              Executive Control Center
            </span>

            <h1 className="heading-classic text-[2.35rem] leading-[1.02] text-black md:text-[3.55rem] dark:text-slate-100">
              TIFFIN FINDER
              <span className="mt-1 block text-blue-700 dark:text-blue-300">Admin Suite</span>
            </h1>

            <p className="max-w-2xl text-[15px] leading-relaxed text-black md:text-base dark:text-slate-300">
              Super admin command layer for provider approvals, customer moderation, complaint handling, reports, and
              full order lifecycle control across the platform.
            </p>

            <div className="grid gap-2 text-sm text-black dark:text-slate-300">
              <p className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-blue-600" />Role-based admin access with governance controls</p>
              <p className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-blue-600" />Provider, customer, and order actions in one place</p>
              <p className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-blue-600" />Realtime operational visibility with KPI tracking</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="/login">
                <Button size="lg" className="min-w-40">
                  Open Login <ArrowRight className="ml-2 size-4.5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="secondary" size="lg" className="min-w-44">
                  Skip to Dashboard
                </Button>
              </Link>
            </div>
          </section>

          <aside className="subtle-divider premium-gradient-soft rounded-2xl p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black dark:text-slate-400">Platform Snapshot</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-900/75">
                <p className="text-xs font-semibold uppercase tracking-[0.09em] text-black dark:text-slate-400">Admin Structure</p>
                <p className="mt-1 heading-classic text-2xl font-semibold text-black dark:text-slate-100">1 Super + 24 Admins</p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-900/75">
                <p className="text-xs font-semibold uppercase tracking-[0.09em] text-black dark:text-slate-400">Operational Modules</p>
                <p className="mt-1 heading-classic text-2xl font-semibold text-black dark:text-slate-100">Customers • Providers • Orders</p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-900/75">
                <p className="text-xs font-semibold uppercase tracking-[0.09em] text-black dark:text-slate-400">Execution State</p>
                <p className="mt-1 heading-classic text-2xl font-semibold text-black dark:text-slate-100">Live Governance Ready</p>
              </div>
            </div>
          </aside>
        </div>
      </Card>
    </main>
  );
}
