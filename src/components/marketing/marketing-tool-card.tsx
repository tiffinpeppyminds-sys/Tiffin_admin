"use client";

import Link from "next/link";
import { Heart, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MarketingToolCard({
  title,
  subtitle,
  example,
  badge,
  icon: Icon,
  href,
  className,
}: {
  title: string;
  subtitle?: string;
  example?: string;
  badge?: string;
  icon: LucideIcon;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col rounded-xl border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-300 hover:shadow-sm",
        className,
      )}
    >
      {badge ? (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#e6f9ee] px-2.5 py-1 text-[11px] font-semibold text-[#06c167]">
          {badge === "Customer favourite" ? (
            <Heart className="size-3 fill-[#06c167]" />
          ) : (
            <TrendingUp className="size-3" />
          )}
          {badge}
        </span>
      ) : null}
      <Icon className="size-8 text-[#276ef1]" />
      <p className="mt-4 text-[15px] font-bold text-black">{title}</p>
      {subtitle ? <p className="mt-1 text-sm text-neutral-500">{subtitle}</p> : null}
      {example ? <p className="mt-1 text-sm text-neutral-500">Example: {example}</p> : null}
    </Link>
  );
}
