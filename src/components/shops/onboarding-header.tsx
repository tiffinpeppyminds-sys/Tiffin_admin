"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleHelp, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase/client";

export function OnboardingHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    if (isFirebaseConfigured()) {
      const { auth } = getFirebaseClient();
      await signOut(auth);
    }
    router.replace("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-200 px-6 lg:px-10">
      <Link href="/dashboard" className="text-lg tracking-[-0.02em] text-black">
        <span className="font-bold">Tiffin Finder</span>{" "}
        <span className="font-normal text-neutral-600">for Merchants</span>
      </Link>
      <div className="flex items-center gap-5 text-sm font-medium text-black">
        <button type="button" className="inline-flex items-center gap-1.5 hover:text-neutral-600">
          <CircleHelp className="size-4" />
          Help
        </button>
        <button type="button" onClick={handleLogout} className="inline-flex items-center gap-1.5 hover:text-neutral-600">
          <LogOut className="size-4" />
          Log out
        </button>
      </div>
    </header>
  );
}
