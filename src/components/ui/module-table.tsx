"use client";

import { useMemo, useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, ChevronDown, FilterX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FilterOption<T> = {
  label: string;
  value: string;
  predicate: (item: T) => boolean;
};

type ModuleColumn<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  className?: string;
  render?: (item: T) => React.ReactNode;
};

type ModuleTableProps<T extends Record<string, string | number>> = {
  title: string;
  description: string;
  data: T[];
  columns: ModuleColumn<T>[];
  searchPlaceholder?: string;
  filterOptions?: FilterOption<T>[];
};

export function ModuleTable<T extends Record<string, string | number>>({
  title,
  description,
  data,
  columns,
  searchPlaceholder = "Search...",
  filterOptions,
}: ModuleTableProps<T>) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const normalizedQuery = query.trim().toLowerCase();

  const visibleRows = useMemo(() => {
    const filtered = data.filter((item) => {
      const searchMatch =
        normalizedQuery.length === 0 ||
        columns.some((column) => String(item[column.key]).toLowerCase().includes(normalizedQuery));

      const selectedFilter = filterOptions?.find((option) => option.value === activeFilter);
      const filterMatch = !selectedFilter || selectedFilter.predicate(item);

      return searchMatch && filterMatch;
    });

    if (!sortKey) {
      return filtered;
    }

    return [...filtered].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }

      const textA = String(valueA).toLowerCase();
      const textB = String(valueB).toLowerCase();

      if (textA === textB) return 0;
      const order = textA > textB ? 1 : -1;
      return sortDirection === "asc" ? order : -order;
    });
  }, [activeFilter, columns, data, filterOptions, normalizedQuery, sortDirection, sortKey]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  };

  const hasActiveControls = query.length > 0 || activeFilter !== "all" || sortKey !== null;

  return (
    <section className="glass-card animate-fade-in-up top-shine rounded-2xl">
      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <h2 className="heading-classic text-2xl font-semibold text-black dark:text-slate-100">{title}</h2>
        <p className="mt-1 text-sm text-black dark:text-slate-400">{description}</p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-black dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <span className="pulse-glow inline-block size-2 rounded-full bg-emerald-500" />
          {visibleRows.length} visible rows
        </div>
      </div>

      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center dark:border-slate-800">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          className="md:max-w-sm"
        />
        {filterOptions && filterOptions.length > 0 ? (
          <div className="relative">
            <select
              value={activeFilter}
              onChange={(event) => setActiveFilter(event.target.value)}
              className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-8 text-sm text-black shadow-sm outline-none transition-colors focus:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 md:w-52"
            >
              <option value="all">All</option>
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-black" />
          </div>
        ) : null}
        <div className="md:ml-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setQuery("");
              setActiveFilter("all");
              setSortKey(null);
              setSortDirection("asc");
            }}
            disabled={!hasActiveControls}
          >
            <FilterX className="mr-1.5 size-3.5" />
            Reset Controls
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur dark:bg-slate-900/80">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.11em] text-black dark:text-slate-400",
                    column.className,
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column.key)}
                      className="inline-flex items-center gap-1 text-left transition-colors hover:text-black dark:hover:text-slate-200"
                    >
                      {column.label}
                      {sortKey === column.key ? (
                        sortDirection === "asc" ? (
                          <ArrowUpAZ className="size-3.5" />
                        ) : (
                          <ArrowDownAZ className="size-3.5" />
                        )
                      ) : (
                        <ArrowDownAZ className="size-3.5 opacity-45" />
                      )}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((item, index) => (
              <tr
                key={`${String(item[columns[0].key])}-${index}`}
                className="border-t border-slate-100 transition-all odd:bg-white even:bg-slate-50/50 hover:bg-blue-50/50 dark:border-slate-800 dark:odd:bg-slate-950 dark:even:bg-slate-900/30 dark:hover:bg-slate-800/55"
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className={cn("px-4 py-3 text-black dark:text-slate-200", column.className)}>
                    {column.render ? column.render(item) : String(item[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-100 px-4 py-3 text-xs text-black dark:border-slate-800 dark:text-slate-400">
        Showing {visibleRows.length} of {data.length} records
      </div>
    </section>
  );
}
