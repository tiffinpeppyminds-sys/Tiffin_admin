"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { ChatWidget } from "@/components/layout/chat-widget";
import { OnboardingHeader } from "@/components/shops/onboarding-header";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/providers/add")) {
    return (
      <div className="min-h-screen bg-white">
        <OnboardingHeader />
        <main>{children}</main>
      </div>
    );
  }

  if (
    pathname.startsWith("/ads/create") ||
    pathname.startsWith("/offers/new") ||
    pathname.startsWith("/offers/create") ||
    pathname.startsWith("/marketing/new")
  ) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  const isMenu = pathname.startsWith("/menu");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main
          className={
            isMenu
              ? "min-w-0 flex-1 px-6 py-6 lg:px-10 lg:py-8"
              : "min-w-0 flex-1 px-5 py-6 lg:px-8 lg:py-8"
          }
        >
          {isMenu ? children : <div className="mx-auto w-full max-w-[1180px]">{children}</div>}
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}
