import type { ReactNode } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function MenuSearch({
  placeholder,
  className,
  pill = false,
}: {
  placeholder: string;
  className?: string;
  pill?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "w-full bg-[#f6f6f6] pl-10 pr-4 text-sm text-black outline-none transition-shadow placeholder:text-neutral-500 focus:shadow-[0_0_0_1px_#cccccc]",
          pill ? "uem-search" : "rounded-xl py-3",
        )}
      />
    </div>
  );
}

export function MenuPageHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="page-title-lg">{title}</h1>
      {action}
    </div>
  );
}

export function MenuPrimaryButton({
  children,
  href,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const cls =
    "inline-flex items-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800";
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function MenuTable({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-neutral-200 bg-white", className)}>
      <table className="w-full min-w-full text-left text-sm">{children}</table>
    </div>
  );
}

export function MenuTh({ children }: { children: ReactNode }) {
  return <th className="px-5 py-3.5 text-sm font-bold text-black first:pl-6">{children}</th>;
}

export function MenuTd({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn("border-t border-neutral-100 px-5 py-4 text-black first:pl-6", className)}>{children}</td>;
}

export function MenuGreenLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-[#06c167] hover:underline">
      {children}
    </Link>
  );
}
