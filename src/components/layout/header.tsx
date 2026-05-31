"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Bell, CalendarDays, Search, UserRound } from "lucide-react";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase/client";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const router = useRouter();
  const [email, setEmail] = useState("Admin");
  const [roleLabel, setRoleLabel] = useState("Admin");
  const firebaseConfigured = isFirebaseConfigured();

  useEffect(() => {
    if (!firebaseConfigured) return () => undefined;

    const { auth } = getFirebaseClient();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      setEmail(user.email ?? "Admin");
      const token = await user.getIdTokenResult();
      setRoleLabel(token.claims.role === "super_admin" ? "Super Admin" : "Admin");
    });
    return unsubscribe;
  }, [firebaseConfigured]);

  const today = new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="glass-card top-shine mb-6 rounded-2xl p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-black/70 dark:text-slate-400">
            Admin Console / Operations
          </p>
          <h1 className="heading-classic text-2xl font-semibold text-black dark:text-slate-100">
            Platform Operations Dashboard
          </h1>
          <p className="text-sm text-black dark:text-slate-400">
            Modern control surface for the complete TIFFIN FINDER ecosystem.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="muted">
            <CalendarDays className="mr-1.5 size-3.5" />
            {today}
          </Badge>
          <Badge variant="success">System Healthy</Badge>
          <Badge variant="muted">{roleLabel}</Badge>
          <Badge variant="default">Adelaide Region</Badge>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-black" />
          <Input className="pl-9" placeholder="Search provider, order ID, customer, complaint..." />
        </div>
        <ThemeToggle />
        <button className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-black shadow-sm transition-transform hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <Bell className="size-4" />
        </button>
        <button
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-black shadow-sm transition-transform hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          type="button"
          onClick={async () => {
            if (firebaseConfigured) {
              const { auth } = getFirebaseClient();
              await signOut(auth);
            }
            router.replace("/login");
          }}
          title="Sign out"
        >
          <UserRound className="size-4" />
          {email}
        </button>
      </div>
    </header>
  );
}
