"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, Headset, LogOut } from "lucide-react";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase/client";
import { HelpPopover } from "@/components/layout/help-popover";
import { NotificationsPopover } from "@/components/layout/notifications-popover";

export function Header() {
  const router = useRouter();
  const [email, setEmail] = useState("manager@tiffinfinder.com");
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const firebaseConfigured = isFirebaseConfigured();

  useEffect(() => {
    if (!firebaseConfigured) return () => undefined;

    const { auth } = getFirebaseClient();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      setEmail(user.email ?? "manager@tiffinfinder.com");
    });
    return unsubscribe;
  }, [firebaseConfigured]);

  const initials = email.slice(0, 2).toUpperCase();

  const handleSignOut = async () => {
    if (firebaseConfigured) {
      const { auth } = getFirebaseClient();
      await signOut(auth);
    }
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-5">
      <Link href="/dashboard" className="flex items-baseline gap-1 text-lg tracking-[-0.02em] text-black">
        <span className="font-normal">Tiffin</span>
        <span className="font-bold">Finder</span>
        <span className="font-normal">Manager</span>
      </Link>

      <div className="flex items-center gap-1.5">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setHelpOpen((o) => !o);
              setNotifOpen(false);
              setMenuOpen(false);
            }}
            className="flex items-center gap-1.5 rounded-full bg-[#f6f6f6] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
          >
            <Headset className="size-4" />
            Help
          </button>
          <HelpPopover open={helpOpen} onClose={() => setHelpOpen(false)} />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotifOpen((o) => !o);
              setHelpOpen(false);
              setMenuOpen(false);
            }}
            className="relative flex size-9 items-center justify-center rounded-full text-black transition-colors hover:bg-neutral-100"
            aria-label="Notifications"
          >
            <Bell className="size-[18px]" />
            <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-[#276ef1] text-[9px] font-bold text-white">
              1
            </span>
          </button>
          <NotificationsPopover open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setMenuOpen((open) => !open);
              setHelpOpen(false);
              setNotifOpen(false);
            }}
            className="flex size-9 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-black transition-colors hover:bg-neutral-300"
            aria-label="Account"
          >
            {initials}
          </button>
          {menuOpen ? (
            <div className="absolute right-0 top-11 w-60 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
              <div className="border-b border-neutral-100 px-4 py-3">
                <p className="text-xs text-neutral-500">Signed in as</p>
                <p className="truncate text-sm font-semibold text-black">{email}</p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-black transition-colors hover:bg-neutral-50"
              >
                <LogOut className="size-4" />
                Log out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
